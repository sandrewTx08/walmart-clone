import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";
import { FiUser, FiMessageSquare } from "react-icons/fi";
import { Fragment, useContext, useEffect, useState } from "react";
import DropdownList from "./DropdownList";
import styled from "styled-components";
import { FiShoppingCart } from "react-icons/fi";
import { Query, Users } from "../graphql-types";
import { CartContext } from "../App";

export const HeaderItem = styled.div`
  flex-shrink: 0;
  border-radius: 1em;
  padding: 5px;

  a {
    display: flex;
    align-items: center;
  }

  svg {
    margin-right: 6px;
  }

  &.header-department {
    font-size: medium;
  }

  @media screen and (max-width: 768px) {
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
  gap: 5px;
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

const HeaderItemWrapper = styled.nav`
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const CartButton = styled.div`
  background-color: var(--WALMART-YALLOW);
  border-radius: 50%;
  color: black;
  width: 20px;
  height: 20px;
  text-align: center;
`;

export default function (
  props: React.PropsWithChildren<{
    query: Query;
    user: any;
  }>
) {
  const [departmentsMenu, departmentsMenuSet] = useState(false),
    [navigationVertical, navigationVerticalSet] = useState(false),
    [userMenu, userMenuSet] = useState(false),
    [_c, cart] = useContext(CartContext);

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
        <div style={{ display: "flex", marginLeft: "1em" }}>
          <NavigationVerticalButton
            onClick={() => {
              navigationVerticalSet(!navigationVertical);
            }}
          >
            <GiHamburgerMenu />
          </NavigationVerticalButton>

          <HeaderBrand>
            <Link to="/">
              <img
                className="header-brand-small"
                src="/walmartLogoMedium.svg"
              />
              <img
                className="header-brand-medium"
                src="/walmartLogoSmall.png"
              />
            </Link>
          </HeaderBrand>
        </div>

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

        <HeaderItemWrapper>
          {props.user && props.user.auth ? (
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
        </HeaderItemWrapper>

        <HeaderItemWrapper>
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
        </HeaderItemWrapper>

        <HeaderItem style={{ marginRight: "1em" }}>
          <Link to="cart">
            <CartButton>
              {cart.cart.reduce((p, c) => p + c.quantity, 0)}
            </CartButton>
            <FiShoppingCart />$
            {(props.user && cart
              ? cart
              : JSON.parse(localStorage.getItem("cart"))
            ).cart
              .reduce((p, c) => p + c.price * c.quantity, 0)
              .toFixed(2)}
          </Link>
        </HeaderItem>
      </Header>

      <main>{props.children}</main>
    </Fragment>
  );
}
