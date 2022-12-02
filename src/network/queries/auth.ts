import { useMutation, UseMutationOptions } from 'react-query';
import { login, register } from '@api';
import { BaseResponse, ErrorResponse, LoginResponse, User, LoginRequest } from '@interfaces';

export const useLogin = (options: UseMutationOptions<BaseResponse<LoginResponse>, ErrorResponse, LoginRequest>) =>
  useMutation((params: LoginRequest) => login(params), options);

export const useSignup = (options: UseMutationOptions<BaseResponse<User>, ErrorResponse, User>) =>
  useMutation((params: User) => register(params), options);
