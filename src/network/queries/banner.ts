import { register } from '@api';
import { Banner, BaseResponse, ErrorResponse, User } from '@interfaces';
import { UseMutationOptions, useMutation, useQuery } from 'react-query';
import { getBanners, createBanner, updateBanner, deleteBanner } from '../services/banner';
import { SafeAny } from '../../interfaces/common';
const BANNER_LIST = 'BANNER_LIST';
export const useGetBanners = () =>
  useQuery([BANNER_LIST], () => getBanners(), {
    refetchOnWindowFocus: false,
  });
export const useCreateBanner = (options: UseMutationOptions<BaseResponse<Banner>, ErrorResponse, Banner>) =>
  useMutation((payload: Banner) => createBanner(payload), options);

export const useUpdateBanner = (options: UseMutationOptions<BaseResponse<Banner>, ErrorResponse, Banner>) =>
  useMutation((payload: Banner) => updateBanner(payload), options);

export const useDeleteBanner = (options: UseMutationOptions<BaseResponse<SafeAny>, ErrorResponse, string>) =>
  useMutation((payload: string) => deleteBanner(payload), options);
