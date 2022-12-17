import { BaseResponse, Comment, ErrorResponse, ReplyCommentRequest } from '@interfaces/common';
import { useMutation, UseMutationOptions, useQuery, useInfiniteQuery } from 'react-query';
import { BaseListRequest, SafeAny } from '../../interfaces/common';
import { getRateOfProduct } from '../services/comment';
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
const COMMENT_RATE = 'COMMENT_RATE';

export const useQueryCommentOfProduct = (productId: string, params: BaseListRequest) =>
  useInfiniteQuery(
    [COMMENT_PRODUCT, params, productId],
    ({ pageParam = 0 }) => getCommentOfProduct(productId, { ...params, pageIndex: pageParam as number }),
    {
      initialData: () => ({
        pages: [{ data: { responseData: [], total: 0 } }],
        pageParams: [],
      }),
      getNextPageParam: (lastPage, pages) => {
        if (lastPage?.data.responseData?.length === params?.pageSize) {
          return pages?.length;
        } else return false;
      },
      refetchOnWindowFocus: false,
    },
  );

export const useCreateComment = (options: UseMutationOptions<BaseResponse<Comment>, ErrorResponse, SafeAny>) =>
  useMutation((payload: { comments: Comment[]; orderId: string }) => createComment(payload), options);

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

export const useGetRateComments = (productId: string) =>
  useQuery([COMMENT_RATE, productId], () => getRateOfProduct(productId), {
    refetchOnWindowFocus: false,
  });
