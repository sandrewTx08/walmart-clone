import styled from "styled-components";
import { TfiSearch } from "react-icons/tfi";
import { TfiClose } from "react-icons/tfi";
import { useState } from "react";
import Link from "next/link";
import { allDepartments, findDepartment } from "@/departments";

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  padding-right: 62px;
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

const ClearButton = styled.button`
  position: absolute;
  background-color: inherit;
  width: 30px;
  height: 30px;
  color: black;
  right: 36px;
  top: 5px;
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

  &:nth-child(1) {
    border-top: 1px solid lightgrey;
  }

  &:hover {
    background-color: lightgray;
  }
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
          {allDepartments()
            .filter(([_, o]) => {
              const departmentLow = o.name.toLowerCase();
              const input = searchInput.toLowerCase();

              return (
                "id" in o &&
                departmentLow &&
                input.startsWith(departmentLow[0]) &&
                departmentLow !== input
              );
            })
            .map(([alias, { name }]) => (
              <Link key={alias} href={"/department/" + alias}>
                <Li>
                  {searchInput}{" "}
                  <SideText>
                    {name} in {findDepartment(alias)[1][1].name}
                  </SideText>
                </Li>
              </Link>
            ))}
        </Ul>
      )}

      <SearchInput
        value={searchInput}
        onFocus={() => {
          searchMenuSet(true);
        }}
        onBlur={() => {
          // Fix menu hiding
          setTimeout(() => {
            searchMenuSet(false);
          }, 80);
        }}
        onChange={({ target: { value } }) => {
          searchInputSet(value);
        }}
      />

      <div style={{ position: "relative" }}>
        {searchInput && (
          <ClearButton
            onClick={() => {
              searchInputSet("");
            }}
          >
            <TfiClose />
          </ClearButton>
        )}
        <SearchButton>
          <TfiSearch />
        </SearchButton>
      </div>
    </Wrapper>
  );
}
