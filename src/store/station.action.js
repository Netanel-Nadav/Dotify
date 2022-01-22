import { stationService } from "../services/station.service";

export function loadStation(stationId) {
  return async (dispatch) => {
    try {
      const station = await stationService.getById(stationId);
      const action = { type: "SET_STATION", station };
      dispatch(action);
    } catch (err) {
      console.log("Got an Error in LoadStation", err);
    }
  };
}


export function addSong (stationId,song) {
  return async (dispatch) => {
    try {
      const savedStation = await stationService.addSongToStation(stationId,song)
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
      return Promise.resolve(newStation)
    } catch (err) {
      console.log("Couldn't make new station", err)
    }
  }
}





