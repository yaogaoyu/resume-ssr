import { PureComponent } from 'react';
import PropTypes from 'prop-types';
// import { Loading } from '@shark/backstage-ui';

class ErrorBoundary extends PureComponent {
    static propTypes = {
        children: PropTypes.element,
    };

    static defaultProps = {
        children: null,
    }

    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error) {
        this.setState({ hasError: true });
        const pattern = /Loading chunk (\d)+ failed/g;
        const isChunkLoadFailed = error.match(pattern);
        window.console.error(error);
        if (isChunkLoadFailed) {
            window.location.reload();
        }
    }

    render() {
        const { children } = this.props;
        const { hasError } = this.state;
        if (hasError) {
            // return <Loading />;
            return <div>loading</div>;
        }

        return children;
    }
}

export default ErrorBoundary;
