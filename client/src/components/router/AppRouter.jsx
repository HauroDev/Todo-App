import { Route, Routes } from 'react-router-dom'
import { useUserSelector } from '../../hooks/store'

import { AppRoutes } from '../../utils/routes/appRoutes'

import AuthContainer from '../../pages/auth/AuthContainer'
import SignUpPage from '../../pages/auth/sign-up/SignUpPage'
import SignInPage from '../../pages/auth/sign-in/SignInPage'
import Landing from '../../pages/landing/LandingPage'
import ErrorPage from '../../pages/ErrorPage'
import Home from '../../pages/Home'
import Tasks from '../../pages/Tasks'
import PrivateRoutes from './PrivateRoutes'

const AppRouter = () => {
  const { isSignedIn } = useUserSelector((state) => state.user)

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
          element={<SignUpPage />}
        />
      </Route>

      <Route
        path={AppRoutes.home.base}
        element={
          <PrivateRoutes authorized={isSignedIn}>
            <Home />
          </PrivateRoutes>
        }>
        <Route
          path={AppRoutes.home.formTask}
          element={<Tasks />}
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
