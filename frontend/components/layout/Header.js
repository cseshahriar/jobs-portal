import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
//  https://nextjs.org/docs/messages/react-hydration-error
import AuthContext from '../../context/AuthContext';

const Header = () => {
  const {loading, user, logout} = useContext(AuthContext);

  const logoutHandler= () => {
    logout();
  }

  return (
    <div className="navWrapper">
      <div className="navContainer">
        <Link href="/">
          <div className="logoWrapper">
            <div className="logoImgWrapper">
              <Image width="30" height="30" src="/images/logo.png" alt="" />
            </div>
            <div>
              <span className="logo1">Job</span>
              <span className="logo2">Portal</span>
            </div>
          </div>
        </Link>
        <div className="btnsWrapper">
          <Link href="/employeer/jobs/new">
            <button className="postAJobButton">
              <span>Post A Job</span>
            </button>
          </Link>

          { user ? (
            <div className="dropdown ml-3">
              <a 
                className="btn dropdown-toggle mr-4"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                arial-haspopup="true"
                arial-expanded="false"
              >
                <span>Hi, {  user.first_name ? user.first_name :  user.email }</span> {" "}
              </a>
              <div className="dropdown-menu" arial-labelledby="dropDownMenuButton">
                <Link href="/me" className="dropdown-item"> Profile</Link>
                <Link href="/employeer/jobs" className="dropdown-item"> My Jobs</Link>
                <Link href="/me/applied" className="dropdown-item"> Jobs applied</Link>
                <Link href="/upload/resume" className="dropdown-item"> Upload Resume</Link>
                <Link href="" className="dropdown-item text-danger" onClick={logoutHandler}>
                    Logout
                </Link>
              </div>

            </div>
          ) : (
              !loading && (
                <div>
                  <Link href="/login">
                    <button className="loginButtonHeader">
                      <span>Login</span>
                    </button>
                  </Link>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;