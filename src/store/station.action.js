
import { stationService } from "../services/station.service";

export function loadStations() {
  return async (dispatch) => {
    try {
      const stations = await stationService.query()
      const action = { type: 'SET_STATIONS', stations }
      dispatch(action)
      return Promise.resolve()
    } catch (err) {
      console.log("Couldn't get stations", err)
    }
  }
}


export function getGenres() {
  return async (dispatch) => {
    try {
      const genres = await stationService.getStationsGenre()
      return Promise.resolve(genres)
     } catch (err) {
       console.log("Couldn't get genres", err)
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
      console.log("Couldn't set songs", err)
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
      console.log('Had an Error in updateStation', err);
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
      if(newStation) {
        action = { type: 'UPDATE_DISPLAYED_SONGS', songs: updatedStation.songs }
        dispatch(action)
      }
      // socketService.emit('update station', station)
      return Promise.resolve(updatedStation)
    } catch (err) {
      console.log("Couldn't add song", err)
    }
  }
}

export function deleteSong(station, songId) {
  return async (dispatch) => {
    try {
      const updatedStation = await stationService.save(station, null,songId)
      let action = { type: 'UPDATE_STATION', updatedStation }
      dispatch(action)
      action = { type: 'UPDATE_DISPLAYED_SONGS', songs: updatedStation.songs }
      dispatch(action)
      // socketService.emit('update station', station)
      return Promise.resolve(updatedStation)
    } catch (err) {
      console.log("Couldn't remove song", err)
    }
  }
}

export function makeNewStation() {
  return async (dispatch) => {
    try {
      const newStation = await stationService.save({})
      const action = { type: 'ADD_STATION', newStation }
      dispatch(action)
      return Promise.resolve(newStation)
    } catch (err) {
      console.log("Couldn't make new station", err)
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
      console.log("Couldn't make new station", err)
    }
  }
}





