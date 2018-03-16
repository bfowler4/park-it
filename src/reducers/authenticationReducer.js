import { SET_USER, SET_USER_REGISTRATION_ERROR, SET_USER_VALIDATION_ERROR } from '../actions/authenticationActions';

const initialState = {
  user: null,
  loginError: false,
  registrationError: false
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.user };
    case SET_USER_VALIDATION_ERROR:
      return { ...state, loginError: action.error };
    case SET_USER_REGISTRATION_ERROR:
      return { ...state, registrationError: action.error }
    default:
      return state;
  }
}