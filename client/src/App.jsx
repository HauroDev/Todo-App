import Footer from './components/Footer'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import { routerName } from './utils/routes'

function App() {
  return (
    <>
      <Header />
      <main className='flex-grow'>
        <Routes>
          <Route
            path={routerName.landing}
            element={<Landing />}
          />
          <Route
            path={routerName.login}
            element={
              <div className='text-white text-center my-auto'>login</div>
            }
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
