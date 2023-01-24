import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";
import { FiUser, FiMessageSquare } from "react-icons/fi";
import { Fragment, useState } from "react";
import DropdownList from "./DropdownList";
import styled from "styled-components";
import { FiShoppingCart } from "react-icons/fi";
import { Query, Users } from "../graphql-types";

export const HeaderItem = styled.div`
  flex-shrink: 0;
  border-radius: 1em;
  padding: 0.5em;

  a {
    display: flex;
    align-items: center;
  }

  svg {
    padding: 0 0.5em;
  }

  &.header-department {
    font-size: medium;
  }

  @media screen and (max-width: 480px) {
    &.header-department {
      display: none;
    }
  }

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
`;

const HeaderBrand = styled.div`
  img {
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
      display: inline;
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
                <div>Assistant</div>
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

        <HeaderItem
          className="header-department"
          onClick={() => {
            departmentsMenuSet(!departmentsMenu);
          }}
        >
          <HiOutlineSquares2X2 />
          Departments
          {departmentsMenu && (
            <DropdownList
              list={props.query.departments.map(({ name, id }) => ({
                href: "department/" + id,
                text: name,
              }))}
            />
          )}
        </HeaderItem>

        <Searchbar
          list={props.query.departments.map(({ name, id }) => ({
            href: "department/" + id,
            text: name,
            sidetext: "Department",
          }))}
        />

        <NavigationHorizonatal>
          <ul>
            <li>
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
            </li>

            <li>
              <HeaderItem>
                <Link to="chat">
                  <FiMessageSquare />
                  <div>
                    <div>Assistant</div>
                    <div>
                      <b>Support</b>
                    </div>
                  </div>
                </Link>
              </HeaderItem>
            </li>

            <li>
              <HeaderItem>
                <Link to="cart">
                  <FiShoppingCart />
                  <div>
                    <div>Cart</div>
                    <div>
                      {(props.user && props.cart
                        ? props.cart
                        : JSON.parse(localStorage.getItem("cart"))
                      ).cart.reduce((p, c) => p + c.quantity, 0)}
                    </div>
                  </div>
                </Link>
              </HeaderItem>
            </li>
          </ul>
        </NavigationHorizonatal>
      </Header>

      <main>{props.children}</main>
    </Fragment>
  );
}
