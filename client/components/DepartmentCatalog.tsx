import { useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import DepartmentCatalogItem from "./DeparmentCatalogItem";
import { Query } from "../graphql-types";
import { MdOutlinePriceChange, MdOutlineStore } from "react-icons/md";
import { AiOutlineFire } from "react-icons/ai";
import { BsListStars } from "react-icons/bs";
import { graphQLClient } from "../graphql-client";
import styled from "styled-components";

const DepartmentCatalogHeader = styled.div`
  div {
    padding-bottom: 1em;
  }

  h1 {
    font-size: x-large;
  }

  span {
    color: grey;
    font-size: large;
    margin: 0 3px;
  }
`;

const DeparmentCatalogFilter = styled.div`
  button {
    border-radius: 4em;
    padding: 1em;
    color: white;
    margin: 1%;
    background-color: gray;
  }

  svg {
    margin: 0 3px;
  }
`;

export default function () {
  const { id } = useParams(),
    [query, querySet] = useState<Query>();

  useEffect(() => {
    graphQLClient
      .request(
        `{
          department(department_id: ${id}) {
            name
            _count
            catalog(limit: 40) {
              id
              price
              product_id
              Products {
                name
                ProductRates {
                  _count
                  rate
                  product_id
                }
              }
            }
          }
        }`
      )
      .then(querySet);
  }, [id]);

  useEffect(() => {
    if (query) {
      document.title = `${query.department.name} - Walmart.com`;
    }
  }, [query]);

  return (
    <Fragment>
      {query && (
        <div>
          <DepartmentCatalogHeader>
            <div>
              <h1>
                {query.department.name}
                <span>({query.department._count})</span>
              </h1>
            </div>

            <div>Buy online now</div>

            <DeparmentCatalogFilter>
              <button>
                <MdOutlinePriceChange />
                Prices
              </button>
              <button>
                <BsListStars />
                Brands
              </button>
              <button>
                <MdOutlineStore />
                Stores
              </button>
              <button>
                <AiOutlineFire />
                Most wanted
              </button>
            </DeparmentCatalogFilter>

            <hr />
          </DepartmentCatalogHeader>

          {<DepartmentCatalogItem query={query} />}
        </div>
      )}
    </Fragment>
  );
}
