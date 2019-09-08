/**
 * 个人简介
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import ApiClient from 'core/api/ApiClient';
import comp from 'core/decorate/comp';
import Reducer from './Reducer';
import { getInspect } from './Action';
import './index.less';

// 定义组件名称
const COMP_NAME = 'comp.Description';

@comp(COMP_NAME, Reducer)
class Description extends React.Component {
    static loadData = async (store) => {
        const inspectAction = await getInspect();
        store.dispatch(inspectAction);
    };

    static propTypes = {
        name: PropTypes.string,
        sex: PropTypes.string,
        birth: PropTypes.string,
        email: PropTypes.string,
        mobile: PropTypes.string,
        comment: PropTypes.string,
    };

    static defaultProps = {
        name: '',
        sex: '',
        birth: '',
        email: '',
        mobile: '',
        comment: '',
    };

    render() {
        const {
            name, sex, birth, email, mobile, comment,
        } = this.props;
        return (
            <Fragment>
                <div className="module-divider">个人简介</div>
                <div className="my-inspect">
                    <div className="inspect">
                        <div className="header">
                            <img src="/static/img/yao.png" alt="个人头像" />
                        </div>
                        <div className="details">
                            <div className="detail-item">
                                <span className="detail-label">姓名：</span>
                                <span>{name}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">性别：</span>
                                <span>{sex}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">生日：</span>
                                <span>{birth}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">邮箱：</span>
                                <span>{email}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">电话：</span>
                                <span>{mobile}</span>
                            </div>
                        </div>
                    </div>
                    <div className="description" dangerouslySetInnerHTML={{ __html: comment }} />
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        name: state[COMP_NAME].name,
        sex: state[COMP_NAME].sex,
        birth: state[COMP_NAME].birth,
        mobile: state[COMP_NAME].mobile,
        email: state[COMP_NAME].email,
        comment: state[COMP_NAME].comment,
    };
};

export default connect(mapStateToProps)(Description);
