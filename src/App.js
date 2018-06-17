import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import './App.css';

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoiY3JvZ2Vyc2RldiIsImEiOiJjaW05bGNqaTEwM3E4dWFtNmZia3ltOW56In0.LGZdcr_dRMtNGM7nDRy6fw",

});

class App extends Component {
  render() {
    return (
        <div>
        <h1>stuff</h1>
        <Map
          style = "mapbox://styles/mapbox/basic-v9"
          center = {[-77.0369, 38.8852]}
          containerStyle = {{ height: "100vh", width: "100vw" }}>
          <Layer
            type = "symbol"
            id = "marker"
            layout = {{ "icon-image": "marker-15" }}>
            <Feature coordinates = {[ -77.03, 38.8852]}/>
          </Layer>
        </Map>
        </div>
      );
  }
}

export default App;
