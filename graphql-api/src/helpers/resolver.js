//@ts-check

/**
 * @param {Object.<string, any>} args
 * @returns {Object.<string, boolean> | undefined}
 */
function argsToPrisma(args) {
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

module.exports = { argsToPrisma };
