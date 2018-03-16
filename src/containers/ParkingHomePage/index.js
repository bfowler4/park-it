import React, { Component } from "react";
import {connect} from 'react-redux';
import Geocode from "react-geocode";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import {spaceRequest} from "../../actions/parkAction";

const API_KEY = "AIzaSyCrACMzBiHlUg7YaKRFMww3BL7K8ym3QFI";
Geocode.setApiKey(API_KEY);
const google = window.google;
const auto = new google.maps.places.AutocompleteService();

class HomePark extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: ``,
      predictions: [],
      lat: 21.2969,
      lng: -157.8171,
      key: ``,
      targLat:``,
      targLng:``
    };
  }

  handleChange(event) {
    this.setState({ search: event.target.value });
   
    if (event.target.value) {
      auto.getPlacePredictions(
        { input: event.target.value },
        (predictions, status) => {
        
          status === "OK"?this.setState({ predictions: predictions }):this.setState({predictions: []});
        }
      );
    }

 
    

  }

  handleClick(event) {
    Geocode.fromAddress(event.target.innerHTML).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;

        this.setState({ lat: lat });
        this.setState({ lng: lng });
        console.log(this.state.lng, this.state.lng);
        this.setState({ key: Math.random() });
      },
      error => {
        console.error(error);
      }
    );

    this.setState({ search: event.target.innerHTML });
    this.setState({ predictions: [] });
  }


  handleMapChange(mapProps, map) {
    this.setState({ targLat: map.center.lat() })
    this.setState({ targLng: map.center.lng() })
    // console.log(`map`, map.center.lat());
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.props.spaceRequest);
   this.props.spaceRequest(this.state.targLat,this.state.targLng);
  }

  render() {
    const style = {
      width: "375px",
      height: "500px"
    };
    
    return (
      <div className="App">
        <input
          type="text"
          value={this.state.search}
          onChange={this.handleChange.bind(this)}
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `280px`,
            height: `32px`,
            marginTop: `27px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `10px`,
            outline: `none`,
            textOverflow: `ellipses`
          }}
        />
        {this.state.predictions.length > 0 &&
          this.state.predictions.map((prediction, index) => {
            return (
              <div key={index} onClick={this.handleClick.bind(this)}>
                {prediction.description}
              </div>
            );
          })}
        <button type="submit" onClick={this.handleSubmit.bind(this)}>
          Submit
        </button>
        
        <Map
          key={this.state.key}
          google={this.props.google}
          style={style}
          initialCenter={{
            lat: this.state.lat,
            lng: this.state.lng
          }}
          zoom={16}
          onDragend={this.handleMapChange.bind(this)}
        >
          <Marker
            title={"Center"}
          />
        </Map>
      </div>
    );
  }
}

const mapStateToPros = state => {
  return {

  }
}

const mapDispatchToProps = dispatch => {
  return {
    spaceRequest: (lat,lng) => {
      dispatch(spaceRequest(lat,lng))
    } 
  };
};


// export default GoogleApiWrapper({
//   apiKey: API_KEY
// })(HomePark);

const ConnectedParkingHome = connect(
  mapStateToPros,
  mapDispatchToProps)(HomePark);

  export default GoogleApiWrapper({
    apiKey: API_KEY
  })(ConnectedParkingHome)


