class ApiRoutes {
  constructor() {
    this._backendUrl = 'http://localhost:4001/api/v1'
    this._userBase = this._backendUrl + '/user'
    this._groupBase = this._backendUrl + '/group'
    this._listBase = this._backendUrl + '/list'
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
      }
    }
  }

  get group() {
    const self = this
    return {
      get base() {
        return self._groupBase
      },
      get all() {
        return `${self._groupBase}/all`
      },
      get create() {
        return `${self._groupBase}/create`
      },
      get delete() {
        return `${self._groupBase}/delete`
      },
      get restore() {
        return `${self._groupBase}/restore`
      },
      get update() {
        return `${self._groupBase}/update`
      }
    }
  }

  get list() {
    const self = this
    return {
      get base() {
        return self._listBase
      },
      get all() {
        return `${self._listBase}/all`
      },
      get create() {
        return `${self._listBase}/create`
      },
      get delete() {
        return `${self._listBase}/delete`
      },
      get restore() {
        return `${self._listBase}/restore`
      },
      get update() {
        return `${self._listBase}/update`
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
