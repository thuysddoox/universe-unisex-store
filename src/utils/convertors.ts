import { CartItem, Category, Status } from '@interfaces/common';
import dayjs from 'dayjs';

export function covertToOption(value: string) {
  return {
    value: value,
    label: value,
  };
}
export function covertCategoryToOption(categories: Category[]) {
  return categories.map((category) => ({ value: category._id, label: category.name }));
}
export function covertCartItemToOrderItem(data: CartItem[]) {
  return data.map((item) => {
    const { quantity, product } = item;
    const { _id, name, price, color, size, discount, thumbnails } = product;
    return { productId: _id, productName: name, price, discount, color, size, thumbnails, quantity };
  });
}
export function getTotal(cartItems: CartItem[]) {
  return cartItems.reduce(
    (total, currItem) =>
      Math.ceil(
        (total +
          Math.floor((currItem?.quantity * currItem?.product?.price * (100 - currItem?.product?.discount)) / 100)) *
          100,
      ) / 100,
    0,
  );
}
export const getDateOfStatus = (status, statusList: Status[]) => {
  const values = statusList?.find((item) => item?.status === status);
  return values ? dayjs(values?.date, 'DD-MM-YYYY, HH:mm:ss').toString() : '--';
};
export const getDisableOptions = (status) => {
  if (status === 0) return [1, 2, 3, 4];
  else return Array.from({ length: status }, (_, i) => status - i);
};
