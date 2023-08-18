import React, { useState } from 'react'
import "./UserDashboard.scss";
import BannerComponent from '../../components/BannerComponent/BannerComponent';
import CustomButton from '../../components/CustomButton/CustomButton';

const UserDashboard = () => {

  return (
    <section>
      <div className='UserNavBar'>
        <div className='UserNavBar__toggle' >
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 80 80" id="storage"><path fill="#ffff" fill-rule="evenodd" d="M122 154h56a12 12 0 0 0 0-24h-56a12 12 0 0 0 0 24zm0-20h56a8 8 0 0 1 0 16h-56a8 8 0 0 1 0-16zm-.2 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm8 0a2 2 0 0 0 0-4 2 2 0 0 0 0 4zm8 0a2 2 0 0 0 0-4 2 2 0 0 0 0 4zm40.2 14h-56a12 12 0 0 0 0 24h56a12 12 0 0 0 0-24zm0 20h-56a8 8 0 0 1 0-16h56a8 8 0 0 1 0 16zm-56.2-10a2 2 0 0 0 0 4 2 2 0 1 0 0-4zm8 0a2 2 0 0 0 0 4 2 2 0 0 0 0-4zm8 0a2 2 0 0 0 0 4 2 2 0 0 0 0-4zm40.2 18h-56a12 12 0 0 0 0 24h56a12 12 0 0 0 0-24zm0 20h-56a8 8 0 0 1 0-16h56a8 8 0 0 1 0 16zm-56.2-10a2 2 0 0 0 0 4 2 2 0 1 0 0-4zm8 0a2 2 0 0 0 0 4 2 2 0 0 0 0-4zm8 0a2 2 0 0 0 0 4 2 2 0 0 0 0-4z" transform="translate(-110 -130)"></path></svg>
        </div>
        <BannerComponent />
        <div className="UserNavBar__middleBloc" >
          <div  className='UserNavBar__navigations'>
            <CustomButton text="Dashboard" svgIcon={undefined} onClick={undefined} variant={''} />
            <CustomButton text="Documents" svgIcon={undefined} onClick={undefined} variant={''} />
            <CustomButton text="Corbeille" svgIcon={undefined} onClick={undefined} variant={''} />
          </div>
          <div className='StorageIndicatorComponent'>

          </div>
        </div>
        <div className='UserNavBar__profileBloc' >
          <div className='UserNavBar__profilePicture'></div>
          <p className='UserNavBar__profileText'>Profile</p>
        </div>

      </div>
    </section>
  )
}

export default UserDashboard