import styled from "styled-components";
import { HiOutlineUser } from "react-icons/hi";
import { HiArrowDownTray } from "react-icons/hi2";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { GrNext } from "react-icons/gr";
import { useState } from "react";
import { Departments } from "@/departments";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const A = styled.div`
  width: 180px;
  padding: 2em;
  position: fixed;
  z-index: 1000;
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const B = styled.div`
  svg {
    margin-right: 6px;
  }
`;

const E = styled.div`
  margin-top: 12px;
  margin-left: 24px;
`;

const CC = styled.hr`
  color: white;
`;

export default function C() {
  const [x, xs] = useState(false);
  const [x2, xs2] = useState(false);
  const { status } = useSession();

  return (
    <A className="shadow-soft" style={{ height: "100%" }}>
      <B
        onClick={() => {
          xs2(!x2);
        }}
      >
        <HiOutlineUser fontSize="large" />
        Account
        {x2 &&
          (status === "loading" ? (
            <>Loading...</>
          ) : status === "authenticated" ? (
            <E
              onClick={() => {
                signOut();
              }}
            >
              Logout
            </E>
          ) : (
            <E
              onClick={() => {
                signIn();
              }}
            >
              Sign in
            </E>
          ))}
      </B>

      <B>
        <Link href="/cart">
          <HiArrowDownTray fontSize="large" />
          My items
        </Link>
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
            <E>
              <Link href="/all-departments">
                <b>All departmets</b>
              </Link>
            </E>
            {Object.entries(Departments).map(([alias, { id, name }]) => (
              <E key={id}>
                <Link href={"/department/" + alias}>{name}</Link>
              </E>
            ))}
          </>
        )}
      </B>
    </A>
  );
}
