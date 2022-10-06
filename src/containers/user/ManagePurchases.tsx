import styled from '@emotion/styled';
import { Tabs } from '@ui/tabs';
import { useMemo } from 'react';
import { AiOutlineInbox } from 'react-icons/ai';
import { BsFillPatchCheckFill } from 'react-icons/bs';
import { IoWalletOutline } from 'react-icons/io5';
import { TbTruckDelivery } from 'react-icons/tb';
import { MdStars } from 'react-icons/md';
import PurchaseOrder from '@components/PurchaseOrder';
import { Col, Row } from 'antd';

const ManagePurchases = () => {
  const tabs = useMemo(
    () => [
      {
        key: 'Tab-1',
        label: (
          <div className="text-center mr-4">
            <IoWalletOutline className="text-2xl mx-auto mb-2" />
            <span>Confirming</span>
          </div>
        ),
        children: (
          <Row className="justify-between">
            <Col span={12} className="p-4">
              <PurchaseOrder />
            </Col>
            {/* <Col className="p-4" span={12}>
              <PurchaseOrder />
            </Col> */}
          </Row>
        ),
      },
      {
        key: 'Tab-2',
        label: (
          <div className="text-center mr-4">
            <AiOutlineInbox className="text-2xl mx-auto mb-2" />
            <span>Preparing</span>
          </div>
        ),
        children: <></>,
      },
      {
        key: 'Tab-3',
        label: (
          <div className="text-center mr-4">
            <TbTruckDelivery className="text-2xl mx-auto mb-2" />
            <span>Shipping</span>
          </div>
        ),
        children: <></>,
      },
      {
        key: 'Tab-4',
        label: (
          <div className="text-center mr-4">
            <BsFillPatchCheckFill className="text-2xl mx-auto mb-2" />
            <span>Compeleted</span>
          </div>
        ),
        children: <></>,
      },
      {
        key: 'Tab-5',
        label: (
          <div className="text-center">
            <MdStars className="text-2xl mx-auto mb-2" />
            <span>Review & Rate</span>
          </div>
        ),
        children: <></>,
      },
    ],
    [],
  );
  return (
    <ManagePurchasesWrapper>
      <Tabs
        // defaultActiveKey="2"
        items={tabs}
      />
    </ManagePurchasesWrapper>
  );
};
const ManagePurchasesWrapper = styled.div`
  .ant-tabs-nav-list {
    width: 100%;
    justify-content: space-between;
  }
`;
export default ManagePurchases;
