class ApiRoutes {
  constructor() {
    this._backendUrl = 'http://localhost:4001/api/v1'
    this._userBase = '/user'
  }

  get user() {
    const self = this
    return {
      get base() {
        return self._userBase
      },
      set base(newBase) {
        self._userBase = newBase
      },
      get signIn() {
        return `${self._backendUrl}${self._userBase}/sign-in`
      },
      get signUp() {
        return `${self._backendUrl}${self._userBase}/sign-up`
      }
    }
  }
}

const apiRoutes = new ApiRoutes()
export { apiRoutes as ApiRoutes }
