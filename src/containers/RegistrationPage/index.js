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
      password: ``
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
   this.props.register(this.state.first_name, this.state.last_name, this.state.email, this.state.password, () => {
      this.setState({ redirectToLogin: true });
   });  
  }

  render() {
    if (this.state.redirectToLogin) {
      return <Redirect to={`/login`} />
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
                onChange={this.handleChange} />
                </div>
            <div className='registration_last_name_container'>
              <input 
                type='text'
                placeholder='LAST NAME'
                name='last_name'
                value={this.state.last_name}
                onChange={this.handleChange} />
            </div>
            <div className='registration_email_container'>
              <input 
                type='text'
                placeholder='EMAIL'
                name='email'
                value={this.state.email}
                onChange={this.handleChange} />
            </div>
            <div className='registration_password_container'>
              <input
                type='password'
                placeholder='PASSWORD'
                name='password'
                value={this.state.password}
                onChange={this.handleChange} />
              </div>
              <input  
                type='submit'
                value='SUBMIT' />
          </form>
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
    }
  }
};

const ConnectedRegistrationPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationPage);

export default ConnectedRegistrationPage;