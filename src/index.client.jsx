import React, { Fragment } from 'react';
import {
    HashRouter, BrowserRouter, MemoryRouter, StaticRouter, Route,
} from 'react-router-dom';
import { routeType } from 'config/config.json';
import Router from './router/Router.client';


export default () => {
    /**
     * 判断使用的路由方式
     */
    function getRouteType() {
        switch (routeType) {
            case 'browser':
                return BrowserRouter;
            case 'memory':
                return MemoryRouter;
            case 'static':
                return StaticRouter;
            default:
                return HashRouter;
        }
    }

    /**
     * 渲染全局页脚
     */
    function genGlobalFooter() {
        return <div>Footer</div>;
    }

    const RouterType = getRouteType();

    const layout = (
        <RouterType>
            <Route
                render={() => {
                    return (
                        <Fragment>
                            <div style={{ minHeight: 'calc(100vh - 153px)' }}>
                                {Router.genRouter()}
                            </div>
                            {genGlobalFooter()}
                        </Fragment>
                    );
                }}
            />
        </RouterType>
    );

    return layout;
};
