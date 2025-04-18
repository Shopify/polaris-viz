import type {Story} from '@storybook/react';

import type {GridProps} from '../Grid';
import {Grid} from '../Grid';
import type {CellGroup} from '../types';

const getRandomValue = () => {
  const value = Math.floor(Math.random() * (1000000 - 100) + 100);
  return value.toLocaleString();
};

const getRandomPercentage = () => {
  const value = Math.floor(Math.random() * 100);
  return `(${value}%)`;
};

export const Template: Story<GridProps> = (args: GridProps) => {
  return <Grid {...args} />;
};

export const CELL_GROUPS: CellGroup[] = [
  {
    id: 'previously_loyal',
    start: {row: 0, col: 0},
    end: {row: 0, col: 1},
    secondaryValue: getRandomPercentage(),
    value: '0',
    bgColor: '#B1C3F7',
    color: '#000000',
    name: 'Previously loyal',
    connectedGroups: ['loyal'],
    description:
      'Customers without recent purchases, but with a very strong history of orders and spend.',
    goal: 'Goal: move customers to Loyal',
    metricInformation: '1,424 (10.9% of customer base)',
    actions: [
      {
        children: 'Preview segment',
        url: '#',
        target: '_blank',
      },
      {
        children: 'View report',
        url: '#',
        target: '_blank',
      },
    ],
  },
  {
    id: 'at_risk',
    start: {row: 1, col: 0},
    end: {row: 2, col: 1},
    secondaryValue: getRandomPercentage(),
    value: getRandomValue(),
    bgColor: '#CBD7F9',
    color: '#000000',
    name: 'At risk',
    metricInformation: '1,424 (10.9% of customer base)',
    connectedGroups: ['needs_attention', 'loyal'],
    description:
      'Customers without recent purchases, but with a strong history of orders and spend.',
    goal: 'Goal: move customers to Loyal or Needs Attention',
    actions: [
      {
        children: 'Preview segment',
        url: '#',
        target: '_blank',
      },
      {
        children: 'View report',
        url: '#',
        target: '_blank',
      },
    ],
  },
  {
    id: 'dormant',
    start: {row: 3, col: 0},
    end: {row: 4, col: 1},
    secondaryValue: getRandomPercentage(),
    value: getRandomValue(),
    bgColor: '#E5EBFC',
    color: '#000000',
    name: 'Dormant',
    connectedGroups: ['almost_lost'],
    description:
      'Customers without recent orders, with infrequent orders, and with low spend.',
    goal: 'Goal: move customers to Almost lost',
    metricInformation: '1,424 (10.9% of customer base)',
    actions: [
      {
        children: 'Preview segment',
        url: '#',
        target: '_blank',
      },
      {
        children: 'View report',
        url: '#',
        target: '_blank',
      },
    ],
  },
  {
    id: 'loyal',
    start: {row: 0, col: 2},
    end: {row: 1, col: 3},
    secondaryValue: getRandomPercentage(),
    value: getRandomValue(),
    bgColor: '#0B2062',
    color: '#FFFFFF',
    name: 'Loyal',
    connectedGroups: ['champions'],
    description:
      'Customers without recent purchases, but with a very strong history of orders and spend.',
    goal: 'Goal: move customers to Loyal',
    metricInformation: '1,424 (10.9% of customer base)',
    actions: [
      {
        children: 'Preview segment',
        url: '#',
        target: '_blank',
      },
      {
        children: 'View report',
        url: '#',
        target: '_blank',
      },
    ],
  },
  {
    id: 'needs_attention',
    start: {row: 2, col: 2},
    end: {row: 2, col: 2},
    secondaryValue: getRandomPercentage(),
    value: getRandomValue(),
    bgColor: '#3E69EA',
    color: '#FFFFFF',
    name: 'Needs attention',
    connectedGroups: ['loyal', 'active'],
    description:
      'Customers who buy less recently, order sometimes and spend moderately with your store.',
    goal: 'Goal: move customers to Loyal or Potential',
    metricInformation: '1,424 (10.9% of customer base)',
    actions: [
      {
        children: 'Preview segment',
        url: '#',
        target: '_blank',
      },
      {
        children: 'View report long text',
        url: '#',
        target: '_blank',
      },
    ],
  },
  {
    id: 'almost_lost',
    start: {row: 3, col: 2},
    end: {row: 4, col: 2},
    secondaryValue: getRandomPercentage(),
    value: getRandomValue(),
    bgColor: '#7594F0',
    color: '#000000',
    name: 'Almost lost',
    connectedGroups: ['active', 'promising'],
    description:
      'Customers without recent purchases, fewer orders, and with lower spend.',
    goal: 'Goal: move customers to Active or Promising',
    metricInformation: '1,424 (10.9% of customer base)',
    actions: [
      {
        children: 'Preview segment',
        url: '#',
        target: '_blank',
      },
      {
        children: 'View report',
        url: '#',
        target: '_blank',
      },
    ],
  },
  {
    id: 'promising',
    start: {row: 4, col: 3},
    end: {row: 4, col: 3},
    secondaryValue: getRandomPercentage(),
    value: getRandomValue(),
    bgColor: '#194BE3',
    color: '#FFFFFF',
    name: 'Promising',
    connectedGroups: ['active'],
    description: 'Customers with recent purchases, few orders, and low spend.',
    goal: 'Goal: move customers to Active.',
    metricInformation: '1,424 (10.9% of customer base)',
    actions: [
      {
        children: 'Preview segment',
        url: '#',
        target: '_blank',
      },
      {
        children: 'View report',
        url: '#',
        target: '_blank',
      },
    ],
  },
  {
    id: 'active',
    start: {row: 2, col: 3},
    end: {row: 3, col: 4},
    secondaryValue: getRandomPercentage(),
    value: getRandomValue(),
    bgColor: '#0D297C',
    color: '#FFFFFF',
    name: 'Active',
    connectedGroups: ['loyal', 'champions'],
    description:
      'Customers with recent purchases, some orders, and moderate spend.',
    goal: 'Goal: move customers to Champions or Loyal',
    metricInformation: '1,424 (10.9% of customer base)',
    actions: [
      {
        children: 'Preview segment',
        url: '#',
        target: '_blank',
      },
      {
        children: 'View report',
        url: '#',
        target: '_blank',
      },
    ],
  },
  {
    id: 'new',
    start: {row: 4, col: 4},
    end: {row: 4, col: 4},
    secondaryValue: getRandomPercentage(),
    value: getRandomValue(),
    bgColor: '#133AAF',
    color: '#FFFFFF',
    name: 'New',
    connectedGroups: ['active'],
    description:
      'Clients ayant effectué des achats très récemment, ayant passé peu de commandes et ayant dépensé peu dargent.',
    goal: 'Goal: move customers to Active',
    metricInformation: '1,424 (10.9% of customer base)',
    actions: [
      {
        children: 'Preview segment',
        url: '#',
        target: '_blank',
      },
      {
        children: 'View report',
        url: '#',
        target: '_blank',
      },
    ],
  },
  {
    id: 'champions',
    start: {row: 0, col: 4},
    end: {row: 1, col: 4},
    secondaryValue: getRandomPercentage(),
    value: getRandomValue(),
    bgColor: '#081848',
    color: '#FFFFFF',
    name: 'Champions',
    description:
      'Customers with very recent purchases, many orders, and the most spend.',
    goal: null,
    metricInformation: '1,424 (10.9% of customer base)',
    actions: [
      {
        children: 'Preview segment',
        url: '#',
        target: '_blank',
      },
      {
        children: 'View report',
        url: '#',
        target: '_blank',
      },
    ],
  },
];

export const MISSING_CELL_GROUPS: CellGroup[] = [
  {
    id: 'previously_loyal',
    start: {row: 0, col: 0},
    end: {row: 0, col: 1},
    secondaryValue: getRandomPercentage(),
    value: null,
    bgColor: '#B1C3F7',
    color: '#000000',
    name: 'Previously loyal',
    connectedGroups: ['loyal'],
    description:
      'Customers without recent purchases, but with a very strong history of orders and spend.',
    goal: 'Goal: move customers to Loyal',
    metricInformation: '1,424 (10.9% of customer base)',
  },
  {
    id: 'at_risk',
    start: {row: 1, col: 0},
    end: {row: 2, col: 1},
    secondaryValue: getRandomPercentage(),
    value: getRandomValue(),
    bgColor: '#CBD7F9',
    color: '#000000',
    name: 'At risk',
    metricInformation: '1,424 (10.9% of customer base)',
    connectedGroups: ['needs_attention', 'loyal'],
    description:
      'Customers without recent purchases, but with a strong history of orders and spend.',
    goal: 'Goal: move customers to Loyal or Needs Attention',
  },
  {
    id: 'dormant',
    start: {row: 3, col: 0},
    end: {row: 4, col: 1},
    secondaryValue: getRandomPercentage(),
    value: getRandomValue(),
    bgColor: '#E5EBFC',
    color: '#000000',
    name: 'Dormant',
    connectedGroups: ['almost_lost'],
    description:
      'Customers without recent orders, with infrequent orders, and with low spend.',
    goal: 'Goal: move customers to Almost lost',
    metricInformation: '1,424 (10.9% of customer base)',
  },
  {
    id: 'loyal',
    start: {row: 0, col: 2},
    end: {row: 1, col: 3},
    secondaryValue: getRandomPercentage(),
    value: getRandomValue(),
    bgColor: '#0B2062',
    color: '#FFFFFF',
    name: 'Loyal',
    connectedGroups: ['champions'],
    description:
      'Customers without recent purchases, but with a very strong history of orders and spend.',
    goal: 'Goal: move customers to Loyal',
    metricInformation: '1,424 (10.9% of customer base)',
  },
  {
    id: 'needs_attention',
    start: {row: 2, col: 2},
    end: {row: 2, col: 2},
    secondaryValue: getRandomPercentage(),
    value: getRandomValue(),
    bgColor: '#3E69EA',
    color: '#FFFFFF',
    name: 'Needs attention',
    connectedGroups: ['loyal', 'active'],
    description:
      'Customers who buy less recently, order sometimes and spend moderately with your store.',
    goal: 'Goal: move customers to Loyal or Potential',
    metricInformation: '1,424 (10.9% of customer base)',
  },
  {
    id: 'almost_lost',
    start: {row: 3, col: 2},
    end: {row: 4, col: 2},
    secondaryValue: getRandomPercentage(),
    value: getRandomValue(),
    bgColor: '#7594F0',
    color: '#000000',
    name: 'Almost lost',
    connectedGroups: ['active', 'promising'],
    description:
      'Customers without recent purchases, fewer orders, and with lower spend.',
    goal: 'Goal: move customers to Active or Promising',
    metricInformation: '1,424 (10.9% of customer base)',
  },
  {
    id: 'promising',
    start: {row: 4, col: 3},
    end: {row: 4, col: 3},
    secondaryValue: getRandomPercentage(),
    value: getRandomValue(),
    bgColor: '#194BE3',
    color: '#FFFFFF',
    name: 'Promising',
    connectedGroups: ['active'],
    description: 'Customers with recent purchases, few orders, and low spend.',
    goal: 'Goal: move customers to Active.',
    metricInformation: '1,424 (10.9% of customer base)',
  },
  {
    id: 'active',
    start: {row: 2, col: 3},
    end: {row: 3, col: 4},
    secondaryValue: getRandomPercentage(),
    value: null,
    bgColor: '#0D297C',
    color: '#FFFFFF',
    name: 'Active',
    connectedGroups: ['loyal', 'champions'],
    description:
      'Customers with recent purchases, some orders, and moderate spend.',
    goal: 'Goal: move customers to Champions or Loyal',
    metricInformation: '1,424 (10.9% of customer base)',
  },
  {
    id: 'new',
    start: {row: 4, col: 4},
    end: {row: 4, col: 4},
    secondaryValue: getRandomPercentage(),
    value: getRandomValue(),
    bgColor: '#133AAF',
    color: '#FFFFFF',
    name: 'New',
    connectedGroups: ['active'],
    description:
      'Clients ayant effectué des achats très récemment, ayant passé peu de commandes et ayant dépensé peu dargent.',
    goal: 'Goal: move customers to Active',
    metricInformation: '1,424 (10.9% of customer base)',
  },
  {
    id: 'champions',
    start: {row: 0, col: 4},
    end: {row: 1, col: 4},
    secondaryValue: getRandomPercentage(),
    value: getRandomValue(),
    bgColor: '#081848',
    color: '#FFFFFF',
    name: 'Champions',
    description:
      'Customers with very recent purchases, many orders, and the most spend.',
    goal: null,
    metricInformation: '1,424 (10.9% of customer base)',
  },
];

export const RANDOM_CELL_GROUPS: CellGroup[] = [
  {
    id: 'revenue',
    start: {row: 0, col: 0},
    end: {row: 0, col: 1},
    bgColor: '#4c1d95',
    color: '#FFFFFF',
    name: 'Revenue',
    value: `$${getRandomValue()}`,
    secondaryValue: `+${Math.floor(Math.random() * 100)}%`,
    description: 'Total revenue for the period',
    goal: 'Increase by 20%',
    connectedGroups: ['orders'],
  },
  {
    id: 'orders',
    start: {row: 1, col: 0},
    end: {row: 1, col: 1},
    bgColor: '#6d28d9',
    color: '#FFFFFF',
    name: 'Orders',
    value: getRandomValue(),
    secondaryValue: `↑ ${Math.floor(Math.random() * 100)}%`,
    description: 'Total number of orders',
    goal: 'Maintain growth rate',
    connectedGroups: ['revenue', 'conversion'],
  },
  {
    id: 'conversion',
    start: {row: 2, col: 0},
    end: {row: 2, col: 1},
    bgColor: '#8b5cf6',
    color: '#000000',
    name: 'Conversion',
    value: `${(Math.random() * 10).toFixed(1)}%`,
    secondaryValue: `↓ ${(Math.random() * 5).toFixed(1)}%`,
    description: 'Conversion rate from visits to orders',
    goal: 'Increase to 3%',
    connectedGroups: ['orders'],
  },
  {
    id: 'average-order',
    start: {row: 0, col: 2},
    end: {row: 0, col: 3},
    bgColor: '#701a75',
    color: '#FFFFFF',
    name: 'Average Order',
    value: `$${getRandomValue()}`,
    secondaryValue: `+$${Math.floor(Math.random() * 1000)}`,
    description: 'Average order value',
    goal: 'Increase to $100',
    connectedGroups: ['return-rate'],
  },
  {
    id: 'customer-satisfaction',
    start: {row: 1, col: 2},
    end: {row: 2, col: 3},
    bgColor: '#a21caf',
    color: '#FFFFFF',
    name: 'Customer Satisfaction',
    value: `${(Math.random() * 2 + 3).toFixed(1)}★`,
    secondaryValue: `+${Math.random().toFixed(1)}`,
    description: 'Average customer satisfaction rating',
    goal: 'Maintain above 4.5',
    connectedGroups: ['return-rate'],
  },
  {
    id: 'return-rate',
    start: {row: 0, col: 4},
    end: {row: 2, col: 4},
    bgColor: '#d946ef',
    color: '#000000',
    name: 'Return Rate',
    value: `${(Math.random() * 10).toFixed(1)}%`,
    secondaryValue: `-${(Math.random() * 5).toFixed(1)}%`,
    description: 'Product return rate',
    goal: 'Keep below 5%',
    connectedGroups: [],
  },
  {
    id: 'new-users',
    start: {row: 3, col: 0},
    end: {row: 3, col: 1},
    bgColor: '#c4b5fd',
    color: '#000000',
    name: 'New Users',
    value: getRandomValue(),
    secondaryValue: `+${Math.floor(Math.random() * 100)}%`,
    description: 'New user registrations',
    goal: 'Increase by 30%',
    connectedGroups: ['conversion'],
  },
  {
    id: 'session-duration',
    start: {row: 4, col: 0},
    end: {row: 4, col: 1},
    bgColor: '#831843',
    color: '#FFFFFF',
    name: 'Session Duration',
    value: `${Math.floor(Math.random() * 30)}:${Math.floor(
      Math.random() * 60,
    )}`,
    secondaryValue: `+${Math.floor(Math.random() * 10)}:${Math.floor(
      Math.random() * 60,
    )}`,
    description: 'Average time spent on site',
    goal: 'Increase to 15 minutes',
    connectedGroups: ['conversion'],
  },
  {
    id: 'cart-abandonment',
    start: {row: 3, col: 2},
    end: {row: 3, col: 3},
    bgColor: '#be185d',
    color: '#FFFFFF',
    name: 'Cart Abandonment',
    value: `${Math.floor(Math.random() * 100)}%`,
    secondaryValue: `↓ ${Math.floor(Math.random() * 10)}%`,
    description: 'Rate of abandoned shopping carts',
    goal: 'Reduce to 20%',
    connectedGroups: ['page-load-time'],
  },
  {
    id: 'mobile-users',
    start: {row: 4, col: 2},
    end: {row: 4, col: 3},
    bgColor: '#ec4899',
    color: '#000000',
    name: 'Mobile Users',
    value: `${Math.floor(Math.random() * 100)}%`,
    secondaryValue: `+${Math.floor(Math.random() * 20)}%`,
    description: 'Percentage of mobile visitors',
    goal: 'Maintain above 65%',
    connectedGroups: ['page-load-time'],
  },
  {
    id: 'page-load-time',
    start: {row: 3, col: 4},
    end: {row: 4, col: 4},
    bgColor: '#f9a8d4',
    color: '#000000',
    name: 'Page Load Time',
    value: `${(Math.random() * 5).toFixed(1)}s`,
    secondaryValue: `-${(Math.random() * 2).toFixed(1)}s`,
    description: 'Average page load time',
    goal: 'Keep under 1.5s',
    connectedGroups: ['return-rate'],
  },
];
