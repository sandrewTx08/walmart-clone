// @ts-check

import { FiUser, FiMessageSquare, FiShoppingCart } from "react-icons/fi";
import React from "react";
import { Link } from "react-router-dom";

export default function () {
  return (
    <nav className="navbar-horizontal">
      <ul>
        <li className="header-item-1">
          <Link to={"login"}>
            <FiUser />
            <div>
              <div>Sign in</div>
              <div>
                <b>Account</b>
              </div>
            </div>
          </Link>
        </li>

        <li className="header-item-1">
          <Link to={"help"}>
            <FiMessageSquare />
            <div>
              <div>Chat assistent</div>
              <div>
                <b>Support</b>
              </div>
            </div>
          </Link>
        </li>

        <li className="header-item-1">
          <Link to={"cart"}>
            <FiShoppingCart />
            <div>
              <div>Cart</div>
              <div>$0.00</div>
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
