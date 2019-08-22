import React from 'react';
import Description from 'components/Description';
// import { connect } from 'react-redux';
import './index.less';

export default class Index extends React.PureComponent {
    static loadData = async (store) => {
        await Description.loadData(store);
    };

    render() {
        return <Description />;
        // const { title = '' } = this.state;
        // return (
        //     <div>
        //         {title}
        //     </div>
        // );
    }
}
