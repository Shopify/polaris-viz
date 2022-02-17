/* eslint-disable no-case-declarations */
import React from 'react';
import {validate} from 'jsonschema';

import {BarChart, LineChart} from '../../';
import type {DataSeries, Direction} from '../../types';

import schemaJson from './schema.json';

const schema = {
  $ref: '#/definitions/ChartTopLevelConfig',
  definitions: {
    ChartTopLevelConfig: {
      type: 'object',
      anyOf: [
        {
          $ref: '#/definitions/BarChartConfig',
        },
        {
          $ref: '#/definitions/LineChartConfig',
        },
      ],
    },
    ChartType: {
      description: 'Chart types',
      enum: ['bar', 'line'],
      type: 'string',
    },
    BarChartConfig: {
      additionalProperties: false,
      type: 'object',
      properties: {
        type: {
          $ref: '#/definitions/BarChartTypeDef',
        },
        data: {
          description: 'Bar chart data',
          items: {
            $ref: '#/definitions/DataSeries',
          },
          type: 'array',
        },
        direction: {
          $ref: '#/definitions/Direction',
        },
      },
    },
    BarChartTypeDef: {
      description: 'Bar chart type',
      enum: ['bar'],
      type: 'string',
    },
    Direction: {
      description: 'chart direction',
      enum: ['horizontal', 'vertical'],
      type: 'string',
    },
    DataSeries: {
      additionalProperties: false,
      type: 'object',
      properties: {
        data: {
          items: {
            $ref: '#/definitions/DataPoint',
          },
          type: 'array',
        },
        color: {
          anyOf: [
            {
              type: ['string', 'null'],
            },
            {
              items: {
                $ref: '#/definitions/GradientStop',
              },
              type: 'array',
            },
          ],
        },
        isComparison: {
          type: ['boolean', 'null'],
        },
        name: {
          type: ['string', 'null'],
        },
      },
    },
    DataPoint: {
      additionalProperties: false,
      type: 'object',
      properties: {
        key: {
          type: ['number', 'string'],
        },
        value: {
          type: ['number', 'null'],
        },
      },
    },
    GradientStop: {
      additionalProperties: false,
      properties: {
        offset: {
          type: 'number',
        },
        color: {
          type: 'string',
        },
        stopOpacity: {
          type: ['number', 'null'],
        },
      },
    },
    LineChartConfig: {
      additionalProperties: false,
      type: 'object',
      properties: {
        type: {
          $ref: '#/definitions/LineChartTypeDef',
        },
        data: {
          description: 'Bar chart data',
          items: {
            $ref: '#/definitions/DataSeries',
          },
          type: 'array',
        },
      },
    },
    LineChartTypeDef: {
      description: 'Line chart type',
      enum: ['line'],
      type: 'string',
    },
  },
};

export type ChartConfigProps = BarChartConfigProps | LineChartConfigProps;

interface LineChartConfigProps {
  type: string;
  data: DataSeries[];
}
interface BarChartConfigProps {
  type: string;
  data: DataSeries[];
  direction?: Direction;
}

export function ChartConfig(props: any) {
  const result = validate(props, schema);
  function chartType() {
    if (result.errors.length > 0) {
      return <p>{result.toString()}</p>;
    }
    switch (props.type) {
      case 'bar':
        const barChartProps = props as BarChartConfigProps;
        return (
          <BarChart
            data={barChartProps.data}
            direction={barChartProps.direction}
          />
        );
      case 'line':
        const lineChartProps = props as LineChartConfigProps;
        return <LineChart data={lineChartProps.data} />;
      default:
        return null;
    }
  }
  return <React.Fragment>{chartType()}</React.Fragment>;
}
