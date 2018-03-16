import { SPACE_REQUEST } from '../actions/parkAction';

const initialState = {
  space : []
}

export default (state = initialState, action = {}) =>{
  switch (action.type){
    case SPACE_REQUEST:
    console.log('spaceReducer', action);
    return {...state, space: action.payload}
  
    default:
    return state;
  }
}
