import { useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import DepartmentCatalogItem from "./DeparmentCatalogItem";
import { Query } from "../graphql-types";
import { MdOutlinePriceChange, MdOutlineStore } from "react-icons/md";
import { AiOutlineFire } from "react-icons/ai";
import { BsListStars } from "react-icons/bs";
import { graphQLClient } from "../graphql-client";

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

  return (
    <Fragment>
      {query && (
        <div>
          <div className="department-catalog-header">
            <div>
              <h1>
                {query.department.name}
                <span>({query.department._count})</span>
              </h1>
            </div>

            <div>Buy online now</div>

            <div className="department-catalog-filter">
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
            </div>

            <hr />
          </div>

          {<DepartmentCatalogItem query={query} />}
        </div>
      )}
    </Fragment>
  );
}
