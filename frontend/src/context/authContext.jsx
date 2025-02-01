import { createContext, useState, useContext, useEffect } from "react";
import { auth } from "../utils/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const AuthContext = createContext();

const useAuth = () => {
    return useContext(AuthContext);
}


const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUser(user)
            setLoading(false);
        })
    }, []);

    const login = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider)
            const user = result.user
            console.log('User info', user);
        } catch (error) {
            console.log("Error during login", error)
        }
    }

    const logout = async () => {
        try {
            await auth.signOut();
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, loading, setLoading, setUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, AuthContext, useAuth };