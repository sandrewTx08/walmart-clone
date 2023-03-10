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

export const G = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
  padding: 0 1em;
  border: 0 solid;
  border-radius: 2em;
  border-bottom: 0;
  border-top: 0;
  cursor: pointer;
  height: 50px;

  &.disable-hover:hover {
    background-color: inherit;
  }

  &:hover {
    background-color: var(--WALMART-BLUE-DARK);
  }

  svg:first-child {
    padding-right: 6px;
  }
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
