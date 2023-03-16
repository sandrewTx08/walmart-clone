import { HiOutlineUser } from "react-icons/hi";
import { HiArrowDownTray, HiOutlineSquares2X2 } from "react-icons/hi2";
import { VscSignOut } from "react-icons/vsc";
import Link from "next/link";
import { NavItem, Nav, NavHeader } from "@/components/Navigation/SideNav";
import { GrNext } from "react-icons/gr";
import { signIn, signOut, useSession } from "next-auth/react";
import styled from "styled-components";

const Img = styled.img`
  width: 40px;
  height: auto;
  display: inline-block;
  padding-right: 1em;
`;

const SignInButton = styled.button`
  background-color: var(--WALMART-BLUE);
  display: inline;
  border-radius: 2em;
  padding: 6px 12px;
  font-weight: bold;
  color: white;
`;

export default function C({ state: [departmentMenu, departmentMenuSet] }) {
  const { status, data } = useSession();

  return (
    <Nav className="shadow-soft">
      <NavHeader>
        <Img src="/logo-small.png" />
        {status === "authenticated" ? (
          <h2>Hi {data.user.name.split(" ")[0]}</h2>
        ) : (
          <SignInButton
            onClick={() => {
              signIn();
            }}
          >
            Sign in or create account
          </SignInButton>
        )}
      </NavHeader>

      <Link href="/account">
        <NavItem>
          <HiOutlineUser fontSize="large" />
          Account
        </NavItem>
      </Link>

      <Link href="/cart">
        <NavItem className="border-top-gray">
          <HiArrowDownTray fontSize="large" />
          My items
        </NavItem>
      </Link>

      <NavItem
        className="border-top-gray"
        onClick={() => {
          departmentMenuSet(!departmentMenu);
        }}
      >
        <HiOutlineSquares2X2 />
        Departments
        <GrNext
          style={{ position: "relative", bottom: 1, marginLeft: "auto" }}
        />
      </NavItem>

      {status === "authenticated" && (
        <NavItem
          className="border-top-gray"
          onClick={() => {
            signOut();
          }}
        >
          <VscSignOut />
          Sign out
        </NavItem>
      )}
    </Nav>
  );
}
