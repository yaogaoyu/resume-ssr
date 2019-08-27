import { createStore, combineReducers } from 'redux';

/**
 * Redux中创建Store
 */
export default (reducers) => {
    if (!reducers) {
        throw new Error('无法创建Store');
    }

    const getStore = () => {
        // 创建 Store时可以加入redux中间件
        return createStore(combineReducers(reducers));
    };

    return {
        getStore,
    };
};
