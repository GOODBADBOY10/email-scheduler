import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Oauth from './pages/Oauth'
import Dashboard from './pages/Dashboard'
import Try from './components/Try'
import PrivateRoute from './components/PrivateRoute'

function App() {

  return (
    <>
      <div>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Oauth />} />

          <Route element={<PrivateRoute />}>
            <Route path="/try" element={<Try />} />
          </Route>

        </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
