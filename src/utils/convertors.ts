import { CartItem, Category } from '@interfaces/common';

export function covertToOption(value: string) {
  return {
    value: value,
    label: value,
  };
}
export function covertCategoryToOption(categories: Category[]) {
  return categories.map((category) => ({ value: category._id, label: category.name }));
}
export function getTotal(cartItems: CartItem[]) {
  return cartItems.length > 0
    ? cartItems.reduce(
        (total, currItem) =>
          (total += Math.floor((currItem.quantity * currItem.product.price * (100 - currItem.product.discount)) / 100)),
        0,
      )
    : 0;
}
