import mapboxgl from 'mapbox-gl'
import React from 'react'
import AwesomeDebouncePromise from 'awesome-debounce-promise'

//mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

const mapLogger = text => console.log(text);
const debounceLog = AwesomeDebouncePromise(mapLogger, 500)

export default class TwitMApp extends React.Component {
    componentDidMount() {
        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/dark-v9',
            zoom: 4,
        })

        this.map.on('move', () => {
            const { lng, lat } = this.map.getCenter();

            this.setState({
                lng: lng.toFixed(4),
                lat: lat.toFixed(4),
                zoom: this.map.getZoom().toFixed(2),
            });

            debounceLog(this.state);
        });
    }

    componentDidUpdate() {
        // this gets called every time anything breathes on the mapbox
    }

    componentWillUnmount() {
        this.map.remove();
        this.setState = () => {};
    }

    render() {
        const map_canvas_style = {
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: '100%',
        };

        return <div style={map_canvas_style} ref={el => this.mapContainer = el} />;
    }
}

// http://davidwalsh.name/javascript-debounce-function
function debounce2(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this;
        var args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};
