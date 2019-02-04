const mapInfo = (state = {}, action) => {
    switch (action.type) {
        case "UPDATE_MAP_INFO":
            state = {
                ...state,
                mapInfo: action.payload.mapInfo
            };
            break;
        default:
            break;
    }

    return state;
};

export default mapInfo
