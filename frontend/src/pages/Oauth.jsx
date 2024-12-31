import React from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext.jsx'
import Exclude from '../assets/Exclude.png'
import Left from '../assets/left.png'
import Right from '../assets/right.png'
import Google from '../assets/google.png'

function Oauth() {

  const { googleSignIn } = useAuth();
  const navigate = useNavigate()

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/try");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className='px-20'>
        <div className='bg-[#FFFFFF] flex justify-between min-h-screen'>
          {/* Left side */}
          <div className='left-side w-full'>
            {/* Logo */}
            <div className='logo flex items-center gap-6 mt-5'>
              <div className='flex items-center justify-between'>
                <img src={Left} alt='' />
                <img src={Right} alt='' />
              </div>
              <h1 className='text-[#7F7F7F] font-extrabold text-3xl'>FUTURE</h1>
            </div>
            {/* Login form */}
            <div className='login-form px-14'>
              <form className=''>
                <h1 className='font-semibold text-[#000000] text-2xl leading-10 text-center mb-1'>Create your account</h1>
                <p className='text-[#7F7F7F] font-normal text-base'>Let’s get you started with quality plans with your family.</p>
                {/* Login with google */}
                <div
                  className='google-login bg-[#FFFFFF] mt-3 w-full border cursor-pointer border-[#7F7F7F61] rounded-md h-10 flex items-center justify-center gap-2'
                  onClick={handleGoogleSignIn}
                >
                  <img
                    src={Google}
                    alt='google'
                    className='w-6 h-6'
                  />
                  <p className='text-xl font-medium text-[#000000]'>Log in with google</p>
                </div>
                {/* divider */}
                <div className='flex items-center justify-center w-full gap-4 my-3'>
                  <div className='w-full h-[1px] border border-[#7F7F7F]' />
                  <p className='font-normal text-xl leading-tight'>Or</p>
                  <div className='w-full h-[1px] border border-[#7F7F7F]' />
                </div>
                {/* login credentials */}
                <div className='login-credentials'>
                  {/* Username */}
                  <div className='username w-full mb-3'>
                    <label htmlFor='username' className='text-xl font-normal leading-5 text-[#000000]'>Name</label>
                      <input 
                      type='text' 
                      id='username' 
                      name='username' 
                      placeholder='Enter your name'
                      className='border w-full rounded-xl px-2 py-1 bg-white text-[#000000] outline-none' 
                      />
                  </div>
                  {/* Email */}
                  <div className='email w-full mb-3'>
                    <label htmlFor='email' className='text-xl font-normal leading-5 text-[#000000]'>Email</label>
                      <input 
                      type='email' 
                      id='email' 
                      name='email' 
                      placeholder='Enter your email'
                      className='border w-full rounded-xl px-2 py-1 bg-white text-[#000000] outline-none' 
                      />
                  </div>
                  {/* Password */}
                  <div className='password w-full mb-3'>
                    <label htmlFor='password' className='text-xl font-normal leading-5 text-[#000000]'>Password</label>
                      <input 
                      type='password' 
                      id='password' 
                      name='password' 
                      placeholder='Enter your password'
                      className='border w-full rounded-xl px-2 py-1 bg-white text-[#000000] outline-none' 
                      />
                  </div>
                </div>
                {/* privacy policy */}
                <div className='privacy-policy flex items-center gap-2 w-full'>
                  <input type='checkbox' />
                  <p className='font-normal text-xl leading-6'>I agree to all Term, Privacy Policy and Fees</p>
                </div>
                {/* Submit button */}
                <button 
                type='submit' 
                className='bg-[#000000] text-[#FFFFFF] rounded-lg border border-[#3D5F3A] w-full py-1.5 mt-2 text-lg font-normal leading-4'>Sign Up</button>
              </form>
              <div className='mt-2'>
                <h4 className='font-normal text-xl text-[#000000]'>Already have an account? <span>Login</span></h4>
              </div>
            </div>
          </div>
          {/* Right side */}
          <div className='right-side w-full'>
            {/* Right side image */}
            <img src={Exclude} alt='Login-Image' className='w-full h-[550px]' />
          </div>
        </div>
      </div>
    </>
  )
}

export default Oauth
