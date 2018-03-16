import Axios from 'axios';

const REQUEST = '/api/spaces/request';


export const SPACE_REQUEST = "SPACE_REQUEST"


export const spaceRequest = (lat,lng)=>{
    let latlng = {
    longitude:lng,
    latitude:lat
  }
  console.log('1',latlng)
  return dispatch => {
    return Axios.post(REQUEST, latlng)
    .then(latLng=>{
      console.log('2',latLng)
    })
    .catch(err=>{
      console.log(err.message);
    })
  }
}



