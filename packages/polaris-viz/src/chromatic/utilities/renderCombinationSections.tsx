import type {FC} from 'react';

import {StorySection} from '../components/StorySection';
import {PolarisVizProvider} from '../../components/PolarisVizProvider/PolarisVizProvider';

type CombinationSection = [string, FC];

export const renderCombinationSections =
  (combinationSets: CombinationSection[]) => (): any =>
    combinationSets.map(([sectionTitle, Set], i) => (
      <StorySection key={`${sectionTitle}-${i}`} title={sectionTitle}>
        <PolarisVizProvider>
          <Set />
        </PolarisVizProvider>
      </StorySection>
    ));
