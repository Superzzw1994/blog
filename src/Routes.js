import React from 'react'
import {Route} from 'react-router'
import App from "./components/App";
import Home from "./components/Home";

const Routes = () => <React.Fragment>
  <Route path='/' exact render={props => <App title={'server side render'} {...props}/>}></Route>
  <Route path='/home' exact render={props => <Home title={'server side render'} {...props}/>}></Route>
</React.Fragment>
export default [
  {
    path: '/',
    exact: true,
    component: <App/>,
  },
  {
    path: '/home',
    exact: true,
    component: <Home/>,
    loadData: Home.loadData
  },
]
