import { userService } from "../services/user.service"


export function login(credentials) {
    return async (dispatch) => {
        try {
            const user = await userService.login(credentials)
            const action = { type: 'SET_USER', user }
            dispatch(action)
            return user
        } catch (err) {
            console.error('Error while logging in:', err)
            const action = { type: 'SET_MSG', msg: { txt: 'Had error while logging in', type: 'error' } }
            dispatch(action)
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
            console.error('Error while logging out:', err)
            const action = { type: 'SET_MSG', msg: { txt: 'Had error while logging out', type: 'error' } }
            dispatch(action)
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
            console.error('Error while signing up:', err)
            const action = { type: 'SET_MSG', msg: { txt: 'Had error while signing up', type: 'error' } }
            dispatch(action)
        }
    }
}

export function unlikeSong(songId) {
    return async (dispatch, getState) => {
        try {
            let action = { type: 'UNLIKE_SONG', songId }
            dispatch(action)
            const { user } = getState().userModule
            await userService.update(user)
            action = { type: 'SET_MSG', msg: { txt: 'Song removed from your liked songs', type: 'success' } }
            dispatch(action)
        } catch (err) {
            console.error('Error while unliking song:', err)
            const action = { type: 'SET_MSG', msg: { txt: 'Had error while removing song from your liked songs', type: 'error' } }
            dispatch(action)
        }
    }
}

export function likeSong(song) {
    return async (dispatch, getState) => {
        try {
            const songToLike = {
                _id: song._id || song.id,
                title: song.title,
                url: song.url,
                imgUrl: song.imgUrl || song.bestThumbnail.url,
                duration: song.duration
            }
            const { user } = getState().userModule
            if (user && user.likedSongs.every(likedSong => likedSong._id !== songToLike._id)) {
                let action = { type: 'LIKE_SONG', song: songToLike }
                dispatch(action)
                const { user } = getState().userModule
                await userService.update(user)
                action = { type: 'SET_MSG', msg: { txt: 'Song added to your liked songs', type: 'success' } }
                dispatch(action)
            } else {
                const action = {type: 'SET_MSG', msg: { txt: 'Please login in order to like a song', type: 'error'}}
                dispatch(action)
            }
        } catch (err) {
            console.error('Error while liking song:', err)
            const action = { type: 'SET_MSG', msg: { txt: 'Had error while adding song to your liked songs', type: 'error' } }
            dispatch(action)
        }
    }
}

export function unLikeStation(stationId) {
    return async (dispatch, getState) => {
        try {
            let action = { type: 'UNLIKE_STATION', stationId }
            dispatch(action)
            const { user } = getState().userModule
            await userService.update(user)
            action = { type: 'SET_MSG', msg: { txt: 'Station removed from your profile', type: 'success' } }
            dispatch(action)
        } catch (err) {
            console.error('Error while removing station from profile:', err)
            const action = { type: 'SET_MSG', msg: { txt: 'Had error while removing station to your profile', type: 'error' } }
            dispatch(action)
        }
    }

}

export function likeStation(stationId) {
    return async (dispatch, getState) => {
        try {
            const { user } = getState().userModule
            if (user && user.likedStations.every(likedStation => likedStation !== stationId)) {
                let action = { type: 'LIKE_STATION', stationId }
                dispatch(action)
                const { user } = getState().userModule
                await userService.update(user)
                action = { type: 'SET_MSG', msg: { txt: 'Station added to your profile', type: 'success' } }
                dispatch(action)
            } else {
                const action = {type: 'SET_MSG', msg: { txt: 'Please login in order to like a station', type: 'error'}}
                dispatch(action)
            }
        } catch (err) {
            console.error('Error while adding station to profile:', err)
            const action = { type: 'SET_MSG', msg: { txt: 'Had error while adding station to your profile', type: 'error' } }
            dispatch(action)
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
            console.error('Error while updating user:', err)
            const action = { type: 'SET_MSG', msg: { txt: 'Had error while updating user', type: 'error' } }
            dispatch(action)
        }
    }
}


export function toggleSharedListening() {
    return async (dispatch, getState) => {
        const { user } = getState().userModule
        try {
            const action = { type: 'TOGGLE_SHARED_LISTENING', isShare: !user.isSharedListening }
            dispatch(action)
        } catch (err) {

        }
    }
}

export function clearUserMsg() {
    return async (dispatch) => {
        const action = { type: 'SET_MSG', msg: null }
        dispatch(action)
    }
}

export function setLoginMsg() {
    return async (dispatch) => {
        const action = { type: 'SET_MSG', msg: {txt: 'Login first', type: 'success'} }
        dispatch(action)
    }
}