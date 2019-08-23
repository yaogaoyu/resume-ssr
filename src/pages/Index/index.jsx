import React from 'react';
import { connect } from 'react-redux';
import Description from 'components/Description';
import ReducerRegister from 'core/redux/ReducerRegister';
import Reducer from './Reducer';
import './index.less';

class Index extends React.PureComponent {
    static loadData = async (store) => {
        console.log('loadData');
        const result = await Description.loadData(store);
        return result.data;
    };

    static registerReduce = () => {
        console.log('index registerReduces');
        Description.registerReduce();
        ReducerRegister.getInstance().registe('indexReducer', Reducer);
    };

    render() {
        console.log(this.props);
        return <Description />;
        // const { title = '' } = this.state;
        // return (
        //     <div>
        //         {title}
        //     </div>
        // );
    }
}

export default connect()(Index);
