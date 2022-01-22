

const initialState = {
    currStation: null,
    currSongList: [],
    currSongIdx: 0,
    alreadyPlayedIdx: []
}

export function mediaReducer(state = initialState, action) {
    let newState = state;

    switch (action.type) {
        case "SET_STATION":
            newState = { ...state, currStation: action.station };
            break;

        case "SET_SONGS":
            newState = { ...state, currSongList: action.songs };
            break;

        case "SET_CURR_SONG_IDX":
            newState = { ...state, currSongIdx: action.songIdx };
            break;

        case "CHANGE_SONG":
            newState = { ...state, currSongIdx: action.newSongIdx };
            break;

        case "SET_ALREADY_PLAYED":
            newState = { ...state, alreadyPlayedIdx: [action.newSongIdx] };
            break;

        case "UPDATE_ALREADY_PLAYED":
            newState = { ...state, alreadyPlayedIdx: [...state.alreadyPlayedIdx, action.newIdx] };
            break;

        case "RESET_ALREADY_PLAYED":
            newState = { ...state, alreadyPlayedIdx: [] };
            break;


        default:
            break;
    }

    return newState;
}