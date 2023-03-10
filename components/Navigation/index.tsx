import styled from "styled-components";
import SideNav from "@/components/Navigation/SideNav";
import HeaderNav from "@/components/Navigation/HeaderNav";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";

const E = styled.button`
  font-size: x-large;
  background-color: inherit;
  display: flex;
  align-items: center;

  @media only screen and (min-width: 1024px) {
    display: none;
  }
`;

const D = styled.div`
  height: 100%;
  display: flex;
`;

const M = styled.main`
  padding: 1em;
`;

const N = styled.div`
  width: 100%;
`;

const P = styled.div`
  @media only screen and (min-width: 1024px) {
    display: none;
  }
`;

export default function C({ children }: React.PropsWithChildren) {
  const [x, xs] = useState(false);

  return (
    <D>
      <P>{x && <SideNav />}</P>

      <N>
        <HeaderNav
          sideMenuButton={
            <E
              onClick={() => {
                xs(!x);
              }}
            >
              <RxHamburgerMenu color="white" />
            </E>
          }
        />

        <M>{children}</M>
      </N>
    </D>
  );
}
