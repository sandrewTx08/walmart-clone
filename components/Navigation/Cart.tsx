import { G } from ".";
import { BsCart2 } from "react-icons/bs";
import { useContext } from "react";
import { CartContext } from "@/contexts/Cart";

export default function C() {
  const [state] = useContext(CartContext);

  return (
    <G>
      <BsCart2 style={{ fontSize: "large" }} />
      <div>{state.total}$</div>
    </G>
  );
}
