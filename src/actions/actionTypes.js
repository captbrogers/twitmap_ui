import axios from 'axios';

export const updateMapInfo = (mapInfo) => {
    return {
        type: "UPDATE_MAP_INFO",
        payload: mapInfo,
    };
}

export const asyncUpdateMapInfo = (mapInfo) => {
    return (dispatch) => {
        dispatch({ type: "FETCH_OBSERVATIONS_BEGIN", payload: "" });
        dispatch({ type: "UPDATE_MAP_INFO", payload: mapInfo });

        let urlStem = "http://192.168.1.8:5001/observations"
        let encodedURL = encodeURI(urlStem)

        axios.post(encodedURL, {
            box: mapInfo.boundingBoxPolygon,
        })
        .then(
            (response) => {
                if (response.status === 200) {
                    return response.data;
                }
                console.log(response)
                throw new Error("404");
            }
        )
        .then((observationData) => dispatch(
            { type: "FETCH_OBSERVATIONS_SUCCESS", payload: observationData })
        )
        .catch(
            { type: "FETCH_OBSERVATIONS_ERROR", payload: "whoops."}
        );
    };
};
