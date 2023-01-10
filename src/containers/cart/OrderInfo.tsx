type OrderInfoProps = {
  shipCost?: number;
  subtotal: number;
};
const OrderInfo = ({ shipCost, subtotal }: OrderInfoProps) => {
  return (
    <div className="bg-gray-200 p-5 md:p-8 rounded-lg">
      <h4 className="text-lg sm:text-xl font-semibold">Order Info</h4>
      <div className="my-4">
        <p className="flex justify-between items-center my-4">
          <span>Subtotal:</span>
          <span>{subtotal.toLocaleString()} vnđ</span>
        </p>
        <p className="flex justify-between items-center my-4">
          <span>Shipping cost:</span>
          <span>${shipCost.toLocaleString()} vnđ</span>
        </p>
        <p className="flex justify-between items-center">
          <span className="text-lg sm:text-xl font-semibold">Total:</span>
          <span className="text-xl sm:text-2xl font-semibold">
            ${(subtotal + (shipCost ?? 0)).toLocaleString()} vnđ
          </span>
        </p>
      </div>
    </div>
  );
};
export default OrderInfo;
