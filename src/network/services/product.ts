import API from '../axios';
import { ENDPOINTS } from '../endpoints';
import { Category } from '@interfaces';
import { BaseResponse, Product, SafeAny, BaseListRequest } from '../../interfaces/common';
const { get, post, patch } = API;
const del = API.delete;

export const getCategories = async (): Promise<BaseResponse<Category[]>> => {
  return get(ENDPOINTS.CATEGORY);
};

export const createProduct = async (payload: Product): Promise<BaseResponse<Product>> => {
  return post(ENDPOINTS.PRODUCT, payload);
};

export const updateProduct = async (payload: Product): Promise<BaseResponse<Product>> => {
  return patch(`${ENDPOINTS.PRODUCT}/${payload._id}`, payload);
};

export const deleteProduct = async (productId: string): Promise<BaseResponse<SafeAny>> => {
  return del(`${ENDPOINTS.PRODUCT}/${productId}`);
};

export const getProductDetail = async (productId: string): Promise<BaseResponse<Product>> => {
  return get(`${ENDPOINTS.PRODUCT}/${productId}`);
};

export const getProductsList = async (params: BaseListRequest): Promise<BaseResponse<Product[]>> => {
  return get(ENDPOINTS.PRODUCT, { params });
};

export const getSaleProduct = async (params: BaseListRequest): Promise<BaseResponse<Product[]>> => {
  return get(ENDPOINTS.PRODUCT_SALE, { params });
};

export const getBestProduct = async (): Promise<BaseResponse<Product[]>> => {
  return get(ENDPOINTS.PRODUCT_BEST);
};

export const getNewProduct = async (): Promise<BaseResponse<SafeAny>> => {
  return get(ENDPOINTS.PRODUCT_NEW);
};
