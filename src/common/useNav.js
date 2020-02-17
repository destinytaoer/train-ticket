import { useCallback } from 'react';
import { h0 } from './fp';

export default function useNav(date, prevDate, nextDate) {
  // 选择时间小于今天, 不能购买过去时间的车票
  // 选择时间超过今天 20 天后, 车票暂不出售
  const isPrevDisabled = h0(date) <= h0();
  const isNextDisabled = (h0(date) - h0()) > 20 * 86400 * 1000;

  const prev = useCallback(() => {
    if (isPrevDisabled) return;
    prevDate();
  }, [isPrevDisabled, prevDate]);
  const next = useCallback(() => {
    if (isNextDisabled) return;
    nextDate();
  }, [isNextDisabled, nextDate]);

  return {
    isPrevDisabled,
    isNextDisabled,
    prev,
    next
  }
}