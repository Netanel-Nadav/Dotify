import { userService } from "../services/user.service"


export function login(credentials) {
    return async (dispatch) => {
        try {
            const user = await userService.login(credentials)
            const action = { type: 'SET_USER', user }
            dispatch(action)
        } catch (err) {
            console.log('Error at User.Action', err);
        }
    }
}


export function logout() {
    return async (dispatch) => {
        try {
            await userService.logout();
            const action = { type: 'SET_USER', user: null }
            dispatch(action)
        } catch (err) {
            console.log('Error at User Action Logout', err);
        }
    }
}

export function signup(newUser) {
    return async (dispatch) => {
        try {
            const user = await userService.signup(newUser)
            const action = { type: 'SET_USER', user }
            dispatch(action)
        } catch (err) {
            console.log('Error at User Action signup', err);
        }
    }
}

export function unlikeSong (songId) {
    return async (dispatch, getState) => {
        try {
            const action = {type: 'UNLIKE_SONG', songId}
            dispatch(action)
            const {user} = getState().userModule
            await userService.update(user)
        } catch (err) {
            console.log('Error at User Action unlike song', err)

        }
    }
}

export function likeSong (song) {
    return async (dispatch, getState) => {
        try {
            const songToLike = {
                _id: song._id || song.id,
                title: song.title,
                url: song.url,
                imgUrl: song.imgUrl || song.bestThumbnail.url,
                duration: song.duration
            }
            const {user} = getState().userModule
            if(user && user.likedSongs.every(likedSong => likedSong._id !== songToLike._id)) {
                const action = {type: 'LIKE_SONG', song: songToLike}
                dispatch(action)
                const {user} = getState().userModule
                console.log(user)
                await userService.update(user)
            } else console.log('Please login')
        } catch (err) {
            console.log('Error at User Action like song', err)
        }
    }
}


export function updateUser(user) {
    return async (dispatch) => {
        try {
            const updatedUser = await userService.update(user)
            let action = { type: 'UPDATE_USER', updatedUser }
            dispatch(action)
        } catch (err) {
            console.log('Had an Error in updateStation', err);
        }
    }
}