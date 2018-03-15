import React, { Component } from 'react';
import HomePark from '../ParkingHomePage';


class App extends Component {
  constructor(props) {
    super(props);
  }



  render() {
   
    return (
      <div className="App">
       <HomePark/>
      </div>
    );
  }
}

export default App;
