import API from '../axios';
import { ENDPOINTS } from '../endpoints';
import { BaseResponse, SafeAny } from '@interfaces';

const { post, get } = API;

export const getFavoriteProducts = async () => {
  return get(ENDPOINTS.WISHLIST);
};
export const handleFavoriteProduct = async (productId: string): Promise<BaseResponse<SafeAny>> => {
  return post(`${ENDPOINTS.WISHLIST}/${productId}`);
};
