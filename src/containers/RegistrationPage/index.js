import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import { register, SET_USER_REGISTRATION_ERROR } from '../../actions/authenticationActions';

class RegistrationPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: ``,
      last_name: ``,
      email: ``,
      password: ``,
      emailError: false,
      first_nameError: false,
      last_nameError: false,
      passwordError: false,
      redirectToUsers: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ [`${event.target.name}Error`]: false });
    if (this.props.registrationError) {
      this.props.resetError();
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    let isError = false;
    if(!this.state.email) {
      this.setState({ emailError: true });
      isError = true;
    }
    if(!this.state.first_name) {
      this.setState({ first_nameError: true });
      isError = true;
    }
    if(!this.state.last_name) {
      this.setState({ last_nameError: true });
      isError = true;
    }
    if(!this.state.password) {
      this.setState({ passwordError: true });
      isError = true;
    }
    if(!isError) {
      this.props.register(this.state.first_name, this.state.last_name, this.state.email, this.state.password, () => {
        this.setState({ redirectToUsers: true });
      });
    }
  }

  render() {
    if (this.state.redirectToUsers) {
      return <Redirect to={`/users`} />
    }
    return (
      <div className='registration_page_container'>
        <div className='registration_form_container'>
          <form className='registration_form' onSubmit={this.handleSubmit}>
            <h4>register</h4>
            <div className='registration_first_name_container'>
              <input
                type='text'
                placeholder='FIRST NAME'
                name='first_name'
                value={this.state.first_name}
                onChange={this.handleChange} 
                spellCheck='false'
                className={this.state.first_nameError ? `input_error` : ``} />
              {this.state.first_nameError &&
                <p className='registration_form_error'>required</p>}
            </div>
            <div className='registration_last_name_container'>
              <input
                type='text'
                placeholder='LAST NAME'
                name='last_name'
                value={this.state.last_name}
                onChange={this.handleChange} 
                spellCheck='false'
                className={this.state.last_nameError ? `input_error` : ``} />
              {this.state.last_nameError &&
                <p className='registration_form_error'>required</p>}
            </div>
            <div className='registration_email_container'>
              <input
                type='text'
                placeholder='EMAIL'
                name='email'
                value={this.state.email}
                onChange={this.handleChange} 
                spellCheck='false'
                className={this.state.emailError ? `input_error` : ``} />
              {this.state.emailError &&
                <p className='registration_form_error'>required</p>}
            </div>
            <div className='registration_password_container'>
              <input
                type='password'
                placeholder='PASSWORD'
                name='password'
                value={this.state.password}
                onChange={this.handleChange} 
                className={this.state.passwordError ? `input_error` : ``} />
              {this.state.passwordError &&
                <p className='registration_form_error'>required</p>}
            </div>
          <input 
            type='submit'
            value='REGISTER' />
          </form>
          {this.props.registrationError &&
            <div className='registration_error_container'>
              <p>{this.props.registrationError}</p>
            </div>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    registrationError: state.authentication.registrationError
  }
};

const mapDispatchToProps = dispatch => {
  return {
    register: (first_name, last_name, email, password, callback) => {
      dispatch(register(first_name, last_name, email, password, callback));
    },
    resetError: () => {
      dispatch({
        type: SET_USER_REGISTRATION_ERROR,
        error: false
      });
    }
  }
};

const ConnectedRegistrationPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationPage);

export default ConnectedRegistrationPage;