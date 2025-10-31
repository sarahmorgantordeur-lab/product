import api from "../api";
import { createContext, useEffect, useState, useContext } from "react";


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [Loading, isLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
        isLoading(false);
    }, []);

    const register = async (name, email, password) => {
        try {
            const response = await api.post("/register", {
                name,
                email,
                password
            });
            const { token : newToken, user : newUser } = response.data;
            localStorage.setItem("token", newToken)
            setUser(newUser);
            setToken(newToken);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data.data?.error || "Une erreur est survenue",
            }
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);

    };
    
    
    
    const login = async (email, password) => {
        try {
            const response = await api.post("/auth/login", {
                email,
                password
            });
            const { token : newToken, user : newUser } = response.data;
            localStorage.setItem("token", newToken)
            setUser(newUser);
            setToken(newToken);
            return { success: true, message: "Connexion réussie" };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.error || "Une erreur est survenue",
            }
        }
    };
    const isAuthenticated = () => {
        return !! token;
    }
    const value = {
        user,
        token, 
        Loading,
        register,
        login,
        isAuthenticated,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error(
            'useAuth must be used within an AuthContextProvider'
        );
    }
    return context
}
