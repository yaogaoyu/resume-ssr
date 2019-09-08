/**
 * 工作经历
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import ApiClient from 'core/api/ApiClient';
import comp from 'core/decorate/comp';
import Reducer from './Reducer';
import { getJobs } from './Action';
import './index.less';

// 定义组件名称
const COMP_NAME = 'comp.Jobs';

@comp(COMP_NAME, Reducer)
class Jobs extends React.Component {
    static loadData = async (store) => {
        const action = await getJobs();
        store.dispatch(action);
    };

    static propTypes = {
        jobs: PropTypes.array,
    };

    static defaultProps = {
        jobs: [],
    };

    renderJobs() {
        const { jobs } = this.props;
        const jobsDom = jobs.map((job) => {
            const {
                _id, company, department, position, start, end, description,
            } = job;
            return (
                <li className="job" key={_id}>
                    <span className="job-content">
                        <div className="row bold-label company">
                            {company}
                        </div>
                        <div className="row job-info">
                            <span className="department info-item">{department}</span>
                            <span className="info-item">{position}</span>
                            <span className="info-item">{`${start} - ${end || '至今'}`}</span>
                        </div>
                        <div className="row description" dangerouslySetInnerHTML={{ __html: description }} />
                    </span>
                </li>
            );
        });
        return jobsDom;
    }

    render() {
        return (
            <div className="module">
                <div className="module-divider">工作经历</div>
                <ul className="jobs">
                    {this.renderJobs()}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (props) => {
    return {
        jobs: props[COMP_NAME],
    };
};

export default connect(mapStateToProps)(Jobs);
