import CONSTANTS from './constants'

const initialData = {
  name: 'zzw',
  list: []
}
const homeReducer = (state = initialData, action) => {
  if (action.type === CONSTANTS.CHANGE_LIST) {
    return {
      ...state,
      list: action.data.data
    }
  }
  return state
}

export default homeReducer
