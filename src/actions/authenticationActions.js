import Axios from 'axios';

const HOST = `/api`;

export const SET_USER_ID = `SET_USER_ID`;
export const SET_USER_VALIDATION_ERROR = `SET_USER_VALIDATION_ERROR`;
export const SET_USER_REGISTRATION_ERROR = `SET_USER_REGISTRATION_ERROR`;

export const login = (email, password, callback) => {
  return dispatch => {
    return Axios.post(`${HOST}/login`, { email, password })
      .then(user => {
        localStorage.setItem(`user_id`, user.data.id);
        dispatch({
          type: SET_USER_VALIDATION_ERROR,
          error: false
        })
        return dispatch({
          type: SET_USER_ID,
          id: user.data.id
        });
      })
      .then(() => {
        callback();
      })
      .catch(err => {
        return dispatch({
          type: SET_USER_VALIDATION_ERROR,
          error: true
        });
      });
  };
};

export const register = (first_name, last_name, email, password, callback) => {
  return dispatch => {
    return Axios.post(`${HOST}/register`, { first_name, last_name, email, password })
      .then(user => {
        dispatch({
          type: SET_USER_REGISTRATION_ERROR,
          error: false
        });
      })
      .then(() => {
        callback();
      })
      .catch(err => {
        let error = ``;
        error = `User already exists.`
        return dispatch({
          type: SET_USER_REGISTRATION_ERROR,
          error: error
        });
      });
  };
};