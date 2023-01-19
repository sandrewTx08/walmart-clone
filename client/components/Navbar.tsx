import { useContext } from "react";
import { FiUser, FiMessageSquare, FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

export default function () {
  const user = useContext(UserContext);

  return (
    <nav className="navbar-horizontal">
      <ul>
        {user ? (
          <li className="header-item">
            <Link to="user">
              <FiUser />
              <div>
                <div>{user.first_name}</div>
                <div>
                  <b>Account</b>
                </div>
              </div>
            </Link>
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
                {user &&
                  (
                    user.cart.reduce(
                      (p, c) => p + c.price * c.quantity,
                      0
                    ) as number
                  ).toFixed(2)}
              </div>
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
