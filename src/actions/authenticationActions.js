import Axios from 'axios';

const HOST = `/api`;

export const SET_USER_ID = `SET_USER_ID`;
export const SET_USER_VALIDATION_ERROR = `SET_USER_VALIDATION_ERROR`;
export const SET_USER_REGISTRATION_ERROR = `SET_USER_REGISTRATION_ERROR`;

export const login = (email, password, callback) => {
  let loginObject = { email: email, password: password }
  return dispatch => {
    return Axios.post(`${HOST}/login`, loginObject)
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
      if (callback) {
        callback()
      }
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
        localStorage.setItem(`user_id`, user.data.id);
        dispatch({
          type: SET_USER_REGISTRATION_ERROR,
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
        console.log(err.message)
        let error = ``;
        error = `User already exists.`
        return dispatch({
          type: SET_USER_REGISTRATION_ERROR,
          error: error
        });
      });
  };
};

export const logout = () => {
  return dispatch => {
    return Axios.post(`${HOST}/logout`)
    .then(success => {
      localStorage.removeItem(`user_id`);
      dispatch({
        type: SET_USER_ID,
        id: null
      });
      return dispatch({
        type: SET_USER_VALIDATION_ERROR,
        error: ``
      });
    });
  };
};