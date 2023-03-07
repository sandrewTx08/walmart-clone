import { G } from "@/components/Navigation";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { useState } from "react";
import { Li, Ul } from "@/components/List/List1";

export default function C() {
  const [x, xs] = useState(false);

  return (
    <div>
      <G
        style={{ fontSize: "large" }}
        onClick={() => {
          xs(!x);
        }}
      >
        <HiOutlineSquares2X2 />
        Department
      </G>
      {x && (
        <Ul className="shadow-soft">
          <Li>123</Li>
          <Li>432543</Li>
          <Li>45654</Li>
        </Ul>
      )}
    </div>
  );
}
