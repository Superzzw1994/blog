import {createStore, applyMiddleware, combineReducers} from "redux";
import thunk from "redux-thunk";
import homeReducer from "../components/store/reducer";

export const getStore = () => {
  return createStore(combineReducers({
    home: homeReducer
  }), applyMiddleware(thunk))
}


export const getClientStore = () => {
  const defaultStore = window.context.state
  return createStore(combineReducers({
    home: homeReducer
  }), defaultStore, applyMiddleware(thunk))
}
