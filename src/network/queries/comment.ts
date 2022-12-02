import { BaseResponse, Comment, ErrorResponse, ReplyCommentRequest } from '@interfaces/common';
import { useMutation, UseMutationOptions, useQuery } from 'react-query';
import { BaseListRequest, SafeAny } from '../../interfaces/common';
import {
  createComment,
  deleteComment,
  getCommentOfProduct,
  getComments,
  replyComment,
  updateComment,
} from '../services/comment';

const COMMENT_PRODUCT = 'COMMENT_PRODUCT';
const COMMENT_LIST = 'COMMENT_LIST';

export const useQueryCommentOfProduct = (productId: string, params: BaseListRequest) =>
  useQuery([COMMENT_PRODUCT, params, productId], () => getCommentOfProduct(productId, params), {
    refetchOnWindowFocus: false,
  });

export const useCreateComment = (options: UseMutationOptions<BaseResponse<Comment>, ErrorResponse, Comment>) =>
  useMutation((params: Comment) => createComment(params), options);

export const useUpdateComment = (options: UseMutationOptions<BaseResponse<Comment>, ErrorResponse, Comment>) =>
  useMutation((payload: Comment) => updateComment(payload), options);

export const useReplyComment = (
  options: UseMutationOptions<BaseResponse<Comment>, ErrorResponse, ReplyCommentRequest>,
) => useMutation((payload: ReplyCommentRequest) => replyComment(payload), options);

export const useDeleteComment = (options: UseMutationOptions<BaseResponse<Comment>, ErrorResponse, string>) =>
  useMutation((commentId: string) => deleteComment(commentId), options);

export const useComments = (params: BaseListRequest) =>
  useQuery([COMMENT_LIST, params], () => getComments(params), {
    refetchOnWindowFocus: false,
  });
