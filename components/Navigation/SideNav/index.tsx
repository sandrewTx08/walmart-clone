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
  padding: 1em;
  position: absolute;
  z-index: 1000;
  background-color: white;
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
            <B
              onClick={() => {
                signOut();
              }}
            >
              Logout
            </B>
          ) : (
            <B
              onClick={() => {
                signIn();
              }}
            >
              Sign in
            </B>
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
