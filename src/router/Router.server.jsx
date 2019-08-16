/**
 * 定义路由组件。
 *
 * @author Yao
 */

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RouteConfig from '../config/RouteConfig.server';

function RouterGenerator() {
    /**
     *  获取路由
     * @param routerConf
     * @returns {boolean}
     */
    function getRouters(routerConf) {
        return routerConf.map((router) => {
            // let SubRoutes = null;
            // if (router.routes) {
            //     SubRoutes = getRouters(router.routes);
            // }
            // 包装实际组件，将路由props、子路由插入组件中
            const component = (routeProps) => {
                // const Component = lazy(() => {
                //     return router.component();
                // });
                const Component = router.component;
                return (
                    <Component {...routeProps} />
                );
            };
            return (
                <Route
                    key={router.path}
                    path={router.path}
                    exact={router.exact}
                    strict={router.strict}
                    sensitive={router.sensitive}
                    component={component}
                />
            );
        });
    }

    function genRouter() {
        const routes = getRouters(RouteConfig);
        return (
            <Switch>
                {routes}
                <Route
                    component={() => { return <div>NOT FOUND</div>; }}
                />
            </Switch>
        );
    }

    return {
        genRouter,
    };
}

export default RouterGenerator();
