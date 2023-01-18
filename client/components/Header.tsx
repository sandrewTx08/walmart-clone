import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Searchbar from "./Searchbar";
import { FiUser, FiMessageSquare } from "react-icons/fi";
import { Fragment, useEffect, useState } from "react";
import { Query } from "../graphql-types";
import DropdownList from "./DropdownList";
import { graphQLClient } from "../graphql-client";

export default function () {
  const [departmentsMenu, departmentsMenuSet] = useState(false),
    [navbarVertical, navbarVerticalSet] = useState(false),
    [query, querySet] = useState<Query>();

  useEffect(() => {
    graphQLClient
      .request(
        `
        {
          departments {
            name
            id
          }
        }
      `
      )
      .then(querySet);
  }, []);

  return (
    <Fragment>
      {navbarVertical && (
        <ul className="navbar-vertical">
          <li>
            <a href="http://localhost:3000/login">
              <FiUser />
              <div>Login</div>
            </a>
          </li>
          <li>
            <Link to="chat">
              <FiMessageSquare />
              <div>Chat support</div>
            </Link>
          </li>
        </ul>
      )}

      <header
        className="header"
        style={{ position: navbarVertical ? "static" : "fixed" }}
      >
        <div className="navbar-vertical">
          <button
            onClick={() => {
              navbarVerticalSet(!navbarVertical);
            }}
          >
            <GiHamburgerMenu />
          </button>
        </div>

        <div className="header-brand">
          <Link to="/">
            <img className="header-brand-small" src="/walmartLogoMedium.svg" />
            <img className="header-brand-medium" src="/walmartLogoSmall.png" />
          </Link>
        </div>

        <div className="header-departments">
          <div
            className="header-item"
            onClick={() => {
              departmentsMenuSet(!departmentsMenu);
            }}
          >
            <HiOutlineSquares2X2 />
            Departments
          </div>

          {departmentsMenu && (
            <ul>
              <DropdownList
                list={
                  query
                    ? query.departments.map(({ name, id }) => ({
                        href: "department/" + id,
                        text: name,
                      }))
                    : []
                }
              />
            </ul>
          )}
        </div>

        <Searchbar
          list={
            query
              ? query.departments.map(({ name, id }) => ({
                  href: "department/" + id,
                  text: name,
                  sidetext: "Department",
                }))
              : []
          }
        />

        <Navbar />
      </header>
    </Fragment>
  );
}
