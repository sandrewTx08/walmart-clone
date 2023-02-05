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
import { Cart } from "./cart";

export const CartContext =
  createContext<[Cart, [Query, React.Dispatch<React.SetStateAction<Query>>]]>(
    null
  );

export default function () {
  document.title = "Walmart.com";

  const [user, userSet] = useState<Users>(),
    [queryDepartment, queryDepartmentSet] = useState<Query>(),
    [queryCart, queryCartSet] = useState<Query>(),
    [cart, cartSet] = useState<Cart>();

  useEffect(() => {
    axios
      .get("http://localhost:3000/user", { withCredentials: true })
      .then(({ data }) => {
        userSet(data);
        const c = new Cart(data.id);
        cartSet(c);
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
    queryDepartment &&
    queryCart && (
      <CartContext.Provider value={[cart, [queryCart, queryCartSet]]}>
        <Navigation query={queryDepartment} user={user}>
          <Routes>
            <Route path="/" element={<Carousel />} />
            <Route path="user" element={<>{JSON.stringify(user)}</>} />
            <Route path="department/:id" element={<DepartmentCatalog />} />
            <Route
              path="department/:department_id/catalog/:id"
              element={<Catalog />}
            />
            <Route path="logout" element={<Logout />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </Navigation>
      </CartContext.Provider>
    )
  );
}
