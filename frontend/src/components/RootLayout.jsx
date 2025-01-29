import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { Navigate, redirect, useLocation, useNavigate} from 'react-router-dom';
import { auth } from '../utils/firebase';

const RootLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null); // State to store the user object
    useEffect(() => {
        // Set up the auth state observer
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                setUser(user);
                console.log("User is signed in:", user);
                return redirect('/sidebar')
            } else {

                // User is signed out
                setUser(null);
                console.log("User is signed out");
                console.log(location.pathname)
        if (location.pathname !== "/auth" && !user ) return navigate ("/auth")
            }
        });
    }
)
}

export default RootLayout
