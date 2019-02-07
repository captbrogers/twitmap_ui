import axios from 'axios';

export const updateMapInfo = (mapInfo) => {
    return {
        type: "UPDATE_MAP_INFO",
        payload: mapInfo
    };
}

export const asyncUpdateMapInfo = () => {
    return (dispatch) => {
        dispatch({ type: "FETCH_OBSERVATIONS_BEGIN", payload: "" })

        axios.get("https://jsonplaceholder.typicode.com/users")
        .then(
            (response) => {
                if (response.status === 200) {
                    return response.data
                }
                console.log(response)
                throw new Error("404");
            }
        )
        .then((json) => dispatch(
            { type: "FETCH_OBSERVATIONS_SUCCESS", payload: json })
        )
    };
};
