import { useContext, useState } from "react";
import { FiUser, FiMessageSquare, FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { UserContext, CartContext } from "../App";
import DropdownList from "./DropdownList";
import { HeaderItem } from "./Header";

export default function () {
  const user = useContext(UserContext),
    query = useContext(CartContext),
    [userMenu, userMenuSet] = useState(false);

  return (
    <nav className="navbar-horizontal">
      <ul>
        {user ? (
          <HeaderItem
            onClick={() => {
              userMenuSet(!userMenu);
            }}
          >
            <a>
              <FiUser />
              <div>
                <div>{user.first_name}</div>
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
              <div>Chat assistent</div>
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
                {(user && query.cart
                  ? query
                  : JSON.parse(localStorage.getItem("cart"))
                ).cart
                  .reduce((p, c) => p + c.price * c.quantity, 0)
                  .toFixed(2)}
              </div>
            </div>
          </Link>
        </HeaderItem>
      </ul>
    </nav>
  );
}
