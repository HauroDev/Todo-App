import { useLocation } from 'react-router-dom'

import { AppRoutes } from './utils/routes/appRoutes'

import Header from './components/header/Header'
import AppRouter from './components/router/AppRouter'
import Footer from './components/Footer'
import { PrivateInterceptor } from './interceptors/PrivateInterceptor'

PrivateInterceptor()

const App = () => {
  const { pathname } = useLocation()

  return (
    <>
      {!Object.values(AppRoutes.auth).includes(pathname) && <Header />}
      <main className='flex flex-grow justify-center w-full'>
        <AppRouter />
      </main>
      <Footer />
    </>
  )
}

export default App
