export interface Department {
  [alias: string]:
    | {
        id: number;
        name: string;
        subDepartments?: Department[];
      }
    | {
        name: string;
        subDepartments: Department[];
      };
}

export const Departments: Department = {
  food: {
    name: "Food",
    subDepartments: [
      {
        "food-drinks": {
          id: 101,
          name: "Drink",
          subDepartments: [
            {
              "drinks-hot": {
                id: 102,
                name: "Hot",
              },
            },
            {
              "drinks-cold": {
                id: 103,
                name: "Cold",
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
          id: 301,
          name: "Men Shoes",
          subDepartments: [{ "men-shoes": { id: 303, name: "Shoes" } }],
        },
      },
      {
        "female-clothes": {
          id: 302,
          name: "Female Shoes",
          subDepartments: [{ "female-shoes": { id: 304, name: "Shoes" } }],
        },
      },
    ],
  },
  games: {
    name: "Videos Games",
    subDepartments: [
      {
        "console-games": {
          id: 201,
          name: "Console",
          subDepartments: [
            { "console-xbox": { id: 203, name: "Xbox" } },
            { "console-playstation": { id: 204, name: "Playstation" } },
          ],
        },
      },
      {
        "pc-games": {
          id: 202,
          name: "PC Gamer",
          subDepartments: [{ "game-desktop": { id: 205, name: "Desktop" } }],
        },
      },
    ],
  },
};

function findSubDepartment(
  subDepartment: Department[string],
  callback: (object: [string, Department[string]]) => void
) {
  subDepartment?.subDepartments?.length > 0 &&
    subDepartment.subDepartments.forEach((subDepartment) => {
      Object.entries(subDepartment).forEach(callback);
    });
}

export function findDepartment(IdOrAlias: string | number) {
  let department;

  function filterCallback([alias, object]: [string, Department[string]]) {
    const filter =
      ("id" in object && object.id === IdOrAlias) || alias === IdOrAlias;

    if (filter === false) {
      findSubDepartment(object, filterCallback);
    } else if (filter === true) {
      department = [alias, object];
    }
  }

  Object.entries(Departments).forEach(filterCallback);

  return department;
}

export function allDepartments() {
  const department = [];

  function filterCallback(object: [string, Department[string]]) {
    department.push(object);
    findSubDepartment(object[1], filterCallback);
  }

  Object.entries(Departments).forEach(filterCallback);

  return department;
}
