import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import styled from "styled-components";
import DropdownList, { DropdownListProps } from "./DropdownList";

const SearchBar = styled.div`
  display: flex;

  input {
    border: 0;
    background-color: white;
    border-radius: 1em 0 0 1em;
    padding: 8px;
    width: 100%;
  }

  button {
    background-color: var(--WALMART-YALLOW);
    border-radius: 0 1em 1em 0;
    padding: 8px;
    cursor: pointer;
  }

  button svg {
    color: black;
  }

  ul {
    top: 3em;
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
