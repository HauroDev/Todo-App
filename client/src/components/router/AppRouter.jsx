import { Route, Routes } from 'react-router-dom'
import { useUserSelector } from '../../hooks/store'

import { AppRoutes } from '../../utils/routers/app'
import Landing from '../../app/landing/Landing'
import AuthContainer from '../../app/auth/AuthContainer'
import SignUp from '../../app/auth/sign-up/SignUp'
import SignInPage from '../../app/auth/sign-in/SignIn'
import PrivateRoutes from './PrivateRoutes'
import AppContainer from '../../app/AppContainer'
import Home from '../../app/home/Home'
import Tasks from '../../app/task/Tasks'
import UserProfile from '../../app/user/UserProfile'
import ErrorPage from '../../app/ErrorPage'

const AppRouter = () => {
  const { isSignedIn } = useUserSelector()

  return (
    <Routes>
      <Route
        path={AppRoutes.landing}
        element={<Landing />}
      />

      <Route
        path={AppRoutes.auth.base}
        element={<AuthContainer />}>
        <Route
          path={AppRoutes.auth.signIn}
          element={<SignInPage />}
        />
        <Route
          path={AppRoutes.auth.signUp}
          element={<SignUp />}
        />
      </Route>

      <Route
        path={AppRoutes.home.base}
        element={
          <PrivateRoutes authorized={isSignedIn}>
            <AppContainer />
          </PrivateRoutes>
        }>
        <Route
          index
          element={<Home />}
        />
        <Route
          path={AppRoutes.home.tasks.base}
          element={<Tasks />}
        />
        <Route
          path={AppRoutes.home.profile.base}
          element={<UserProfile />}
        />
      </Route>

      <Route
        path='*'
        element={<ErrorPage />}
      />
    </Routes>
  )
}

export default AppRouter
