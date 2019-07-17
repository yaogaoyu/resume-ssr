// const path = require('path')
// const React = require('react');
// const {ReactDOMServer} = require('react-dom/server')
// const express = require('express')
// const config = require('./etc/config.json')
// const routes = require('./etc/routes.js')
import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import express from 'express'
import config from '../etc/config.json'
// import routes from '../etc/routes'
import View from '../src/index.jsx';

const app = express();

// routes.map((route) => {
//     const [routePath, method, src] = route
//     const Element = require(path.resolve(__dirname, `./${src}`))
//     console.log(Element)
//     app.get(routePath, (req, res) => res.send(renderToString(<Element.default />)))
// })
console.log(View);
app.get('/*', (req, res) => res.send(renderToString(<View />)))

app.listen(config.port, () => console.log('Example app listening on port 3000!'))