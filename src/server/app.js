const express = require('express');
import React from 'react'
import proxy from 'express-http-proxy'
import {StaticRouter, Route} from "react-router";
import {renderToString} from 'react-dom/server'
import Routes from "../Routes";
import {getStore} from "../utils";
import {Provider} from "react-redux";
import {matchRoutes} from "react-router-config";

const app = express();
app.use(express.static('public'))
app.use('/api', proxy('http://47.95.113.63', {
  proxyReqPathResolver: (req) => `/ssr/api${req.url}`
}))
app.get('*', function (req, res, next) {
  const store = getStore()
  const routes = matchRoutes(Routes, req.path)
  const promises = []
  routes.forEach(route => {
    if (route.route.loadData) {
      promises.push(route.route.loadData(store))
    }
  })
  Promise.all(promises).then(() => {
    res.send(`<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<div id="root">${renderToString(<Provider store={store}><StaticRouter location={req.path} context={{}}>
      <React.Fragment>{Routes.map(route => <Route path={route.path} key={route.path}
                                                  render={props => React.cloneElement(route.component, {...props})}/>)}</React.Fragment>
    </StaticRouter></Provider>)}</div>
<script>
window.context = {
  state: ${JSON.stringify(store.getState())}
}
</script>
<script src="/index.js"></script>
</body>
</html>`)
  })
});
const server = app.listen(3000)


