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

const E = styled.button`
  font-size: x-large;
  background-color: inherit;
  display: flex;
  align-items: center;

  @media only screen and (min-width: 1024px) {
    display: none;
  }
`;

const B = styled.div`
  display: flex;
  align-items: center;
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

export default function C({ children }: React.PropsWithChildren) {
  return (
    <>
      <F>
        <A>
          <B>
            <E>
              <RxHamburgerMenu color="white" />
            </E>

            <G>
              <Link href="/">
                <H src="/logo-small.png" alt="" className="logo-small" />
                <H src="/logo-large.svg" alt="" className=" logo-large" />
              </Link>
            </G>

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
