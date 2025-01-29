import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Overview from '../components/Overview'
import Schedule from '../components/Schedule'


const Dashboard = () => {
  return (
    <div className='container flex'>
      <Sidebar />
      <div className='main'>
        <Routes>
          <Route path='/' element={<Overview />} />
          <Route path='/schedule' element={<Schedule />} />
        </Routes>
      </div>
    </div>
  )
}

export default Dashboard
