import { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import Carousel from "./components/Carousel";
import DepartmentCatalog from "./components/DepartmentCatalog";
import Catalog from "./components/Catalog";
import axios from "axios";
import { Query, Users } from "./graphql-types";
import { graphQLClient } from "./graphql-client";
import "./index.css";

export default function () {
  document.title = "Walmart.com";

  const [user, userSet] = useState<Users>(),
    [query, querySet] = useState<Query>(),
    [cart, cartSet] = useState<Query>();

  useEffect(() => {
    axios
      .get("http://localhost:3000/user", { withCredentials: true })
      .then(({ data }) => {
        userSet(data);
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
      .then(querySet);
  }, []);

  useEffect(() => {
    if (user) {
      graphQLClient
        .request(
          `{
            cart(user_id: ${user.id}) {
              price
              quantity
            }
          }`
        )
        .then(cartSet);
    } else {
      localStorage.setItem(
        "cart",
        JSON.stringify({ cart: [{ quantity: 0, price: 0 }] })
      );
      cartSet(JSON.parse(localStorage.getItem("cart")));
    }
  }, [user]);

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
    query &&
    cart && (
      <Navigation query={query} user={user} cart={cart}>
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
    )
  );
}
