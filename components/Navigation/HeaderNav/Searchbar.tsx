import styled from "styled-components";
import { TfiSearch } from "react-icons/tfi";
import { Ul, Li } from "@/components/List/List1";
import { useState } from "react";
import Link from "next/link";
import { Departments } from "@/departments";

const A = styled.input`
  width: 100%;
  padding: 10px;
  padding-right: 40px;
  border: 0 solid;
  border-radius: 20px;
`;

const B = styled.div`
  width: 100%;
  display: flex;
`;

const CC = styled.button`
  background-color: var(--WALMART-YALLOW);
  border: 0 solid;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-weight: bolder;
  position: absolute;
  right: 5px;
  top: 4px;
`;

const D = styled.ul``;

const E = styled.li``;

export default function C() {
  const [x, xs] = useState("");

  return (
    <B>
      <A
        onChange={({ target: { value } }) => {
          xs(value);
        }}
      />
      <div style={{ position: "relative" }}>
        <CC>
          <TfiSearch />
        </CC>
      </div>

      {x && (
        <Ul style={{ position: "absolute", top: 82 }} className="shadow-soft">
          {Object.entries(Departments)
            .filter(([name]) => {
              const n1 = name.toLowerCase();
              const n2 = x.toLowerCase();
              return n1 && n2.startsWith(n1[0]) && n1 !== n2;
            })
            .map(([alias, { id, name }]) => (
              <Li key={id}>
                <Link href={"/department/" + alias}>{name}</Link>
              </Li>
            ))}
        </Ul>
      )}
    </B>
  );
}
