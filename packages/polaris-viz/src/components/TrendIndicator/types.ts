import type {TrendIndicatorProps} from '../TrendIndicator';

export type MetaDataTrendIndicator = Omit<TrendIndicatorProps, 'theme'>;

export interface MetaData {
  trends?: {[key: number]: MetaDataTrendIndicator};
}
