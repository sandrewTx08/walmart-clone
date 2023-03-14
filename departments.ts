export const Departments = {
  food: { id: 1, name: "Food" },
  clothes: { id: 2, name: "Clothes" },
  games: { id: 3, name: "Games" },
} as const;

export function findDepartmentById(departmentId: number) {
  const a = Object.entries(Departments).find(
    ([_, { id }]) => id === departmentId
  );
  return a ? { alias: a[0], ...a[1] } : null;
}
