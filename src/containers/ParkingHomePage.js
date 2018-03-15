import React, { Component } from 'react';
import Geocode from "react-geocode";
const API_KEY = "AIzaSyCrACMzBiHlUg7YaKRFMww3BL7K8ym3QFI";
Geocode.setApiKey(API_KEY);
const google = window.google;
const auto = new google.maps.places.AutocompleteService();


class HomePark extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: ``,
      predictions: []
    }
  }

  handleChange(event) {
    this.setState({ search: event.target.value });

    if (event.target.value) {
      auto.getPlacePredictions({input: event.target.value}, (predictions, status) => {
        this.setState({ predictions: predictions });
      });
    }
  }

  handleClick(event) {
    this.setState({ search: event.target.innerHTML });
    this.setState({ predictions: [] });
  }

  handleSubmit(e){
    e.preventDefault();
    Geocode.fromAddress(this.state.search).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
      },
      error => {
        console.error(error);
      }
    );
  }

  render() {
   
    return (
      <div className="App">
        <input type="text" value={this.state.search} onChange={this.handleChange.bind(this)}/>
        {this.state.predictions.length > 0 && this.state.predictions.map((prediction, index) => {
          return <div 
            key={index} 
            onClick={this.handleClick.bind(this)}>
            {prediction.description}
          </div>
        })}
        <button 
        type="submit"
        onClick={this.handleSubmit.bind(this)}>Submit</button>
      </div>
    );
  }
}

export default HomePark;