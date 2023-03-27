//! search=Max&page=2

export function ExtractQueryParams(query) {
  return query.substr(1).split('&').reduce((queryParams, parameter) => {
    const [key, value] = parameter.split('=')

    queryParams[key] = value
    return queryParams
  }, {})
}