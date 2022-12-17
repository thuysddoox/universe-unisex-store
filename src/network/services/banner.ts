import { Banner, BaseResponse } from '@interfaces/common';
import API from '../axios';
import { ENDPOINTS } from '../endpoints';

const { get, patch, post } = API;
const del = API.delete;

export const getBanners = async (): Promise<BaseResponse<Banner[]>> => {
  return get(ENDPOINTS.ADVERTISEMENT);
};

export const createBanner = async (payload: Banner): Promise<BaseResponse<Banner>> => {
  return post(ENDPOINTS.ADVERTISEMENT, payload);
};

export const updateBanner = async (payload: Banner): Promise<BaseResponse<Banner>> => {
  return patch(`${ENDPOINTS.ADVERTISEMENT}/${payload?._id}`, payload);
};
export const deleteBanner = async (bannerId): Promise<BaseResponse<Banner>> => {
  return del(`${ENDPOINTS.ADVERTISEMENT}/${bannerId}`);
};
