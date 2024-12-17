import React, { useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import { CiGrid41 } from 'react-icons/ci';
import { FiSidebar } from "react-icons/fi";
import profile from '../assets/profile.png'

const Dash = () => {
  return (
    <>
          <div className="flex h-screen bg-[#FFFFFF]">
            {/* <!-- sidebar --> */}
            <div className=" md:flex flex-col w-64 bg-white">
              <div className='flex gap-3 items-center sm:hidden p-2'>
                <img src={profile} alt="profile" className='w-8 h-8' />
                <div className='flex flex-col'>
                  <p className='text-sm font-bold'>Emem Obong</p>
                  <p className='text-sm'>ememobong@gmail.com</p>
                </div>
                <div> <FiSidebar className='mr-4' /></div>
              </div>

              <div className="flex flex-col flex-1 overflow-y-auto">
                
                <nav className="flex-1 px-2 py-4 bg-red-700 text-[#1C1C1C] shadow-2xl drop-shadow-2xl">

                  <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-700 bg-red-700">
                    <CgProfile className='h-6 w-6 mr-2 bg-red-700' />
                    Profile
                  </a>

                </nav>
              
              </div>
            </div>

            {/* <!-- Main content --> */}
            <div className="flex flex-col flex-1 overflow-y-auto">
              <div className="px-10 py-10 sm:px-6 sm:py-6 sm:border-none border">
                <h1 className="text-xl font-bold mb-3">Create Alarm Schedule</h1>
                <form>
                    <div className='mb-8'>
                        <label 
                        htmlFor='alarm-text' 
                        className='text-base font-medium'>Alarm Title:
                            <input 
                            type='text' 
                            name='' 
                            id='alarm-text' 
                            className='border border-gray-500 ml-2 rounded-md w-80 outline-none px-2 py-0.5' />
                        </label>
                    </div>

                    {/* <div className='mb-8'>
                        <label htmlFor='alarm-text' className='text-base font-medium'>Alarm Title:
                            <input type='text' name='' id='alarm-text' className='border border-gray-500 ml-2 rounded-md w-80 outline-none px-2 py-0.5' />
                        </label>
                    </div> */}

                    <div className='mb-8'>
                        <label htmlFor='alarm-time' className='text-base font-medium'>Alarm Time:
                            <input type='datetime-local' name='' id='alarm-time' className='border border-gray-500 ml-2 rounded-md w-80 outline-none px-2 py-0.5' />
                        </label>
                    </div>

                    <div>
                        {/* <label>Alarm description</label> */}
                        <textarea 
                        id='alarm-descrition' 
                        rows={7} 
                        cols={70} 
                        className='border border-gray-500 ml-2 rounded-md outline-none px-2 py-2' 
                        placeholder='Enter your alarm description'></textarea>
                    </div>

                    <button type='submit' className='cursor-pointer rounded-lg border py-2 px-1 w-36 mx-auto ml-48 bg-gray-700 text-white hover:bg-slate-950'>Submit</button>
                </form>
              </div>
            </div>
          </div>

    </>
  )
}

export default Dash
