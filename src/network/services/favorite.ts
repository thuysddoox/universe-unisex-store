import API from '../axios';
import { ENDPOINTS } from '../endpoints';
import { BaseResponse, SafeAny } from '@interfaces';
import { Product } from '../../interfaces/common';

const { post, get } = API;

export const getFavoriteProducts = async (): Promise<BaseResponse<Product[]>> => {
  return get(ENDPOINTS.WISHLIST);
};
export const handleFavoriteProduct = async (productId: string): Promise<BaseResponse<SafeAny>> => {
  return post(`${ENDPOINTS.WISHLIST}/${productId}`);
};
