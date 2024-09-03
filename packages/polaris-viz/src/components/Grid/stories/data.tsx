import type {DataSeries} from '@shopify/polaris-viz-core';
import type {Story} from '@storybook/react';

import type {GridProps} from '../Grid';
import {Grid} from '../Grid';

export const Template: Story<GridProps> = (args: GridProps) => {
  return <Grid {...args} />;
};

export const CELL_GROUPS = [
  {
    start: {row: 0, col: 0},
    end: {row: 0, col: 1},
    secondaryValue: '(10%)',
    value: '8,000',
    color: '#194BE3',
    name: 'Previously loyal',
    onHoverActiveGroups: ['Loyal'],
    description: 'lorem ipsum dolor sit amet lorem ipsum dolor sit amet',
    goal: 'move customers to Champions or Loyal',
  },
  {
    start: {row: 1, col: 0},
    end: {row: 2, col: 1},
    secondaryValue: '(20%)',
    value: '200',
    color: '#3E69EA',
    name: 'At risk',
    onHoverActiveGroups: ['Needs attention', 'Loyal'],
    description: 'lorem ipsum dolor sit amet lorem ipsum dolor sit amet',
    goal: 'move customers to Champions or Loyal',
  },
  {
    start: {row: 3, col: 0},
    end: {row: 4, col: 1},
    secondaryValue: '(30%)',
    value: '2,000',
    color: '#3E69EA',
    name: 'Dormant',
    onHoverActiveGroups: ['Almost lost'],
    description: 'lorem ipsum dolor sit amet lorem ipsum dolor sit amet',
    goal: 'move customers to Champions or Loyal',
  },
  {
    start: {row: 0, col: 2},
    end: {row: 1, col: 3},
    secondaryValue: '(40%)',
    value: '80',
    color: '#133AAF',
    name: 'Loyal',
    onHoverActiveGroups: ['Champions'],
    description: 'lorem ipsum dolor sit amet lorem ipsum dolor sit amet',
    goal: 'move customers to Champions or Loyal',
  },
  {
    start: {row: 2, col: 2},
    end: {row: 2, col: 2},
    secondaryValue: '(20%)',
    value: '500',
    color: '#3E69EB',
    name: 'Needs attention',
    onHoverActiveGroups: ['Loyal', 'Active'],
    description: 'lorem ipsum dolor sit amet lorem ipsum dolor sit amet',
    goal: 'move customers to Champions or Loyal',
  },
  {
    start: {row: 3, col: 2},
    end: {row: 4, col: 2},
    secondaryValue: '(10%)',
    value: '8,000',
    color: '#3E69EA',
    name: 'Almost lost',
    onHoverActiveGroups: ['Active', 'Promising'],
    description: 'lorem ipsum dolor sit amet lorem ipsum dolor sit amet',
    goal: 'move customers to Champions or Loyal',
  },
  {
    start: {row: 4, col: 3},
    end: {row: 4, col: 3},
    secondaryValue: '(20%)',
    value: '200',
    color: '#194AE5',
    name: 'Promising',
    onHoverActiveGroups: ['Active'],
    description: 'lorem ipsum dolor sit amet lorem ipsum dolor sit amet',
    goal: 'move customers to Champions or Loyal',
  },
  {
    start: {row: 2, col: 3},
    end: {row: 3, col: 4},
    secondaryValue: '(30%)',
    value: '2,000',
    color: '#133AAF',
    name: 'Active',
    onHoverActiveGroups: ['Loyal', 'Champions'],
    description: 'lorem ipsum dolor sit amet lorem ipsum dolor sit amet',
    goal: 'move customers to Champions or Loyal',
  },
  {
    start: {row: 4, col: 4},
    end: {row: 4, col: 4},
    secondaryValue: '(40%)',
    value: '80',
    color: '#194AE5',
    name: 'New',
    onHoverActiveGroups: ['Active'],
    description: 'lorem ipsum dolor sit amet lorem ipsum dolor sit amet',
    goal: 'move customers to Champions or Loyal',
  },
  {
    start: {row: 0, col: 4},
    end: {row: 1, col: 4},
    secondaryValue: '(20%)',
    value: '500',
    color: '#0D297C',
    name: 'Champions',
    description: 'lorem ipsum dolor sit amet lorem ipsum dolor sit amet',
    goal: 'move customers to Champions or Loyal',
  },
];

export const DEFAULT_DATA: DataSeries[] = [
  {
    name: '5',
    data: [
      {key: '1', value: 100},
      {key: '2', value: 90},
      {key: '3', value: 80},
      {key: '4', value: 100},
      {key: '5', value: 100},
    ],
  },
  {
    name: '4',
    data: [
      {key: '1', value: 90},
      {key: '2', value: 80},
      {key: '3', value: 70},
      {key: '4', value: 100},
      {key: '5', value: 100},
    ],
  },
  {
    name: '3',
    data: [
      {key: '1', value: 80},
      {key: '2', value: 70},
      {key: '3', value: 60},
      {key: '4', value: 50},
      {key: '5', value: 40},
    ],
  },
  {
    name: '2',
    data: [
      {key: '1', value: 70},
      {key: '2', value: 60},
      {key: '3', value: 50},
      {key: '4', value: 40},
      {key: '5', value: 30},
    ],
  },
  {
    name: '1',
    data: [
      {key: '1', value: 60},
      {key: '2', value: 50},
      {key: '3', value: 40},
      {key: '4', value: 30},
      {key: '5', value: 20},
    ],
  },
];
