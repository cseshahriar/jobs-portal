import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";

import AuthContext from '../../context/AuthContext';


const Header = () => {
  const {loading, user} = useContext(AuthContext);

  return (
    <div className="navWrapper">
      <div className="navContainer">
        <Link href="/">
          <div className="logoWrapper">
            <div className="logoImgWrapper">
              <Image width="30" height="30" src="/images/logo.png" alt="" />
            </div>
            <span className="logo1">Job</span>
            <span className="logo2">bee</span>
          </div>
        </Link>
        <div className="btnsWrapper">
          <Link href="/employeer/jobs/new">
            <button className="postAJobButton">
              <span>Post A Job</span>
            </button>
          </Link>

          { user ? (
            <div className="btn dropdown ml-3">
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
                <Link href="/employer/jobs" className="dropdown-item">
                    My Jobs
                </Link>
                <Link href="/me/applied" className="dropdown-item">
                    Jobs applied
                </Link>
                <Link href="/me/profile" className="dropdown-item">
                    Profile
                </Link>
                <Link href="/upload/resume" className="dropdown-item">
                    Upload Resume
                </Link>
                <Link href="/logout" className="dropdown-item text-danger">
                    Logout
                </Link>
              </div>

            </div>
          ) : (
              !loading && (
                <Link href="/login">
                  <button className="loginButtonHeader">
                    <span>Login</span>
                  </button>
                </Link>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;