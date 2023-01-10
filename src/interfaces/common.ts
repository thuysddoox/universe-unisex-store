// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

import { StringLiteralLike } from 'typescript';

export interface Category {
  _id?: string;
  name?: string;
  thumbnail?: string;
  stock?: number;
  sold?: number;
  total?: number;
}
export interface Product {
  name?: string;
  productName?: string;
  price?: number;
  discount?: number;
  description?: string;
  categoryId?: string;
  color?: string;
  _id?: string;
  stock?: number;
  sold?: number;
  size?: string;
  publishedAt?: string;
  thumbnails?: string[];
  isDisabled?: boolean;
  isFavorite?: boolean;
  rate?: number;
  review?: number;
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
export interface Status {
  status: number;
  date: string;
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
  timeline?: Status[];
  city?: string;
  commune?: string;
  district?: string;
}
export interface Comment {
  _id?: string;
  rate?: number;
  content?: string;
  user?: User | string;
  owner?: User;
  productId?: string | Product;
  product?: Product;
  // images?: any;
  replyComments?: Comment[];
  isDisabled?: boolean;
  createdAt?: string;
  updatedAt?: string;
  username?: string;
  avatar?: string;
}

export type UserPopupType = 'login' | 'signup' | 'changepassword' | 'forgot';
export type User = {
  password?: string;
  address?: string;
  country?: string;
  displayName?: string;
  dob?: string;
  email?: string;
  gender?: string;
  firstName?: string;
  _id?: string;
  lastName?: string;
  location?: string;
  avatar?: string;
  phone?: string;
  role?: number;
  status?: number;
  isAdmin?: string;
  username?: string;
  fullName?: string;
  city?: string;
  commune?: string;
  district?: string;
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
    count?: number;
    status?: number;
    average?: number;
  };
  status?: number;
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
  isReset?: boolean;
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
  color?: string;
  size?: string;
  category?: string[];
  status?: number;
}
export interface ListResponse {
  products: Product[];
  page_size?: number;
  page?: number;
  total?: number;
}

export interface ReplyCommentRequest {
  commentId: string;
  replyComment: {
    owner: string;
    content: string;
  };
}
export interface Banner {
  _id?: string;
  imgUrl?: string;
  title1?: string;
  title2?: string;
  description?: string;
  link?: string;
  nameLink?: string;
}

export interface StatisticData {
  users?: number;
  orders?: number;
  rate?: number;
  profit?: number;
}

export interface StatisticMonth {
  _id: {
    year: number;
    month: number;
  };
  total?: number;
  count?: number;
}
