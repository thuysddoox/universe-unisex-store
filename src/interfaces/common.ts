// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';
import { replyComment } from '../network/services/comment';

export interface Category {
  _id?: string;
  name?: string;
  thumbnails?: any;
  stock?: number;
  sold?: number;
  total?: number;
}
export interface Product {
  name?: string;
  price?: number;
  discount?: number;
  description?: string;
  categoryId?: string;
  color?: string | string[];
  _id?: string;
  stock?: number;
  sold?: number;
  size?: string | string[];
  publishedAt?: string;
  thumbnails?: string[];
  isDisabled?: boolean;
}
export interface OrderItem {
  productId?: string;
  productName?: string;
  price?: number;
  discount?: number;
  color?: string;
  size?: string;
  thumbnails?: string[];
  quantity?: number;
}
export interface CartItem {
  product: Product;
  quantity: number;
}
export interface AddToCartRequest {
  productId: string;
  quantity: number;
}
export interface Cart {
  _id: string;
  owner?: string;
  products: CartItem[];
}
export interface Order {
  _id?: string;
  userId?: string;
  products?: OrderItem[];
  total?: number;
  address?: string;
  phone?: string;
  fullname?: string;
  note?: string;
  status?: number;
  payment?: number;
  isPaid?: boolean;
  createdAt?: string;
  shipCost?: number;
}
export interface Comment {
  _id?: string;
  rate?: number;
  content?: string;
  user?: User;
  product?: Product;
  images?: any;
  publishedAt?: string;
}

export type UserPopupType = 'login' | 'signup' | 'changepassword' | 'forgot';
export type User = {
  password?: string;
  address?: string;
  country?: string;
  displayName?: string;
  dob?: number | string | Date;
  email?: string;
  firstName?: string;
  _id?: number | string;
  lastName?: string;
  location?: string;
  avatar?: string;
  phone?: string;
  role?: number;
  status?: number;
  isAdmin?: string;
  username?: string;
  fullName?: string;
};
export interface Role {
  id: number;
  name: string;
}
export type SafeAny = any;

export interface BaseResponse<T> {
  data: {
    responseData: T;
    error?: SafeAny;
    page_size?: number;
    page?: number;
    total?: number;
  };
}

export interface ErrorResponse {
  message: string;
  response?: {
    data?: {
      message?: string;
    };
  };
  name: string;
  ok: boolean;
  status: number;
  statusText: string;
  url: string;
}
export interface errorType {
  name: string;
  message: string;
}

export interface BaseResponseData<T> {
  responseData: T;
  error?: SafeAny;
}

export interface LoginRequest {
  username: string;
  password?: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface UpdatePasswordRequest {
  email?: string;
  userId?: string;
  currentPassword?: string;
  newPassword?: string;
}
export interface Position {
  id: number;
  label: string;
}

export interface BaseListRequest {
  orderBy?: string;
  orderDirection?: string;
  pageSize?: number;
  pageIndex?: number;
  keyword?: string;
}
export interface ListResponse {
  products: Product[];
  page_size?: number;
  page?: number;
  total?: number;
}

export interface ReplyCommentRequest {
  commentId: string;
  replyComment: Comment;
}
export interface Banner {
  imgUrl?: string;
  title1?: string;
  title2?: string;
  link?: string;
  nameLink?: string;
}
