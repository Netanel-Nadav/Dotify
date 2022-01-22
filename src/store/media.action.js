
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

export function setSongs(station, songIdx) {
    return async (dispatch) => {
        try {
            const songs = station.songs
            let action = { type: "SET_SONGS", songs };
            dispatch(action);
            action = { type: 'SET_CURR_SONG_IDX', songIdx }
            dispatch(action)
            action = { type: 'SET_ALREADY_PLAYED', newSongIdx: songIdx }
            dispatch(action)
        } catch (err) {
            console.log("Got an Error in SetSong", err);
        }
    };
}

export function changeSong(diff) {
    return async (dispatch, getState) => {
        try {
            const { currSongIdx } = getState().mediaModule
            const newSongIdx = currSongIdx + diff
            let action = { type: 'CHANGE_SONG', newSongIdx }
            dispatch(action)
            action = { type: 'SET_ALREADY_PLAYED', newSongIdx }
            dispatch(action)
        } catch (err) {
            console.log("Couldn't change song", err)
        }
    }
}

export function setRandomSong() {
    return async (dispatch, getState) => {
        try {
            const { currSongList, alreadyPlayedIdx } = getState().mediaModule
            let newIdx = await getNewSongIdx(alreadyPlayedIdx,currSongList.length-1)
            let action = { type: 'SET_CURR_SONG_IDX', songIdx: newIdx }
            dispatch(action)
            action = {type: 'UPDATE_ALREADY_PLAYED', newIdx}
            dispatch(action)
            if(currSongList.length === alreadyPlayedIdx.length) resetAlreadyPlayed()

        } catch (err) {
            console.log("Couldn't get random song", err)
        }
    }
}

export function resetAlreadyPlayed() {
    console.log('check')
    return async (dispatch) => {
        try {
            const action = {type: 'RESET_ALREADY_PLAYED'}
            dispatch(action)
        } catch (err) {
            console.log("Couldn't reset array", err)
        }
    }
}

function getNewSongIdx (alreadyPlayed, listLength) {
    const newIdx = utilService.getRandomIntInclusive(0,listLength)
    console.log('songIdx',newIdx)
    if(alreadyPlayed.includes(newIdx)) getNewSongIdx(alreadyPlayed,listLength)
    else return Promise.resolve(newIdx)
}