import { userService } from "../services/user.service";


const initialState = {
    user: userService.getLogedinUser()
}


export function userReducer(state = initialState, action) {

    let newState = state;

    switch (action.type) {
        case 'SET_USER':
            newState = { ...state, user: action.user }
            break;
        case 'UPDATE_USER':
            newState = { ...state, user: action.updatedUser }
            break;
        case 'LIKE_SONG': 
            newState = {...state, user: {...state.user, likedSongs: [...state.user.likedSongs, action.song]}}
            break;
        case 'UNLIKE_SONG': 
            newState = {...state, user: {...state.user, likedSongs: state.user.likedSongs.filter(song => song._id !== action.songId)}}
            break;
        case 'LIKE_STATION': 
            newState = {...state, user: {...state.user, likedStations: [...state.user.likedStations, action.stationId]}}
            break;
        case 'UNLIKE_STATION': 
            newState = {...state, user: {...state.user, likedStations: state.user.likedStations.filter(station => station !== action.stationId)}}
            break;
        case 'TOGGLE_SHARED_LISTENING': 
            newState = {...state, user: {...state.user, isSharedListening: action.isShare}}
            break;
        default:
            break;

    }

    return newState
}