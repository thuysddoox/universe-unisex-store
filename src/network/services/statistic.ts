import API from '../axios';
import { ENDPOINTS } from '../endpoints';
import { StatisticData, BaseResponse, SafeAny, StatisticMonth } from '../../interfaces/common';

const { get } = API;

export const getStatistic = async (): Promise<BaseResponse<StatisticData>> => {
  return get(ENDPOINTS.STATISTIC);
};

export const getStatisticByMonth = async (): Promise<BaseResponse<StatisticMonth[]>> => {
  return get(ENDPOINTS.STATISTIC_MONTH);
};
export const getStatisticByUser = async (userId: string): Promise<BaseResponse<SafeAny>> => {
  return get(`${ENDPOINTS.STATISTIC_USER}/${userId}`);
};
