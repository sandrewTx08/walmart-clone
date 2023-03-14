import { NavItem } from "@/components/Navigation/HeaderNav";
import { HiOutlineUser } from "react-icons/hi";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { Li, Ul } from "@/components/List/List1";

export default function C() {
  const { data, status } = useSession();
  const [accountMenu, accountMenuSet] = useState(false);

  return (
    <div id="account">
      {status === "loading" ? (
        <>Loading...</>
      ) : (
        <NavItem
          onClick={() => {
            accountMenuSet(!accountMenu);
          }}
        >
          <HiOutlineUser style={{ fontSize: "large" }} />

          {status === "authenticated" ? (
            <div>
              <div>
                <b>Account</b>
              </div>
              {data.user?.name?.split(" ")[0]}

              {accountMenu && (
                <Ul className="shadow-soft">
                  <Li
                    onClick={() => {
                      signOut();
                    }}
                  >
                    Logout
                  </Li>
                </Ul>
              )}
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
      )}
    </div>
  );
}
