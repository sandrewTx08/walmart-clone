import styled from "styled-components";
import { SlArrowRight, SlArrowDown } from "react-icons/sl";
import { useState, useReducer } from "react";
import { Li, Ul } from "@/components/List/List1";
import { useRouter } from "next/router";

const BrandNotSelectedButton = styled.button`
  background-color: gray;
  color: white;
  padding: 6px 12px;
  border-radius: 2em;
  font-weight: bold;
`;

const BrandSelectedButton = styled(BrandNotSelectedButton)`
  background-color: black;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 1em;
  border-bottom: 1px solid lightgray;
`;

const BrandButton = styled.div`
  background-color: white;
  border-radius: 2em;
`;

const BrandMenuList = styled.ul`
  padding: 1em;

  li:last-child {
    border-bottom: 1px solid lightgray;
  }
`;

const BrandMenuItem = styled.li`
  display: flex;
  padding: 3px;
`;

const BrandItemCheckbox = styled.input`
  margin-right: 12px;
`;

const BrandMenuWrapper = styled.div`
  position: absolute;
  background-color: white;
  border-radius: 1em;
  z-index: 900;
  width: 300px;
`;

const BrandMenuClear = styled.div`
  text-decoration: underline;
  text-align: center;
  padding-bottom: 1em;
  cursor: pointer;

  &:hover {
    text-decoration: none;
  }
`;

const BrandProductCount = styled.span`
  color: gray;
  margin-left: auto;
`;

export default function C({ brands, brandsCount }) {
  const router = useRouter();
  const [brandMenu, brandMenuSet] = useState(false);
  const [sortMenu, sortMenuSet] = useState(false);
  const [brandSelects, xs2] = useReducer(
    (state, action: { type: "CHECK" | "UNCHECK" | "CLEAR"; payload }) => {
      switch (action.type) {
        case "CHECK": {
          state.findIndex((id) => action.payload.id === id) === -1 &&
            state.push(action.payload.id);
          break;
        }

        case "UNCHECK": {
          state = state.filter((id) => action.payload.id !== id);
          if (state.length <= 0) state = [];
          break;
        }

        case "CLEAR": {
          state = [];
          break;
        }
      }

      router.query.brands = state;
      router.push(router);
      return state;
    },
    router.query.brands ? brands.map(({ id }) => id) : []
  );

  return (
    <Wrapper>
      <BrandButton
        onClick={() => {
          brandMenuSet(!brandMenu);
          sortMenuSet(false);
        }}
      >
        {brandSelects.length > 0 ? (
          <BrandSelectedButton>
            Brand ({brandSelects.length})
          </BrandSelectedButton>
        ) : (
          <BrandNotSelectedButton>Brand</BrandNotSelectedButton>
        )}

        {brandMenu && (
          <BrandMenuWrapper className="shadow-soft">
            <BrandMenuList>
              {brandsCount.map((brand) => (
                <BrandMenuItem key={brand.id}>
                  <BrandItemCheckbox
                    type="checkbox"
                    defaultChecked={brandSelects.find((id) => brand.id == id)}
                    onChange={(event) => {
                      if (event.target.checked === true) {
                        xs2({ type: "CHECK", payload: brand });
                      } else if (event.target.checked === false) {
                        xs2({ type: "UNCHECK", payload: brand });
                      }
                    }}
                  />
                  {brand.name}

                  <BrandProductCount>{brand._count.Products}</BrandProductCount>
                </BrandMenuItem>
              ))}
            </BrandMenuList>

            <BrandMenuClear
              onClick={() => {
                xs2({ type: "CLEAR", payload: {} });
              }}
            >
              Clear
            </BrandMenuClear>
          </BrandMenuWrapper>
        )}
      </BrandButton>

      <div
        onClick={() => {
          sortMenuSet(!sortMenu);
          brandMenuSet(false);
        }}
      >
        <b>Sort by</b>
        <span style={{ position: "relative", top: 4, marginLeft: 12 }}>
          {sortMenu ? <SlArrowDown /> : <SlArrowRight />}
        </span>

        {sortMenu && (
          <Ul className="shadow-soft" style={{ zIndex: 900 }}>
            <Li
              onClick={() => {
                router.query.sortByPrice = "desc";
                router.push(router);
              }}
            >
              Price high
            </Li>
            <Li
              onClick={() => {
                router.query.sortByPrice = "asc";
                router.push(router);
              }}
            >
              Price low
            </Li>
          </Ul>
        )}
      </div>
    </Wrapper>
  );
}
