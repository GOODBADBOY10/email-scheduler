import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Oauth from './pages/Oauth'
import Dashboard from './pages/Dashboard'
import PrivateRoute from './components/PrivateRoute'

function App() {

  return (
    <>
      <div>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Oauth />} />

          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route element={<OnlyAdminPrivate />}>
            <Route path='/create-post' element={<CreatePost />} />
          </Route> */}

        </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
