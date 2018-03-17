import { combineReducers } from 'redux';
import authenticationReducer from './authenticationReducer';
import parkReducer from './parkReducer';

export default combineReducers({
  authentication: authenticationReducer,
  park:parkReducer
});