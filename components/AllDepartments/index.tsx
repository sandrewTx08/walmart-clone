import { Departments } from "@/departments";
import Link from "next/link";
import styled from "styled-components";

const A = styled.ul``;

const B = styled.li`
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
      <A>
        {Object.entries(Departments).map(([name, id]) => (
          <B key={id}>
            <Link href={"/department/" + name.toLocaleLowerCase()}>{name}</Link>
          </B>
        ))}
      </A>
    </>
  );
}
