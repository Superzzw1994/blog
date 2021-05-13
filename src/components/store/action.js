import CONSTANTS from './constants'

export const changeList = (data) => ({
  type: CONSTANTS.CHANGE_LIST,
  data
})


export const getHomeList = () => (dispatch, getState, instance) => {
  return instance.get('/api/news.json?secret=PP87ANTIPIRATE').then(res => {
    return dispatch(changeList(res.data))
  })
}
