import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from '../api/auth'
import Cookies from 'js-cookie'
 
export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated,setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading,setLoading] = useState(true);

    const signin = async (user) => {
        try {
            const res = await loginRequest(user)
            // console.log(res);
            setUser(res.data);
            setIsAuthenticated(true);
            setLoading(false);
        } catch (error) {
            // console.log(error);            
            setErrors(error.response.data);
        }
    }

    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            // console.log(res);
            setUser(res.data);
            setIsAuthenticated(true);
            setLoading(true);
        } catch (error) {
            // console.log(error);            
            setErrors(error.response.data);
        }
    }

    const logout = () => {
        Cookies.remove("token");
        setIsAuthenticated(false);
        setUser(null);
    }

    useEffect(()=>{
        async function checkLogin() {
            const cookies = Cookies.get()
            // console.log('cookies');
            // console.log(cookies)
            if(cookies.token) {
                // console.log(cookies.token);
                try {
                    const res = await verifyTokenRequest(cookies.token);
                    if(!res.data) {
                        setIsAuthenticated(false);
                        setLoading(false);
                        return;
                    }    
                    setIsAuthenticated(true);
                    setUser(res.data);
                    // console.log('verificado');
                } catch (error) {
                    setIsAuthenticated(false)
                    setUser(null);
                    setLoading(false);
                }
            } else {
                setIsAuthenticated(false)
                setUser(null);
                setLoading(false);
            }
        }
        checkLogin();
    },[])

    return (
        <AuthContext.Provider value={
            { signup, signin, user, logout, 
              isAuthenticated, errors, loading }}>
            {children}
        </AuthContext.Provider>
    )
}