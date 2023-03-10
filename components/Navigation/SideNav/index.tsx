import styled from "styled-components";
import { HiOutlineUser } from "react-icons/hi";
import { HiArrowDownTray } from "react-icons/hi2";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { GrNext } from "react-icons/gr";
import { useState } from "react";
import { Departments } from "@/departments";
import Link from "next/link";

const A = styled.div`
  width: 180px;
  padding: 1em;
`;

const B = styled.div`
  padding: 6px;

  svg {
    margin-right: 6px;
  }
`;

const CC = styled.hr`
  color: white;
`;

export default function C() {
  const [x, xs] = useState(false);

  return (
    <A className="shadow-soft">
      <B>
        <HiOutlineUser fontSize="large" />
        Account
      </B>

      <B>
        <HiArrowDownTray fontSize="large" />
        My items
      </B>

      <CC />

      <B>
        <div
          style={{ display: "flex" }}
          onClick={() => {
            xs(!x);
          }}
        >
          <div>
            <HiOutlineSquares2X2 />
            Departments
          </div>

          <div style={{ marginLeft: "auto" }}>
            <GrNext />
          </div>
        </div>

        {x && (
          <>
            {Object.entries(Departments).map(([name]) => (
              <B key={name}>
                <Link href={"/department/" + name.toLowerCase()}>{name}</Link>
              </B>
            ))}
          </>
        )}
      </B>
    </A>
  );
}
