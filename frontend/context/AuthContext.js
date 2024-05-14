import { useState, createContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)
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
                loadUser();
                setIsAuthenticated(true);
                setLoading(false);
                console.log('is auth ', isAuthenticated)
                router.push('/');
            }
        } catch (error) {
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
                setIsAuthenticated(true)
                setLoading(false)
                setUser(res.data.user)
                router.push('/')
            }
        } catch (error) {
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
                setIsAuthenticated(false);
                setUser(null);
            }
        } catch (error) {
            setLoading(false)
            setIsAuthenticated(false)
            setUser(null)
            setError(
                error.response && error.response.data.detail 
                || error.response.data.error
            )
        }
    }

    return (
        <AuthContext.Provider 
            value={{ user, isAuthenticated, loading, error, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext