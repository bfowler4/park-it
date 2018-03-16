import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import RegistrationPage from '../RegistrationPage';
import LoginPage from '../LoginPage';
import UnAuthorizedHome from '../../components/UnAuthorizedHome';
import HostOrPark from '../../components/HostOrPark';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Route exact path='/' component={UnAuthorizedHome} />
      <Route exact path='/register' component={RegistrationPage} />
      <Route exact path='/users' component={HostOrPark} />
      <Route exact path='/login' component={LoginPage} />
      </div>
    );
  }
}

export default App;

