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

export const Cart = createContext<any[]>(undefined);

export default function () {
  const [a, ass] = useState<any>();

  useEffect(() => {
    axios
      .get("http://localhost:3000/user", { withCredentials: true })
      .then(({ data }) => ass(data));
  }, []);

  return (
    <Fragment>
      <Cart.Provider
        value={[
          { product_id: 1, price: 4.29, quantity: 2 },
          { product_id: 2, price: 1.14, quantity: 8 },
          { product_id: 3, price: 7.52, quantity: 18 },
        ]}
      >
        <Header />

        <main>
          <Routes>
            <Route path="/" element={<Carousel />} />
            <Route path="/user" element={<>{JSON.stringify(a)}</>} />
            <Route path="department/:id" element={<DepartmentCatalog />} />
            <Route path="catalog/:id" element={<Catalog />} />
          </Routes>
        </main>
      </Cart.Provider>
    </Fragment>
  );
}
