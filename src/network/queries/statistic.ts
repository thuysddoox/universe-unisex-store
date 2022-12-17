import { useQuery } from 'react-query';
import { getStatistic } from '@api/services';
import { getStatisticByMonth, getStatisticByUser } from '../services/statistic';
const STATISTIC_OVERVIEW = 'STATISTIC_OVERVIEW';
const STATISTIC_MONTH = 'STATISTIC_MONTH';
const STATISTIC_USER = 'STATISTIC_USER';

export const useStatisticOverview = () =>
  useQuery([STATISTIC_OVERVIEW], () => getStatistic(), {
    refetchOnWindowFocus: false,
  });
export const useStatisticMonth = () =>
  useQuery([STATISTIC_MONTH], () => getStatisticByMonth(), {
    refetchOnWindowFocus: false,
  });
export const useStatisticUser = (userId: string) =>
  useQuery([STATISTIC_USER], () => getStatisticByUser(userId), {
    refetchOnWindowFocus: false,
  });
