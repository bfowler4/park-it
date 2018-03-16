import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map, Marker, GoogleApiWrapper } from "google-maps-react"; 

const API_KEY = "AIzaSyCrACMzBiHlUg7YaKRFMww3BL7K8ym3QFI";


class ReqParking extends Component {
  constructor(props){
    super(props);
  }

  
  fetchPlaces(mapProps, map){
    const {google} = mapProps;
    const service = new google.maps.places.PlacesService(map);
    // ...
  }

  render(){
    
    const style = {

      width: "375px",
      height: "650px"
    };
    return(
      <div>
        
        <Map
          google={this.props.google}
          onReady={this.fetchPlaces}
          style={style}
          initialCenter={{
            lat: 21.2969,
            lng: -157.8171
          }}
          zoom={17} >

          <Marker
            title={"Center"}
          />
          
          </Map>
          
          
      </div>
    )
  }
}

const mapStateToProps = state =>{
  
  return {
    park:state.park.space
  }
}



const ConnectedParkingHome = connect(
  mapStateToProps)(ReqParking);

  export default GoogleApiWrapper({
    apiKey: API_KEY
  })(ConnectedParkingHome)