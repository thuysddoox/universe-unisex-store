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
      (total += Math.floor((currItem.quantity * currItem.product.price * (100 - currItem.product.discount)) / 100)),
    0,
  );
}
