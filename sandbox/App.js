import 'react-native-gesture-handler';

import React from 'react';
import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {View} from 'react-native';
import {
  PolarisVizProvider,
  SparkBarChart,
  SparkLineChart,
} from '@shopify/polaris-viz-native';

import {useLoadedAssets} from './hooks/useLoadedAssets';

export default function App() {
  const isLoadingComplete = useLoadedAssets();

  const DATA = [
    {
      data: [
        {key: 0, value: 100},
        {key: 1, value: 200},
        {key: 2, value: 300},
        {key: 3, value: 400},
        {key: 4, value: 400},
        {key: 5, value: 1000},
        {key: 6, value: 200},
        {key: 7, value: 800},
        {key: 8, value: 900},
        {key: 9, value: 200},
        {key: 10, value: 400},
      ],
    },
    {
      isComparison: true,
      data: [
        {key: 0, value: 200},
        {key: 1, value: 200},
        {key: 2, value: 200},
        {key: 3, value: 200},
        {key: 4, value: 200},
        {key: 5, value: 200},
        {key: 6, value: 200},
        {key: 7, value: 200},
        {key: 8, value: 200},
        {key: 9, value: 200},
        {key: 10, value: 200},
      ],
    },
  ];

  const sparkBarData = [
    {
      data: [
        {
          key: 0,
          value: 100,
        },
        {
          key: 1,
          value: 200,
        },
        {
          key: 2,
          value: 300,
        },
        {
          key: 3,
          value: 400,
        },
        {
          key: 4,
          value: 400,
        },
        {
          key: 5,
          value: 100,
        },
        {
          key: 6,
          value: -2000,
        },
        {
          key: 7,
          value: 800,
        },
        {
          key: 8,
          value: 900,
        },
        {
          key: 9,
          value: 200,
        },
        {
          key: 10,
          value: 400,
        },
      ],
    },
    {
      data: [
        {
          key: 0,
          value: 2000,
        },
        {
          key: 1,
          value: 2000,
        },
        {
          key: 2,
          value: 2000,
        },
        {
          key: 3,
          value: 2000,
        },
        {
          key: 4,
          value: 2000,
        },
        {
          key: 5,
          value: 2000,
        },
        {
          key: 6,
          value: 2000,
        },
        {
          key: 7,
          value: 2000,
        },
        {
          key: 8,
          value: 2000,
        },
        {
          key: 9,
          value: 2000,
        },
        {
          key: 10,
          value: 2000,
        },
      ],
      isComparison: true,
    },
  ];

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <View width={300} height={200} />
        <PolarisVizProvider>
          <View width={300} height={200}>
            <SparkBarChart isAnimated data={sparkBarData} />
          </View>
          <View width={300} height={200}>
            <SparkLineChart isAnimated data={DATA} />
          </View>
        </PolarisVizProvider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
