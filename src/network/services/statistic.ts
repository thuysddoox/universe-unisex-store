import API from '../axios';
import { ENDPOINTS } from '../endpoints';
import { StatisticData, BaseResponse, SafeAny, StatisticMonth, OrderItem } from '../../interfaces/common';

const { get } = API;

export const getStatistic = async (timerPeriod?: {
  from: string;
  to: string;
}): Promise<BaseResponse<StatisticData>> => {
  return get(ENDPOINTS.STATISTIC, { params: timerPeriod });
};

export const getStatisticByMonth = async (timerPeriod?: {
  from: string;
  to: string;
}): Promise<BaseResponse<StatisticMonth[]>> => {
  return get(ENDPOINTS.STATISTIC_MONTH, { params: timerPeriod });
};
export const getStatisticProduct = async (timerPeriod?: {
  from: string;
  to: string;
}): Promise<BaseResponse<OrderItem[]>> => {
  return get(ENDPOINTS.STATISTIC_PRODUCT, { params: timerPeriod });
};
export const getStatisticByUser = async (userId: string): Promise<BaseResponse<SafeAny>> => {
  return get(`${ENDPOINTS.STATISTIC_USER}/${userId}`);
};
