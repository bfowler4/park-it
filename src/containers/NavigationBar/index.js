import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logout } from '../../actions/authenticationActions';

class NavigationBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayMenu: false,
      displayCategories: false
    }

    this.handleDisplayMenu = this.handleDisplayMenu.bind(this);
    this.handleHideMenu = this.handleHideMenu.bind(this);
    this.handleDisplayCategories = this.handleDisplayCategories.bind(this);
  }

  handleDisplayMenu() {
    if(this.state.displayMenu) {
      this.handleHideMenu();
    } else {
      this.setState({ displayMenu: true });
    }
  }

  handleDisplayCategories() {
    this.setState({ displayCategories: true });
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

    )
  }
}

const mapStateToProps = state => {
  return {
    categories: state.items.categories,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(logout());
    }
  }
}