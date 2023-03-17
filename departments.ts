export interface Department {
  readonly [alias: string]:
    | { name: string } & (
        | {
            id: number;
            subDepartments?: Department[];
          }
        | {
            subDepartments: Department[];
          }
      );
}

export const Departments: Department = {
  food: {
    name: "Food",
    subDepartments: [
      {
        "food-drinks": {
          name: "Drink",
          subDepartments: [
            {
              "drinks-tea": {
                id: 102,
                name: "Tea",
              },
            },
            {
              "drinks-soda": {
                id: 103,
                name: "Soda",
              },
            },
          ],
        },
      },
    ],
  },
  clothes: {
    name: "Clothes",
    subDepartments: [
      {
        "men-clothes": {
          name: "Men Shoes",
          subDepartments: [
            {
              "men-shoes": {
                id: 303,
                name: "Shoes",
              },
            },
          ],
        },
      },
      {
        "female-clothes": {
          name: "Female Shoes",
          subDepartments: [
            {
              "female-shoes": {
                id: 304,
                name: "Shoes",
              },
            },
          ],
        },
      },
    ],
  },
  games: {
    name: "Videos Games",
    subDepartments: [
      {
        "console-games": {
          name: "Console",
          subDepartments: [
            {
              "console-xbox": {
                id: 203,
                name: "Xbox",
              },
            },
            {
              "console-playstation": {
                id: 204,
                name: "Playstation",
              },
            },
          ],
        },
      },
      {
        "pc-games": {
          name: "PC Gamer",
          subDepartments: [
            {
              "game-desktop": {
                id: 205,
                name: "Desktop",
              },
            },
          ],
        },
      },
    ],
  },
};

type DeparmtentMap = [string, Department[string]];

function findSubDepartment(
  department: DeparmtentMap,
  callback: (
    subDepartment: DeparmtentMap,
    parentDeparment: DeparmtentMap
  ) => void
) {
  department[1]?.subDepartments?.length > 0 &&
    department[1].subDepartments.forEach((eachSubDepartment) => {
      Object.entries(eachSubDepartment).forEach((eachSubDepartmentObject) => {
        callback(eachSubDepartmentObject, department);
      });
    });
}

export function findDepartment(IdOrAlias: string | number) {
  let _department;
  let _parentDeparment;

  function filterCallback(departmentObject: DeparmtentMap, parentDeparment) {
    const hasFound =
      ("id" in departmentObject[1] && departmentObject[1].id === IdOrAlias) ||
      departmentObject[0] === IdOrAlias;

    if (hasFound === true) {
      _department = departmentObject;
      _parentDeparment = parentDeparment;
    } else {
      findSubDepartment(departmentObject, filterCallback);
    }
  }

  Object.entries(Departments).forEach(filterCallback);

  return [_department, _parentDeparment];
}

export function allDepartments() {
  const departments = [];

  function filterCallback(department: DeparmtentMap) {
    departments.push(department);
    findSubDepartment(department, filterCallback);
  }

  Object.entries(Departments).forEach(filterCallback);

  return departments;
}
