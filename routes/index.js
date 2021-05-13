import React from 'react'
import {renderToString} from 'react-dom/server'

var express = require('express');
var router = express.Router();

const App = () => <div>zzw666!</div>
router.get('/', function (req, res, next) {
  res.send(renderToString(<App/>))
});

module.exports = router;
