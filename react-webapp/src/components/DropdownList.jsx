// @ts-check

import React from "react";

/**
 * @param {import("./DropdownList.types").DropdownListProps} props
 */
export default function (props) {
  return (
    <ul className="dropdown-list">
      {props.list.map((item) => (
        <li key={item.text}>
          <a
            onClick={() => {
              if (props.clickOnListItem) props.clickOnListItem(item);
            }}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  );
}
