import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { login, logout } from '../../actions/authenticationActions';

class NavigationBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayMenu: false,
    }

    this.handleDisplayMenu = this.handleDisplayMenu.bind(this);
    this.handleHideMenu = this.handleHideMenu.bind(this);
  }

  handleDisplayMenu() {
    if (this.state.displayMenu) {
      this.handleHideMenu();
    } else {
      this.setState({ displayMenu: true });
    }
  }

  handleHideMenu(event) {
    this.setState({ displayCategories: false });
    this.setState({ displayMenu: false });
  }

  handleLogout() {
    this.props.logout();
    this.handleHideMenu();
  }

  render() {
    const user_id = localStorage.getItem(`user_id`);

    return (
      <div className='header'>
        {this.state.displayMenu ?
          <div className='blur' onClick={this.handleHideMenu}></div>
          : null}
        <div className={`navigation_menu ${this.state.displayMenu ? null : `hide_menu`}`}>
          <h6 className='navigation_menu_title'>MENU</h6>
          <div className='navigation_menu_links'>
            {user_id ? <Link to={`/users/${user_id}`} onClick={this.handleHideMenu}>MY PROFILE</Link> :
              <Link to="/login" onClick={this.handleHideMenu}>LOGIN</Link>}
            {user_id && <Link to="/" onClick={this.handleLogout.bind(this)}>LOGOUT</Link>}
            {user_id && <Link to="/payment" onClick={this.handleHideMenu.bind(this)}>WALLET</Link>}
          </div>
        </div>
        <div className='base_navigation_bar'>
          <Link to='/' className='home_button' onClick={this.handleHideMenu}>HOME</Link>
          <span onClick={this.handleDisplayMenu} className='expand_button'>MENU</span>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password, callback) => {
      dispatch(login(email, password, callback))
    },
    logout: () => {
      dispatch(logout());
    }
  }
}

const ConnectedNavigationBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationBar);

export default ConnectedNavigationBar;