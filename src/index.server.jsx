import React, { Fragment } from 'react';
// import ReactDOM from 'react-dom';
import { StaticRouter, Route, Switch } from 'react-router-dom';
// import { routeType } from 'config/config.json';
import Router from './router/Router.server';


export default (props) => {
    /**
     * 渲染全局页脚
     */
    function genGlobalFooter() {
        return <div>Footer</div>;
    }

    // const RouterType = getRouteType();
    const context = {};

    const layout = (
        <Fragment>
            <StaticRouter location={props.location} context={context}>
                <div style={{ minHeight: 'calc(100vh - 153px)' }}>
                    {Router.genRouter()}
                </div>
            </StaticRouter>
            {genGlobalFooter()}
        </Fragment>
    );

    return layout;
};

// ReactDOM.render(<App />, document.querySelector('#app'));
