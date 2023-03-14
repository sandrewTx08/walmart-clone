import styled from "styled-components";
import SideNav from "@/components/Navigation/SideNav";
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

const Container = styled.div`
  height: 100%;
  display: flex;
`;

const ContentWrapper = styled.main`
  padding: 1em;
  max-width: 1024px;
  min-height: 1024px;
  margin: auto;
`;

const Wrapper = styled.div`
  width: 100%;
  position: relative;
`;

export default function C({ children }: React.PropsWithChildren) {
  const [sideMenu, sideMenuSet] = useState(false);

  return (
    <Container>
      {sideMenu && <SideNav />}

      <Wrapper>
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

        <ContentWrapper
          onClick={() => {
            sideMenuSet(false);
          }}
        >
          {children}
        </ContentWrapper>
      </Wrapper>
    </Container>
  );
}
