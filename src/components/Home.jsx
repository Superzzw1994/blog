import React, {useEffect} from 'react'
import {connect} from "react-redux";
import {getHomeList} from "./store/action";

const Home = (props) => {
  const {getHomeList, list, name} = props
  useEffect(async () => {
    const res = await getHomeList()
  }, [])
  return <React.Fragment>
    <div>{name}</div>
    <ul>
      {
        (list || []).map(item => <li key={item.id}>{item.title}</li>)
      }
    </ul>
  </React.Fragment>
}
Home.loadData = (store) => {
  return store.dispatch(getHomeList())
}
export default connect(state => ({...state.home}), (dispatch) => {
  return {
    getHomeList: () => dispatch(getHomeList())
  }
})(Home)
