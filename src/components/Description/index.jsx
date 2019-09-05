/**
 * 个人简介
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import ApiClient from 'core/api/ApiClient';
import comp from 'core/decorate/comp';
import Reducer from './Reducer';
import { getInspect } from './Action';

// 定义组件名称
const COMP_NAME = 'comp.Description';

@comp(COMP_NAME, Reducer)
class Description extends React.Component {
    static loadData = async (store) => {
        const inspectAction = await getInspect();
        store.dispatch(inspectAction);
    };

    static propTypes = {
        title: PropTypes.string,
        sex: PropTypes.string,
        birth: PropTypes.string,
        comment: PropTypes.string,
    };

    static defaultProps = {
        title: '',
        sex: '',
        birth: '',
        comment: '',
    };

    render() {
        const {
            title, sex, birth, comment,
        } = this.props;
        return (
            <div className="description">
                <div className="header">
                    <div className="headerWrap">
                        <image src="/static/img/favorite.png" />
                    </div>
                </div>
                <div className="details">
                    <div>{title}</div>
                    <div>{sex}</div>
                    <div>{birth}</div>
                    <div>{comment}</div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        title: state[COMP_NAME].title,
        sex: state[COMP_NAME].sex,
        birth: state[COMP_NAME].birth,
        comment: state[COMP_NAME].comment,
    };
};

export default connect(mapStateToProps)(Description);
