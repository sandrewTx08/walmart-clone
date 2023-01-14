export function argsToPrisma<T extends { [x: string]: any }>(
  args: T
): { [K in keyof T]: boolean | undefined } | undefined {
  const ok = Object.keys(args);

  if (ok.length > 0) {
    return ok.reduce((no, k) => {
      no[k] = args[k] != undefined || args[k] != null ? true : undefined;
    }, Object());
  }
}
