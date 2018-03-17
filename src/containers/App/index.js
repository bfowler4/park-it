import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './styles.css';

import NavigationBar from '../NavigationBar';
import AddPaymentPage from '../AddPaymentPage';
import RegistrationPage from '../RegistrationPage';
import LoginPage from '../LoginPage';
import HomePark from '../ParkingHomePage';
import HomePage from '../../components/HomePage';
import ReqParking from '../RequestParking'
import { loadUser } from '../../actions/authenticationActions';  

import '../PaymentForm/styles.css';
import './styles.css';
import '../NavigationBar/styles.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeRole: localStorage.getItem(`activeRole`) || ``
    }

    this.setActiveRole = this.setActiveRole.bind(this);
  }

  componentWillMount() {
    const user_id = localStorage.getItem(`user_id`);
    if (user_id) {
      this.props.loadUser(user_id);
    }
  }

  setActiveRole(event) {
    let role = event.target.value.includes(`park`) ? `park` : `host`;
    this.setState({ activeRole: event.target.value });
    localStorage.setItem(`activeRole`, role);
  }

  render() {
    return (
      <div className="App">
         <NavigationBar />
        <Switch>
          <Route exact path='/' render={() => <HomePage 
            user={this.props.user} 
            setActiveRole={this.setActiveRole}/> 
          }/>
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/register' component={RegistrationPage} />
          <Route exact path="/payment" component={AddPaymentPage} />
          <Route exact path="/park" component={HomePark}/>
          <Route exact path="/reviewSpace" component={ReqParking}/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authentication.user
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
