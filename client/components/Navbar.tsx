import { useContext, useState } from "react";
import { FiUser, FiMessageSquare, FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { UserContext, CartContext } from "../App";
import DropdownList from "./DropdownList";

export default function () {
  const user = useContext(UserContext),
    query = useContext(CartContext),
    [userMenu, userMenuSet] = useState(false);

  return (
    <nav className="navbar-horizontal">
      <ul>
        {user ? (
          <li
            className="header-item"
            onClick={() => {
              userMenuSet(!userMenu);
            }}
          >
            <FiUser />
            <div>
              <div>{user.first_name}</div>
              <div>
                <b>Account</b>
              </div>
            </div>
            {userMenu && (
              <DropdownList
                list={[
                  { href: "logout", text: "Logout" },
                  { href: "user", text: "Profile" },
                ]}
              />
            )}
          </li>
        ) : (
          <li className="header-item">
            <a href="http://localhost:3000/login">
              <FiUser />
              <div>
                <div>Sign in</div>
                <div>
                  <b>Account</b>
                </div>
              </div>
            </a>
          </li>
        )}

        <li className="header-item">
          <Link to="chat">
            <FiMessageSquare />
            <div>
              <div>Chat assistent</div>
              <div>
                <b>Support</b>
              </div>
            </div>
          </Link>
        </li>

        <li className="header-item">
          <Link to="cart">
            <FiShoppingCart />
            <div>
              <div>Cart</div>
              <div>
                $
                {user && query.cart
                  ? query.cart
                      .reduce((p, c) => p + c.price * c.quantity, 0)
                      .toFixed(2)
                  : 0}
              </div>
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
