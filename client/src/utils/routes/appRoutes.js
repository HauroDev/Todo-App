class AppRoutes {
  constructor() {
    this._root = '/'
    this._home = '/home'
    this._auth = '/auth'
    this._profile = '/profile'
    this._dashboard = '/dashboard'
  }

  get landing() {
    return this._root
  }

  get home() {
    const self = this
    return {
      get base() {
        return self._home
      },
      get formTask() {
        return `${self._home}/form-task`
      }
    }
  }

  get dashboard() {
    const self = this
    return {
      get base() {
        return self._dashboard
      }
    }
  }

  get auth() {
    const self = this
    return {
      get base() {
        return self._auth
      },
      get signUp() {
        return `${self._auth}/sign-up`
      },
      get signIn() {
        return `${self._auth}/sign-in`
      }
    }
  }

  get profile() {
    const self = this
    return {
      get base() {
        return self._profile
      },
      get edit() {
        return `${self._profile}/edit`
      }
    }
  }
}

const appRoutes = new AppRoutes()
export { appRoutes as AppRoutes }
