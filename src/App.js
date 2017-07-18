import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import './App.css';

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoiY3JvZ2Vyc2RldiIsImEiOiJjaW05bGNqaTEwM3E4dWFtNmZia3ltOW56In0.LGZdcr_dRMtNGM7nDRy6fw",

});

class App extends Component {
  render() {
    return (
        <Map
          style="mapbox://styles/mapbox/basic-v9"
          containerStyle={{ height: "100vh", width: "100vw" }}>
          <Layer
            type="symbol"
            id="marker"
            layout={{ "icon-image": "marker-15" }}>
            <Feature coordinates={[ -0.481747846041145, 51.3233379650232 ]}/>
          </Layer>
        </Map>
      );
  }
}

export default App;
