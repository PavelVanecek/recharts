import type { AxisId } from './state/cartesianAxisSlice';
import { BaseAxisWithScale, selectAxisWithScale } from './state/selectors/axisSelectors';
import { useAppSelector } from './state/hooks';
import { useIsPanorama } from './context/PanoramaContext';
import {
  selectActiveLabel,
  selectActiveTooltipCoordinate,
  selectIsTooltipActive,
  selectTooltipPayload,
} from './state/selectors/tooltipSelectors';
import { Coordinate } from './util/types';
import { TooltipPayload } from './state/tooltipSlice';

export const useXAxis = (xAxisId: AxisId): BaseAxisWithScale | undefined => {
  const isPanorama = useIsPanorama();
  return useAppSelector(state => selectAxisWithScale(state, 'xAxis', xAxisId, isPanorama));
};

export const useYAxis = (yAxisId: AxisId): BaseAxisWithScale | undefined => {
  const isPanorama = useIsPanorama();
  return useAppSelector(state => selectAxisWithScale(state, 'yAxis', yAxisId, isPanorama));
};

/**
 * Returns the active tooltip label. The label is one of the values from the chart data,
 * and is used to display in the tooltip content.
 *
 * Returns undefined if there is no active user interaction, or when called outside of the chart context.
 *
 * @returns string | undefined
 */
export const useActiveTooltipLabel = (): string | undefined => {
  return useAppSelector(selectActiveLabel);
};

/**
 * Returns the last known tooltip coordinate. The coordinate is the x and y in pixels relative to the top-left point of the chart.
 * X is the horizontal coordinate, it is 0 on the left edge and maximum on the right edge.
 * Y is the vertical coordinate, it is 0 on the top edge and maximum on the bottom edge.
 *
 * If there are any axes or legend or other elements, they are also included in the coordinate,
 * which means that even if the tooltip is rendered in the top-left corner of the chart, the coordinate may not be (0, 0)
 * because axes and legends will have pushed it down and right.
 *
 * This will continue returning the last known coordinate even after the user has stopped interacting with the chart.
 * This is useful for animation because it allows seamless transition of the tooltip from the last known position to the new position.
 *
 * Returns undefined before any interactions, or when called outside the chart context.
 *
 * @returns Coordinate | undefined last known tooltip coordinate, or undefined if the Tooltip was never active
 */
export const useTooltipCoordinate = (): Coordinate | undefined => {
  return useAppSelector(selectActiveTooltipCoordinate);
};

/**
 * Return true is the Tooltip is currently active, false otherwise.
 *
 * Return undefined when called outside the chart context.
 *
 * @returns boolean | undefined true if the Tooltip is currently active, false otherwise, or undefined if used outside the chart context
 */
export const useIsTooltipActive = (): boolean | undefined => {
  return useAppSelector(selectIsTooltipActive);
};

export const useTooltipPayload = (): TooltipPayload | undefined => {
  return useAppSelector(selectTooltipPayload);
};
