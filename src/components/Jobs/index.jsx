/**
 * 教育经历
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import ApiClient from 'core/api/ApiClient';
import comp from 'core/decorate/comp';
import Reducer from './Reducer';
import { getJobs } from './Action';

// 定义组件名称
const COMP_NAME = 'comp.Educations';

@comp(COMP_NAME, Reducer)
class Jobs extends React.Component {
    static loadData = async (store) => {
        const action = await getJobs();
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
            <div className="jobs">
                <ul className="jobs-content">
                    <li className="job">
                        <div className="row">
                            <span className="col-item">
                                <span className="label">公司名</span>
                                <span className="value">222</span>
                            </span>
                            <span className="col-item">
                                <span className="label">部门</span>
                                <span className="value">222</span>
                            </span>
                            <span className="col-item">
                                <span className="label">职位</span>
                                <span className="value">222</span>
                            </span>
                            <span className="col-item">
                                <span className="label">时长</span>
                                <span className="value">222</span>
                            </span>
                        </div>
                        <div className="row">
                            <span className="col-item">
                                <span className="label">简介</span>
                                <span className="value">222</span>
                            </span>
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

export default connect(mapStateToProps)(Jobs);
