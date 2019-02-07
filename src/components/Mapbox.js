import mapboxgl from 'mapbox-gl'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'

class Mapbox extends Component {
    constructor(props) {
        super(props);
        this.state = { mapInfo: {} };
        this.debounceUpdateMapInfo = debounce(
            this.debounceUpdateMapInfo,
            300 // ms to delay
        );
    }

    debounceUpdateMapInfo = (mapInfo) => {
        this.props.updateMapInfo(mapInfo);
    };

    handleMapChange = (mapInfo) => {
        this.setState({ mapInfo });
        this.debounceUpdateMapInfo(this.state.mapInfo);
    };

    componentDidMount() {
        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v9',
            center: [-118, 48],
            zoom: 9
        })

        // TRICKY: The context of 'this' changes inside the mapboxgl
        //         on move method.  Soooo we get around that by wrapping.
        let mapChangeTrigger = this.handleMapChange;

        let lng = 0, lat = 0, zoom = 0;
        let boundingBox = {};

        // (indirectly) set component state on map move
        this.map.on('move', () => {
            lat = this.map.getCenter().lat.toFixed(4);
            lng = this.map.getCenter().lng.toFixed(4);
            zoom = this.map.getZoom().toFixed(2);
            boundingBox = {
                north: this.map.getBounds().getNorth(),
                east: this.map.getBounds().getEast(),
                south: this.map.getBounds().getSouth(),
                west: this.map.getBounds().getWest()
            };
            mapChangeTrigger({
                lat: lat,
                lng: lng,
                zoom: zoom,
                boundingBox: boundingBox,
            });
        });

    }

    componentDidUpdate() {
        // this gets called every time anything breathes on the mapbox
    }

    componentWillUnmount() {
        this.map.remove();
        this.props.updateMap({});
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

export default Mapbox;

Mapbox.propTypes= {
    updateMapInfo: PropTypes.func.isRequired,
}
