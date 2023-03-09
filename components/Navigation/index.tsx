import Link from "next/link";
import styled from "styled-components";
import Account from "@/components/Navigation/Account";
import Department from "@/components/Navigation/Department";
import Searchbar from "@/components/Navigation/Searchbar";
import Recommend from "@/components/Navigation/Recommend";
import Cart from "@/components/Navigation/Cart";
import SideNav from "@/components/Navigation/SideNav";
import { RxHamburgerMenu } from "react-icons/rx";

const H = styled.img`
  display: block;
  width: auto;
  height: 2em;
`;

const A = styled.nav`
  display: flex;
  align-items: center;

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
  }
`;

const E = styled.button`
  font-size: x-large;
  background-color: inherit;
  display: flex;
  align-items: center;

  @media only screen and (min-width: 1024px) {
    display: none;
  }
`;

const B = styled.ul`
  display: flex;
  align-items: center;
  gap: 2em;
  width: 100%;
`;

const D = styled.div``;

const M = styled.main`
  padding: 1em;
`;

const F = styled.header`
  color: white;
  background-color: var(--WALMART-BLUE);
  padding: 1em;
`;

export const G = styled.li`
  display: flex;
  align-items: center;

  svg:first-child {
    padding-right: 6px;
  }
`;

export default function C({ children }: React.PropsWithChildren) {
  return (
    <>
      <F>
        <A>
          <B>
            <E>
              <RxHamburgerMenu color="white" />
            </E>

            <Link href="/">
              <G>
                <H className="logo-small" src="/logo-small.png" alt="" />
                <H className="logo-large" src="/logo-large.svg" alt="" />
              </G>
            </Link>

            <Department />

            <Searchbar />

            <Account />

            <Cart />
          </B>

          <Recommend />
        </A>
      </F>

      <D>
        <SideNav />

        <M>{children}</M>
      </D>
    </>
  );
}
