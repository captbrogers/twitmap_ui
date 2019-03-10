export const UPDATE_MAP_INFO = "UPDATE_MAP_INFO";
export const FETCH_OBSERVATIONS_BEGIN = "FETCH_OBSERVATIONS_BEGIN";
export const FETCH_OBSERVATIONS_SUCCESS = "FETCH_OBSERVATIONS_SUCCESS";

const initialState = {
    mapInfo: "no mapInfo yet",
    observationData: "no numObservations yet",
}

export const mapUpdateReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_MAP_INFO:
            state = {
                ...state,
                mapInfo: action.payload
            };
            break;
        case FETCH_OBSERVATIONS_BEGIN:
            state = {
                ...state,
            }
            break;
        case FETCH_OBSERVATIONS_SUCCESS:
            state = {
                ...state,
                observationData: {
                    observations: action.payload.data,
                    numObservations: action.payload.num_observations
                }
            }
            break;
        default:
            break;
    }

    return state;
};
