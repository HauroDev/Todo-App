import { useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
