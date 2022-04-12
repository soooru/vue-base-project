export const redirectToLogin = (routeTo, next) => {
  next({ name: 'login', query: { redirectFrom: routeTo.fullPath } })
}
