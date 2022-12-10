import { useMutation, UseMutationOptions, useQuery } from 'react-query';
import { SafeAny, BaseResponse, ErrorResponse } from '@interfaces';
import { getFavoriteProducts, handleFavoriteProduct } from '../services/favorite';

const FAVORITE_LIST = 'FAVORITE_LIST';

export const useGetFavoriteList = () =>
  useQuery([FAVORITE_LIST], () => getFavoriteProducts(), {
    refetchOnWindowFocus: false,
  });

export const useFavoriteProduct = (options: UseMutationOptions<BaseResponse<SafeAny>, ErrorResponse, SafeAny>) =>
  useMutation((productId: string) => handleFavoriteProduct(productId), options);
