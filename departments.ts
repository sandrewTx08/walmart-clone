export interface IDepartment {
  [alias: string]: { id: number; name: string; subDepartments?: IDepartment[] };
}

export const Departments: IDepartment = {
  food: {
    id: 1,
    name: "Food",
    subDepartments: [{ "food-chocolate": { id: 4, name: "Soda" } }],
  },
  clothes: {
    id: 2,
    name: "Clothes",
    subDepartments: [{ shoes: { id: 5, name: "Shoes" } }],
  },
  games: {
    id: 3,
    name: "Games",
    subDepartments: [{ "console-games": { id: 6, name: "Consoles" } }],
  },
};

export function findDepartmentById(departmentId: number) {
  const data = Object.entries(Departments).find(
    ([_, { id }]) => id === departmentId
  );
  return data ? { alias: data[0], ...data[1] } : null;
}
