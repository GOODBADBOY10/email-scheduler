import React from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import { GoogleAuthProvider, signInWithPopup, getAuth, signOut } from 'firebase/auth'
import { app } from '../utils/firebase.js'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext.jsx'

function Oauth() {

    const { googleSignIn, user } = useAuth();
    const navigate = useNavigate()
    const auth = getAuth(app)

    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        try {
          await googleSignIn();
          navigate("/dashboard");
        } catch (error) {
          console.log(error.message);
        }
      };

      const handleLogout = async (e) => {
        try {
            await signOut(auth);
            console.log('log out')
        } catch (error) {
            console.log(error.message)
        }
      }

    return (
        <>
            <div 
            className='border w-[50%] mx-auto text-center translate-y-28 bg-gray-600 text-white py-10'>
                <h2 
                className='bg-gray-600'>Sign Up to Schedule an Alarm</h2>
                <button 
                type='button' 
                onClick={handleGoogleSignIn} 
                className='hover:bg-white hover:text-gray-800 mt-6 p-3 border mx-auto flex items-center justify-center' >
                    <AiFillGoogleCircle 
                    className='w-6 h-6 mr-2 bg-blue-600' />
                    Continue with google
                </button>
                {/* <Link to={user ? '/dashboard' : '/'} className='text-white'>go to dashboard</Link> */}

                {/* <button onClick={handleLogout}>Logout</button> */}
            </div>
        </>
    )
}

export default Oauth
