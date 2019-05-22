import mapboxgl from 'mapbox-gl'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'

import 'mapbox-gl/dist/mapbox-gl.css';
import red_marker from '../assets/icons/marker.png';

const mapStateToProps = (state) => ({
    mapInfo: state.mapUpdateReducer.mapInfo,
    observationData: state.mapUpdateReducer.observationData,
});

class Mapbox extends Component {
    constructor(props) {
        super(props);

        this.debounceUpdateMapInfo = debounce(
            this.debounceUpdateMapInfo,
            300 // ms to delay
        );
    }

    debounceUpdateMapInfo = (mapInfo) => {
        this.props.updateMapInfo(mapInfo);
    };

    handleMapChange = (mapInfo) => {
        this.debounceUpdateMapInfo(mapInfo);
    };

    componentDidMount() {
        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v9',
            center: [-118, 48],
            zoom: 10,
        })

        let map = this.map;

        // TRICKY: The context of 'this' changes inside the mapboxgl
        //         on move method.  Soooo we get around that by wrapping
        //         the move handler.
        let mapChangeTrigger = this.handleMapChange;

        let lng = 0, lat = 0, zoom = 0;
        let boundingBox = {};

        map.addControl(new mapboxgl.NavigationControl());

        // (indirectly) set component state on map move
        map.on('move', () => {
            lat = map.getCenter().lat.toFixed(4);
            lng = map.getCenter().lng.toFixed(4);
            zoom = map.getZoom().toFixed(2);
            boundingBox = {
                north: map.getBounds().getNorth(),
                east: map.getBounds().getEast(),
                south: map.getBounds().getSouth(),
                west: map.getBounds().getWest(),
            };
            let bb = boundingBox;
            let boundingBoxPolygon = "POLYGON(( " + bb.east + " " + bb.north + ", " + bb.west + " " + bb.north + ", " + bb.west + " " + bb.south + ", " + bb.east + " " + bb.south + ", " + bb.east + " " + bb.north + " ))";

            mapChangeTrigger({
                lat,
                lng,
                zoom,
                boundingBox,
                boundingBoxPolygon,
            });
        });

        map.on('load', () => {
            map.loadImage(red_marker, (error, image) => {
                if (error) throw error;
                map.addImage('red_marker', image);
            });
            map.addSource("observations_geojson", {
                type: "geojson",
                data: this.props.observationData.observations.geo_json
            });
            map.addLayer({
                id: 'observations_layer',
                type: 'symbol',
                source: 'observations_geojson',
                /*layout: {
                    'icon-image': 'red_marker',
                    'icon-allow-overlap': true,
                }*/
            });
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (this.props === nextProps ? false : true);
    }

    componentDidUpdate() {
        let observations_data = this.props.observationData.observations.geo_json;
        this.map.getSource('observations_geojson').setData(observations_data);
    }

    componentWillUnmount() {
        this.map.remove();
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

export default connect(
    mapStateToProps
)(Mapbox);

Mapbox.propTypes= {
    updateMapInfo: PropTypes.func.isRequired,
}
