import OrderItem from '@components/OrderItem';
import OrderTimeLine from '@components/OrderTimeLine';
import { STATUS_ORDER } from '@constants/enum';
import { useBreakpoints } from '@contexts';
import Button from '@ui/button';
import { Modal } from '@ui/modal';
import { Col, Row } from 'antd';
import React, { useRef, useState } from 'react';
import { Order } from '../../interfaces/common';
import { FcPaid } from 'react-icons/fc';
import SimpleBar from 'simplebar-react';
import { AiOutlineFilePdf } from 'react-icons/ai';
import Invoice from '@components/Invoice';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import styled from '@emotion/styled';
const PurchaseOrderDetail = ({
  isOpen,
  handleOpen,
  data,
  managePortal = false,
}: {
  isOpen?: boolean;
  handleOpen?: () => void;
  data?: Order;
  managePortal?: boolean;
}) => {
  const { width, mobileMode } = useBreakpoints();
  return (
    <Modal
      title={
        <div className="">
          <span>ID. {data?._id}</span>
          <span> | </span>
          <span>{STATUS_ORDER[data?.status]}</span>
          {data?.isPaid && (
            <>
              <span> | </span>
              <span>Paid</span>
              <FcPaid />
            </>
          )}
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
      <PurchaseOrderInfo data={data} managePortal={managePortal} />
    </Modal>
  );
};
export const PurchaseOrderInfo = ({ data, managePortal = false }: { data: Order; managePortal?: boolean }) => {
  const invoiceRef = useRef();
  const [open, setOpen] = useState<boolean>(false);
  const { width, mobileMode } = useBreakpoints();
  const handleDownloadPdf = async () => {
    const canvas = await html2canvas(invoiceRef?.current);
    const dataFile = canvas.toDataURL('image/png');

    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(dataFile);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(dataFile, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`invoice_${data?._id}.pdf`);
  };
  return (
    <PurchaseOrderDetailWrapper className="px-1 lg:px-4 lg:py-2">
      <h4 className="font-medium text-xl lg:text-2xl">Order Detail</h4>
      <Row>
        <Col xs={24} sm={10} className={'sm:pr-5'}>
          <div className="my-4">
            <h5 className="font-medium text-base lg:text-lg mb-4">Ship Information</h5>
            <p>
              {data?.fullname} - {data?.phone}
            </p>
            <p>{data?.address}</p>
          </div>
          <div className="my-4">
            <h5 className="font-medium text-base lg:text-lg mb-4">TimeLine</h5>
            <OrderTimeLine timeline={data?.timeline} />
          </div>
        </Col>
        <Col xs={24} sm={14}>
          <SimpleBar style={{ maxHeight: 400 }}>
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
          </SimpleBar>
          <div className="mb-3 text-sm md:text-base text-right mt-5">
            <Row className="font-medium my-3">
              <Col span={12}>SubTotal:</Col>
              <Col span={12} className="text-blue-500">
                {data?.total.toLocaleString()} vnđ
              </Col>
            </Row>
            <Row className="font-medium my-3">
              <Col span={12}>Shipping Cost:</Col>
              <Col span={12} className="text-blue-500">
                {data?.shipCost.toLocaleString()} vnđ
              </Col>
            </Row>
            <Row className="font-medium my-3">
              <Col span={12}>Total: </Col>
              <Col span={12} className="text-blue-500">
                {(data?.total + data?.shipCost).toLocaleString()} vnđ
              </Col>
            </Row>
            <Row className="font-medium my-3">
              <Col span={12}>Payment Method: </Col>
              <Col span={12} className="text-blue-500">
                {data?.payment === 1 ? 'Cash on Delivery' : 'Payment via card'}
              </Col>
            </Row>
          </div>
          <Modal
            title={
              <div className="flex justify-start">
                <Button
                  icon={<AiOutlineFilePdf className="mr-1 text-xl" />}
                  borderradius="3px"
                  bordercolor="var(--navy)"
                  bgColor="var(--navy)"
                  textcolor="white"
                  lineheight={'30px'}
                  size="small"
                  className="flex justify-end"
                  // disabled={false}
                >
                  <span onClick={handleDownloadPdf}>Export</span>
                </Button>
              </div>
            }
            width={width > 992 ? '60vw' : '80vw'}
            centered
            open={open}
            closable={true}
            keyboard={true}
            maskClosable={true}
            onCancel={() => setOpen(!open)}
            footer={<></>}
          >
            <Invoice ref={invoiceRef} data={data} />
          </Modal>
          {managePortal && (
            <Button
              borderradius="3px"
              bordercolor="var(--navy)"
              bgColor="var(--navy)"
              textcolor="white"
              lineheight={'30px'}
              size="small"
              className="flex justify-end mt-8"
            >
              <span onClick={() => setOpen(!open)}>See Invoice</span>
            </Button>
          )}
        </Col>
      </Row>
    </PurchaseOrderDetailWrapper>
  );
};

const PurchaseOrderDetailWrapper = styled.div``;
export default React.memo(PurchaseOrderDetail);
