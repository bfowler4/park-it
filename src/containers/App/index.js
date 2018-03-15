import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import RegistrationPage from '../RegistrationPage';
import LoginPage from '../LoginPage';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Route exact path='/register' component={RegistrationPage} />
      <Route exact path='/login' component={LoginPage} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // currentPage: state.pageDisplay.currentPage
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // setPageToDisplay: page => {
    //   dispatch(setPageToDisplay(page));
    // }
  }
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default withRouter(ConnectedApp);
