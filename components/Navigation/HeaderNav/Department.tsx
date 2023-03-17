import { NavItem } from "@/components/Navigation/HeaderNav";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { useState } from "react";
import { Departments, Department } from "@/departments";
import Link from "next/link";
import styled from "styled-components";

const DepartmentMenuContainer = styled.div`
  position: absolute;
  background-color: white;
  color: black;
  font-size: smaller;
  border-radius: 6px;
  padding: 12px 0;
  width: 32em;
`;

const DepartmentMenuItem1 = styled.div`
  padding: 12px;
  white-space: nowrap;
  padding-right: 32em;
`;

const DepartmentMenuItem = styled(DepartmentMenuItem1)`
  padding: 12px;
  white-space: nowrap;
  padding-right: 32em;

  &:hover {
    background-color: #e6f1fc;
  }

  &:hover::before {
    content: "";
    padding: 1px;
    background-color: var(--WALMART-BLUE);
    position: absolute;
    left: 0;
    height: 1em;
    right: 1;
    width: 1px;
  }
`;

const DepartmentMenuWrapper = styled.div`
  display: flex;
`;

const SubDepartmentMenu = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 1fr);
  line-height: 2;
`;

export default function C() {
  const [departmentMenu, departmentMenuSet] = useState(false);
  const [departmentMenuSelect, departmentMenuSelectSet] = useState(Object());

  return (
    <div
      id="departments"
      onMouseLeave={() => {
        departmentMenuSet(false);
      }}
    >
      <NavItem
        style={{ fontSize: "large", fontWeight: "bold" }}
        onClick={() => {
          departmentMenuSet(!departmentMenu);
        }}
      >
        <HiOutlineSquares2X2
          fontSize="x-large"
          style={{ position: "relative", bottom: 3 }}
        />
        Departments
      </NavItem>

      <div style={{ position: "relative" }}>
        {departmentMenu && (
          <DepartmentMenuContainer className="shadow-soft">
            <DepartmentMenuWrapper>
              <div style={{ overflowY: "scroll", overflowX: "hidden" }}>
                <Link href="/all-departments">
                  <DepartmentMenuItem1
                    onMouseOver={() => {
                      departmentMenuSelectSet(null);
                    }}
                  >
                    <b>All departmets</b>
                  </DepartmentMenuItem1>
                </Link>

                {Object.entries(Departments).map(
                  ([alias, { name, subDepartments }]) => (
                    <DepartmentMenuItem
                      key={alias}
                      onMouseOver={() => {
                        departmentMenuSelectSet({
                          subDepartments,
                          name,
                          alias,
                        });
                      }}
                    >
                      {name}
                    </DepartmentMenuItem>
                  )
                )}
              </div>

              {departmentMenuSelect?.subDepartments?.length > 0 && (
                <div
                  style={{
                    backgroundColor: "#e6f1fc",
                    padding: "1em",
                    overflowY: "scroll",
                    width: "64em",
                  }}
                >
                  <SubDepartmentMenu>
                    {departmentMenuSelect.subDepartments.map((subDepartment) =>
                      Object.entries<Department[string]>(subDepartment).map(
                        ([_, { name, subDepartments }]) => (
                          <>
                            <b>{name}</b>

                            {subDepartments.map((subDepartment) =>
                              Object.entries<Department[string]>(
                                subDepartment
                              ).map(([alias, { name }]) => (
                                <Link key={alias} href={"/department/" + alias}>
                                  {name}
                                </Link>
                              ))
                            )}
                          </>
                        )
                      )
                    )}
                  </SubDepartmentMenu>
                </div>
              )}
            </DepartmentMenuWrapper>
          </DepartmentMenuContainer>
        )}
      </div>
    </div>
  );
}
