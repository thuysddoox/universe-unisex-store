// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';
export type UserPopupType = 'login' | 'signup' | 'changepassword'
export type User = {
  address?: string
  country?: string
  displayName?: string
  dob?: number
  email?: string
  firstName?: string
  id: number
  lastName?: string
  location?: string
  mediaAvatar?: MediaAvatar
  mobile?: string
  roles?: Role
  status?: number
  username?: string
}
export interface Role {
  id: number
  name: string
}
export interface Media {
  fileRemoved?: number
  guid?: string
  id?: number
  originalFilename?: string
  typeOfMedia?: number
  uploader?: number
  url?: string
}
export interface MediaAvatar extends Media {
  cdnOrigin: string
  contentType?: string
  filename?: string
  localThumbnail?: string
  thumbnail?: string
  url?: string
}
export type SafeAny = any;

export interface BaseResponse<T> {
  data: {
    responseData: T;
    error?: SafeAny;
  };
}

export interface errorType {
  name: string,
  message: string
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
  jwtToken: string;
  user: User;
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
export interface Banner{
  imgUrl?: string;
  title1?: string;
  title2?: string;
  link?: string;
  nameLink?: string;
}
