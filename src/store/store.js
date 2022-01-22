import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'


import { stationReducer } from './station.reducer.js'
import { userReducer } from './user.reducer.js';
import { mediaReducer } from './media.reducer.js'


const rootReducer = combineReducers({
    stationModule: stationReducer,
    userModule: userReducer,
    mediaModule: mediaReducer,
})



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))