import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import Start from "./pages/Start.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx"


function Routing(){

  return (
    <BrowserRouter>
      <nav>
        <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
      </nav>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/start' element={
          <ProtectedRoute>
            <Start/>
          </ProtectedRoute>
        }/>
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Routing/>
  </StrictMode>,
)
