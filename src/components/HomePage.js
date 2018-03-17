import React from 'react';
import { Redirect } from 'react-router-dom';

import HostOrPark from './HostOrPark';
import UnAuthorizedHome from './UnAuthorizedHome';

export default ({ user, setActiveRole }) => {
  if (user) {
    switch (localStorage.getItem(`activeRole`)) {
      case `park`:
        return (
          <Redirect to='/park' />
        );
      case `host`:
        return (
          <Redirect to='/host' />
        )
      default:
        return (
          <HostOrPark setActiveRole={setActiveRole} />
        );
    }
  } else {
    return (
      <UnAuthorizedHome />
    );
  }
}