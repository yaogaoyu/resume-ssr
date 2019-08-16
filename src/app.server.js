// const path = require('path')
// const React = require('react');
// const {ReactDOMServer} = require('react-dom/server')
// const express = require('express')
// const config = require('./etc/config.json')
// const routes = require('./etc/routes.js')
// import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
// import { matchPath } from 'react-router-dom';
import express from 'express';
import fs from 'fs';
import path from 'path';
import config from '../etc/config.json';
// import routes from '../etc/routes'
import View from './index.server';
// import ClientRoutes from './config/RouteConfig';

const app = express();

app.enable('view cache'); //开启模板缓存

//对静态文件统一设置一个虚拟路径，方便nginx做代理
app.use('/static', express.static(path.resolve(__dirname, '../dist')));

let html = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8');  //require('./index.html');
html = html.replace(/(<link.*)href="(.*)"(.*?>)/, `$1href="/static/$2"$3`);
html = html.replace(/<script.+<\/script>/, '');

app.get('/*', (req, res) => {
    // const currRoute = ClientRoutes.find((route) => {
    //     return matchPath(req.url, route);
    // });
    html = html.replace(/(<body>).*(<\/body>)/, `$1<div id="app">${renderToString(<View location={req.url}/>)}</div>$2`);
    res.send(html);
});

app.listen(config.port, () => console.log('Example app listening on port 3000!'))