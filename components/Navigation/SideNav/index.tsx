import styled from "styled-components";
import { HiOutlineUser } from "react-icons/hi";
import { HiArrowDownTray } from "react-icons/hi2";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { GrNext } from "react-icons/gr";
import { useState } from "react";
import { Departments } from "@/departments";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const Nav = styled.div`
  width: 180px;
  padding: 2em;
  position: fixed;
  z-index: 1000;
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 18px;
  height: 100%;

  @media only screen and (min-width: 1024px) {
    display: none;
  }
`;

const NavItem = styled.div`
  svg {
    margin-right: 6px;
  }
`;

const NavSubItem = styled.div`
  margin-top: 12px;
  margin-left: 24px;
`;

const Hr = styled.hr`
  color: white;
`;

export default function C() {
  const [departmentMenu, departmentMenuSet] = useState(false);
  const [x2, xs2] = useState(false);
  const { status } = useSession();

  return (
    <Nav className="shadow-soft">
      <NavItem
        onClick={() => {
          xs2(!x2);
        }}
      >
        <HiOutlineUser fontSize="large" />
        Account
        {x2 &&
          (status === "loading" ? (
            <>Loading...</>
          ) : status === "authenticated" ? (
            <NavSubItem
              onClick={() => {
                signOut();
              }}
            >
              Logout
            </NavSubItem>
          ) : (
            <NavSubItem
              onClick={() => {
                signIn();
              }}
            >
              Sign in
            </NavSubItem>
          ))}
      </NavItem>

      <NavItem>
        <Link href="/cart">
          <HiArrowDownTray fontSize="large" />
          My items
        </Link>
      </NavItem>

      <Hr />

      <NavItem>
        <div
          style={{ display: "flex" }}
          onClick={() => {
            departmentMenuSet(!departmentMenu);
          }}
        >
          <div>
            <HiOutlineSquares2X2 />
            Departments
          </div>

          <div style={{ marginLeft: "auto" }}>
            <GrNext />
          </div>
        </div>

        {departmentMenu && (
          <>
            <NavSubItem>
              <Link href="/all-departments">
                <b>All departmets</b>
              </Link>
            </NavSubItem>
            {Object.entries(Departments).map(([alias, { name }]) => (
              <NavSubItem key={alias}>
                <Link href={"/department/" + alias}>{name}</Link>
              </NavSubItem>
            ))}
          </>
        )}
      </NavItem>
    </Nav>
  );
}
