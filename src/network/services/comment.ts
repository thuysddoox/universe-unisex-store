import { BaseResponse, Comment, Order, BaseListRequest, ReplyCommentRequest } from '../../interfaces/common';
import API from '../axios';
import { ENDPOINTS } from '../endpoints';
const { post, patch, get } = API;
const del = API.delete;

export const createComment = async (payload: Comment): Promise<BaseResponse<Comment>> => {
  return post(ENDPOINTS.COMMENT, payload);
};
export const replyComment = async (payload: ReplyCommentRequest): Promise<BaseResponse<Comment>> => {
  return post(`${ENDPOINTS.COMMENT_REPLY}/${payload.commentId}`, payload.replyComment);
};
export const deleteComment = async (commentID: string): Promise<BaseResponse<Comment>> => {
  return del(`${ENDPOINTS.COMMENT}/${commentID}`);
};
export const updateComment = async (payload: Comment): Promise<BaseResponse<Comment>> => {
  return patch(`${ENDPOINTS.COMMENT}/${payload._id}`, payload);
};

export const getCommentOfProduct = async (
  productId: string,
  params: BaseListRequest,
): Promise<BaseResponse<Comment[]>> => {
  return get(`${ENDPOINTS.COMMENT_PRODUCT}/${productId}`, { params });
};

export const getCommentDetail = async (commentId: string): Promise<BaseResponse<Comment>> => {
  return get(`${ENDPOINTS.COMMENT}/${commentId}`);
};

export const getComments = async (params: BaseListRequest): Promise<BaseResponse<Comment[]>> => {
  return get(ENDPOINTS.COMMENT, { params });
};
