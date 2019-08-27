/**
 * 个人简介
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ApiClient from 'core/api/ApiClient';
import comp from 'core/decorate/comp';
import Reducer from './Reducer';

// 定义组件名称
const COMP_NAME = 'comp.Description';

@comp(COMP_NAME, Reducer)
class Description extends React.Component {
    static loadData = async (store) => {
        const result = await ApiClient.get('api test1');
        store.dispatch({
            type: 'init-data',
            result: result.data,
        });
        return result;
    };

    static propTypes = {
        title: PropTypes.string,
    };

    static defaultProps = {
        title: '',
    };

    render() {
        const { title } = this.props;
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
    return {
        title: state[COMP_NAME].title,
    };
};

// const mapDispatchToProps = dispatch => ({
//     getHomeList() {
//         dispatch(getHomeList());
//     }
// });

export default connect(mapStateToProps)(Description);
