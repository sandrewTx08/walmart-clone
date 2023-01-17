import { useContext } from "react";
import { FiUser, FiMessageSquare, FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Cart } from "../App";

export default function () {
  const cart = useContext(Cart);

  return (
    <nav className="navbar-horizontal">
      <ul>
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

        <li className="header-item">
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

        <li className="header-item">
          <Link to={"cart"}>
            <FiShoppingCart />
            <div>
              <div>Cart</div>
              <div>
                $
                {(
                  cart.reduce((p, c) => p + c.price * c.quantity, 0) as number
                ).toFixed(2)}
              </div>
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
