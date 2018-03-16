import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import AddPaymentPage from '../AddPaymentPage';
import RegistrationPage from '../RegistrationPage';
import LoginPage from '../LoginPage';
import UnAuthorizedHome from '../../components/UnAuthorizedHome';
import HostOrPark from '../../components/HostOrPark';
import HomePark from '../ParkingHomePage/index'
import ReqParking from '../RequestParking'

import { loadUser } from '../../actions/authenticationActions';  

import '../PaymentForm/styles.css';
import './styles.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const user_id = localStorage.getItem(`user_id`);
    if (user_id) {
      this.props.loadUser(user_id);
    }
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
          <Route exact path='/park' componenent={HomePark}/>
          <Route exact path='/reviewSpace' component={ReqParking}/>
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
    loadUser: id => {
      dispatch(loadUser(id));
    }
  }
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default withRouter(ConnectedApp);
