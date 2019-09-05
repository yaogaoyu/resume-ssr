import React, { Fragment } from 'react';
// import { connect } from 'react-redux';
import Description from 'components/Description';
import Jobs from 'components/Jobs';
// import Educations from 'components/Educations';
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
            Jobs.loadData(store),
            // Educations.loadData(store),
        ]);
    };

    render() {
        return (
            <Fragment>
                <Description />
                <Jobs />
            </Fragment>
        );
    }
}
