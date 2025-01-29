import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { useAlarm } from '../context/alarmContext';

const Overview = () => {
    const navigate = useNavigate()
    const { alarms } = useAlarm();

    return (
        <div>
            <div className="flex flex-col flex-1 gap-5 overflow-y-auto pl-4 py-10 pr-24">
                <div className='flex justify-between items-center'>
                    <div className="relative w-96">
                        <input
                            className="appearance-none border pl-10 border-gray-300 hover:border-gray-100 transition-colors rounded-md w-full py-3 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 outline-none"
                            id="username"
                            type="text"
                            placeholder="Search"
                        />
                        <div className="absolute left-0 inset-y-0 flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 ml-3 text-gray-400 hover:text-gray-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                    </div>
                    <div className='profile'>
                        {/* <img src={user ? user.photoURL : profile} alt="profile" className='w-8 h-8 rounded-full' /> */}
                    </div>
                </div>
                {/* Alarms dasboard text */}
                <div className='px-3 flex items-center justify-between w-full h-24 bg-zinc-100 rounded-xl'>
                    <div>
                        <h3 className='text-3xl font-normal text-[#3C50D1]'>Dashboard</h3>
                        {/* <p className='text-[#7F7F7F] text-base'>Welcome, <span className='mx-2 font-semibold text-lg'>{user ? user.displayName : 'SAM'}</span>let’s begin planning the future!!!</p> */}
                    </div>
                    <div
                        onClick={() => navigate('/dashboard/schedule')}
                        className='flex items-center justify-center gap-3 bg-[#3C50D1] text-white border cursor-pointer rounded-xl h-14 w-48 px-2'>
                        <FaPlus />
                        <p className='text-base font-normal'>Create Schedule</p>
                    </div>
                </div>


                <div className="rounded-xl px-2 py-3 w-full shade">
                        <h3 className='text-xl font-normal text-black'>Schedules</h3>
                        <div className='grid grid-cols-4 w-full mt-5 mb-4 py-2 gap-6 overflow-auto rounded border-separate border-spacing-y-4 px-3'>
                            <div className='w-28 bg-zinc-100 text-[#7F7F7F] rounded-lg p-1 text-center'>Alarm Title</div>
                            <div className='w-28 bg-zinc-100 text-[#7F7F7F] rounded-lg p-1 text-center'>Category</div>
                            <div className='w-28 bg-zinc-100 text-[#7F7F7F] rounded-lg p-1 text-center'>Status</div>
                            <div className='w-28 bg-zinc-100 text-[#7F7F7F] rounded-lg p-1 text-center'>Users</div>
                        </div>

                        <div className='grid gap-5 overflow-y-scroll h-96 scrollbar '>
                            {alarms.map((al) => (
                                <>
                                    <div className='grid grid-cols-4 py-2 px-1 bg-zinc-100 rounded-lg items-center'>
                                        <div className='w-full'>
                                            <div className='flex items-center justify-between w-full'>
                                                <div className='flex flex-col w-full'>
                                                    <span>{al.subject}</span>
                                                    <span>{al.date}</span>
                                                </div>
                                                <span>{al.time}</span>
                                            </div>
                                        </div>
                                        <div className='w-full text-center'>
                                            {al.category}
                                        </div>
                                        <div className='w-full text-center text-green-400'>
                                            {al.notified ? 'Pending' : 'Sent'}
                                        </div>
                                        <div className='w-full text-center'>
                                            {al.email.length}
                                        </div>
                                    </div>
                                </>
                            ))}
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Overview