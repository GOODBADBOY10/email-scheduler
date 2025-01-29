import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/authContext.jsx'

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  useEffect(() => {
    console.log('Auth state updated:', isAuthenticated)
  },[isAuthenticated])
  
  if (!isAuthenticated) {
    return <Navigate to='/' state={{ from: location }} replace />
  }
  return children 
}

export default PrivateRoute

