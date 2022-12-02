import { deleteFromCart, getCart } from '@api/services/cart';
import { AddToCartRequest, BaseResponse, Cart, CartItem, ErrorResponse } from '@interfaces/common';
import { useMutation, UseMutationOptions, useQuery } from 'react-query';
import { addToCart } from '../services/cart';
import { SafeAny } from '../../interfaces/common';

const CART_INFO = 'CART_INFO';

export const useQueryCart = () =>
  useQuery([CART_INFO], () => getCart(), {
    refetchOnWindowFocus: false,
  });

export const useAddToCart = (options: UseMutationOptions<BaseResponse<Cart>, ErrorResponse, AddToCartRequest>) =>
  useMutation((params: AddToCartRequest) => addToCart(params), options);

export const useDeleteCart = (options: UseMutationOptions<BaseResponse<Cart>, ErrorResponse, SafeAny>) =>
  useMutation((params: SafeAny) => deleteFromCart(params), options);
