import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import AuthContext  from "../../context/AuthContext";
import { toast } from 'react-toastify';

const Login = () => {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { isAuthenticated, loading, error, login } = useContext(AuthContext)

  useEffect(() => {
    if(error) {
      toast.error(error);
    }
    
    // if authenticated, redirect to dashboard
    if(isAuthenticated && !loading) {
      toast.success("Login Success");
      router.push('/')
    }
  }, [isAuthenticated, loading, error])
  
  const submitHandle = (e) => {
    e.preventDefault()
    login({username: email, password: password});
  }

  return (
    <div className="modalMask">
      <div className="modalWrapper">
        <div className="left">
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <Image src="/images/login.svg" alt="login" layout="fill" />
          </div>
        </div>
        <div className="right">
          <div className="rightContentWrapper">
            <div className="headerWrapper">
              <h2> LOGIN</h2>
              <br/>
            </div>
            <form className="form" onSubmit={submitHandle}>
              <div className="inputWrapper">
               
                <div className="inputBox">
                  <i aria-hidden className="fas fa-envelope"></i>
                  <input 
                    type="text" 
                    placeholder="Enter Your Email" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="inputBox">
                  <i aria-hidden className="fas fa-key"></i>
                  <input
                    type="password"
                    placeholder="Enter Your Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    title="Your email is invalid"
                  />

                </div>
              </div>

              <div className="loginButtonWrapper">
                <button type="submit" className="loginButton">
                  { loading ? 'Authenticating...' : 'Login'}
                </button>
              </div>
              <p style={{ textDecoration: "none" }} className="signup">
                New to Jobbee? <a href="/register">Create an account</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;