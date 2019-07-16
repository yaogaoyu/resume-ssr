const path = require('path')
const ReactDOMServer = require('react-dom/server')
const express = require('express')
const config = require('./etc/config.json')
const routes = require('./etc/routes.js')
const app = express()

routes.map((route) => {
    const [routePath, method, src] = route;
    const Element = require(path.resolve(__dirname, `./${src}`))
    console.log(Element)
    app.get(routePath, (req, res) => res.send(ReactDOMServer.renderToString(Element)))
});
// app.get('/', (req, res) => res.send('Hello World!'))

app.listen(config.port, () => console.log('Example app listening on port 3000!'))