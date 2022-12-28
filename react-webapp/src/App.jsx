// @ts-check

import React from "react";

import Header from "./components/Header";
import Carousel from "./components/Carousel";

import "./styles/var.css";
import "./styles/Navbar.css";
import "./styles/Header.css";
import "./styles/Carousel.css";
import "./styles/Searchbar.css";
import "./styles/Departments.css";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <Header />

      <div className="main">
        <Carousel />
      </div>
    </React.Fragment>
  );
}

export default App;
