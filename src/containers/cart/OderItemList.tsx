import OrderItem from "@components/OrderItem";
import SimpleBar from 'simplebar-react';
const OrderItemList = ()=>{
  return (
    <div className="bg-gray-200 p-5 md:p-8 rounded-lg mb-5">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg sm:text-xl font-semibold">Order Products</h4>
        <span className="text-sm italic">(3 products)</span>
      </div>
      <SimpleBar style={{ maxHeight: 300 }}>
        <div className="mb-4">
          <OrderItem isCheckout={true}/>
          <OrderItem isCheckout={true}/>
          <OrderItem isCheckout={true}/>
          <OrderItem isCheckout={true}/>
        </div>
      </SimpleBar>
    </div>
  )
}
export default OrderItemList;
