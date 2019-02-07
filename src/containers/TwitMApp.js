import React from 'react'
import { connect } from 'react-redux'

import Mapbox from '../components/Mapbox'
import { updateMapInfo, asyncUpdateMapInfo } from '../actions/actionTypes'


// TRICKY: using ('s and )'s to wrap the return object to force ES* (5? 6? 7?)
//         to return an object literal. Note: The {}'s around the return object
//         are NOT intended to wrap the object literal.  They are intended to
//         define the return clause for the fat arrow function.
const mapStateToProps = (state) => ({
    mapInfo: state.mapInfo,
});


const mapDispatchToProps = (dispatch) => ({
    updateMapInfo: (mapInfo) => {
        dispatch(asyncUpdateMapInfo(mapInfo));
    }
});


class TwitMApp extends React.Component {

    render() {
        return <Mapbox updateMapInfo={
            (mapInfo) => { this.props.updateMapInfo(mapInfo) }
        }
        mapInfo={ this.props.mapInfo }/>;
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TwitMApp);
