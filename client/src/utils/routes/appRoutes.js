class AppRoutes {
  constructor() {
    this._landing = '/'
    this._authBase = '/auth'
  }

  get landing() {
    return this._landing
  }

  get auth() {
    const self = this
    return {
      get base() {
        return self._authBase
      },
      get signUp() {
        return `${self._authBase}/sign-up`
      },
      get signIn() {
        return `${self._authBase}/sign-in`
      }
    }
  }
}

const appRoutes = new AppRoutes()
export { appRoutes as AppRoutes }
