import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl'

import './index.css';
import TwitMApp from './TwitMApp';
import registerServiceWorker from './registerServiceWorker';

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

ReactDOM.render(<TwitMApp />, document.getElementById('root'));
registerServiceWorker();
