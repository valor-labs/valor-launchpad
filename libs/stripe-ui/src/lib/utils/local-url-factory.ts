// route should start with /
export function localUrlFactory(route: string) {
  return window.location.protocol + '//' + window.location.host + route;
}
