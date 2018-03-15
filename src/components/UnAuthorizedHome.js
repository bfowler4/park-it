import React from 'react';
import { Link } from 'react-router-dom';

const UnAuthorizedHome = ({ user }) => {
  return (
    <div className='unauthorized_home_container'>
    <div className='login_container'>
      <Link to='/login' className='login_button'><p>LOGIN</p></Link>
      </div>
    <div className="register_container">
    <Link to='/register' className='register_button'><p>CREATE AN ACCOUNT</p></Link>
    </div>
    </div>
  )
}

export default UnAuthorizedHome;