import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import{BrowserRouter} from 'react-router-dom'
import { persistor, store } from './redux/store.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from "@material-tailwind/react";
import tailwindConfig from '../tailwind.config.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <React.StrictMode>
    <Provider store={store}>  
    <PersistGate loading={null} persistor={persistor} >
    <ThemeProvider config={tailwindConfig } >
    <App />
    </ThemeProvider>
    </PersistGate>
    </Provider>
  </React.StrictMode>
  </BrowserRouter>
)
