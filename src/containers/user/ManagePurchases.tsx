import styled from '@emotion/styled';
import { Tabs } from '@ui/tabs';
import { useMemo } from 'react';
import { AiOutlineInbox } from 'react-icons/ai';
import { BsFillPatchCheckFill } from 'react-icons/bs';
import { IoWalletOutline } from 'react-icons/io5';
import { TbTruckDelivery } from 'react-icons/tb';
import { MdStars } from 'react-icons/md';
import PurchaseOrder from '@components/PurchaseOrder';
import { Badge, Col, Row, Spin } from 'antd';
import UserLayout from './userLayout';
import { useQueryOrderOfUser, useQueryStatisticOrder } from '@api/api';
import { useState, useEffect } from 'react';
import { BaseListRequest, Order, SafeAny } from '@interfaces';
import { QueryParam } from '../../constants/enum';
import NoResults from '@components/NoResults';
import InfiniteScroll from 'react-infinite-scroll-component';
import _ from 'lodash';

const ManagePurchases = () => {
  const [queries, setQueries] = useState<BaseListRequest>({ status: 1, pageSize: 6, pageIndex: 0 });
  const { data: orderResp, fetchNextPage, hasNextPage, isFetching, refetch } = useQueryOrderOfUser(queries);
  const { data: statisticResp, refetch: refetchStatistic } = useQueryStatisticOrder();
  const orderList: Order[] = useMemo(
    () => orderResp?.pages?.reduce((total, page) => [...total, ...(page?.data?.responseData ?? [])], []),
    [orderResp?.pages],
  );
  const refetchData = () => {
    refetch();
    refetchStatistic();
  };
  const tabs = useMemo(
    () =>
      [
        { label: 'Approving', status: 1, icon: <IoWalletOutline className="text-2xl mx-auto" /> },
        { label: 'Preparing', status: 2, icon: <AiOutlineInbox className="text-2xl mx-auto" /> },
        { label: 'Shipping', status: 3, icon: <TbTruckDelivery className="text-2xl mx-auto" /> },
        { label: 'Compeleted', status: 4, icon: <BsFillPatchCheckFill className="text-2xl mx-auto" /> },
        { label: 'Review & Rate', status: 5, icon: <MdStars className="text-2xl mx-auto" /> },
        { label: 'Cancelled', status: 0, icon: <MdStars className="text-2xl mx-auto" /> },
      ].map((item, index) => ({
        key: 'Tab-' + index,
        label: (
          <div className="text-center mr-4" onClick={() => setQueries((prev) => ({ ...prev, status: item.status }))}>
            <Badge
              count={_.find(statisticResp?.data?.responseData, (value) => value._id === item.status)?.count ?? 0}
              overflowCount={5}
            >
              {item?.icon}
            </Badge>
            <div>
              <span>{item?.label}</span>
            </div>
          </div>
        ),
        children: (
          <PurchaseList
            data={orderList}
            fetchNextPage={fetchNextPage}
            isFetching={isFetching}
            hasNextPage={hasNextPage}
            refetch={refetchData}
          />
        ),
      })),
    [orderResp],
  );
  useEffect(() => {
    refetch();
  }, [queries]);
  return (
    <UserLayout title={'My Purchases'}>
      <ManagePurchasesWrapper>
        <Tabs
          // defaultActiveKey="2"
          items={tabs}
        />
        {isFetching && (
          <div className="text-center p-10">
            <Spin size="large" spinning={isFetching} />
          </div>
        )}
      </ManagePurchasesWrapper>
    </UserLayout>
  );
};
const PurchaseList = ({
  data,
  fetchNextPage,
  hasNextPage,
  isFetching,
  refetch,
}: {
  data: Order[];
  fetchNextPage: SafeAny;
  hasNextPage: boolean;
  isFetching: boolean;
  refetch: SafeAny;
}) => {
  return (
    <InfiniteScroll
      dataLength={data?.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={
        <div className="text-center p-10">
          <Spin size="large" spinning={isFetching} />
        </div>
      }
    >
      <Row className="justify-start">
        {data?.length > 0
          ? data?.map((order, index) => (
              <Col span={8} className="p-4" key={order?._id}>
                <PurchaseOrder index={index} refetch={refetch} data={order} />
              </Col>
            ))
          : !isFetching && (
              <Col span={24}>
                <NoResults description="No order yet." />
              </Col>
            )}
      </Row>
    </InfiniteScroll>
  );
};
const ManagePurchasesWrapper = styled.div`
  .ant-tabs-nav-list {
    width: 100%;
    justify-content: space-between;
  }
`;
export default ManagePurchases;
