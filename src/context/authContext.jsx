import { onAuthStateChanged } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup, getAuth, signOut } from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import { Navigate } from "react-router-dom";

const authContext = createContext();

export function useAuth() {
    return useContext(authContext);
}  



export function UserAuthContextProvider({ children }) {
    const [user, setUser] = useState({});

    function logOut() {
      return signOut(auth);
    }

    async function googleSignIn() {
      const provider = new GoogleAuthProvider()
          provider.setCustomParameters({ prompt: 'select_account' })
          try {
              const resultFromGoogle = await signInWithPopup(auth, provider)
              const response = await resultFromGoogle
              Navigate('/dashboard')
          } catch (error) {
          console.log(error)
          }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
          console.log("Auth", currentuser);
          setUser(currentuser);
        });
    
        return () => {
          unsubscribe();
        };
      }, []);
  
  
    return (
      <authContext.Provider
        value={{ user, logOut, googleSignIn }}
      >
        {children}
      </authContext.Provider>
    );
  }