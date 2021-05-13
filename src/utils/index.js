import {createStore, applyMiddleware, combineReducers} from "redux";
import thunk from "redux-thunk";
import homeReducer from "../components/store/reducer";
import {clientInstance, serverInstance} from "./request";

export const getStore = () => {
  return createStore(combineReducers({
    home: homeReducer
  }), applyMiddleware(thunk.withExtraArgument(serverInstance)))
}


export const getClientStore = () => {
  const defaultStore = window.context.state
  return createStore(combineReducers({
    home: homeReducer
  }), defaultStore, applyMiddleware(thunk.withExtraArgument(clientInstance)))
}
