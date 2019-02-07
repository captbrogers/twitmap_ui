const mapInfo = (state = {}, action) => {
    switch (action.type) {
        case "UPDATE_MAP_INFO":
            state = {
                ...state,
                mapInfo: action.payload
            };
            break;
        default:
            break;
    }

    return state;
};

export default mapInfo
