import { BaseListRequest, BaseResponse, ErrorResponse, Order } from '@interfaces/common';
import { useInfiniteQuery, useMutation, UseMutationOptions, useQuery } from 'react-query';
import { SafeAny } from '../../interfaces/common';
import {
  createCheckout,
  createOrder,
  getCheckout,
  getOrderOfUser,
  getOrders,
  getStatisticOrders,
  updateOrder,
  updateOrderByCustomer,
} from '../services/order';

const ORDER_USER = 'ORDER_USER';
const ORDER_LIST = 'ORDER_LIST';
const ORDER_STATISTIC = 'ORDER_STATISTIC';
const CHECKOUT_INFO = 'CHECKOUT_INFO';

export const useQueryOrderOfUser = (params: BaseListRequest) =>
  useInfiniteQuery(
    [ORDER_USER, params],
    ({ pageParam = 0 }) => getOrderOfUser({ ...params, pageIndex: pageParam as number }),
    {
      initialData: () => ({
        pages: [{ data: { responseData: [], total: 0 } }],
        pageParams: [],
      }),
      getNextPageParam: (lastPage, pages) => {
        if (lastPage?.data.responseData?.length === params?.pageSize) {
          return pages?.length;
        } else return false;
      },
      refetchOnWindowFocus: false,
    },
  );

export const useQueryOrderList = (params: BaseListRequest) =>
  useQuery([ORDER_LIST, params], () => getOrders(params), {
    refetchOnWindowFocus: false,
  });
export const useQueryStatisticOrder = () =>
  useQuery([ORDER_STATISTIC], () => getStatisticOrders(), {
    refetchOnWindowFocus: false,
  });
export const useCreateOrder = (options: UseMutationOptions<BaseResponse<Order>, ErrorResponse, Order>) =>
  useMutation((params: Order) => createOrder(params), options);

export const useUpdateOrder = (options: UseMutationOptions<BaseResponse<Order>, ErrorResponse, Order>) =>
  useMutation((params: Order) => updateOrder(params), options);

export const useUpdateOrderByCustomer = (options: UseMutationOptions<BaseResponse<string>, ErrorResponse, SafeAny>) =>
  useMutation((orderId: string) => updateOrderByCustomer(orderId), options);

export const useCreateCheckout = (options: UseMutationOptions<BaseResponse<SafeAny>, ErrorResponse, Order>) =>
  useMutation((params: Order) => createCheckout(params), options);

export const useQueryCheckout = (sessionId: string) =>
  useQuery([CHECKOUT_INFO], () => getCheckout(sessionId), {
    refetchOnWindowFocus: false,
  });
