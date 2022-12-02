import OrderItem from '@components/OrderItem';
import { CartItem } from '@interfaces';
import SimpleBar from 'simplebar-react';
const OrderItemList = ({ data }: { data: CartItem[] }) => {
  return (
    <div className="bg-gray-200 p-5 md:p-8 rounded-lg mb-5">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg sm:text-xl font-semibold">Order Products</h4>
        <span className="text-sm italic">({data.length} products)</span>
      </div>
      <SimpleBar style={{ maxHeight: 300 }}>
        <div className="mb-4">
          {data.map((cartItem) => (
            <OrderItem data={cartItem} isCheckout={true} />
          ))}
        </div>
      </SimpleBar>
    </div>
  );
};
export default OrderItemList;
