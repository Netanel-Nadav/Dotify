





const initialState = {

  stations: [],
  displayedSongs: []
}

export function stationReducer(state = initialState, action) {
  let newState = state;


  switch (action.type) {
    case "SET_STATIONS":
      newState = { ...state, stations: action.stations };
      break;

    case "UPDATE_STATION":
      newState = { ...state, stations: state.stations.map(station => station._id === action.updatedStation._id ? action.updatedStation : station) };
      break;

    case "ADD_STATION":
      newState = { ...state, stations: [...state.stations, action.newStation] }
      break;

    case "SET_DISPLAYED_SONGS":
      newState = { ...state, displayedSongs: action.songs }
      break;
    
    case "UPDATE_DISPLAYED_SONGS" :
      newState = { ...state, displayedSongs: action.songs }
      break;

    default:
      break;
  }
  return newState;
}
