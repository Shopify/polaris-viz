import React from 'react';
import {mount} from '@shopify/react-testing';
import {TooltipContainer} from 'components';

import {Tooltip} from '../Tooltip';
import {SquareColorPreview} from '../../../../SquareColorPreview';

(global as any).DOMRect = class DOMRect {
  width = 500;
  height = 250;
  top = 100;
  left = 100;
};

describe('<Tooltip/>', () => {
  const mockData = [
    {
      Orange: 10,
      Banana: 20,
      Strawberry: 100,
    },
    {
      Orange: 100,
      Banana: 200,
      Strawberry: 1000,
    },
  ];

  it('renders a <SquareColorPreview /> for each current Series', () => {
    const tooltip = mount(
      <Tooltip
        data={mockData}
        activePointIndex={1}
        currentX={0}
        currentY={0}
        formatYAxisValue={(val) => val.toString()}
        colors={['colorPurple', 'colorBlue', 'primary']}
        chartDimensions={new DOMRect()}
      />,
    );

    expect(tooltip).toContainReactComponent(SquareColorPreview, {
      color: 'colorPurple',
    });
    expect(tooltip).toContainReactComponent(SquareColorPreview, {
      color: 'primary',
    });
  });

  it('renders the name of each Series', () => {
    const tooltip = mount(
      <Tooltip
        data={mockData}
        activePointIndex={1}
        currentX={0}
        currentY={0}
        formatYAxisValue={(val) => val.toString()}
        colors={['colorPurple', 'colorBlue', 'primary']}
        chartDimensions={new DOMRect()}
      />,
    );

    expect(tooltip).toContainReactText('Orange');
    expect(tooltip).toContainReactText('Banana');
    expect(tooltip).toContainReactText('Strawberry');
  });

  it('renders a formatted value for each Series', () => {
    const tooltip = mount(
      <Tooltip
        data={mockData}
        activePointIndex={1}
        currentX={0}
        currentY={0}
        formatYAxisValue={(val) => `$${val.toString()}`}
        colors={['colorPurple', 'colorBlue', 'primary']}
        chartDimensions={new DOMRect()}
      />,
    );

    expect(tooltip).toContainReactText('$100');
    expect(tooltip).toContainReactText('$200');
    expect(tooltip).toContainReactText('$1000');
  });

  it('renders a <TooltipContainer />', () => {
    const tooltip = mount(
      <Tooltip
        data={mockData}
        activePointIndex={1}
        currentX={0}
        currentY={0}
        formatYAxisValue={(val) => val.toString()}
        colors={['colorPurple', 'colorBlue', 'primary']}
        chartDimensions={new DOMRect()}
      />,
    );

    expect(tooltip).toContainReactComponent(TooltipContainer, {
      activePointIndex: 1,
      currentX: 0,
      currentY: 0,
      chartDimensions: new DOMRect(),
    });
  });

  it('renders a total message if a totalMessage string is provided', () => {
    const tooltip = mount(
      <Tooltip
        data={mockData}
        activePointIndex={1}
        currentX={0}
        currentY={0}
        formatYAxisValue={(val) => val.toString()}
        colors={['colorPurple', 'colorBlue', 'primary']}
        chartDimensions={new DOMRect()}
        tooltipSumDescriptor="Toplam"
      />,
    );

    expect(tooltip).toContainReactText('Toplam');
    expect(tooltip).toContainReactText('1300');
  });
});
