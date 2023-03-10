import { G } from "@/components/Navigation/HeaderNav";
import Link from "next/link";
import styled from "styled-components";

const H = styled.img`
  display: block;
  width: auto;
  height: 2em;
`;

export default function C() {
  return (
    <G>
      <Link href="/">
        <H src="/logo-small.png" alt="" className="logo-small" />
        <H src="/logo-large.svg" alt="" className=" logo-large" />
      </Link>
    </G>
  );
}
