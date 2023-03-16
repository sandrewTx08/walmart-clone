import { SlArrowLeft } from "react-icons/sl";
import { Departments } from "@/departments";
import { Nav, NavHeader, NavItem } from "@/components/Navigation/SideNav";
import Link from "next/link";

export default function C({ state: [departmentMenu, departmentMenuSet] }) {
  return (
    <Nav className="shadow-soft">
      <NavHeader
        className="border-bottom-gray"
        style={{ paddingBottom: "16px" }}
        onClick={() => {
          departmentMenuSet(!departmentMenu);
        }}
      >
        <h2>
          <SlArrowLeft
            style={{
              fontSize: "medium",
              textAlign: "center",
              position: "relative",
              top: 1,
              right: 10,
            }}
          />
          Back to main menu
        </h2>
      </NavHeader>

      <NavItem style={{ padding: "1em", justifyContent: "space-between" }}>
        <h2>All departmets</h2>
        <Link href="/all-departments" style={{ textDecoration: "underline" }}>
          See all
        </Link>
      </NavItem>

      {Object.entries(Departments).map(([alias, { name }]) => (
        <Link href={"/department/" + alias} key={alias}>
          <NavItem style={{ color: "gray" }} className="border-top-gray">
            {name}
          </NavItem>
        </Link>
      ))}
    </Nav>
  );
}
