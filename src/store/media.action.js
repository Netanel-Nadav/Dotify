
import { stationService } from "../services/station.service";
import { utilService } from "../services/util.service";

export function setStation(station) {
    return async (dispatch) => {
        try {
            const action = { type: "SET_STATION", station };
            dispatch(action);
        } catch (err) {
            console.log("Got an Error in SetStation", err);
        }
    };
}

export function toggleIsPlaying() {
    return async (dispatch,getState) => {
        try {
            const {isPlaying} = getState().mediaModule
            const action = {type: "TOGGLE_IS_PLAYING", isPlaying: !isPlaying}
            dispatch(action)
        } catch (err) {
            console.log("Couldnt toggle isPlaying", err)
        }
    }
}

export function setSongs(station, songId) {
    return async (dispatch) => {
        try {
            const songs = station.songs
            let action = { type: "SET_SONGS", songs };
            dispatch(action);
            action = {type: 'SET_CURR_SONG_ID', songId}
            dispatch(action)
            const songIdx = songs.findIndex(song => song._id === songId)
            action = { type: 'SET_CURR_SONG_IDX', songIdx }
            dispatch(action)
            action = { type: 'SET_ALREADY_PLAYED', songId }
            dispatch(action)
            action = {type: "TOGGLE_IS_PLAYING", isPlaying: true}
            dispatch(action)
        } catch (err) {
            console.log("Got an Error in SetSong", err);
        }
    };
}

export function changeSong(diff) {
    return async (dispatch, getState) => {
        try {
            const { currSongId, currSongList} = getState().mediaModule
            const currSongIdx = currSongList.findIndex(song => currSongId === song._id)
            const newSongIdx = currSongIdx + diff
            let action = { type: 'SET_CURR_SONG_IDX', songIdx: newSongIdx }
            dispatch(action)
            action = {type: 'SET_CURR_SONG_ID', songId: currSongList[newSongIdx]._id}
            dispatch(action)
            action = { type: 'SET_ALREADY_PLAYED', songId: currSongList[newSongIdx]._id }
            dispatch(action)
        } catch (err) {
            console.log("Couldn't change song", err)
        }
    }
}

export function setRandomSong() {
    return async (dispatch, getState) => {
        try {
            const { currSongList, alreadyPlayedId } = getState().mediaModule
            let newIdx = await getNewSongIdx(alreadyPlayedId,currSongList)
            const newId = currSongList[newIdx]._id
            let action = { type: 'SET_CURR_SONG_IDX', songIdx: newIdx }
            dispatch(action)
            action = { type: 'SET_CURR_SONG_ID', songId: newId}
            dispatch(action)
            action = {type: 'UPDATE_ALREADY_PLAYED', newId}
            dispatch(action)
            if(currSongList.length === alreadyPlayedId.length) resetAlreadyPlayed()

        } catch (err) {
            console.log("Couldn't get random song", err)
        }
    }
}


export function resetAlreadyPlayed() {
    return async (dispatch) => {
        try {
            const action = {type: 'RESET_ALREADY_PLAYED'}
            dispatch(action)
        } catch (err) {
            console.log("Couldn't reset array", err)
        }
    }
}

function getNewSongIdx (alreadyPlayed, list) {
    const newIdx = utilService.getRandomIntInclusive(0,list.length -1)
    const newId = list[newIdx]._id
    // console.log('alreadyPlayed', alreadyPlayed)
    // console.log('songIdx',newIdx)
    // console.log('songId',newId)
    if(alreadyPlayed.includes(newId)) getNewSongIdx(alreadyPlayed,list.length-1)
    else return Promise.resolve(newIdx)
}