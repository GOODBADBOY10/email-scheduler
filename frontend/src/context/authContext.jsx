import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

const useAuth = () => {
    return useContext(AuthContext);
}


const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, AuthContext, useAuth };