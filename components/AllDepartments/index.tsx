import { allDepartments } from "@/departments";
import Link from "next/link";
import styled from "styled-components";

const Ul = styled.ul`
  display: flex;
`;

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
        {allDepartments().map(
          ([alias, o]) =>
            o.id && (
              <Li key={alias}>
                <Link href={"/department/" + alias}>{o.name}</Link>
              </Li>
            )
        )}
      </Ul>
    </>
  );
}
