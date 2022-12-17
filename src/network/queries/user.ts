import { useMutation, UseMutationOptions, useQuery } from 'react-query';
import { SafeAny, BaseResponse, ErrorResponse, UpdatePasswordRequest, User } from '../../interfaces/common';
import { resetPassword, changePassword, resetPasswordFnc, getAllUser, deleteUser, addUser } from '../services/user';

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

export const useDeleteUser = (options: UseMutationOptions<BaseResponse<SafeAny>, ErrorResponse, string>) =>
  useMutation((params: string) => deleteUser(params), options);

export const useAddUser = (options: UseMutationOptions<BaseResponse<SafeAny>, ErrorResponse, User>) =>
  useMutation((payload: User) => addUser(payload), options);
