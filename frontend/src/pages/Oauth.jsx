import React from 'react'
import { useNavigate } from 'react-router-dom'
import Exclude from '../assets/Exclude.png'
import Left from '../assets/left.png'
import Right from '../assets/right.png'
import Google from '../assets/google.png'
import { useAuth } from '../context/authContext'


function Oauth() {
  const { setIsAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    await login();
    navigate('/dashboard',{ replace: true });
    setIsAuthenticated(true);
  }

  return (
    <>
      <div className='px-20'>
        <div className='bg-[#FFFFFF] flex justify-between gap-5 min-h-screen items-center'>
          {/* Left side */}
          <div className='left-side w-full flex items-center flex-col border shadow h-[440px] rounded-xl'>
            {/* Logo */}
            <div className='logo flex items-center gap-6 mt-10 mb-5'>
              <div className='flex items-center justify-between'>
                <img src={Left} alt='' />
                <img src={Right} alt='' />
              </div>
              <h1 className='text-[#3C50D1] font-extrabold text-3xl'>FUTURE</h1>
            </div>
            {/* Login form */}
            <div className='login-form px-14 border border-l-0 border-r-0 py-7'>
                <h1 
                className='font-semibold text-[#000000] text-2xl leading-10 text-center mb-1'>Set Future Plans And Get A Reminder With Ease.</h1>
                <p 
                className='text-[#7F7F7F] font-normal text-base text-center mb-5'>Let’s get you started with quality plans with family, <br />friend and team members.</p>
                {/* Login with google */}
                <button
                  className='google-login py-6 bg-[#FFFFFF] mt-3 w-full border-[1.5px] cursor-pointer border-[#7F7F7F61] rounded-xl h-10 flex items-center 
                  justify-center gap-6 text-xl font-medium text-[#000000]'
                  onClick={handleLogin}
                >
                  <img
                    src={Google}
                    alt='google'
                    className='w-6 h-6'
                  />
                  Log in with google
                </button>
            </div>
          </div>
          {/* Right side */}
          <div className='right-side w-full relative'>
            {/* Right side image */}
            <img src={Exclude} alt='Login-Image' className='w-full h-[550px]' />

            <div className='image-text absolute bottom-20 left-5'>
              <p className='text-white text-2xl font-semibold'>Schedule Future Plans With Ease</p>
              <p className='text-sm font-normal text-white text-center'>Never miss an important plan with your family, friends <br /> and team member.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Oauth
