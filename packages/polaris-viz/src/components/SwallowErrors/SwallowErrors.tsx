import {Component} from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class SwallowErrors extends Component<Props, State> {
  static getDerivedStateFromError() {
    return {hasError: true};
  }

  state: State = {
    hasError: false,
  };

  constructor(props) {
    super(props);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }
}
