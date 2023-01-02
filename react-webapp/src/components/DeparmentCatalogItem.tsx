import { Fragment, PropsWithChildren } from "react";
import { StoreCatalog } from "../fetch/storeCatalog";

export default function (
  props: PropsWithChildren<{ storeCatalog: StoreCatalog[] }>
) {
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
                  (pv, ac) => pv + ac.rate,
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
