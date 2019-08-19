import React, { useState } from 'react';
// import Description from 'components/Description';
import './index.less';

export default class Index extends React.PureComponent {
    // constructor(props) {
    //     super(props);
    //     const [title] = useState(0);
    //     this.state = {
    //         title: '',
    //     };
    // }

    mapStateToProps(state) {
        return {
            title: state.title,
        };
    }

    mapDispatchToProps(dispatch) {
        return {
            changeTitle: () => { this._changeTitle(dispatch); },
        };
    }

    _changeTitle(dispatch) {
        const [title] = useState(0);
        console.log(dispatch, title);
        // dispatch();
    }

    render() {
        // return <Description />;
        const { title = '' } = this.state || {};
        return (
            <div>
                {title}
            </div>
        );
    }
}
