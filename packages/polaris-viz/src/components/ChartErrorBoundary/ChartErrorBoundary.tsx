import {ChartState, Dimensions} from '@shopify/polaris-viz-core';
import React, {ErrorInfo} from 'react';

import {ChartSkeleton} from '../ChartSkeleton';
import type {SkeletonType} from '../ChartSkeleton';

interface ErrorBoundaryProps {
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  dimensions: Dimensions;
  type: SkeletonType;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ChartErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  static getDerivedStateFromError(_: Error) {
    return {hasError: true};
  }

  state: ErrorBoundaryState = {hasError: false};

  constructor(props) {
    super(props);
  }

  onError = (error, errorInfo) => {
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    } else {
      // eslint-disable-next-line no-console
      console.error({error, errorInfo});
    }
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.onError(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ChartSkeleton
          type={this.props.type}
          state={ChartState.Error}
          dimensions={this.props.dimensions}
        />
      );
    }

    return this.props.children;
  }
}
