import { AddToCartRequest, BaseResponse, Cart, CartItem, Product } from '../../interfaces/common';
import API from '../axios';
import { ENDPOINTS } from '../endpoints';
const { post, patch, put, get } = API;
const del = API.delete;

export const addToCart = async (payload: AddToCartRequest): Promise<BaseResponse<Cart>> => {
  return post(`${ENDPOINTS.CART}`, payload);
};
export const deleteFromCart = async (payload: {
  products?: string[];
  deleteAll?: boolean;
}): Promise<BaseResponse<Cart>> => {
  return patch(`${ENDPOINTS.CART}`, payload);
};
export const getCart = async (): Promise<BaseResponse<Cart>> => {
  return get(`${ENDPOINTS.CART}`);
};
