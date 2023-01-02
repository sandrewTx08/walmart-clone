// @ts-check

import React from "react";
import { Link } from "react-router-dom";

/**
 * @param {import("./DropdownList.types").DropdownListProps} props
 */
export default function (props) {
  return (
    <ul className="dropdown-list">
      {props.list.map((item) => (
        <li key={item.text}>
          <Link
            to={item.link}
            onClick={() => {
              if (props.clickOnListItem) {
                props.clickOnListItem(item);
              }
            }}
          >
            <div>{item.text}</div>
            <div className="dropdown-list-subtext">
              {item.subtext || "Search"}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
