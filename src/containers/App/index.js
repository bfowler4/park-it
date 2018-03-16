import React, { Component } from 'react';
import HomePark from '../ParkingHomePage/index';
import ReqParking from '../RequestParking'


class App extends Component {
  constructor(props) {
    super(props);
  }



  render() {
   
    return (
      <div className="App">
       {/* <HomePark/> */}
       <ReqParking/>
      </div>
    );
  }
}

export default App;
