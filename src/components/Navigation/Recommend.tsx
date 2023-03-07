import Link from "next/link";
import styled from "styled-components";

const CC = styled.ul`
  display: flex;
  align-items: center;
`;

const L = styled.li``;

export default function C() {
  return (
    <CC>
      <Link href="/">
        <L></L>
      </Link>

      <Link href="/">
        <L></L>
      </Link>

      <Link href="/">
        <L></L>
      </Link>
    </CC>
  );
}
