import Footer from './components/Footer'
import Header from './components/Header'
import { Route, Routes, useLocation } from 'react-router-dom'
import Landing from './pages/Landing'
import { routerName } from './utils/routes/appRoutes'
import Login from './pages/login/Login'

function App() {
  const { pathname } = useLocation()

  return (
    <>
      {![routerName.login, routerName.register].includes(pathname) && (
        <Header />
      )}
      <main className='flex flex-grow'>
        <Routes>
          <Route
            path={routerName.landing}
            element={<Landing />}
          />
          <Route
            path={routerName.login}
            element={<Login />}
          />
          <Route
            path={routerName.register}
            element={
              <div className='text-white text-center my-auto'>register</div>
            }
          />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
