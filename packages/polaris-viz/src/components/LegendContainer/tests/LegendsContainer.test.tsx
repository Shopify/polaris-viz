import {mount} from '@shopify/react-testing';

import {LegendContainer, LegendContainerProps} from '../LegendContainer';
import {Legend} from '../../Legend';

const mockProps: LegendContainerProps = {
  colorVisionType: 'someType',
  data: [
    {name: 'Legend One', color: 'red'},
    {name: 'Legend Two', color: 'blue'},
  ],
  onDimensionChange: jest.fn(),
  theme: 'Default',
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

  beforeEach(() => {
    jest.resetAllMocks();
  });

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
});
