import React from 'react';
import { Link } from 'react-router-dom';

const HostOrPark = ({ user }) => {
  return (
    <div className='host_or_park_container'>
      <div className='host_button_container'>
        <Link to='/spaces' className='host_button'><p>HOST WITH PARKIT</p></Link>
      </div>
      <div className='park_button_container'>
        <Link to='/users' className='park_button'><p>PARK WITH PARKIT</p></Link>
      </div>
    </div>
  )
}

export default HostOrPark;