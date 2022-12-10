import OrderItem from '@components/OrderItem';
import OrderTimeLine from '@components/OrderTimeLine';
import { useBreakpoints } from '@contexts';
import styled from '@emotion/styled';
import Button from '@ui/button';
import { Modal } from '@ui/modal';
import { Col, Row } from 'antd';
import React from 'react';
import { Order } from '../../interfaces/common';

const PurchaseOrderDetail = ({
  isOpen,
  handleOpen,
  data,
}: {
  isOpen?: boolean;
  handleOpen?: () => void;
  data?: Order;
}) => {
  const { width, mobileMode } = useBreakpoints();
  return (
    <Modal
      title={
        <div className="">
          <span>ID. {data?._id}</span>
          <span> | </span>
          <span>Giao hàng thành công</span>
        </div>
      }
      width={width > 992 ? '80vw' : '90vw'}
      centered
      open={isOpen}
      closable={true}
      keyboard={true}
      maskClosable={true}
      onCancel={handleOpen}
      footer={<></>}
    >
      <PurchaseOrderInfo data={data} />
    </Modal>
  );
};
export const PurchaseOrderInfo = ({ data }: { data: Order }) => {
  return (
    <PurchaseOrderDetailWrapper className="px-1 lg:px-4 lg:py-2">
      <h4 className="font-medium text-xl lg:text-2xl">Thông tin đơn hàng</h4>
      <Row>
        <Col xs={24} sm={10} className={'sm:pr-5'}>
          <div className="my-4">
            <h5 className="font-medium text-base lg:text-lg mb-4">Thông tin giao hàng</h5>
            <p>
              {data?.fullname} - {data?.phone}
            </p>
            <p>{data?.address}</p>
          </div>
          <div className="my-4">
            <h5 className="font-medium text-base lg:text-lg mb-4">TimeLine</h5>
            <OrderTimeLine />
          </div>
        </Col>
        <Col xs={24} sm={14}>
          <div>
            {data?.products?.map((product) => (
              <OrderItem
                key={product.productId}
                data={{ product: product, quantity: product.quantity }}
                isCheckout={true}
                className="pb-2 mb-2"
              />
            ))}
          </div>
          <div className="mb-3 text-sm md:text-base text-right mt-5">
            <Row className="font-medium my-3">
              <Col span={12}>SubTotal:</Col>
              <Col span={12} className="text-blue-500">
                {data?.total}
              </Col>
            </Row>
            <Row className="font-medium my-3">
              <Col span={12}>Shipping Cost:</Col>
              <Col span={12} className="text-blue-500">
                {data?.shipCost}
              </Col>
            </Row>
            <Row className="font-medium my-3">
              <Col span={12}>Total: </Col>
              <Col span={12} className="text-blue-500">
                $2834
              </Col>
            </Row>
            <Row className="font-medium my-3">
              <Col span={12}>Payment Method: </Col>
              <Col span={12} className="text-blue-500">
                Cash on Delivery
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </PurchaseOrderDetailWrapper>
  );
};

const PurchaseOrderDetailWrapper = styled.div`s`;
export default React.memo(PurchaseOrderDetail);
