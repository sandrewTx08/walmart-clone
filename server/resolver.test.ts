import { argsToPrisma } from "./helpers";

describe("argsToPrisma", () => {
  let result

  it("return true", () => {
    result = { field: true };
    expect(argsToPrisma({ field: 1 })).toStrictEqual(result);
    expect(argsToPrisma({ field: "2" })).toStrictEqual(result);
    expect(argsToPrisma({ field: 0 })).toStrictEqual(result);
    expect(argsToPrisma({ field: false })).toStrictEqual(result);
  });

  it("return undefined", () => {
    result = { field: undefined };
    expect(argsToPrisma({ field: null })).toStrictEqual(result);
    expect(argsToPrisma({ field: undefined })).toStrictEqual(result);
  });
});
