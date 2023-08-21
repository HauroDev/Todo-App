import Footer from './components/Footer'
import Header from './components/Header'
import { Route, Routes, useLocation } from 'react-router-dom'
import Landing from './pages/landing/LandingPage'

import ErrorPage from './pages/ErrorPage'
import SignInPage from './pages/auth/sign-in/SignInPage'
import SignUpPage from './pages/auth/sign-up/SignUpPage'
import AuthContainer from './pages/auth/AuthContainer'
import { AppRoutes } from './utils/routes/appRoutes'

const App = () => {
  const { pathname } = useLocation()

  return (
    <>
      {![AppRoutes.auth.signIn, AppRoutes.auth.signUp].includes(pathname) && (
        <Header />
      )}
      <main className='flex flex-grow'>
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
            path='*'
            element={<ErrorPage />}
          />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
