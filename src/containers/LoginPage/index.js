import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import { login, logout } from '../../actions/authenticationActions';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: ``,
      password: ``,
      emailError: false,
      passwordError: false,
      redirectToReferrer: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.props.logout();
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ [`${event.target.name}Error`]: false });
  }

  handleSubmit(event) {
    event.preventDefault();
    let isError = false;
    if (!this.state.email) {
      this.setState({ emailError: true })
      isError = true;
    }
    if (!this.state.password) {
      this.setState({ passwordError: true });
      isError = true;
    }
    if (!isError) {
      this.props.login(this.state.email, this.state.password, () => {
        this.setState({ redirectToReferrer: true });
      });
    }
  }


  render() {
    const { from } = this.props.location.state || { from: { pathname: `/` } };

    if (this.state.redirectToReferrer) {
      return <Redirect to={from} />
    }

    return (
      <div className='login_page_container'>
        <div className='login_form_container'>
          <form className='login_form' onSubmit={this.handleSubmit}>
            <div className='login_email_container'>
              <input
                type='text'
                placeholder='EMAIL'
                name='email'
                value={this.props.email}
                onChange={this.handleChange}
                className={this.state.usernameError ? `input_error` : ``} />
              {this.state.usernameError &&
                <p className='login_form_error'>required</p>}
            </div>

            <div className='login_password_container'>
              <input
                type='text'
                placeholder='PASSWORD'
                name='password'
                value={this.props.password}
                onChange={this.handleChange}
                className={this.state.passwordError ? `input_error` : ``} />
              {this.state.passwordError &&
                <p className='login_form_error'>required</p>}
            </div>
            <input
              type='submit'
              value='LOGIN' />
          </form>
          {this.props.validationError &&
            <div className='validation_error_container'>
              <p>the username and or password you entered was not valid. please try again.</p>
            </div>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    validationError: state.authentication.loginError
  }
};

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password, callback) => {
      dispatch(login(email, password, callback))
    },
    logout: () => {
      dispatch(logout());
    }
  }
};

const ConnectedLoginPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);

export default ConnectedLoginPage;