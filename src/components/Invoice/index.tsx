import { Order, SafeAny } from '../../interfaces/common';
import React from 'react';
interface InvoiceProps {
  data: Order;
  className?: string;
}
const Invoice = React.forwardRef<SafeAny, InvoiceProps>(({ data, className }, ref) => {
  return (
    <div className="p-6" ref={ref}>
      <div className={`border border-black bg-white text-base ${className}`}>
        <div className="py-5 px-2 font-semibold">ID Đơn hàng : {data?._id}</div>
        <div className="flex flex-wrap px-2 py-3 border-black border-t border-b border-dotted">
          <div className="w-full sm:w-1/2">
            <p className="font-semibold">Từ: UNIS STORE</p>
            <p>SĐT: 0937464243</p>
            <p>Địa chỉ: Hà Đông, Hà Nội</p>
          </div>
          <div className="w-full sm:w-1/2">
            <p className="font-semibold">Đến: {data?.fullname}</p>
            <p>SĐT: {data?.phone}</p>
            <p>Địa chỉ: {data?.address}</p>
          </div>
        </div>
        <div className="flex flex-wrap px-2 border-black border-b border-dotted">
          <div className="w-full sm:w-1/2"></div>
          <div className="w-full sm:w-1/2 border-black border-l border-dotted pl-2 py-3">
            <p>Hàng hóa (Tổng SL: {data?.products?.reduce((total, current) => (total += current?.quantity), 0)})</p>
            {data?.products?.map((item) => (
              <p key={item?.productId}>
                {item?.quantity} x {item?.productName} - màu: {item?.color} - size: {item?.size}
              </p>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap px-2 py-3">
          <div className="w-full sm:w-1/2">
            Tiền thu người nhận:{' '}
            <b className="text-lg">{(data?.isPaid ? '0' : data?.total + data?.shipCost)?.toLocaleString()} vnđ</b>
          </div>
          <div className="w-full sm:w-1/2">
            <div>
              <p className="font-semibold text-center mb-4">Chữ kí người nhận</p>
              <div className="h-14 border border-black"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Invoice;
