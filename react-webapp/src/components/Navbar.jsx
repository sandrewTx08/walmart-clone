// @ts-check

import { FiUser, FiMessageSquare, FiShoppingCart } from "react-icons/fi";
import React from "react";

export default function () {
  return (
    <nav className="navbar-horizontal">
      <ul>
        <li className="header-item-1">
          <FiUser />
          <div>
            <div>Sign in</div>
            <div>
              <b>Account</b>
            </div>
          </div>
        </li>

        <li className="header-item-1">
          <FiMessageSquare />
          <div>
            <div>Chat assistent</div>
            <div>
              <b>Support</b>
            </div>
          </div>
        </li>

        <li className="header-item-1">
          <FiShoppingCart />
          <div>
            <div>Cart</div>
            <div>$0.00</div>
          </div>
        </li>
      </ul>
    </nav>
  );
}
