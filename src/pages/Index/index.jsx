import React from 'react';
// import Description from 'components/Description';
import { connect } from 'react-redux';
import './index.less';

class Index extends React.PureComponent {
    constructor(props) {
        super(props);
        // const [title] = useState(0);
        this.state = {
            title: '112233',
        };
        console.log(props);
    }

    _changeTitle = (dispatch) => {
        // const [title] = useState(0);
        console.log(dispatch, '123');
        // dispatch();
    }

    render() {
        // return <Description />;
        const { title = '' } = this.state;
        return (
            <div>
                {title}
            </div>
        );
    }
}

export default connect()(Index);
