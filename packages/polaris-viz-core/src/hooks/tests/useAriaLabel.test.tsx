import {mount} from '@shopify/react-testing';

import {useAriaLabel} from '../useAriaLabel';

const MOCK_DATA = [
  {
    name: 'Test Name',
    data: [
      {
        value: 1,
        key: 'Label 01',
      },
    ],
  },
];

describe('useAriaLabel', () => {
  function TestComponent({
    xAxisLabelFormatter = (value) => value,
    yAxisLabelFormatter = (value) => value,
  }) {
    const getAriaLabel = useAriaLabel(MOCK_DATA, {
      xAxisLabelFormatter,
      yAxisLabelFormatter,
    });
    return <div>{getAriaLabel({seriesIndex: 0, key: 'Test Key'})}</div>;
  }

  it('returns aria label when given data and key', () => {
    const mockComponent = mount(<TestComponent />);

    expect(mockComponent.text()).toBe('Test Key: Test Name 1');
  });

  it('applies xAxisLabelFormatter if provided', () => {
    const mockComponent = mount(
      <TestComponent xAxisLabelFormatter={(value) => `Formatted ${value}`} />,
    );

    expect(mockComponent.text()).toBe('Test Key: Test Name Formatted 1');
  });

  it('applies yAxisLabelFormatter if provided', () => {
    const mockComponent = mount(
      <TestComponent yAxisLabelFormatter={(value) => `Formatted ${value}`} />,
    );

    expect(mockComponent.text()).toBe('Formatted Test Key: Test Name 1');
  });
});
