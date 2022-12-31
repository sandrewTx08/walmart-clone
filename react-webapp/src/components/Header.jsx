// @ts-check

import React from "react";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { GiHamburgerMenu } from "react-icons/gi";
import { gql, request } from "graphql-request";
import Navbar from "./Navbar";
import Searchbar from "./Searchbar";
// @ts-ignore
import walmartLogo1 from "/walmartLogoMedium.svg";
// @ts-ignore
import walmartLogo2 from "/walmartLogoSmall.png";
import { FiUser, FiMessageSquare } from "react-icons/fi";

export default function () {
  const [departmentsMenu, departmentsMenuSet] = React.useState(false),
    [headerMenuList, headerMenuListSet] = React.useState(false),
    [fetch, fetchSet] = React.useState(() => {
      /**
       * @type {import('../fetch/departments').Data=}
       */
      let initialState;
      return initialState;
    });

  React.useEffect(() => {
    request(
      "http://localhost:3000/graphql",
      gql`
        {
          departments {
            name
          }
        }
      `
    ).then(fetchSet);
  }, []);

  return (
    <React.Fragment>
      {headerMenuList ? (
        <div className="navbar-vertical">
          <ul>
            <li>
              <a>
                <FiUser />
                <div>Login</div>
              </a>
            </li>
            <li>
              <a>
                <FiMessageSquare />
                <div>Help</div>
              </a>
            </li>
          </ul>
        </div>
      ) : (
        <React.Fragment />
      )}

      <header className="header">
        <div className="navbar-vertical">
          <button
            onClick={() => {
              headerMenuListSet(!headerMenuList);
            }}
          >
            <GiHamburgerMenu />
          </button>
        </div>

        <img className="header-brand header-brand-small" src={walmartLogo1} />
        <img className="header-brand header-brand-medium" src={walmartLogo2} />

        <div>
          <div
            className="departments header-item-1"
            onClick={() => {
              departmentsMenuSet(!departmentsMenu);
            }}
          >
            <HiOutlineSquares2X2 />
            Departments
          </div>
          {departmentsMenu && (
            <ul className="departments-menu">
              {fetch ? (
                fetch.departments.map((dapartmentListItem) => (
                  <li>
                    <a>{dapartmentListItem.name}</a>
                  </li>
                ))
              ) : (
                <React.Fragment />
              )}
            </ul>
          )}
        </div>

        <Searchbar
          list={
            fetch
              ? fetch.departments.map(({ name }) => ({
                  link: "",
                  text: name,
                }))
              : []
          }
        />

        <Navbar />
      </header>
    </React.Fragment>
  );
}
