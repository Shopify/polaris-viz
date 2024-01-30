import {mount} from '@shopify/react-testing';

import {HiddenLegendTooltip} from '../HiddenLegendTooltip';
import {Legend} from '../../../Legend';

const mockProps = {
  activeIndex: 0,
  colorVisionType: 'someType',
  label: '+3 more',
  data: [
    {name: 'Legend One', color: 'red'},
    {name: 'Legend Two', color: 'blue'},
    {name: 'Legend Three', color: 'yellow'},
  ],
  setActivatorWidth: jest.fn(),
};

describe('<HiddenLegendTooltip />', () => {
  it('renders a legend with the hidden items', () => {
    const component = mount(<HiddenLegendTooltip {...mockProps} />);

    expect(component).toContainReactComponent(Legend, {
      data: mockProps.data,
    });
  });

  it('calls setActivatorWidth', () => {
    const mockSetActivatorWidth = jest.fn();
    mount(
      <HiddenLegendTooltip
        {...mockProps}
        setActivatorWidth={mockSetActivatorWidth}
      />,
    );

    expect(mockSetActivatorWidth).toHaveBeenCalled();
  });

  it('sets visible styles on mouse enter', () => {
    const component = mount(<HiddenLegendTooltip {...mockProps} />);

    expect(component.find('div')).toHaveReactProps({
      style: expect.objectContaining({
        visibility: 'hidden',
        zIndex: -100000,
      }),
    });

    component.find('button')?.trigger('onMouseEnter');

    expect(component.find('div')).toHaveReactProps({
      style: expect.objectContaining({
        visibility: 'visible',
        zIndex: 1,
      }),
    });
  });

  it('sets hidden styles on mouse leave', () => {
    const component = mount(<HiddenLegendTooltip {...mockProps} />);

    component.find('button')?.trigger('onMouseEnter');

    expect(component.find('div')).toHaveReactProps({
      style: expect.objectContaining({
        visibility: 'visible',
        zIndex: 1,
      }),
    });

    component.find('button')?.trigger('onMouseLeave');

    expect(component.find('div')).toHaveReactProps({
      style: expect.objectContaining({
        visibility: 'hidden',
        zIndex: -100000,
      }),
    });
  });

  describe('tooltip position', () => {
    beforeEach(() => {
      jest
        .spyOn(HTMLButtonElement.prototype, 'getBoundingClientRect')
        .mockImplementation(
          () =>
            ({
              x: buttonX,
              y: buttonY,
              width: buttonWidth,
              height: buttonHeight,
            } as DOMRect),
        );

      jest
        .spyOn(HTMLDivElement.prototype, 'getBoundingClientRect')
        .mockImplementation(
          () =>
            ({
              width: tooltipWidth,
              height: tooltipHeight,
            } as DOMRect),
        );
    });

    it('sets the position to top right', () => {
      window.innerWidth = 1000;
      window.innerHeight = 100;

      const component = mount(<HiddenLegendTooltip {...mockProps} />);
      component.find('button')?.trigger('onMouseEnter');

      expect(component.find('div')).toHaveReactProps({
        style: expect.objectContaining({
          top: expectedPositions.top,
          left: expectedPositions.right,
        }),
      });
    });

    it('sets the position to top left', () => {
      window.innerWidth = 90;
      window.innerHeight = 100;

      const component = mount(<HiddenLegendTooltip {...mockProps} />);
      component.find('button')?.trigger('onMouseEnter');

      expect(component.find('div')).toHaveReactProps({
        style: expect.objectContaining({
          top: expectedPositions.top,
          left: expectedPositions.left,
        }),
      });
    });

    it('sets the position to bottom right', () => {
      window.innerWidth = 1000;
      window.innerHeight = 1000;

      const component = mount(<HiddenLegendTooltip {...mockProps} />);
      component.find('button')?.trigger('onMouseEnter');

      expect(component.find('div')).toHaveReactProps({
        style: expect.objectContaining({
          top: expectedPositions.bottom,
          left: expectedPositions.right,
        }),
      });
    });

    it('sets the position to bottom left', () => {
      window.innerWidth = 90;
      window.innerHeight = 1000;

      const component = mount(<HiddenLegendTooltip {...mockProps} />);
      component.find('button')?.trigger('onMouseEnter');

      expect(component.find('div')).toHaveReactProps({
        style: expect.objectContaining({
          top: expectedPositions.bottom,
          left: expectedPositions.left,
        }),
      });
    });
  });
});

const tooltipWidth = 75;
const tooltipHeight = 100;
const buttonWidth = 50;
const buttonHeight = 20;
const buttonX = 0;
const buttonY = 0;

const expectedPositions = {
  top: buttonY - tooltipHeight,
  left: buttonX - tooltipWidth + buttonWidth,
  bottom: buttonY + buttonHeight,
  right: buttonX,
};
