class ApiRoutes {
  constructor() {
    this._backendUrl = 'http://localhost:4001/api/v1'
    this._userBase = '/user'
  }

  get signIn() {
    return `${this._backendUrl}/sign-in`
  }

  get signOut() {
    return `${this._backendUrl}/sign-out`
  }

  get signUp() {
    return `${this._backendUrl}/sign-up`
  }

  get user() {
    const self = this
    return {
      get base() {
        return self._userBase
      },
      set base(newBase) {
        self._userBase = newBase
      }
    }
  }
}

const apiRoutes = new ApiRoutes()
export { apiRoutes as ApiRoutes }
