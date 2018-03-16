import React from 'react';

const HostOrPark = ({ setActiveRole }) => {
  return (
    <div className='host_or_park_container'>
      <div className='host_button_container'>
        <button onClick={setActiveRole} value="host">HOST WITH PARKIT</button>
      </div>
      <div className='park_button_container'>
        <button onClick={setActiveRole} value="park">PARK WITH PARKIT</button>
      </div>
    </div>
  )
}

export default HostOrPark;