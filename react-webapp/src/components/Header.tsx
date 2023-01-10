import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { GiHamburgerMenu } from "react-icons/gi";
import { gql, request } from "graphql-request";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Searchbar from "./Searchbar";
import { FiUser, FiMessageSquare } from "react-icons/fi";
import { Fragment, useEffect, useState } from "react";
import { Query } from "../graphql";
import DropdownList from "./DropdownList";

export default function () {
  const [departmentsMenu, departmentsMenuSet] = useState(false),
    [navbarVertical, navbarVerticalSet] = useState(false),
    [query, querySet] = useState<Query>();

  useEffect(() => {
    request(
      "http://localhost:3000/graphql",
      gql`
        {
          departments {
            name
            id
          }
        }
      `
    ).then(querySet);
  }, []);

  return (
    <Fragment>
      {navbarVertical && (
        <ul className="navbar-vertical">
          <li>
            <Link to={"login"}>
              <FiUser />
              <div>Login</div>
            </Link>
          </li>
          <li>
            <Link to={"help"}>
              <FiMessageSquare />
              <div>Help</div>
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
          <Link to={"/"}>
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
