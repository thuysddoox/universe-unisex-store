import { useMutation, UseMutationOptions, useQuery } from 'react-query';
import { SafeAny, BaseResponse, ErrorResponse, UpdatePasswordRequest } from '../../interfaces/common';
import { resetPassword, changePassword, resetPasswordFnc, getAllUser } from '../services/user';

const USER_LIST = 'USER_LIST';
export const useGetUsers = () =>
  useQuery([USER_LIST], () => getAllUser(), {
    refetchOnWindowFocus: false,
  });

export const useResetPassword = (options: UseMutationOptions<BaseResponse<SafeAny>, ErrorResponse, SafeAny>) =>
  useMutation((params: SafeAny) => resetPassword(params), options);

export const useResetPasswordFnc = (options: UseMutationOptions<BaseResponse<SafeAny>, ErrorResponse, SafeAny>) =>
  useMutation((params: SafeAny) => resetPasswordFnc(params), options);

export const useChangePassword = (
  options: UseMutationOptions<BaseResponse<SafeAny>, ErrorResponse, UpdatePasswordRequest>,
) => useMutation((params: UpdatePasswordRequest) => changePassword(params), options);
