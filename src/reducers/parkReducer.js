import { SPACE_REQUEST } from '../actions/parkAction';

const initialState = {
  space : null
}

export default (state = initialState, action = {}) =>{
  switch (action.type){
    case SPACE_REQUEST:
    return { ...state, space: action.payload}
    default:
    return state;
  }
}
