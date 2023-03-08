import { G } from "@/components/Navigation";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { useState } from "react";
import { Li, Ul } from "@/components/List/List1";
import { Departments } from "@/departments";
import Link from "next/link";

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
          <Li>
            <Link href="/all-departments">
              <b>All departmets</b>
            </Link>
          </Li>
          {Object.entries(Departments).map(([name]) => (
            <Li key={name}>
              <Link href={"/department/" + name.toLocaleLowerCase()}>
                {name}
              </Link>
            </Li>
          ))}
        </Ul>
      )}
    </div>
  );
}
