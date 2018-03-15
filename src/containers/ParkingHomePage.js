import React, { Component } from "react";
import Geocode from "react-geocode";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

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
      key: ""
    };
  }

  handleChange(event) {
    this.setState({ search: event.target.value });

    if (event.target.value) {
      auto.getPlacePredictions(
        { input: event.target.value },
        (predictions, status) => {
          this.setState({ predictions: predictions });
        }
      );
    }
  }

  handleClick(event) {
    console.log(event.target.innerHTML);
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

  handleSubmit(e) {
    e.preventDefault();
  }

  handleMapChange(mapProps, map) {
    console.log(`mapProps`, mapProps);
    console.log(`map`, map.center.lat());
  }

  render() {
    const style = {
      width: "400px",
      height: "400px"
    };

    return (
      <div className="App">
        <input
          type="text"
          value={this.state.search}
          onChange={this.handleChange.bind(this)}
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
        <br /> <br /> <br /> <br />
        <Map
          key={this.state.key}
          google={this.props.google}
          style={style}
          initialCenter={{
            lat: this.state.lat,
            lng: this.state.lng
          }}
          zoom={15}
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

export default GoogleApiWrapper({
  apiKey: API_KEY
})(HomePark);
