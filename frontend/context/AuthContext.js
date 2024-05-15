import { useState, createContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [error, setError] = useState(null)
    
    const router = useRouter()
    
    useEffect(() => {
        if(!user) {
            loadUser();
        }
    }, [user]);

    // login user
    const login = async ({username, password}) => {
        try {
            setLoading(true)
            const res = await axios.post(
                '/api/auth/login', 
                { username, password},
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
            if (res.data.success) {
                setIsSuccess(true);
                loadUser();
                setIsAuthenticated(true);
                setLoading(false);
                console.log('is auth ', isAuthenticated)
                router.push('/');
            }
        } catch (error) {
            setIsSuccess(false);
            setLoading(false)
            setError(
                error.response && error.response.data.detail 
                || error.response.data.error
            )
        }
    };

    // register user
    const register = async ({firstName, lastName, email, password}) => {
        try {
            setLoading(true)
            const res = await axios.post(
                `${process.env.API_URL}/api/register/`, 
                { first_name: firstName, last_name:lastName, email, password},
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
            if (res.data.success) {
                setIsSuccess(true);
                setLoading(false);
                router.push('/login');
            }
        } catch (error) {
            setIsSuccess(false);
            setLoading(false)
            setError(
                error.response && error.response.data.detail 
                || error.response.data.error
            )
        }
    }

    // get user
    const loadUser = async () => {
        try {
            setLoading(true)
            const res = await axios.get('/api/auth/user')
            if (res.data.user) {
                setIsSuccess(true);
                setIsAuthenticated(true)
                setLoading(false)
                setUser(res.data.user)
                router.push('/')
            }
        } catch (error) {
            setIsSuccess(false);
            setLoading(false)
            setIsAuthenticated(false)
            setUser(null)
            setError(
                error.response && error.response.data.detail 
                || error.response.data.error
            )
        }
    }

    // logout user
    const logout = async () => {
        try {
            const res = await axios.post('/api/auth/logout')
            if (res.data.success) {
                setIsSuccess(true);
                setIsAuthenticated(false);
                setUser(null);
            }
        } catch (error) {
            setIsSuccess(false);
            setLoading(false)
            setIsAuthenticated(false)
            setUser(null)
            setError(
                error.response && error.response.data.detail 
                || error.response.data.error
            )
        }
    }
    // clear error 
    const clearErrors = () => {
        setError(null);
    }

    return (
        <AuthContext.Provider 
            value={{ 
                user, 
                isAuthenticated, 
                loading, 
                error, 
                login, 
                register,
                logout,
                clearErrors,
                isSuccess
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext