import { stationService } from "../services/station.service";




export function loadStations () {
  return async (dispatch) => {
    try {
      const stations = await stationService.query()
      const action = {type: 'SET_STATIONS', stations}
      dispatch(action)
    } catch (err) {
      console.log("Couldn't get stations", err)
    }
  }
}

export function setDisplayedSongs(station) {
  return async (dispatch) => {
    try {
      const songs = station.songs
      const action = {type: 'SET_DISPLAYED_SONGS', songs}
      dispatch(action)
    } catch (err) {
      console.log("Couldn't set songs", err)
    }
  } 
}

export function addSong (stationId,song) {
  return async (dispatch) => {
    try {
      const updatedStation = await stationService.addSongToStation(stationId,song)
      let action = {type: 'UPDATE_STATION', updatedStation}
      dispatch(action)
      action = {type: 'UPDATE_DISPLAYED_SONGS', songs: updatedStation.songs}
      dispatch(action)
      return Promise.resolve(updatedStation)
    } catch (err) {
      console.log("Couldn't add song", err)
    }
  }
}

export function deleteSong (stationId,songId) {
  return async (dispatch) => {
    try {
      const updatedStation = await stationService.deleteSongFromStation(stationId,songId)
      let action = {type: 'UPDATE_STATION', updatedStation}
      dispatch(action)
      action = {type: 'UPDATE_STATION', updatedStation}
      dispatch(action)
      action = {type: 'UPDATE_DISPLAYED_SONGS', songs: updatedStation.songs}
      dispatch(action)
      return Promise.resolve()
    } catch (err) {
      console.log("Couldn't remove song", err)
    }
  }
}

export function makeNewStation() {
  return async (dispatch) => {
    try {
      const newStation = await stationService.makeNewStation()
      console.log(newStation)
      const action = {type: 'ADD_STATION', newStation}
      dispatch(action)
      return Promise.resolve(newStation)
    } catch (err) {
      console.log("Couldn't make new station", err)
    }
  }
}





