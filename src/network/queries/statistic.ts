import { useQuery } from 'react-query';
import { getStatistic } from '@api/services';
import { getStatisticByMonth, getStatisticByUser, getStatisticProduct } from '../services/statistic';
const STATISTIC_OVERVIEW = 'STATISTIC_OVERVIEW';
const STATISTIC_MONTH = 'STATISTIC_MONTH';
const STATISTIC_USER = 'STATISTIC_USER';
const STATISTIC_PRODUCT = 'STATISTIC_PRODUCT';

export const useStatisticOverview = (timerPeriod?: { from: string; to: string }) =>
  useQuery([STATISTIC_OVERVIEW, timerPeriod], () => getStatistic(timerPeriod), {
    refetchOnWindowFocus: false,
  });
export const useStatisticMonth = (timerPeriod?: { from: string; to: string }) =>
  useQuery([STATISTIC_MONTH, timerPeriod], () => getStatisticByMonth(timerPeriod), {
    refetchOnWindowFocus: false,
  });
export const useStatisticProduct = (timerPeriod?: { from: string; to: string }) =>
  useQuery([STATISTIC_PRODUCT, timerPeriod], () => getStatisticProduct(timerPeriod), {
    refetchOnWindowFocus: false,
  });
export const useStatisticUser = (userId: string) =>
  useQuery([STATISTIC_USER], () => getStatisticByUser(userId), {
    refetchOnWindowFocus: false,
  });
