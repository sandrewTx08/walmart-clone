import { NavItem } from "@/components/Navigation/HeaderNav";
import { HiOutlineUser } from "react-icons/hi";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { Li, Ul } from "@/components/List/List1";

export default function C() {
  const { data, status } = useSession();
  const [accountMenu, accountMenuSet] = useState(false);

  return (
    <div id="account" style={{ position: "relative" }}>
      <NavItem
        onClick={() => {
          accountMenuSet(!accountMenu);
        }}
      >
        <HiOutlineUser style={{ fontSize: "large" }} />

        {status === "authenticated" ? (
          <div>
            <div style={{ fontSize: "small" }}>
              Hi {data.user?.name?.split(" ")[0]}
            </div>
            <div>
              <b>Account</b>
            </div>
          </div>
        ) : (
          <div
            onClick={() => {
              signIn();
            }}
          >
            <div>
              <b>Sign in</b>
            </div>
            Account
          </div>
        )}
      </NavItem>

      {status === "authenticated" && accountMenu && (
        <Ul className="shadow-soft">
          <Li>Account</Li>
          <Li
            onClick={() => {
              signOut();
            }}
          >
            Sign Out
          </Li>
        </Ul>
      )}
    </div>
  );
}
