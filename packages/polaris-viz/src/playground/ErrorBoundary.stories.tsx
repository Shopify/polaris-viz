import type {Story} from '@storybook/react';
import {BarChart} from '../components/BarChart/BarChart';
import {PolarisVizProvider} from '../components/PolarisVizProvider/PolarisVizProvider';

export default {
  title: 'polaris-viz/Playground/ErrorBoundary',
  parameters: {},
  decorators: [(Story) => <div style={{height: 500}}>{Story()}</div>],
  argTypes: {},
};

const ComponentPropTemplate: Story = () => {
  return (
    <BarChart
      // @ts-ignore
      data={[{notData: []}]}
      onError={(error, errorInfo) => {
        console.log('From component', {error, errorInfo});
      }}
    />
  );
};

export const ComponentProp: Story = ComponentPropTemplate.bind({});

const ProviderPropTemplate: Story = () => {
  return (
    <PolarisVizProvider
      onError={(error, errorInfo) => {
        console.log('From context', {error, errorInfo});
      }}
    >
      <BarChart
        data={[
          {
            // @ts-ignore
            notData: [],
          },
        ]}
      />
    </PolarisVizProvider>
  );
};

export const ProviderProp: Story = ProviderPropTemplate.bind({});

const BothPropsTemplate: Story = () => {
  return (
    <PolarisVizProvider
      onError={(error, errorInfo) => {
        console.log('From context', {error, errorInfo});
      }}
    >
      <BarChart
        data={[
          {
            // @ts-ignore
            notData: [],
          },
        ]}
        onError={(error, errorInfo) => {
          console.log('From component', {error, errorInfo});
        }}
      />
    </PolarisVizProvider>
  );
};

export const BothProps: Story = BothPropsTemplate.bind({});
