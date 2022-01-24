const initialState = {
    player: null,
    isPlaying: false,
    currStation: null,
    currSongList: [],
    notPlayedId: [],
    currSongIdx: 0,
    currSongId: null,
}

export function mediaReducer(state = initialState, action) {
    const notPlayedId = state.notPlayedId;
    let newState = state;

    switch (action.type) {
        case "SET_PLAYER":
            newState = { ...state, player: action.player };
            break;

        case "SET_STATION":
            newState = { ...state, currStation: action.station };
            break;

        case "SET_SONGS":
            newState = { ...state, currSongList: action.songs };
            break;

        case "TOGGLE_IS_PLAYING":
            newState = { ...state, isPlaying: action.isPlaying };
            break;

        case "SET_CURR_SONG_ID":
            newState = { ...state, currSongId: action.songId };
            break;

        case "SET_CURR_SONG_IDX":
            newState = { ...state, currSongIdx: action.songIdx };
            break;

        case "CHANGE_SONG":
            newState = { ...state, currSongIdx: action.newSongIdx };
            break;

        case "SET_ALREADY_PLAYED": //set curr playlist in shuffle
            newState = { ...state, notPlayedId: [...action.playlist] };
            break;

        case "UPDATE_ALREADY_PLAYED": //remove a song played
            newState = { ...state, notPlayedId: notPlayedId.filter(song => song._id !== action.newId) };
            break;

        case "RESET_ALREADY_PLAYED":
            newState = { ...state, notPlayedId: [] };
            break;

        default:
            break;
    }

    return newState;
}