import { NavItem } from "@/components/Navigation/HeaderNav";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { useState } from "react";
import { Departments, IDepartment } from "@/departments";
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

const DepartmentMenuItem = styled.div`
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
    <div id="departments">
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
        Department
      </NavItem>

      <div style={{ position: "relative" }}>
        {departmentMenu && (
          <DepartmentMenuContainer className="shadow-soft">
            <DepartmentMenuWrapper>
              <div style={{ overflowY: "scroll", overflowX: "hidden" }}>
                <DepartmentMenuItem>
                  <Link href="/all-departments">
                    <b>All departmets</b>
                  </Link>
                </DepartmentMenuItem>

                {Object.entries(Departments).map(
                  ([alias, { name, id, subDepartments }]) => (
                    <DepartmentMenuItem
                      key={id}
                      onMouseOver={() => {
                        departmentMenuSelectSet({
                          subDepartments,
                          name,
                          id,
                          alias,
                        });
                      }}
                    >
                      {name}
                    </DepartmentMenuItem>
                  )
                )}
              </div>

              <div
                style={{
                  backgroundColor: "#e6f1fc",
                  padding: "1em",
                  overflowY: "scroll",
                  width: "64em",
                }}
              >
                {departmentMenuSelect?.subDepartments?.length > 0 && (
                  <SubDepartmentMenu>
                    {departmentMenuSelect.subDepartments.map((subDepartment) =>
                      Object.entries<IDepartment[string]>(subDepartment).map(
                        ([_, { name, subDepartments }]) => (
                          <>
                            <b>{name}</b>

                            {subDepartments.map((subDepartment) =>
                              Object.entries<IDepartment[string]>(
                                subDepartment
                              ).map(([alias, { id, name }]) => (
                                <Link key={id} href={"/department/" + alias}>
                                  {name}
                                </Link>
                              ))
                            )}
                          </>
                        )
                      )
                    )}
                  </SubDepartmentMenu>
                )}
              </div>
            </DepartmentMenuWrapper>
          </DepartmentMenuContainer>
        )}
      </div>
    </div>
  );
}
