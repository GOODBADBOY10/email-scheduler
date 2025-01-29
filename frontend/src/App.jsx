import './App.css'
import { Routes, Route } from 'react-router-dom'
import Oauth from './pages/Oauth'
import PrivateRoute from './components/PrivateRoute'
import Dashboard from './pages/Dashboard'


function App() {
  return (
    <>
          <Routes>
            <Route path='/' element={<Oauth />} />
            <Route path='/dashboard/*' element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
          </Routes>
    </>
  )
}

export default App
