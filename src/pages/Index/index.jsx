import React from 'react';
// import { connect } from 'react-redux';
import Description from 'components/Description';
// import ReducerRegister from 'core/redux/ReducerRegister';
// import Reducer from './Reducer';
import './index.less';

export default class Index extends React.PureComponent {
    /**
     * 初始化数据
     * @return Promise
     */
    static loadData = (store) => {
        return Promise.all([
            Description.loadData(store),
        ]);
    };

    /**
     * 初始化reducer
     */
    static registeReduce = () => {
        // Description.registerReduce();
    };

    render() {
        return <Description />;
    }
}
