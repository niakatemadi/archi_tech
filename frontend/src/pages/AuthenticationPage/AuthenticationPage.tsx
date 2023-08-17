import React from 'react'
import "./AuthenticationPage.scss";
import SignUpPage from "../SignUpPage/SignUpPage";
import BannerComponent from '../../components/BannerComponent/BannerComponent';
import LogInPage from '../LogInPage/LogInPage';
import { useState } from 'react';

const AuthenticationPage = () => {

  const [isLoggedInPage, setIsLoggedInPage] = useState<boolean>(true);
  
  return (
    <section className='AuthenticationSection'>
      <div  className='AuthenticationContainer'>
        <BannerComponent />
        { isLoggedInPage ? <LogInPage setIsLoggedInPage= {setIsLoggedInPage} isLoggedInPage={isLoggedInPage} /> : <SignUpPage setIsLoggedInPage= {setIsLoggedInPage} isLoggedInPage={isLoggedInPage} />}
      </div>
    </section>
  )
}

export default AuthenticationPage