import {mount} from '@shopify/react-testing';

import type {LegendContainerProps} from '../LegendContainer';
import {LegendContainer} from '../LegendContainer';
import {Legend, LegendItem} from '../../Legend';
import {HiddenLegendTooltip} from '../components/HiddenLegendTooltip';

const WIDTH_WITH_OVERFLOW = 0;
const WIDTH_WITHOUT_OVERFLOW = 100;

const mockProps: LegendContainerProps = {
  colorVisionType: 'someType',
  data: [
    {name: 'Legend One', color: 'red'},
    {name: 'Legend Two', color: 'blue'},
    {name: 'Legend Three', color: 'yellow'},
  ],
  onDimensionChange: jest.fn(),
  dimensions: {
    width: 0,
    height: 0,
  },
};

jest.mock('../../../hooks/useResizeObserver', () => {
  return {
    useResizeObserver: () => {
      return {
        setRef: () => {},
        entry: null,
      };
    },
  };
});

describe('<LegendContainer />', () => {
  const renderLegendContent = () => (
    <ul>
      <li>Group 1</li>
      <li>Group 2</li>
      <li>Group 3</li>
    </ul>
  );

  it('renders <Legend /> by default', () => {
    const component = mount(<LegendContainer {...mockProps} />);

    expect(component).toContainReactComponent(Legend);
  });

  it('does not render <Legend /> if renderLegendContent is provided', () => {
    const component = mount(
      <LegendContainer
        {...mockProps}
        renderLegendContent={renderLegendContent}
      />,
    );

    expect(component).not.toContainReactComponent(Legend);
  });

  it('calls renderLegendContent if renderLegendContent is provided', () => {
    const mockRenderLegendContent = jest.fn(renderLegendContent);

    mount(
      <LegendContainer
        {...mockProps}
        renderLegendContent={mockRenderLegendContent}
      />,
    );

    expect(mockRenderLegendContent).toHaveBeenCalledTimes(1);
  });

  describe('enableHideOverflow', () => {
    it('does not hide items if false', () => {
      const component = mount(
        <LegendContainer
          {...mockProps}
          dimensions={{...mockProps.dimensions, width: WIDTH_WITH_OVERFLOW}}
          enableHideOverflow={false}
        />,
      );

      expect(component).not.toContainReactComponent(HiddenLegendTooltip);
    });

    it('sets flexWrap to nowrap if true', () => {
      const component = mount(
        <LegendContainer
          {...mockProps}
          dimensions={{...mockProps.dimensions, width: WIDTH_WITH_OVERFLOW}}
          enableHideOverflow
        />,
      );

      expect(component.find('div', {role: 'list'})).toHaveReactProps({
        style: expect.objectContaining({
          flexWrap: 'nowrap',
        }),
      });
    });

    it('sets flexWrap to nowrap if false', () => {
      const component = mount(
        <LegendContainer {...mockProps} enableHideOverflow={false} />,
      );

      expect(component.find('div', {role: 'list'})).toHaveReactProps({
        style: expect.objectContaining({
          flexWrap: 'wrap',
        }),
      });
    });

    it('renders HiddenLegendTooltip if there is hidden data', () => {
      const component = mount(
        <LegendContainer
          {...mockProps}
          dimensions={{...mockProps.dimensions, width: WIDTH_WITH_OVERFLOW}}
          enableHideOverflow
        />,
      );

      expect(component).toContainReactComponent(HiddenLegendTooltip);
    });

    it('does not render HiddenLegendTooltip if there is no hidden data', () => {
      const component = mount(
        <LegendContainer
          {...mockProps}
          dimensions={{...mockProps.dimensions, width: WIDTH_WITHOUT_OVERFLOW}}
          enableHideOverflow
        />,
      );

      expect(component).not.toContainReactComponent(HiddenLegendTooltip);
    });
  });

  describe('renderHiddenLegendLabel', () => {
    it('renders the default label if not provided', () => {
      const component = mount(
        <LegendContainer
          {...mockProps}
          dimensions={{...mockProps.dimensions, width: WIDTH_WITH_OVERFLOW}}
          enableHideOverflow
        />,
      );

      expect(component).toContainReactComponent(HiddenLegendTooltip, {
        label: `+${mockProps.data.length - 1} more`,
      });
    });

    it('renders a custom label if provided', () => {
      const component = mount(
        <LegendContainer
          {...mockProps}
          dimensions={{...mockProps.dimensions, width: WIDTH_WITH_OVERFLOW}}
          enableHideOverflow
          renderHiddenLegendLabel={(x) => `Custom legend label ${x}`}
        />,
      );

      expect(component).toContainReactComponent(HiddenLegendTooltip, {
        label: `Custom legend label ${mockProps.data.length - 1}`,
      });
    });
  });
});
