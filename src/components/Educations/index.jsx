/**
 * 教育经历
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import ApiClient from 'core/api/ApiClient';
import comp from 'core/decorate/comp';
import Reducer from '../Description/Reducer';
import { getEducations } from './Action';

// 定义组件名称
const COMP_NAME = 'comp.Educations';

@comp(COMP_NAME, Reducer)
class Description extends React.Component {
    static loadData = async (store) => {
        const action = await getEducations();
        store.dispatch(action);
    };

    // static propTypes = {
    //     title: PropTypes.string,
    // };

    // static defaultProps = {
    //     title: '',
    // };

    render() {
        // const { title } = this.props;
        return (
            <div className="educations">
                <ul className="edu-contents">
                    <li className="edu">
                        <div className="edu-content">
                            <div className="row">
                                <span className="col-item">
                                    <span className="label">学校</span>
                                    <span className="value">222</span>
                                </span>
                                <span className="col-item">
                                    <span className="label">专业</span>
                                    <span className="value">222</span>
                                </span>
                                <span className="col-item">
                                    <span className="label">时间</span>
                                    <span className="value">222</span>
                                </span>
                                <span className="col-item">
                                    <span className="label">学历</span>
                                    <span className="value">222</span>
                                </span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (props) => {
    return {
        title: props[COMP_NAME].title,
    };
};

export default connect(mapStateToProps)(Description);
