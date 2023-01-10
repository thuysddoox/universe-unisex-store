import { useQueryOrderList, useUpdateOrder } from '@api/api';
import PurchaseOrderDetail from '@components/PurchaseOrderDetail';
import TableOrder from '@components/Table/TableOrder';
import { QueryParam } from '@constants/enum';
import messages from '@constants/messages';
import { BaseListRequest, Order } from '@interfaces';
import { Message } from '@ui/message';
import { confirm } from '@ui/modal';
import { useState } from 'react';
import { SafeAny } from '../../../interfaces/common';

const ManageOrders = () => {
  const [queries, setQueries] = useState<BaseListRequest>(QueryParam);
  const { data: ordersResp, refetch, isFetching } = useQueryOrderList(queries);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [order, setOrder] = useState<Order>();
  const { mutate: updateStatusOrder, isLoading } = useUpdateOrder({
    onSuccess: (response) => {
      const orderResp = response?.data?.responseData;
      const error = response?.data?.error;
      if (orderResp) {
        Message.success(messages.updatedOrderSuccess);
        refetch();
      } else if (error) {
        Message.error(error?.message);
      }
    },
    onError: (error) => {
      Message.error(error?.response?.data?.message ?? error.message);
    },
  });
  const handleChangePageIndex = (page: number, pageSize: number) => {
    setQueries((prev) => ({ ...prev, pageIndex: page }));
  };
  const handleOpenOrder = (order: Order) => {
    setIsOpen((prev) => !prev);
    setOrder(order);
  };
  const handleSave = (order: Order, resetFunc: SafeAny) => {
    confirm({
      title: 'Confirm',
      content: 'Do you want to update status for this order!',
      onOk: () => {
        updateStatusOrder(order);
      },
      onCancel: () => {
        resetFunc({});
      },
    });
  };

  return (
    <>
      <TableOrder
        data={ordersResp?.data?.responseData ?? []}
        total={ordersResp?.data?.total}
        pageSize={queries.pageSize}
        handleChangePageIndex={handleChangePageIndex}
        handleOpenEdit={handleOpenOrder}
        handleSave={handleSave}
        loading={isFetching || isLoading}
      />
      <PurchaseOrderDetail
        data={order}
        handleOpen={() => setIsOpen((prev) => !prev)}
        isOpen={isOpen}
        managePortal={true}
      />
    </>
  );
};
export default ManageOrders;
