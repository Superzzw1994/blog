import React from "react";
import ReactDOM from 'react-dom'
import {BrowserRouter} from "react-router-dom";
import Routes from "../Routes";
import {Provider} from "react-redux";
import {getClientStore} from "../utils";
import {Route} from "react-router";

ReactDOM.hydrate(<Provider
  store={getClientStore()}><BrowserRouter><React.Fragment>{Routes.map(route => <Route key={route.path} path={route.path}
                                                                                      render={props =>
                                                                                        React.cloneElement(route.component, {...props})}/>)}</React.Fragment></BrowserRouter></Provider>, document.getElementById('root'))
