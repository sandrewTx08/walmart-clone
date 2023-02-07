import { createContext, useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import Carousel from "./components/Carousel";
import DepartmentCatalog from "./components/DepartmentCatalog";
import Catalog from "./components/Catalog";
import axios from "axios";
import { Query, Users } from "./graphql-types";
import { graphQLClient } from "./graphql-client";
import "./index.css";
import { CartAPI } from "./cartApi";
import Cart from "./components/Cart";

export const CartContext =
  createContext<
    [CartAPI, [Query, React.Dispatch<React.SetStateAction<Query>>]]
  >(null);

export const UserContext = createContext<Users & { auth: boolean }>(null);

export default function () {
  document.title = "Walmart.com";

  const [user, userSet] = useState<Users & { auth: boolean }>(),
    [queryDepartment, queryDepartmentSet] = useState<Query>(),
    [queryCart, queryCartSet] = useState<Query>(),
    [cartAPI, cartAPISet] = useState<CartAPI>();

  useEffect(() => {
    axios
      .get("http://localhost:3000/user", { withCredentials: true })
      .then(({ data }) => {
        userSet(data);
        const c = new CartAPI(data.id);
        cartAPISet(c);
        c.cartGet().then((value) => {
          queryCartSet(value);
        });
      });

    graphQLClient
      .request(
        `{
          departments {
            name
            id
          }
        }`
      )
      .then(queryDepartmentSet);
  }, []);

  function Logout() {
    useEffect(() => {
      axios
        .delete("http://localhost:3000/logout", {
          withCredentials: true,
        })
        .then(({ data }) => {
          if (data.success) {
            userSet(null);
          }
        });
    }, []);

    return <Navigate to="/" />;
  }

  return (
    user &&
    queryDepartment &&
    queryCart && (
      <UserContext.Provider value={user}>
        <CartContext.Provider value={[cartAPI, [queryCart, queryCartSet]]}>
          <Navigation query={queryDepartment}>
            <Routes>
              <Route path="/" element={<Carousel />} />
              <Route path="user" element={<>{JSON.stringify(user)}</>} />
              <Route path="department/:id" element={<DepartmentCatalog />} />
              <Route
                path="department/:department_id/catalog/:id"
                element={<Catalog />}
              />
              <Route path="logout" element={<Logout />} />
              <Route path="cart" element={<Cart />} />
              <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
          </Navigation>
        </CartContext.Provider>
      </UserContext.Provider>
    )
  );
}
