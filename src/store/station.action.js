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

