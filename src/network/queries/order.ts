import { deleteFromCart, getCart } from '@api/services/cart';
import { BaseListRequest, BaseResponse, Cart, CartItem, ErrorResponse, Order } from '@interfaces/common';
import { useMutation, UseMutationOptions, useQuery } from 'react-query';
import { addToCart } from '../services/cart';
import { SafeAny } from '../../interfaces/common';
import { createOrder, updateOrder, getOrderOfUser, createCheckout, getCheckout, getOrders } from '../services/order';

const ORDER_USER = 'ORDER_USER';
const ORDER_LIST = 'ORDER_LIST';
const CHECKOUT_INFO = 'CHECKOUT_INFO';

export const useQueryOrderOfUser = (params: BaseListRequest) =>
  useQuery([ORDER_USER], () => getOrderOfUser(params), {
    refetchOnWindowFocus: false,
  });

export const useQueryOrderList = (params: BaseListRequest) =>
  useQuery([ORDER_LIST], () => getOrders(params), {
    refetchOnWindowFocus: false,
  });

export const useCreateOrder = (options: UseMutationOptions<BaseResponse<Order>, ErrorResponse, Order>) =>
  useMutation((params: Order) => createOrder(params), options);

export const useUpdateOrder = (options: UseMutationOptions<BaseResponse<Order>, ErrorResponse, Order>) =>
  useMutation((params: Order) => updateOrder(params), options);

export const useCreateCheckout = (options: UseMutationOptions<BaseResponse<SafeAny>, ErrorResponse, Order>) =>
  useMutation((params: Order) => createCheckout(params), options);

export const useQueryCheckout = (sessionId: string) =>
  useQuery([CHECKOUT_INFO], () => getCheckout(sessionId), {
    refetchOnWindowFocus: false,
  });
