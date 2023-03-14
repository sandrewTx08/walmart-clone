import styled from "styled-components";
import { TfiSearch } from "react-icons/tfi";
import { useState } from "react";
import Link from "next/link";
import { Departments } from "@/departments";

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  padding-right: 40px;
  border-radius: 20px;

  &:focus {
    border-radius: 0;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  position: relative;
`;

const SearchButton = styled.button`
  background-color: var(--WALMART-YALLOW);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-weight: bolder;
  position: absolute;
  right: 5px;
  top: 4px;
  z-index: 1000;
`;

const Ul = styled.div`
  position: absolute;
  background-color: white;
  color: black;
  width: 100%;
  top: 41px;
  z-index: 1000;
`;

const Li = styled.div`
  padding: 1em;
`;

const SideText = styled.span`
  font-size: small;
  color: gray;
`;

export default function C() {
  const [searchInput, searchInputSet] = useState("");
  const [searchMenu, searchMenuSet] = useState(false);

  return (
    <Wrapper>
      {searchInput && searchMenu && (
        <Ul className="shadow-soft">
          {Object.entries(Departments)
            .filter(([name]) => {
              const departmentLow = name.toLowerCase();
              const input = searchInput.toLowerCase();

              return (
                departmentLow &&
                input.startsWith(departmentLow[0]) &&
                departmentLow !== input
              );
            })
            .map(([alias, { id, name }]) => (
              <Link key={id} href={"/department/" + alias}>
                <Li>
                  {searchInput} <SideText>in {name}</SideText>
                </Li>
              </Link>
            ))}
        </Ul>
      )}

      <SearchInput
        onFocus={() => {
          searchMenuSet(true);
        }}
        onBlur={() => {
          searchMenuSet(false);
        }}
        onChange={({ target: { value } }) => {
          searchInputSet(value);
        }}
      />

      <div style={{ position: "relative" }}>
        <SearchButton>
          <TfiSearch />
        </SearchButton>
      </div>
    </Wrapper>
  );
}
