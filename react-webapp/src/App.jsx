// @ts-check

import React from "react";

import Header from "./components/Header";
import Carousel from "./components/Carousel";
import DepartmentCatalog from "./components/DepartmentCatalog";

import "./styles/var.css";
import "./styles/Navbar.css";
import "./styles/Header.css";
import "./styles/Carousel.css";
import "./styles/Searchbar.css";
import "./styles/DropdownList.css";
import "./styles/Departments.css";
import "./styles/DepartmentCatalog.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <div className="main">
              <Carousel />
            </div>
          }
        />
        <Route path="department/:id" element={<DepartmentCatalog />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
