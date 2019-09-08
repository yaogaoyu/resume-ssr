/**
 * 教育经历
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import comp from 'core/decorate/comp';
import Reducer from './Reducer';
import { getEducations } from './Action';

// 定义组件名称
const COMP_NAME = 'comp.Educations';

@comp(COMP_NAME, Reducer)
class Description extends React.Component {
    static loadData = async (store) => {
        const action = await getEducations();
        store.dispatch(action);
    };

    static propTypes = {
        edus: PropTypes.array,
    };

    static defaultProps = {
        edus: [],
    };

    renderEdus() {
        const { edus } = this.props;
        const edusDom = edus.map((edu) => {
            const {
                _id, school, subject, qualification, start, end,
            } = edu;
            return (
                <li className="edu" key={_id}>
                    <span className="edu-content">
                        <div className="row bold-label school">
                            {school}
                        </div>
                        <div className="row edu-info">
                            <span className="info-item">{subject}</span>
                            <span className="info-item">{qualification}</span>
                            <span className="info-item">{`${start} - ${end}`}</span>
                        </div>
                    </span>
                </li>
            );
        });
        return edusDom;
    }

    render() {
        return (
            <div className="module">
                <div className="module-divider">教育经历</div>
                <ul className="edus">
                    {this.renderEdus()}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (props) => {
    return {
        edus: props[COMP_NAME],
    };
};

export default connect(mapStateToProps)(Description);
