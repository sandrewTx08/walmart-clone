import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import DropdownList, { DropdownListProps } from "./DropdownList";

export default function (props: DropdownListProps) {
  const [input, inputSet] = useState("");

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

      <DropdownList
        onClick={(item) => {
          inputSet(item.text);
        }}
        list={props.list.filter((item) => {
          const searchTerm = input.toLocaleLowerCase();
          item.text = item.text.toLocaleLowerCase();

          return (
            searchTerm &&
            item.text.startsWith(searchTerm) &&
            item.text !== searchTerm
          );
        })}
      />
    </div>
  );
}