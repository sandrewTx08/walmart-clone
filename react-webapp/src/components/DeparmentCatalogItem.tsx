import { Fragment, PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { Query } from "../graphql";
import Starrate from "./Starrate";

export default function (props: PropsWithChildren<{ query: Query }>) {
  return (
    <Fragment>
      {props.query.department.catalog.map((catalog) => (
        <Link to={"/catalog/" + catalog.id}>
          <div className="department-catalog-item">
            <img src="/walmartLogoSmall.png" />
            <div className="department-catalog-price">
              <b>${catalog.price}</b>
            </div>
            <div className="department-catalog-title">
              {catalog.Products.name}
            </div>
            <div className="department-catalog-rate">
              <Starrate
                rate={
                  catalog.Products.ProductRates.reduce(
                    (p, a) => p + Number(a.rate),
                    0
                  ) /
                  catalog.Products.ProductRates.find(
                    (p) => p.product_id == catalog.product_id
                  )?._count
                }
              />
              {
                catalog.Products.ProductRates.find(
                  (p) => p.product_id == catalog.product_id
                )?._count
              }
            </div>
          </div>
        </Link>
      ))}
    </Fragment>
  );
}
