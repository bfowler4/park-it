import Axios from 'axios';

const REQUEST = '/api/spaces/request';


export const SPACE_REQUEST = "SPACE_REQUEST"


export const spaceRequest = (lat,lng)=>{
    let latlng = {
    longitude:lng,
    latitude:lat
  }
  return dispatch => {
    return Axios.post(REQUEST, latlng)
    .then(data=>{
      let space = data.data;
      dispatch({
        type:SPACE_REQUEST,
        payload:space
      })
    })
    .catch(err=>{
      console.log(err.message);
    })
  }
}



