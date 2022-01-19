const initialState = {
  station: null,
}

export function stationReducer(state = initialState, action) {
  let newState = state;

  switch (action.type) {
    case "SET_STATION":
      newState = { ...state, station: action.station };
      break;

    default:
      break;
  }

  return newState;
}
