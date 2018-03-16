import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './styles.css';
import RegistrationPage from '../RegistrationPage';
import LoginPage from '../LoginPage';
import UnAuthorizedHome from '../../components/UnAuthorizedHome';
import HostOrPark from '../../components/HostOrPark';
import HomePark from '../ParkingHomePage/index'

class App extends Component {
  constructor(props) {
    super(props);
  }



  render() {
   
    return (
      <div className="App">
       <HomePark/> 
        <Route exact path='/' component={UnAuthorizedHome} />
        <Route exact path='/register' component={RegistrationPage} />
        <Route exact path='/users' component={HostOrPark} />
        <Route exact path='/login' component={LoginPage} />
      </div>
    );
  }
}

export default App;

