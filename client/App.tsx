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

export function useUser() {
  const [user, userSet] = useState<Users & { auth: boolean }>(),
    [cart, cartAPISet] = useState<CartAPI>(),
    [query, querySet] = useState<Query>();

  function userRequest() {
    axios
      .get("http://localhost:3000/user", { withCredentials: true })
      .then(({ data }) => {
        userSet(data);
        const c = new CartAPI(data.id);
        cartAPISet(c);
        c.cartGet().then((value) => {
          querySet(value);
        });
      });
  }

  useEffect(userRequest, []);

  function Logout() {
    useEffect(() => {
      axios
        .delete("http://localhost:3000/logout", {
          withCredentials: true,
        })
        .then(({ data }) => {
          if (data.success) {
            userRequest();
          }
        });
    }, []);

    return <Navigate to="/" />;
  }

  return { user, querySet, cart, query, Logout };
}

export default function () {
  document.title = "Walmart.com";

  const [queryDepartment, queryDepartmentSet] = useState<Query>(),
    {
      user,
      cart: cartAPI,
      Logout,
      querySet: queryCartSet,
      query: queryCart,
    } = useUser();

  useEffect(() => {
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
