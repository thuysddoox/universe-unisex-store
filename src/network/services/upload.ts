import API from '../axios';
import { ENDPOINTS } from '../endpoints';
import { BaseResponse, SafeAny } from '@interfaces';

const { post } = API;
const del = API.delete;

export const uploadMultiple = async (payload: SafeAny): Promise<BaseResponse<SafeAny>> => {
  return post(ENDPOINTS.UPLOAD_MULTIPLE, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const uploadSingle = async (payload: SafeAny): Promise<BaseResponse<SafeAny>> => {
  return post(ENDPOINTS.UPLOAD_SINGLE, payload);
};
