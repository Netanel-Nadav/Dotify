





const initialState = {
 
  stations: []
}

export function stationReducer(state = initialState, action) {
  let newState = state;

  switch (action.type) {
    case "SET_STATIONS":
      newState = { ...state, stations: action.stations };
      break;

    case "UPDATE_STATION":
      newState = { ...state, stations: state.stations.map(station => station._id === action.savedStation._id ? action.savedStation : station ) };
      break;

    case "ADD_STATION":
      newState = {...state, stations: [...state.stations, action.newStation ]}
    break; 
    
    default:
      break;
  }

  return newState;
}
