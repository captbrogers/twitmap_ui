import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';

import mapInfo from './reducers/rootReducer';
import mapboxgl from 'mapbox-gl'

import './index.css';
import TwitMApp from './containers/TwitMApp';
import registerServiceWorker from './registerServiceWorker';

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

const reduxLogger = createLogger({});

const store = createStore(
    combineReducers({ mapInfo }),
    {},
    applyMiddleware(reduxLogger)
);

/*store.subscribe(() => {
    console.log("Store updated!", store.getState());
});*/

ReactDOM.render(
    <Provider store={store}>
        <TwitMApp />
    </Provider>, document.getElementById('root')
);
registerServiceWorker();
