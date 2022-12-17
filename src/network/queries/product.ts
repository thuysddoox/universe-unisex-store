import { useQuery, useMutation, UseMutationOptions, useInfiniteQuery } from 'react-query';
import {
  getCategories,
  createProduct,
  updateProduct,
  getProductDetail,
  deleteProduct,
  getProductsList,
  getNewProduct,
  getSaleProduct,
  getBestProduct,
} from '../services/product';
import { Product } from '@interfaces/common';
import { BaseResponse, ErrorResponse, SafeAny, BaseListRequest, Category } from '../../interfaces/common';
import { updateCategory } from '../services/product';

const CATEGORY_LIST = 'CATEGORY_LIST';
const PRODUCT_DETAIL = 'PRODUCE_DETAIL';
const PRODUCT_LIST = 'PRODUCT_LIST';
const PRODUCT_NEW = 'PRODUCT_NEW';
const PRODUCT_SALE = 'PRODUCT_SALE';
const PRODUCT_BEST = 'PRODUCT_BEST';

export const useCategory = () =>
  useQuery([CATEGORY_LIST], () => getCategories(), {
    refetchOnWindowFocus: false,
  });
export const useUpdateCategory = (options: UseMutationOptions<BaseResponse<Category>, ErrorResponse, SafeAny>) =>
  useMutation((params: SafeAny) => updateCategory(params?.categoryId, params?.thumbnail), options);

export const useCreateProduct = (options: UseMutationOptions<BaseResponse<Product>, ErrorResponse, Product>) =>
  useMutation((params: Product) => createProduct(params), options);

export const useUpdateProduct = (options: UseMutationOptions<BaseResponse<Product>, ErrorResponse, Product>) =>
  useMutation((params: Product) => updateProduct(params), options);

export const useDeleteProduct = (options: UseMutationOptions<BaseResponse<SafeAny>, ErrorResponse, string>) =>
  useMutation((params: string) => deleteProduct(params), options);

export const useProductDetail = (productId: string) =>
  useQuery([PRODUCT_DETAIL, productId], () => getProductDetail(productId), {
    refetchOnWindowFocus: false,
  });

export const useProductsList = (payload: BaseListRequest) =>
  useInfiniteQuery(
    [PRODUCT_LIST, payload],
    ({ pageParam = 0 }) => getProductsList({ ...payload, pageIndex: pageParam as number }),
    {
      initialData: () => ({
        pages: [],
        pageParams: [],
      }),
      getNextPageParam: (lastPage, pages) => {
        if (lastPage?.data?.responseData?.length < 30) {
          return undefined;
        }
        return pages?.length;
      },
      refetchOnWindowFocus: false,
    },
  );

export const useProducts = (payload: BaseListRequest) =>
  useQuery([PRODUCT_LIST, payload], () => getProductsList(payload), {
    refetchOnWindowFocus: false,
  });

export const useNewProducts = () =>
  useQuery([PRODUCT_NEW], () => getNewProduct(), {
    refetchOnWindowFocus: false,
  });

export const useSaleProducts = (payload: BaseListRequest) =>
  useQuery([PRODUCT_SALE, payload], () => getSaleProduct(payload), {
    refetchOnWindowFocus: false,
  });
export const useBestProducts = () =>
  useQuery([PRODUCT_BEST], () => getBestProduct(), {
    refetchOnWindowFocus: false,
  });
