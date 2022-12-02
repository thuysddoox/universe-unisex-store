import API from '../axios';
import { ENDPOINTS } from '../endpoints';
import { LoginRequest, LoginResponse, BaseResponse, User } from '@interfaces';
const { post } = API;

export const login = async (payload: LoginRequest): Promise<BaseResponse<LoginResponse>> => {
  return post(ENDPOINTS.LOGIN, payload);
};

export const register = async (payload: User): Promise<BaseResponse<User>> => {
  return post(ENDPOINTS.SIGN_UP, payload);
};
