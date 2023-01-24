import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";
import { FiUser, FiMessageSquare } from "react-icons/fi";
import React, { Fragment, useState } from "react";
import DropdownList from "./DropdownList";
import styled from "styled-components";
import { FiShoppingCart } from "react-icons/fi";
import { Query, Users } from "../graphql-types";

export const HeaderItem = styled.div`
  a {
    display: flex;
    align-items: center;
  }

  svg {
    padding: 0 0.5em;
  }

  border-radius: 1em;
  padding: 0.5em;

  &:hover {
    background-color: #00509b;
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: var(--WALMART-BLUE);
  height: 4em;
  color: white;
  width: 100%;
  z-index: 200;
  position: fixed;

  div {
    flex-shrink: 0;
  }
`;

const HeaderDepartment = styled.div`
  div {
    font-size: medium;
  }

  @media screen and (max-width: 480px) {
    display: none;
  }
`;

const HeaderBrand = styled.div`
  img {
    max-width: 100%;
    height: 3em;
  }

  .header-brand-medium {
    display: none;
  }

  @media screen and (max-width: 1024px) {
    .header-brand-small {
      display: none;
    }

    .header-brand-medium {
      display: block;
    }
  }
`;

const NavigationVertical = styled.nav`
  ul {
    background-color: white;
    color: black;
    height: 100%;
  }

  li a {
    display: flex;
    align-items: center;
  }

  li svg {
    margin: 1em;
  }
`;

const NavigationVerticalButton = styled.button`
  background-color: inherit;
  padding: 5px;

  svg {
    color: white;
  }

  @media screen and (min-width: 1024px) {
    display: none;
  }
`;

const NavigationHorizonatal = styled.nav`
  ul {
    display: flex;
    justify-content: space-between;
    list-style: none;
  }

  li {
    align-items: center;
    display: flex;
  }

  li svg {
    justify-content: center;
  }

  @media screen and (max-width: 768px) {
    ul {
      display: none;
      justify-content: space-between;
      list-style: none;
    }
  }
`;

export default function (
  props: React.PropsWithChildren<{
    cart: Query;
    query: Query;
    user: Users;
  }>
) {
  const [departmentsMenu, departmentsMenuSet] = useState(false),
    [navigationVertical, navigationVerticalSet] = useState(false),
    [userMenu, userMenuSet] = useState(false);

  return (
    <Fragment>
      {navigationVertical && (
        <NavigationVertical>
          <ul>
            <li>
              <a href="http://localhost:3000/login">
                <FiUser />
                <div>Login</div>
              </a>
            </li>
            <li>
              <Link to="chat">
                <FiMessageSquare />
                <div>Chat assistant</div>
              </Link>
            </li>
          </ul>
        </NavigationVertical>
      )}

      <Header>
        <NavigationVerticalButton
          onClick={() => {
            navigationVerticalSet(!navigationVertical);
          }}
        >
          <GiHamburgerMenu />
        </NavigationVerticalButton>

        <HeaderBrand>
          <Link to="/">
            <img className="header-brand-small" src="/walmartLogoMedium.svg" />
            <img className="header-brand-medium" src="/walmartLogoSmall.png" />
          </Link>
        </HeaderBrand>

        <HeaderDepartment>
          <HeaderItem
            onClick={() => {
              departmentsMenuSet(!departmentsMenu);
            }}
          >
            <HiOutlineSquares2X2 />
            Departments
          </HeaderItem>

          {departmentsMenu && (
            <DropdownList
              list={props.query.departments.map(({ name, id }) => ({
                href: "department/" + id,
                text: name,
              }))}
            />
          )}
        </HeaderDepartment>

        <Searchbar
          list={props.query.departments.map(({ name, id }) => ({
            href: "department/" + id,
            text: name,
            sidetext: "Department",
          }))}
        />

        <NavigationHorizonatal>
          <ul>
            {props.user ? (
              <HeaderItem
                onClick={() => {
                  userMenuSet(!userMenu);
                }}
              >
                <a>
                  <FiUser />
                  <div>
                    <div>{props.user.first_name}</div>
                    <div>
                      <b>Account</b>
                    </div>
                  </div>
                </a>
                {userMenu && (
                  <DropdownList
                    list={[
                      { href: "logout", text: "Logout" },
                      { href: "user", text: "Profile" },
                    ]}
                  />
                )}
              </HeaderItem>
            ) : (
              <HeaderItem>
                <a href="http://localhost:3000/login">
                  <FiUser />
                  <div>
                    <div>Sign in</div>
                    <div>
                      <b>Account</b>
                    </div>
                  </div>
                </a>
              </HeaderItem>
            )}

            <HeaderItem>
              <Link to="chat">
                <FiMessageSquare />
                <div>
                  <div>Chat assistant</div>
                  <div>
                    <b>Support</b>
                  </div>
                </div>
              </Link>
            </HeaderItem>

            <HeaderItem>
              <Link to="cart">
                <FiShoppingCart />
                <div>
                  <div>Cart</div>
                  <div>
                    $
                    {(props.user && props.cart
                      ? props.cart
                      : JSON.parse(localStorage.getItem("cart"))
                    ).cart
                      .reduce((p, c) => p + c.price * c.quantity, 0)
                      .toFixed(2)}
                  </div>
                </div>
              </Link>
            </HeaderItem>
          </ul>
        </NavigationHorizonatal>
      </Header>

      <main>{props.children}</main>
    </Fragment>
  );
}
