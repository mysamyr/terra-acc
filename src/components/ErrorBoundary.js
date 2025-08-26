import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
    };
  }

  componentDidCatch(err, errInfo) {
    // eslint-disable-next-line no-console
    console.log(err, errInfo);
    this.setState({
      isError: true,
    });
  }

  render() {
    if (this.state.isError) {
      return <h2>Something went wrong</h2>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
