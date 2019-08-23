import { createStore, combineReducers } from 'redux';
// import ReducerRegister from './ReducerRegister';

export default (reducers) => {
    // const reducers = combineReducers(ReducerRegister.getInstance().reducers || {});
    if (!reducers) {
        throw new Error('无法创建Store');
    }

    const getStore = () => {
        console.log(reducers);
        return createStore(combineReducers(reducers || {}));
    };

    return {
        getStore,
    };
};
