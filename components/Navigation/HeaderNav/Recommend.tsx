import Link from "next/link";
import styled from "styled-components";

const Ul = styled.ul`
  display: flex;
  align-items: center;
`;

const Li = styled.li``;

export default function C() {
  return (
    <Ul>
      <Li>
        <Link href="/"></Link>
      </Li>

      <Li>
        <Link href="/"></Link>
      </Li>

      <Li>
        <Link href="/"></Link>
      </Li>
    </Ul>
  );
}
