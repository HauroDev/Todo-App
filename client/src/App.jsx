import { useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { PrivateInterceptor } from './interceptors/PrivateInterceptor'

import Header from './components/header/Header'
import Footer from './components/Footer'

import { AppRoutes } from './utils/routers/app'
import AppRouter from './app/router/AppRouter'

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
      <ToastContainer
        toastClassName='m-10'
        position='bottom-right'
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
    </>
  )
}

export default App
