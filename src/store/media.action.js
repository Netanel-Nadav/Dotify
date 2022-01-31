import { utilService } from "../services/util.service";

export function setStation(station) {
    return async (dispatch) => {
        try {
            const action = { type: "SET_STATION", station };
            dispatch(action);
        } catch (err) {
            console.error('Error while setting station on player:', err)
        }
    };
}

export function toggleIsPlaying() {
    return async (dispatch, getState) => {
        try {
            const { isPlaying } = getState().mediaModule;
            const action = { type: "TOGGLE_IS_PLAYING", isPlaying: !isPlaying };
            dispatch(action)
        } catch (err) {
            console.error('Error while toggling play/pause')
        }
    }
}

export function setSongs(station, songId) {
    return async (dispatch) => {
        try {
            const songs = station.songs;
            let action = { type: "SET_SONGS", songs };
            dispatch(action);
            action = { type: 'SET_PREV_SONG_ID', songId };
            dispatch(action);
            action = { type: 'SET_CURR_SONG_ID', songId };
            dispatch(action);
            const songIdx = songs.findIndex(song => song._id === songId);
            action = { type: 'SET_CURR_SONG_IDX', songIdx }
            dispatch(action);
        } catch (err) {
            console.error('Error while setting songs on player')
        }
    };
}

export function setSongsAfterDnd(station) {
    return async (dispatch) => {
        try {
            const songs = station.songs;
            let action = { type: "SET_SONGS", songs };
            dispatch(action);
        } catch (err) {
            console.error('Error while reordering song list', err)
            const action = { type: 'SET_MSG', msg: { txt: 'Had error while reordering song list', type: 'error' } }
            dispatch(action)
        }
    }
}


export function changeSong(diff) {
    return async (dispatch, getState) => {
        try {
            const { currSongId, currSongList } = getState().mediaModule
            const currSongIdx = currSongList.findIndex(song => currSongId === song._id)
            const newSongIdx = currSongIdx + diff
            let action = { type: 'SET_CURR_SONG_IDX', songIdx: newSongIdx }
            dispatch(action)
            action = { type: 'SET_CURR_SONG_ID', songId: currSongList[newSongIdx]._id }
            dispatch(action)
        } catch (err) {
            console.error('Error while changing song', err)
            const action = { type: 'SET_MSG', msg: { txt: 'Had error while changing song list', type: 'error' } }
            dispatch(action)
        }
    }
}

export function setShuffleState(songPlayingId) {
    return async (dispatch, getState) => {
        try {
            const { currSongList } = getState().mediaModule;
            let action = { type: 'SET_ALREADY_PLAYED', playlist: currSongList.filter(song => song._id !== songPlayingId) };
            dispatch(action);
        } catch (err) {
            console.error("Couldn't set shuffle", err)
        }
    }
}

export function setRandomSong() {
    return async (dispatch, getState) => {
        try {
            const { notPlayedId, currSongList } = getState().mediaModule
            let newIdx = await utilService.getRandomIntInclusive(0, notPlayedId.length - 1)
            const newId = notPlayedId[newIdx]._id
            const currIdx = currSongList.findIndex(song => song._id === newId);
            let action = { type: 'SET_CURR_SONG_IDX', songIdx: currIdx }
            dispatch(action)
            action = { type: 'SET_CURR_SONG_ID', songId: newId }
            dispatch(action)
            action = { type: 'UPDATE_ALREADY_PLAYED', newId }
            dispatch(action)
        } catch (err) {
            console.error("Couldn't set random", err)
        }
    }
}

export function resetAlreadyPlayed() {
    return async (dispatch) => {
        try {
            const action = { type: 'RESET_ALREADY_PLAYED' }
            dispatch(action)
        } catch (err) {
            console.log("Couldn't reset array", err)
        }
    }
}

