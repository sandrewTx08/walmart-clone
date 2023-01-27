import { useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { Query } from "../graphql-types";
import { MdOutlinePriceChange, MdOutlineStore } from "react-icons/md";
import { AiOutlineFire } from "react-icons/ai";
import { BsListStars } from "react-icons/bs";
import { graphQLClient } from "../graphql-client";
import styled from "styled-components";
import CatalogCard from "./CatalogCard";
import DropdownList from "./DropdownList";

const DepartmentCatalogHeader = styled.div`
  div {
    padding-bottom: 1em;
  }

  font-size: x-large;

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
    [query, querySet] = useState<Query>(),
    [brandFilterMenu, brandFilterMenuSet] = useState(false),
    [filters, filtersSet] = useState({
      brand_id: undefined,
      department_id: Number(id),
    });

  useEffect(() => {
    graphQLClient
      .request(
        `query Query($department_id: Int!, $brand_id: Int) {
          productBrands(department_id: $department_id) {
            name
            id
          }
          department(department_id: $department_id) {
            name
            _count
            catalog(limit: 40, brand_id: $brand_id) {
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
        }`,
        filters
      )
      .then(querySet);
  }, [id, filters]);

  useEffect(() => {
    if (query) {
      document.title = `${query.department.name} - Walmart.com`;
    }
  }, [query]);

  return (
    query && (
      <Fragment>
        <DepartmentCatalogHeader>
          {query.department.name}
          <span>({query.department._count})</span>
        </DepartmentCatalogHeader>

        <div>Buy online now</div>

        <DeparmentCatalogFilter>
          <button>
            <MdOutlinePriceChange />
            Prices
          </button>
          <button
            onClick={() => {
              brandFilterMenuSet(!brandFilterMenu);
            }}
          >
            <BsListStars />
            Brands
            {brandFilterMenu && (
              <DropdownList
                list={query.productBrands.map(({ id, name }) => ({
                  href: "",
                  text: name,
                  id,
                }))}
                onClick={(item) => {
                  filtersSet({ ...filters, brand_id: item.id });
                }}
              />
            )}
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

        <section>
          <CatalogCard query={query} />
        </section>
      </Fragment>
    )
  );
}
