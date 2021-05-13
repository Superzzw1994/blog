import CONSTANTS from './constants'
import axios from "axios";

export const changeList = (data) => ({
  type: CONSTANTS.CHANGE_LIST,
  data
})


export const getHomeList = () => (dispatch, getState) => axios.get('http://47.95.113.63/ssr/api/news.json?secret=PP87ANTIPIRATE').then(res => {
  return dispatch(changeList(res.data))
})
