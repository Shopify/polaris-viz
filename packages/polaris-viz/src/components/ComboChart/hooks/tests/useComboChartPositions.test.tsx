import {mount, Root} from '@shopify/react-testing';

import {useComboChartPositions, Props} from '../useComboChartPositions';
import {useTheme} from '../../../../../../polaris-viz-core/src/hooks/useTheme';

jest.mock('../../../../../../polaris-viz-core/src/hooks/useTheme', () => ({
  useTheme: jest.fn(() => {
    return {
      grid: {
        horizontalMargin: 16,
      },
    };
  }),
}));

const MOCK_PROPS: Props = {
  leftTickWidth: 20,
  primaryAxis: {},
  rightTickWidth: 40,
  secondaryAxis: {},
  width: 500,
};

describe('useComboChartPositions()', () => {
  function TestComponent(props: Props) {
    const result = useComboChartPositions(props);
    return <div>{JSON.stringify(result)}</div>;
  }

  function parseResult(mockComponent: Root<any>) {
    return JSON.parse(mockComponent.text());
  }

  it('returns positions', () => {
    const mockComponent = mount(<TestComponent {...MOCK_PROPS} />);

    const result = parseResult(mockComponent);

    expect(result).toStrictEqual({
      chartXPosition: 56,
      drawableWidth: 368,
      leftAxis: {x: 16, labelX: 16},
      rightAxis: {x: 444, labelX: 484},
    });
  });

  describe('Axis', () => {
    it('returns altered positions when primaryAxis provided', () => {
      const mockComponent = mount(
        <TestComponent {...MOCK_PROPS} primaryAxis={{name: 'Axis'}} />,
      );

      const result = parseResult(mockComponent);

      expect(result).toStrictEqual({
        chartXPosition: 84,
        drawableWidth: 340,
        leftAxis: {x: 44, labelX: 16},
        rightAxis: {x: 444, labelX: 484},
      });
    });

    it('returns altered positions when secondaryAxis provided', () => {
      const mockComponent = mount(
        <TestComponent {...MOCK_PROPS} secondaryAxis={{name: 'Axis'}} />,
      );

      const result = parseResult(mockComponent);

      expect(result).toStrictEqual({
        chartXPosition: 56,
        drawableWidth: 340,
        leftAxis: {x: 16, labelX: 16},
        rightAxis: {x: 416, labelX: 470},
      });
    });

    it('returns altered positions when both axis provided', () => {
      const mockComponent = mount(
        <TestComponent
          {...MOCK_PROPS}
          primaryAxis={{name: 'Axis'}}
          secondaryAxis={{name: 'Axis'}}
        />,
      );

      const result = parseResult(mockComponent);

      expect(result).toStrictEqual({
        chartXPosition: 84,
        drawableWidth: 312,
        leftAxis: {x: 44, labelX: 16},
        rightAxis: {x: 416, labelX: 470},
      });
    });
  });

  describe('leftTickWidth', () => {
    it('returns altered positions', () => {
      const mockComponent = mount(
        <TestComponent {...MOCK_PROPS} leftTickWidth={60} />,
      );

      const result = parseResult(mockComponent);

      expect(result).toStrictEqual({
        chartXPosition: 96,
        drawableWidth: 328,
        leftAxis: {x: 16, labelX: 16},
        rightAxis: {x: 444, labelX: 484},
      });
    });
  });

  describe('rightTickWidth', () => {
    it('returns altered positions', () => {
      const mockComponent = mount(
        <TestComponent {...MOCK_PROPS} rightTickWidth={60} />,
      );

      const result = parseResult(mockComponent);

      expect(result).toStrictEqual({
        chartXPosition: 56,
        drawableWidth: 348,
        leftAxis: {x: 16, labelX: 16},
        rightAxis: {x: 424, labelX: 484},
      });
    });
  });

  describe('grid.horizontalMargin', () => {
    it('returns altered positions', () => {
      useTheme.mockImplementation(() => ({
        grid: {horizontalMargin: 0},
      }));

      const mockComponent = mount(<TestComponent {...MOCK_PROPS} />);

      const result = parseResult(mockComponent);

      expect(result).toStrictEqual({
        chartXPosition: 40,
        drawableWidth: 400,
        leftAxis: {x: 0, labelX: 0},
        rightAxis: {x: 460, labelX: 500},
      });
    });
  });
});
