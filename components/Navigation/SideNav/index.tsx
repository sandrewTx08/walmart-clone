import styled from "styled-components";
import { useState } from "react";
import DepartmentNav from "@/components/Navigation/SideNav/Department";
import SideNav from "@/components/Navigation/SideNav/SideNav1";

export const Nav = styled.div`
  padding: 1em;
  width: 240px;
  position: fixed;
  z-index: 1000;
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 1em;
  height: 100%;
  font-size: smaller;

  @media only screen and (min-width: 1024px) {
    display: none;
  }
`;

export const NavItem = styled.div`
  padding-top: 14px;
  display: flex;
  align-items: center;

  svg {
    position: relative;
    bottom: 3px;
    margin-right: 8px;
    width: 20px;
  }
`;

export const NavHeader = styled.div`
  padding-top: 28px;
  display: flex;
  align-items: center;
  padding-left: 1em;
`;

export default function C() {
  const state = useState(false);
  return state[0] ? <DepartmentNav state={state} /> : <SideNav state={state} />;
}
