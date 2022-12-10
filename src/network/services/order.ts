import { BaseResponse, Order, BaseListRequest, CartItem, SafeAny } from '../../interfaces/common';
import API from '../axios';
import { ENDPOINTS } from '../endpoints';
const { post, patch, get } = API;
const del = API.delete;

export const createOrder = async (payload: Order): Promise<BaseResponse<Order>> => {
  return post(ENDPOINTS.ORDER, payload);
};

export const updateOrder = async (payload: Order): Promise<BaseResponse<Order>> => {
  return patch(`${ENDPOINTS.ORDER}/${payload._id}`, payload);
};

export const getOrderOfUser = async (params: BaseListRequest): Promise<BaseResponse<Order[]>> => {
  return get(ENDPOINTS.ORDER_USER, { params });
};

export const getOrders = async (params: BaseListRequest): Promise<BaseResponse<Order[]>> => {
  return get(ENDPOINTS.ORDER, { params });
};

export const getOrderDetail = async (orderId: string): Promise<BaseResponse<Order>> => {
  return get(`${ENDPOINTS.ORDER}/${orderId}`);
};

export const createCheckout = async (order: Order): Promise<BaseResponse<Order>> => {
  return post(ENDPOINTS.CHECKOUT, { order });
};

export const getCheckout = async (sessionId: string): Promise<BaseResponse<Order>> => {
  return get(`${ENDPOINTS.CHECKOUT}/${sessionId}`);
};

export const payOrder = async (sessionId: string): Promise<BaseResponse<SafeAny>> => {
  return get(`${ENDPOINTS.ORDER_PAY}/${sessionId}`);
};
