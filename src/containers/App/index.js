import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import AddPaymentPage from '../AddPaymentPage';
import RegistrationPage from '../RegistrationPage';
import LoginPage from '../LoginPage';
import UnAuthorizedHome from '../../components/UnAuthorizedHome';
import HostOrPark from '../../components/HostOrPark';

import '../PaymentForm/styles.css';
import './styles.css';

class App extends Component {
  constructor(props) {
    super(props);
  }



  render() {
   
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={UnAuthorizedHome} />
          <Route exact path="/payment" component={AddPaymentPage} />
          <Route exact path='/register' component={RegistrationPage} />
          <Route exact path='/users' component={HostOrPark} />
          <Route exact path='/login' component={LoginPage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default withRouter(ConnectedApp);
