import mapboxgl from 'mapbox-gl'
import React from 'react'
import AwesomeDebouncePromise from 'awesome-debounce-promise'

const mapLogger = text => console.log(text);
const debounceLog = AwesomeDebouncePromise(mapLogger, 250);

class Mapbox extends React.Component {
    componentDidMount() {

        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v9',
            center: [-118, 48],
            zoom: 9
        })

        // set component state on map move
        this.map.on('move', () => {
            const { lng, lat } = this.map.getCenter();

            this.props.updateMap({ mapInfo: {
                    lng: lng.toFixed(4),
                    lat: lat.toFixed(4),
                    zoom: this.map.getZoom().toFixed(2),
                    boundingBox: {
                        north: this.map.getBounds().getNorth(),
                        east: this.map.getBounds().getEast(),
                        south: this.map.getBounds().getSouth(),
                        west: this.map.getBounds().getWest()
                    }
                }
            });
        });
    }

    /*
    componentDidUpdate() {
        // this gets called every time anything breathes on the mapbox
        debounceLog(this.state);
        this.props.updateMapInfo(this.state);
    }

    componentWillUnmount() {
        this.map.remove();
        this.props.updateMap = () => {};
    }*/

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
