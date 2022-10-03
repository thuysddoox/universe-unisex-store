import API from '../axios';
import { ENDPOINTS } from '../endpoints';
import {
  LoginRequest,
  LoginResponse,
  BaseResponse,
} from '@interfaces';
const { post } = API;

export const login = async (
  payload: LoginRequest
): Promise<BaseResponse<LoginResponse>> => {
  return post(ENDPOINTS.LOGIN, payload);
};
