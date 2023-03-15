export interface IDepartment {
  [alias: string]: { id: number; name: string; subDepartments?: IDepartment[] };
}

export const Departments: IDepartment = {
  food: {
    id: 100,
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
                name: "Hot drink",
              },
            },
            {
              "drinks-cold": {
                id: 103,
                name: "Cold drink",
              },
            },
          ],
        },
      },
    ],
  },
  clothes: {
    id: 300,
    name: "Clothes",
    subDepartments: [
      {
        "men-clothes": {
          id: 301,
          name: "Men",
          subDepartments: [{ "men-shoes": { id: 303, name: "Shoes" } }],
        },
      },
      {
        "female-clothes": {
          id: 302,
          name: "Female",
          subDepartments: [{ "female-shoes": { id: 304, name: "Shoes" } }],
        },
      },
    ],
  },
  games: {
    id: 200,
    name: "Games",
    subDepartments: [
      {
        "console-games": {
          id: 201,
          name: "Console",
          subDepartments: [{ "console-dvd": { id: 203, name: "DVD" } }],
        },
      },
      {
        "pc-games": {
          id: 202,
          name: "PC",
          subDepartments: [{ "console-cd": { id: 203, name: "CD" } }],
        },
      },
    ],
  },
};

function findSubDepartment(
  subDepartment: IDepartment[string],
  callback: (object) => void
) {
  subDepartment?.subDepartments?.length > 0 &&
    subDepartment.subDepartments.forEach((subDepartment) => {
      Object.entries(subDepartment).forEach(callback);
    });
}

export function findDepartment(IdOrAlias: string | number) {
  let department;

  function filterCallback([alias, object]) {
    const filter = object.id === IdOrAlias || alias === IdOrAlias;

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

  function filterCallback(object) {
    department.push(object);
    findSubDepartment(object[1], filterCallback);
  }

  Object.entries(Departments).forEach(filterCallback);

  return department;
}
