export function argsToPrisma<T extends { [x: string]: any }>(
  args: T
): { [K in keyof T]: boolean } | undefined {
  const ok = Object.keys(args);
  if (ok.length > 0) {
    const no = Object();
    for (const key of ok) {
      if (args[key] != undefined || args[key] != null) {
        no[key] = true;
      } else {
        no[key] = undefined;
      }
    }
    return no;
  }
}
