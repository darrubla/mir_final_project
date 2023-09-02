export function rswitch(param, cases) {
  if (cases[param]) {
    return cases[param];
  } else {
    return cases.default;
  }
}
