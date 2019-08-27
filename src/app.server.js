
import React from 'react';
// import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import express from 'express';
import fs from 'fs';
import path from 'path';
import Store from 'core/redux/Store';
import ReducerRegister from 'core/redux/ReducerRegister';
import config from '../etc/config.json';
import View from './index.server';
import { getComponentByPath } from './config/RouteConfig.server';


const app = express();

app.enable('view cache'); //开启模板缓存

//对静态文件设置实际指向
app.use('/static', express.static(path.resolve(__dirname, '../dist/static')));
//对样式文件统一设置虚拟路径，方便nginx做代理
app.use('/s', express.static(path.resolve(__dirname, '../dist')));

let html = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8');  //require('./index.html');
html = html.replace(/(<link.*)href="(.*)"(.*?>)/, `$1href="/s/$2"$3`);
html = html.replace(/<script.+<\/script>/, '');

// 处理接口请求
app.all('/api/*', (req, res) => {
    res.send({
        code: 0,
        data: {
            title: `Yao's SSR`,
        }
    });
});

// 处理页面请求
app.get('/*', async (req, res) => {
    // 拿到当前路由对应的页面，注册reducer
    const pageComp = getComponentByPath(req.url);
    const reducers = ReducerRegister.getInstance().reducers;
    // 创建store
    const store = Store(reducers).getStore();
    // 初始化数据
    await pageComp.loadData(store);
    html = await html.replace(/(<body>).*(<\/body>)/, `$1<div id="app">${renderToString(<View location={req.url} store={store} />)}</div>$2`);
    // 发送转换后的HTML
    await res.send(html);
});

app.listen(config.port, () => console.log('Yao\'SSR app listening on port 3000!'));
