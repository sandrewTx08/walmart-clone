import request, { gql } from "graphql-request";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Query } from "../graphql";

export default function () {
  const { id } = useParams(),
    [query, querySet] = useState<Query>();

  useEffect(() => {
    request(
      "http://localhost:3000/graphql",
      gql`
       {
        catalog(catalog_id: ${id}) {
          id
          price
          Products {
            name
            ProductRates {
              rate
              description
              User {
                first_name
              }
            }
            Brands {
              name
            }
          }
        }
       }
      `
    ).then(querySet);
  }, [id]);

  return <Fragment>{JSON.stringify(query)}</Fragment>;
}
