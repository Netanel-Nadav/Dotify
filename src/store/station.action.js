
import { stationService } from "../services/station.service";

export function loadStations() {
  return async (dispatch) => {
    try {
      const stations = await stationService.query()
      const action = { type: 'SET_STATIONS', stations }
      dispatch(action)
      return Promise.resolve()
    } catch (err) {
      console.error('Error while loading stations:', err)
      const action = { type: 'SET_MSG', msg: { txt: 'Had error while loading stations', type: 'error' } }
      dispatch(action)
    }
  }
}


export function getGenres() {
  return async (dispatch) => {
    try {
      const genres = await stationService.getStationsGenre()
      return Promise.resolve(genres)
    } catch (err) {
      console.error('Error while loading stations genres:', err)
      const action = { type: 'SET_MSG', msg: { txt: 'Had error while loading stations genres', type: 'error' } }
      dispatch(action)
    }
  }
}

export function setDisplayedSongs(station) {
  return async (dispatch) => {
    try {
      const songs = station.songs
      const action = { type: 'SET_DISPLAYED_SONGS', songs }
      dispatch(action)
    } catch (err) {
      console.error('Error settings displayed songs:', err)
      const action = { type: 'SET_MSG', msg: { txt: 'Had error while setting songs to displays', type: 'error' } }
      dispatch(action)
    }
  }
}


export function updateStation(station) {
  return async (dispatch) => {
    try {
      const updatedStation = await stationService.save(station)
      let action = { type: 'UPDATE_STATION', updatedStation }
      dispatch(action)
      return updatedStation
    } catch (err) {
      console.error('Error while updating station:', err)
      const action = { type: 'SET_MSG', msg: { txt: 'Had error while updating station', type: 'error' } }
      dispatch(action)
    }
  }
}

export function addSong(station, song, newStation = true) {
  return async (dispatch) => {
    try {
      const updatedStation = await stationService.addSongToStation(station, song)
      // const updatedStation = await stationService.save(station, song)
      let action = { type: 'UPDATE_STATION', updatedStation }
      dispatch(action)
      if (newStation) {
        action = { type: 'UPDATE_DISPLAYED_SONGS', songs: updatedStation.songs }
        dispatch(action)
      }
      // socketService.emit('update station', station)
      return Promise.resolve(updatedStation)
    } catch (err) {
      console.error('Error while adding song:', err)
      const action = { type: 'SET_MSG', msg: { txt: 'Had error while adding a song to the station', type: 'error' } }
      dispatch(action)
    }
  }
}

export function deleteSong(station, songId) {
  return async (dispatch) => {
    try {
      const updatedStation = await stationService.save(station, null, songId)
      let action = { type: 'UPDATE_STATION', updatedStation }
      dispatch(action)
      action = { type: 'UPDATE_DISPLAYED_SONGS', songs: updatedStation.songs }
      dispatch(action)
      // socketService.emit('update station', station)
      return Promise.resolve(updatedStation)
    } catch (err) {
      console.error('Error while deleting song:', err)
      const action = { type: 'SET_MSG', msg: { txt: 'Had error while removing a song from station', type: 'error' } }
      dispatch(action)
    }
  }
}

export function makeNewStation() {
  return async (dispatch) => {
    try {
      const newStation = await stationService.save({})
      let action = { type: 'ADD_STATION', newStation }
      dispatch(action)
      action = {type: 'SET_MSG', msg: { txt: 'New station created', type: 'success'}}
      dispatch(action)
      return Promise.resolve(newStation)
    } catch (err) {
      console.error('Error while making stations:', err)
      const action = { type: 'SET_MSG', msg: { txt: 'Had error while making a new stations', type: 'error' } }
      dispatch(action)
    }
  }
}

export function addStationToAll(newStation) {
  return async (dispatch) => {
    try {
      console.log(newStation)
      const action = { type: 'ADD_STATION', newStation }
      dispatch(action)
    } catch (err) {
      console.error("Error while trying to add station to other users", err)
    }
  }
}





