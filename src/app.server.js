
import React from 'react';
import { renderToString } from 'react-dom/server';
import express from 'express';
import fs from 'fs';
import path from 'path';
import config from '../etc/config.json';
import View from './index.server';

const app = express();

app.enable('view cache'); //开启模板缓存

//对静态文件统一设置一个虚拟路径，方便nginx做代理
app.use('/static', express.static(path.resolve(__dirname, '../dist')));

let html = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8');  //require('./index.html');
html = html.replace(/(<link.*)href="(.*)"(.*?>)/, `$1href="/static/$2"$3`);
html = html.replace(/<script.+<\/script>/, '');

// 处理接口请求
app.all('/api/*', (req, res) => {
    res.send({
        code: 0,
        data: {}
    });
});

// 处理页面请求
app.get('/*', (req, res) => {
    html = html.replace(/(<body>).*(<\/body>)/, `$1<div id="app">${renderToString(<View location={req.url}/>)}</div>$2`);
    res.send(html);
});

app.listen(config.port, () => console.log('Example app listening on port 3000!'))