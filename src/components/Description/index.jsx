/**
 * 个人简介
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ApiClient from 'core/api/ApiClient';
import ReducerRegister from 'core/redux/ReducerRegister';
import Reducer from './Reducer';

class Description extends React.Component {
    static loadData = async (store) => {
        const result = await ApiClient.get('api test1');
        store.dispatch({
            type: 'init-data',
            result: result.data,
        });
        return result;
    };

    static registerReduce = () => {
        console.log('registerReduce description');
        ReducerRegister.getInstance().registe('descriptionReducer', Reducer);
    };

    static propTypes = {
        title: PropTypes.string,
    };

    static defaultProps = {
        title: '',
    };

    render() {
        const { title } = this.props;
        console.log(title);
        return (
            <div className="description">
                <div className="header">
                    <div className="headerWrap">
                        <image src="/static/img/favorite.png" />
                    </div>
                </div>
                <div className="details">
                    <div>姚先生</div>
                    <div>{title}</div>
                    <div>333</div>
                    <div>444</div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log('description state', state);
    return {
        title: state.descriptionReducer.title,
    };
};

// const mapDispatchToProps = dispatch => ({
//     getHomeList() {
//         dispatch(getHomeList());
//     }
// });

export default connect(mapStateToProps)(Description);
