import { deleteFromCart, getCart } from '@api/services/cart';
import { BaseListRequest, BaseResponse, Cart, CartItem, ErrorResponse, Order } from '@interfaces/common';
import { useMutation, UseMutationOptions, useQuery } from 'react-query';
import { addToCart } from '../services/cart';
import { SafeAny } from '../../interfaces/common';
import { createOrder, updateOrder, getOrderOfUser } from '../services/order';

const ORDER_USER = 'ORDER_USER';

export const useQueryOrderOfUser = (params: BaseListRequest) =>
  useQuery([ORDER_USER], () => getOrderOfUser(params), {
    refetchOnWindowFocus: false,
  });

export const useCreateOrder = (options: UseMutationOptions<BaseResponse<Cart>, ErrorResponse, Order>) =>
  useMutation((params: Order) => createOrder(params), options);

export const useUpdateOrder = (options: UseMutationOptions<BaseResponse<Cart>, ErrorResponse, Order>) =>
  useMutation((params: Order) => updateOrder(params), options);
