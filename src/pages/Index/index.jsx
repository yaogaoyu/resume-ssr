import React from 'react';
import Description from 'components/Description';
import Jobs from 'components/Jobs';
import Educations from 'components/Educations';
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
            Educations.loadData(store),
        ]);
    };

    render() {
        return (
            <div className="my-resume">
                <Description />
                <Jobs />
                <Educations />
            </div>
        );
    }
}
