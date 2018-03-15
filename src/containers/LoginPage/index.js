import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import { login } from '../../actions/authenticationActions';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
   
    this.props.login(this.state.email, this.state.password, () => {
      this.setState({ redirectToReferrer: true });
    });
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
        <h4>Login</h4>
        <div className='login_email_container'>
          <input 
            type='text'
            placeholder='EMAIL'
            name='email'
            value={this.props.email}
            onChange={this.handleChange} />
        </div>
        <div className='login_password_container'>
          <input 
            type='text'
            placeholder='PASSWORD'
            name='password'
            value={this.props.password}
            onChange={this.handleChange} />
        </div>
          <input 
            type='submit'
            value='LOGIN' />
          </form>
        <div className='login_form_links_container'>
            <Link to='/register' className='register_button'><p>register</p></Link>
          </div>
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
    }
  }
};

const ConnectedLoginPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);

export default ConnectedLoginPage;