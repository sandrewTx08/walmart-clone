// @ts-check

import React from "react";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";

export default function () {
  return (
    <section className="carousel">
      <button className="carousel-button">
        <MdOutlineNavigateBefore />
      </button>
      <img src="/walmartLogoMedium.svg" />
      <button className="carousel-button">
        <MdOutlineNavigateNext />
      </button>
    </section>
  );
}
