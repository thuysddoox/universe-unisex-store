import API from '../axios';
import { ENDPOINTS } from '../endpoints';
import { BaseResponse, User, SafeAny, UpdatePasswordRequest } from '@interfaces';

const { patch, post, get } = API;
const del = API.delete;

export const resetPassword = async (payload: UpdatePasswordRequest): Promise<BaseResponse<SafeAny>> => {
  return post(ENDPOINTS.RESET_PASSWORD, payload);
};

export const resetPasswordFnc = async (payload: UpdatePasswordRequest): Promise<BaseResponse<SafeAny>> => {
  return post(ENDPOINTS.RESET_PASSWORD, payload);
};

export const changePassword = async (payload: UpdatePasswordRequest): Promise<BaseResponse<SafeAny>> => {
  return patch(ENDPOINTS.CHANGE_PASSWORD, payload);
};

export const updateUser = async (payload: User): Promise<BaseResponse<User>> => {
  return patch(`${ENDPOINTS.USER}/${payload._id}`, payload);
};
export const addUser = async (payload: User): Promise<BaseResponse<User>> => {
  return post(`${ENDPOINTS.USER}`, payload);
};
export const deleteUser = async (userId: string): Promise<BaseResponse<string>> => {
  return del(`${ENDPOINTS.USER}/${userId}`);
};

export const getAllUser = async (): Promise<BaseResponse<User[]>> => {
  return get(ENDPOINTS.USER);
};
