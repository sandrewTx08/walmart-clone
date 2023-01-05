import { Fragment, PropsWithChildren } from "react";
import { Query } from "../graphql";

export default function (props: PropsWithChildren<Query>) {
  return (
    <Fragment>
      {props.storeCatalog.map((catalog) => (
        <div className="department-catalog-item">
          <img src="/walmartLogoSmall.png" />
          <ul>
            <li>
              <div className="department-catalog-price">
                <b>${catalog.price}</b>
              </div>
              <div className="department-catalog-title">
                {catalog.Products.name}
              </div>
              <div className="department-catalog-rate">
                {catalog.Products.ProductRates.reduce(
                  (pv, ac) => pv + Number(ac.rate),
                  0
                ) / catalog.Products.ProductRates.length}
              </div>
            </li>
          </ul>
        </div>
      ))}
    </Fragment>
  );
}
