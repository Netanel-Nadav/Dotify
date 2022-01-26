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
            newState = {...state, user: {...state.user, likedSongs: [...state.user.likedSongs, action.song]}  }
        default:
            break;

    }

    return newState
}