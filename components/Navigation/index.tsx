import styled from "styled-components";
import SideNav from "@/components/Navigation/SideNav";
import Footer from "@/components/Footer";
import HeaderNav from "@/components/Navigation/HeaderNav";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";

const SideMenuButton = styled.button`
  font-size: x-large;
  background-color: inherit;
  display: flex;
  align-items: center;

  @media only screen and (min-width: 1024px) {
    display: none;
  }
`;

const Wrapper = styled.main`
  padding: 1em;
  max-width: 1024px;
  min-height: 1024px;
  margin: auto;
`;

export default function C({ children }: React.PropsWithChildren) {
  const [sideMenu, sideMenuSet] = useState(false);

  return (
    <>
      {sideMenu && <SideNav />}

      <HeaderNav
        sideMenuButton={
          <SideMenuButton
            onClick={() => {
              sideMenuSet(!sideMenu);
            }}
          >
            <RxHamburgerMenu color="white" />
          </SideMenuButton>
        }
      />

      <Wrapper
        onClick={() => {
          sideMenuSet(false);
        }}
      >
        {children}
      </Wrapper>

      <Footer />
    </>
  );
}
