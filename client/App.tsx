import { createContext, Fragment, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Carousel from "./components/Carousel";
import DepartmentCatalog from "./components/DepartmentCatalog";
import Catalog from "./components/Catalog";
import "./styles/variables.css";
import "./styles/Navbar.css";
import "./styles/Header.css";
import "./styles/Carousel.css";
import "./styles/Catalog.css";
import "./styles/Searchbar.css";
import "./styles/DropdownList.css";
import "./styles/DepartmentCatalog.css";
import "./styles/index.css";
import axios from "axios";
import { Query, Users } from "./graphql-types";
import { graphQLClient } from "./graphql-client";
import { gql } from "graphql-request";

export const UserContext = createContext<Users>(null);
export const CartContext = createContext<Query>(null);

export default function () {
  document.title = "Walmart.com";

  const [user, userSet] = useState<Users>(),
    [query, querySet] = useState<Query>();

  useEffect(() => {
    axios
      .get("http://localhost:3000/user", { withCredentials: true })
      .then(({ data }) => {
        userSet(data);
      });
  }, []);

  useEffect(() => {
    if (user) {
      graphQLClient
        .request(
          gql`{
            cart(user_id: ${user.id}) {
              price
              quantity
            }
          }`
        )
        .then(querySet);
    }
  }, [user]);

  return (
    <UserContext.Provider value={user}>
      {query && (
        <CartContext.Provider value={query}>
          <Header />
        </CartContext.Provider>
      )}

      <main>
        <Routes>
          <Route path="/" element={<Carousel />} />
          <Route path="user" element={<>{JSON.stringify(user)}</>} />
          <Route path="department/:id" element={<DepartmentCatalog />} />
          <Route
            path="department/:department_id/catalog/:id"
            element={<Catalog />}
          />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </main>
    </UserContext.Provider>
  );
}
