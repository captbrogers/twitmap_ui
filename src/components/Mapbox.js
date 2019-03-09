import mapboxgl from 'mapbox-gl'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'

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
            zoom: 9,
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
                west: this.map.getBounds().getWest(),
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

    }

    shouldComponentUpdate(nextProps, nextState) {
        return (this.props === nextProps ? false : true);
    }

    componentDidUpdate() {
        console.log('this props: ', this.props)
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

export default connect(
    mapStateToProps
)(Mapbox);

Mapbox.propTypes= {
    updateMapInfo: PropTypes.func.isRequired,
}
