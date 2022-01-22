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


export function addSong (stationId,song) {
  return async (dispatch) => {
    try {
      const savedStation = await stationService.addSongToStation(stationId,song)
      const action = {type: 'UPDATE_STATION', savedStation}
      dispatch(action)
      return Promise.resolve(savedStation)
    } catch (err) {
      console.log("Couldn't add song", err)
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





