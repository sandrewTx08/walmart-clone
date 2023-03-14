import { NavItem } from "@/components/Navigation/HeaderNav";
import Link from "next/link";
import styled from "styled-components";

const Img = styled.img`
  display: block;
  width: auto;
  height: 2em;
`;

export default function C() {
  return (
    <NavItem>
      <Link href="/">
        <Img src="/logo-small.png" alt="" className="logo-small" />
        <Img src="/logo-large.svg" alt="" className="logo-large" />
      </Link>
    </NavItem>
  );
}
