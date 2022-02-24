import 'react-native-gesture-handler';

import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useColorScheme} from 'react-native';
import {SparkLineChart, PolarisVizProvider} from '@shopify/polaris-viz-native';

import {useLoadedAssets} from './hooks/useLoadedAssets';
import Navigation from './navigation';

export default function App() {
  const isLoadingComplete = useLoadedAssets();
  const colorScheme = useColorScheme();

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

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
        <PolarisVizProvider>
          <SparkLineChart data={DATA} />
        </PolarisVizProvider>
      </SafeAreaProvider>
    );
  }
}
