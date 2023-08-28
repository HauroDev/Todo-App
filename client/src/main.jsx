import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'

import App from './App.jsx'

import './index.css'

import store from './store/index.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
)
