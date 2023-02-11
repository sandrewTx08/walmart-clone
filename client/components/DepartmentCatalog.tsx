import { useParams, useSearchParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { Query } from "../graphql-types";
import { MdOutlinePriceChange, MdOutlineStore } from "react-icons/md";
import { AiOutlineFire } from "react-icons/ai";
import { BsListStars, BsList } from "react-icons/bs";
import { graphQLClient } from "../graphql-client";
import styled from "styled-components";
import CatalogCard from "./CatalogCard";
import DropdownList from "./DropdownList";
import PaginationNavigation from "./PaginationNavigation";

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
    [storeFilterMenu, storeFilterMenuSet] = useState(false),
    [sortByMenu, sortByMenuSet] = useState(false),
    [searchParams] = useSearchParams(),
    [filters, filtersSet] = useState({
      brand_id: Number(searchParams.get("brand_id")) || undefined,
      store_id: Number(searchParams.get("store_id")) || undefined,
      price_sort: searchParams.get("price_sort") || undefined,
      department_id: Number(id),
      page: Number(searchParams.get("page")) || 1,
    });

  useEffect(() => {
    filtersSet({
      ...filters,
      department_id: Number(id),
      page: Number(searchParams.get("page")) || 1,
    });
  }, [id, searchParams.get("page")]);

  useEffect(() => {
    graphQLClient
      .request(
        `query Query($department_id: Int!, $brand_id: Int, $store_id: Int, $price_sort: OrderBy, $page: Int) {
          productBrands(department_id: $department_id) {
            name
            id
          }
          stores {
            id
            name
          }
          department(department_id: $department_id) {
            name
            _count
            catalog(page: $page, limit: 12, brand_id: $brand_id, store_id: $store_id, price_sort: $price_sort) {
              id
              price
              currency_price
              product_id
              totalPages
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
  }, [filters]);

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
          <button
            onClick={() => {
              storeFilterMenuSet(!storeFilterMenu);
            }}
          >
            <MdOutlineStore />
            Stores
            {storeFilterMenu && (
              <DropdownList
                list={query.stores.map(({ id, name }) => ({
                  href: "",
                  text: name,
                  id,
                }))}
                onClick={(item) => {
                  filtersSet({ ...filters, store_id: item.id });
                }}
              />
            )}
          </button>
          <button>
            <AiOutlineFire />
            Most wanted
          </button>
          <button
            onClick={() => {
              sortByMenuSet(!sortByMenu);
            }}
          >
            <BsList />
            Sort by
            {sortByMenu && (
              <DropdownList
                list={[
                  { href: "", text: "Price high", sort: "desc" },
                  { href: "", text: "Price low", sort: "asc" },
                ]}
                onClick={(item) => {
                  filtersSet({ ...filters, price_sort: item.sort });
                }}
              />
            )}
          </button>
        </DeparmentCatalogFilter>

        <hr />

        <CatalogCard query={query} />

        <PaginationNavigation
          totalPages={query.department.catalog[0]?.totalPages || 1}
          page={filters.page}
        />
      </Fragment>
    )
  );
}
