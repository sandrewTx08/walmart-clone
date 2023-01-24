import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import styled from "styled-components";
import DropdownList, { DropdownListProps } from "./DropdownList";

const SearchBar = styled.div`
  input {
    border: 1em;
    background-color: white;
    border-radius: 1em;
    padding: 0.5em;
    padding-right: 30px;
  }

  button {
    background-color: var(--WALMART-YALLOW);
    padding: 0.5em;
    border-radius: 1em;
    display: inline;
    position: relative;
    float: right;
    right: 28px;
  }

  button svg {
    color: black;
  }
`;

export default function (props: DropdownListProps) {
  const [input, inputSet] = useState("");

  return (
    <SearchBar>
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
    </SearchBar>
  );
}
