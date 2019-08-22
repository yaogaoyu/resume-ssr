import React from 'react';
// import ReactDOM from 'react-dom';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
// import { createStore } from 'redux';
// import { routeType } from 'config/config.json';
import Router from './router/Router.server';
// import RootReducer from './reducers/RootReducer';
import './style/global.less';


export default (props) => {
    /**
     * 渲染全局页脚
     */
    function genGlobalFooter() {
        return <div className="foot">Footer</div>;
    }

    // function getStore() {
    //     return createStore(RootReducer);
    // }

    // const RouterType = getRouteType();
    const context = {};

    // const store = getStore();

    const layout = (
        <Provider store={props.store}>
            <StaticRouter location={props.location} context={context}>
                <div className="content">
                    {Router.genRouter()}
                </div>
            </StaticRouter>
            {genGlobalFooter()}
        </Provider>
    );

    return layout;
};

// ReactDOM.render(<App />, document.querySelector('#app'));
