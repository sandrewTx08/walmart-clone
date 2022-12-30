// @ts-check

import React from "react";
import { FiSearch } from "react-icons/fi";
import DropdownList from "./DropdownList";

/**
 * @param {import("./DropdownList.types").DropdownListProps} props
 */
export default function (props) {
  const [input, inputSet] = React.useState("");

  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder="Type to search"
        value={input}
        onChange={({ target: { value } }) => {
          inputSet(value);
        }}
      />
      <button>
        <FiSearch />
      </button>

      {
        <DropdownList
          clickOnListItem={(item) => {
            inputSet(item.text);
          }}
          list={props.list
            .filter((item) => {
              const searchTerm = input.toLocaleLowerCase();
              item.text = item.text.toLocaleLowerCase();

              return (
                searchTerm &&
                item.text.startsWith(searchTerm) &&
                item.text !== searchTerm
              );
            })
            .map(({ text, link }) => {
              /** @type {import("./DropdownList.types").DropdownList} */
              const value = { link, text };
              return value;
            })}
        />
      }
    </div>
  );
}
