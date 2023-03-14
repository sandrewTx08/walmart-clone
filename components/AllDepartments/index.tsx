import { Departments } from "@/departments";
import Link from "next/link";
import styled from "styled-components";

const Ul = styled.ul``;

const Li = styled.li`
  padding: 1em;
  text-align: center;

  & :hover {
    text-decoration: underline;
  }
`;

export default function C() {
  return (
    <>
      <h1>Browse Departments</h1>

      <hr />
      <Ul>
        {Object.entries(Departments).map(([alias, { name, id }]) => (
          <Li key={id}>
            <Link href={"/department/" + alias}>{name}</Link>
          </Li>
        ))}
      </Ul>
    </>
  );
}
