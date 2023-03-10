import { NavItem } from "@/components/Navigation/HeaderNav";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { useState } from "react";
import { Li, Ul } from "@/components/List/List1";
import { Departments } from "@/departments";
import Link from "next/link";

export default function C() {
  const [departmentMenu, departmentMenuSet] = useState(false);

  return (
    <div id="departments">
      <NavItem
        style={{ fontSize: "large", fontWeight: "bold" }}
        onClick={() => {
          departmentMenuSet(!departmentMenu);
        }}
      >
        <HiOutlineSquares2X2
          fontSize="x-large"
          style={{ position: "relative", bottom: 2 }}
        />
        Department
      </NavItem>
      {departmentMenu && (
        <Ul className="shadow-soft">
          <Li>
            <Link href="/all-departments">
              <b>All departmets</b>
            </Link>
          </Li>
          {Object.entries(Departments).map(([alias, { name, id }]) => (
            <Li key={id}>
              <Link href={"/department/" + alias}>{name}</Link>
            </Li>
          ))}
        </Ul>
      )}
    </div>
  );
}
