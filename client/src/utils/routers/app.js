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
      get Tasks() {
        return `${self._home}/tasks`
      },
      get profile() {
        const profileUrl = `${self._home}${self._profile}`
        return {
          get base() {
            return profileUrl
          },
          get edit() {
            return `${profileUrl}/edit`
          }
        }
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
}

const appRoutes = new AppRoutes()
export { appRoutes as AppRoutes }
