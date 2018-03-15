import React, { Component } from 'react';
const google = window.google;
const auto = new google.maps.places.AutocompleteService();

class App extends Component {
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

  render() {
    console.log(this.state.search);
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
      </div>
    );
  }
}

export default App;
