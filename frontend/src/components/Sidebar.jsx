import React from 'react'
import Left from '../assets/left.png'
import Right from '../assets/right.png'
import Schedule from '../assets/schedule.png'
import overview from '../assets/overview.png'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/authContext'


const Sidebar = () => {
    const { setIsAuthenticated } = useAuth();
    const navigate = useNavigate()
    const location = useLocation();

    const handleLogout = () => {
        console.log('logout');
        navigate('/', { replace: true });
        setIsAuthenticated(false)
    }

    return (
        <div>
            <div className='sidebar'>
                <div className="flex flex-col w-64 bg-zinc-100 border-l-0 border-b-0 border-t-0 border-r-[1.5px] min-h-screen py-8 px-10">
                    <div className='logo flex items-center gap-3 mb-7'>
                        <div className='flex items-center justify-between'>
                            <img src={Left} alt='' className='h-8' />
                            <img src={Right} alt='' className='h-6' />
                        </div>
                        <h1 className='text-[#3C50D1] font-bold text-2xl'>FUTURE</h1>
                    </div>
                    <div className='sidebar-icon flex flex-col gap-8 relative'>
                        <div className={location.pathname === '/overview' ? 'active' : ''}>
                            <NavLink to='/dashboard' end className={({ isActive }) => `flex items-center gap-3 ml-1 cursor-pointer px-2 py-1 ${isActive ? 'bg-[#3C50D1] rounded-lg text-white' : ''}`}>
                                <img src={overview} alt='' className='w-5 h-5' />
                                <h4 className='text-xl font-normal'>Overview</h4>
                            </NavLink>
                        </div>
                        <NavLink to='/dashboard/schedule' className={({ isActive }) => `flex items-center gap-3 ml-1 cursor-pointer px-2 py-1 ${isActive ? 'bg-[#3C50D1] rounded-lg text-white' : ''}`}>
                            <img src={Schedule} alt='' className='w-5 h-5' />
                            <h4 className='text-xl font-normal'>Schedule</h4>
                        </NavLink>
                    </div>

                    <div
                        onClick={handleLogout}
                        className='flex items-center gap-3 ml-1 cursor-pointer absolute bottom-7 px-2 py-1 rounded-lg'>
                        <FaSignOutAlt className='h-6 w-6 text-gray-500' />
                        <h4 className='text-xl font-normal'>Logout</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar

