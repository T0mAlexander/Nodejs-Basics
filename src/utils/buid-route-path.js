export function BuildRoutePath(path) {
  const RouteParamsRegex = /:([a-zA-Z]+)/g
  const PathWithParams = path.replaceAll(RouteParamsRegex, '(?<$1>[a-z0-9\-_]+)')
  const PathRegex = new RegExp(`^${PathWithParams}(?<query>\\?(.*))?$`)

  return PathRegex
}