import OrderItem from '@components/OrderItem';
import PurchaseOrderDetail from '@components/PurchaseOrderDetail';
import styled from '@emotion/styled';
import Button from '@ui/button';
import React, { useCallback, useState } from 'react';

const PurchaseOrder = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleOpen = useCallback(() => setIsOpen(prev => !prev),[])
  
  return (
    <PurchaseOrderWrapper className='bg-gray-200 p-5 rounded'>
      <div className="flex justify-between items-center py-2">
        <div>
          <strong className='text-base'>ORDER #1</strong>
          <p>(3 sản phẩm)</p>
        </div>
        <span>Giao hàng thành công</span>
      </div>
      <div>
        <OrderItem isCheckout={true} className="pb-2 mb-2" />
        <OrderItem isCheckout={true} className="pb-2 mb-2" />
        <OrderItem isCheckout={true} className="pb-2 mb-2" />
      </div>
      <div className="flex justify-between items-center mb-3">
        <span className="cursor-pointer text-blue-500 underline" onClick={handleOpen}>More detail</span>
        <span className="text-base font-medium">
          Total: <span className="text-2xl text-blue-500 ml-5 inline-block">$2834</span>
        </span>
      </div>
      <div className="flex justify-between items-end mb-3">
        <span className='text-xs font-medium'>Created at 11:02:00, 22-02-2022</span>
        <Button
          borderradius={'3px'}
          textcolor={'#fff'}
          bordercolor={'var(--navy)'}
          bgColor={'var(--navy)'}
          className="text-base font-medium flex justify-end min-w-[150px]"
        >
          Rating
        </Button>
      </div>
    <PurchaseOrderDetail handleOpen={handleOpen} isOpen={isOpen}/>
    </PurchaseOrderWrapper>
  );
};

const PurchaseOrderWrapper = styled.div``;

export default React.memo(PurchaseOrder);
