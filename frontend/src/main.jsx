import React from 'react'
import ReactDom from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import StoreContextProvider from './components/context/StoreContext.jsx'




ReactDom.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <StoreContextProvider>
    <App/>
    </StoreContextProvider>
    </BrowserRouter>
      
    
  
)
