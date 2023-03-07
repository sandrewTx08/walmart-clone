"use client";

import { G } from ".";
import { BsCart2 } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/contexts/Cart";

export default function C() {
  const [state] = useContext(CartContext);
  const [x, xs] = useState(false);

  // Depen "total" bug
  useEffect(() => {
    setInterval(() => {
      xs(!x);
    }, 1000);
  }, [x]);

  return (
    <G>
      <BsCart2 style={{ fontSize: "large" }} />
      <div>{state.total}$</div>
    </G>
  );
}
