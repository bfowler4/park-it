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
    this.setState({ displayMenu: false });
  }

  handleLogout() {
    this.props.logout();
    this.handleHideMenu();
  }

  render() {
    const user_id = localStorage.getItem(`user_id`);

    return (
      <div className='navigation_menu_container'>
        <div className={`navigation_menu ${this.state.displayMenu ? null: `hide_menu`}`}>
        <div className='navigation_menu_links'>
          {user_id ? <Link to={`/payment`} onClick={this.handleHideMenu}>WALLET</Link> : 
        <Link to='/login' onClick={this.handleHideMenu}>LOGIN</Link>}
        {user_id && <Link to='/' onClick={this.handleLogout.bind(this)}>LOGOUT</Link>}
        </div>
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