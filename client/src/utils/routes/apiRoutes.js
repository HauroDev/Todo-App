class ApiRoutes {
  constructor() {
    this._backendUrl = 'http://localhost:4001/api/v1'
    this._userBase = this._backendUrl + '/user'
    this._taskBase = this._backendUrl + '/task'
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
      get update() {
        return `${self._userBase}/update`
      }
    }
  }

  get task() {
    const self = this
    return {
      get base() {
        return self._taskBase
      },
      get all() {
        return `${self._taskBase}/all`
      },
      get create() {
        return `${self._taskBase}/create`
      },
      get delete() {
        return `${self._taskBase}/delete`
      },
      get restore() {
        return `${self._taskBase}/restore`
      },
      get update() {
        return `${self._taskBase}/update`
      }
    }
  }
}

const apiRoutes = new ApiRoutes()
export { apiRoutes as ApiRoutes }
