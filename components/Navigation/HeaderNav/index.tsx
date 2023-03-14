import styled from "styled-components";
import Account from "@/components/Navigation/HeaderNav/Account";
import Department from "@/components/Navigation/HeaderNav/Department";
import Searchbar from "@/components/Navigation/HeaderNav/Searchbar";
import Recommend from "@/components/Navigation/HeaderNav/Recommend";
import Logo from "@/components/Navigation/HeaderNav/Logo";
import Cart from "@/components/Navigation/HeaderNav/Cart";

const A = styled.nav`
  display: flex;
  align-items: center;
  justify-items: center;

  .logo-large {
    display: none;
  }

  @media only screen and (min-width: 1024px) {
    .logo-large {
      display: block;
    }

    .logo-small {
      display: none;
    }
  }

  @media only screen and (max-width: 1024px) {
    .logo-large {
      display: none;
    }

    .logo-small {
      display: block;
    }

    #departments {
      display: none;
    }

    #account {
      display: none;
    }
  }
`;

const B = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const F = styled.header`
  color: white;
  background-color: var(--WALMART-BLUE);
  padding: 1em;
  position: sticky;
  top: 0px;
  z-index: 900;
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

  &:hover {
    background-color: var(--WALMART-BLUE-DARK);
  }

  svg:first-child {
    padding-right: 6px;
  }
`;

export default function C({ sideMenuButton }) {
  return (
    <F>
      <A>
        <B>
          {sideMenuButton}
          <Logo />
          <Department />
          <Searchbar />
          <Account />
          <Cart />
        </B>

        <Recommend />
      </A>
    </F>
  );
}
