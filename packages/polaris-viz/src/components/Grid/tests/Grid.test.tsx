import {mount} from '@shopify/react-testing';
import {act} from 'react-dom/test-utils';

import {Grid} from '../Grid';
import {ChartContainer} from '../../ChartContainer';
import {XAxis} from '../../XAxis';
import {YAxis} from '../../YAxis';
import {GroupCell} from '../components/GroupCell';

describe('<Grid />', () => {
  it('renders a <ChartContainer />', () => {
    const grid = mount(<Grid {...MOCK_PROPS} />);
    expect(grid).toContainReactComponent(ChartContainer);
  });

  it('renders <XAxis /> and <YAxis />', () => {
    const grid = mount(<Grid {...MOCK_PROPS} />);
    expect(grid).toContainReactComponent(XAxis);
    expect(grid).toContainReactComponent(YAxis);
  });

  it('renders the expected number of GroupCell components', () => {
    const grid = mount(<Grid {...MOCK_PROPS} />);
    const groupCells = grid.findAll(GroupCell);
    expect(groupCells).toHaveLength(MOCK_CELL_GROUPS.length);
  });

  it('renders the expected number of columns and rows', () => {
    const grid = mount(<Grid {...MOCK_PROPS} />);

    expect(grid).toContainReactComponent(XAxis, {
      labels: ['1', '2', '3', '4'],
    });
    expect(grid).toContainReactComponent(YAxis, {
      ticks: expect.arrayContaining([
        expect.objectContaining({
          label: '1',
          formattedValue: '1',
          value: 0,
          yOffset: expect.any(Number),
        }),
        expect.objectContaining({
          label: '2',
          formattedValue: '2',
          value: 1,
          yOffset: expect.any(Number),
        }),
        expect.objectContaining({
          label: '3',
          formattedValue: '3',
          value: 2,
          yOffset: expect.any(Number),
        }),
        expect.objectContaining({
          label: '4',
          formattedValue: '4',
          value: 3,
          yOffset: expect.any(Number),
        }),
      ]),
    });
  });
});

const MOCK_CELL_GROUPS = [
  {
    start: {row: 0, col: 0},
    end: {row: 1, col: 1},
    bgColor: 'red',
    color: 'white',
    name: 'Group 1',
    description: 'Description 1',
    goal: 'Goal 1',
    secondaryValue: '10',
    value: '100',
  },
  {
    start: {row: 1, col: 1},
    end: {row: 2, col: 2},
    bgColor: 'blue',
    color: 'white',
    name: 'Group 2',
    description: 'Description 2',
    goal: 'Goal 2',
    secondaryValue: '20',
    value: '200',
  },
  {
    start: {row: 2, col: 2},
    end: {row: 3, col: 3},
    bgColor: 'green',
    color: 'white',
    name: 'Group 3',
    description: 'Description 3',
    goal: 'Goal 3',
    secondaryValue: '30',
    value: '300',
  },
];

const MOCK_PROPS = {
  cellGroups: MOCK_CELL_GROUPS,
  xAxisOptions: {
    lowLabel: 'Low',
    highLabel: 'High',
  },
  yAxisOptions: {
    lowLabel: 'Low',
    highLabel: 'High',
  },
  isAnimated: false,
};
