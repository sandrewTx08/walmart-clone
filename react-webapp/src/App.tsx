import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Carousel from "./components/Carousel";
import DepartmentCatalog from "./components/DepartmentCatalog";
import "./styles/variables.css";
import "./styles/Navbar.css";
import "./styles/Header.css";
import "./styles/Carousel.css";
import "./styles/Searchbar.css";
import "./styles/DropdownList.css";
import "./styles/DepartmentCatalog.css";
import "./styles/index.css";

export default function () {
  return (
    <React.Fragment>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Carousel />} />
          <Route path="department/:id" element={<DepartmentCatalog />} />
        </Routes>
      </main>
    </React.Fragment>
  );
}
