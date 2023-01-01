// @ts-check

import { useParams } from "react-router-dom";
import { request, gql } from "graphql-request";
import React from "react";

export default function () {
  const { id } = useParams(),
    [fetch, fetchSet] = React.useState(() => {
      /**
       * @type {import('../fetch/departments').Data=}
       */
      let initialState;
      return initialState;
    });

  React.useEffect(() => {
    request(
      "http://localhost:3000/graphql",
      gql`
        {
          storeCatalog(limit: 50, department_id: ${id}, store_id: 1) {
            id
            price
          }
        }
      `
    ).then(fetchSet);
  }, [id]);

  return <h1>{JSON.stringify(fetch)}</h1>;
}
