import type {ReactNode} from 'react';
import {Fragment} from 'react';

import {PREVIEW_ICON_SIZE} from '../../../constants';
import {TooltipContentContainer} from '../../TooltipContent/components/TooltipContentContainer/TooltipContentContainer';
import {TooltipTitle} from '../../TooltipContent/components/TooltipTitle/TooltipTitle';
import {TooltipRow} from '../../TooltipContent/components/TooltipRow/TooltipRow';
import {LinePreview} from '../../LinePreview/LinePreview';
import type {RenderTooltipContentData} from '../../../types';
import {SeriesIcon} from '../components/SeriesIcon/SeriesIcon';

import styles from './Styles.scss';

export function renderLinearPredictiveTooltipContent(
  tooltipData: RenderTooltipContentData,
): ReactNode {
  const {theme} = tooltipData;

  const formatters = {
    keyFormatter: (key) => `${key}`,
    valueFormatter: (value) => `${value}`,
    titleFormatter: (title) => `${title}`,
    ...tooltipData.formatters,
  };

  function renderSeriesIcon(color, isComparison): ReactNode {
    return (
      <div
        className={styles.Icon}
        style={{height: PREVIEW_ICON_SIZE, width: PREVIEW_ICON_SIZE}}
      >
        {isComparison ? (
          <LinePreview color={color} lineStyle="dotted" />
        ) : (
          <SeriesIcon color={color} />
        )}
      </div>
    );
  }

  function renderContent({
    activeColorVisionIndex,
  }: {
    activeColorVisionIndex: number;
  }) {
    const item = tooltipData.data[0];

    return item.data.map(({color, key, value, isComparison}, seriesIndex) => {
      const metadata = tooltipData.dataSeries[seriesIndex].metadata;
      const activeKey =
        tooltipData.dataSeries[seriesIndex].data[tooltipData.activeIndex].key;
      const index = metadata?.relatedIndex ?? seriesIndex;

      const isNull = value == null;
      const isPredictiveStartKey = metadata?.startKey === activeKey;
      const isHidden = isNull || isPredictiveStartKey;

      return (
        <TooltipRow
          activeIndex={activeColorVisionIndex}
          color={color}
          index={index}
          isHidden={isHidden}
          key={`row-${seriesIndex}`}
          label={formatters.keyFormatter(key)}
          renderSeriesIcon={() => renderSeriesIcon(color, isComparison)}
          shape="Line"
          value={formatters.valueFormatter(value ?? 0)}
        />
      );
    });
  }

  return (
    <TooltipContentContainer maxWidth={300} theme={theme}>
      {({activeColorVisionIndex}) => (
        <Fragment>
          {tooltipData.title != null && (
            <TooltipTitle theme={theme}>
              {formatters.titleFormatter(tooltipData.title)}
            </TooltipTitle>
          )}
          {renderContent({activeColorVisionIndex})}
        </Fragment>
      )}
    </TooltipContentContainer>
  );
}
