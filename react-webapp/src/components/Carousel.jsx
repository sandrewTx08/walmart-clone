// @ts-check

import React from "react";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
// @ts-ignore
import walmartLogo from "../asserts/walmartLogo.svg";

export default function () {
  return (
    <section className="carousel">
      <button className="carousel-button">
        <MdOutlineNavigateBefore />
      </button>
      <img src={walmartLogo} />
      <button className="carousel-button">
        <MdOutlineNavigateNext />
      </button>
    </section>
  );
}
