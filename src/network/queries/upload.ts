import { useMutation, UseMutationOptions } from 'react-query';
import { SafeAny, BaseResponse, ErrorResponse } from '@interfaces';
import { uploadMultiple, uploadSingle } from '../services/upload';

export const useUploadMutilple = (options: UseMutationOptions<BaseResponse<SafeAny>, ErrorResponse, SafeAny>) =>
  useMutation((params: SafeAny) => uploadMultiple(params), options);

export const useUploadSingle = (options: UseMutationOptions<BaseResponse<SafeAny>, ErrorResponse, SafeAny>) =>
  useMutation((params: SafeAny) => uploadSingle(params), options);
