import styled from "styled-components";
import { SlArrowRight, SlArrowDown } from "react-icons/sl";
import { useState, useReducer } from "react";
import { Li, Ul } from "@/components/List/List1";
import { useRouter } from "next/router";

const F = styled.button`
  background-color: gray;
  color: white;
  padding: 6px 12px;
  border: 0 solid;
  border-radius: 2em;
`;

const A = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 1em;
  border-bottom: 1px solid lightgray;
`;

const B = styled.div`
  background-color: white;
  border: 0 solid;
  border-radius: 2em;
`;

const CC = styled.ul`
  padding: 1em;

  li:last-child {
    border-bottom: 1px solid lightgray;
  }
`;

const D = styled.li`
  display: flex;
  padding: 3px;
`;

const E = styled.input`
  margin-right: 12px;
`;

const G = styled.div`
  position: absolute;
  background-color: white;
  border: 0 solid;
  border-radius: 1em;
  z-index: 900;
  width: 300px;
`;

const H = styled.div`
  text-decoration: underline;
  text-align: center;
  padding-bottom: 1em;
  cursor: pointer;

  &:hover {
    text-decoration: none;
  }
`;

const I = styled.span`
  color: gray;
  margin-left: auto;
`;

export default function C({ brands, brandsCount }) {
  const router = useRouter();
  const [x, xs] = useState(false);
  const [x1, xs1] = useState(false);
  const [x2, xs2] = useReducer(
    (state, action: { type: "CHECK" | "UNCHECK" | "CLEAR"; payload }) => {
      switch (action.type) {
        case "CHECK": {
          state.findIndex((id) => action.payload.id === id) === -1 &&
            state.push(action.payload.id);
          break;
        }

        case "UNCHECK": {
          state = state.filter((id) => action.payload.id === id);
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
    brands.map(({ id }) => id)
  );

  return (
    <A>
      <B>
        <F
          onClick={() => {
            xs(!x);
            xs1(false);
          }}
        >
          Brand
        </F>

        {x && (
          <G className="shadow-soft">
            <div>
              <CC>
                {brandsCount.map((brand) => (
                  <D key={brand.id}>
                    <E
                      type="checkbox"
                      defaultChecked={!x2.find((id) => brand.id === id)}
                      onChange={(event) => {
                        if (event.target.checked) {
                          xs2({ type: "CHECK", payload: brand });
                        } else {
                          xs2({ type: "UNCHECK", payload: brand });
                        }
                      }}
                    />
                    {brand.name}

                    <I>{brand._count.Products}</I>
                  </D>
                ))}
              </CC>

              <H
                onClick={() => {
                  xs2({ type: "CLEAR", payload: {} });
                }}
              >
                Clear
              </H>
            </div>
          </G>
        )}
      </B>

      <div
        onClick={() => {
          xs1(!x1);
          xs(false);
        }}
      >
        <b>Sort by</b>
        <span style={{ position: "relative", top: 4, marginLeft: 12 }}>
          {x1 ? <SlArrowDown /> : <SlArrowRight />}
        </span>

        {x1 && (
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
    </A>
  );
}
