export function rswitch(param, cases) {
  if (param.user && param.user?.email) {
    return cases[param.user.type];
  } else {
    return cases.default;
  }
}

export function reactSwitch(param, cases) {
  if (param) {
    return cases[param];
  } else {
    return cases.default;
  }
}
