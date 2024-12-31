import React from 'react'
import { useAuth } from '../context/authContext';
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoute = () => {
    const { user } = useAuth()

  console.log("Check user in Private: ", user);
  return (
    user ? <Outlet /> : <Navigate to='/' />
  )
}

export default PrivateRoute

