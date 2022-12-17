import ProductForm from '@components/Form/Product';
import TableProduct from '@components/Table/TableProduct';
import messages from '@constants/messages';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Product } from '@interfaces/common';
import Button from '@ui/button';
import { Message } from '@ui/message';
import { confirm, Modal } from '@ui/modal';
import { Grid } from 'antd';
import { MouseEventHandler, useEffect, useState } from 'react';
import { useDeleteProduct, useProductsList, useProducts } from '../../../network/queries/product';
import { BaseListRequest } from '../../../interfaces/common';
import { QueryParam } from '../../../constants/enum';
import Spin from '@ui/spin';
import { useCallback } from 'react';
const { useBreakpoint } = Grid;
const ManageProducts = () => {
  const screens = useBreakpoint();
  const [animated] = useAutoAnimate<HTMLDivElement>(null);
  const [selectedProduct, setProduct] = useState<Product>();
  const [openProductForm, setOpenProductForm] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [queries, setQueries] = useState<BaseListRequest>(QueryParam);
  const { data: productsResp, refetch, isFetching } = useProducts(queries);
  const { mutate: delProduct, isLoading } = useDeleteProduct({
    onSuccess: (response) => {
      const productResp = response?.data?.responseData;
      const error = response?.data?.error;
      if (productResp) {
        Message.success(messages.deletedProductSuccess);
        refetch();
      } else if (error) {
        Message.error(error?.message);
      }
    },
    onError: (error) => {
      Message.error(error?.response?.data?.message ?? error.message);
    },
  });
  const handleOpenProductForm = () => {
    setOpenProductForm(!openProductForm);
    setIsEdit((prev) => !prev);
  };
  const handleOpenEditProduct = useCallback((product: Product) => {
    if (product) {
      setProduct(product);
      setIsEdit((prev) => !prev);
      handleOpenProductForm();
    }
  }, []);
  const handleDeleteProduct = (product: Product) => {
    confirm({
      title: 'Confirm',
      content: 'Do you want to delete this product?',
      onOk: () => {
        delProduct(product._id);
      },
    });
  };
  const handleChangePageIndex = (page: number, pageSize: number) => {
    setQueries((prev) => ({ ...prev, pageIndex: page }));
  };

  return (
    <div>
      <Button
        borderradius={'3px'}
        size="small"
        borderless={true}
        bgColor="rgba(16, 185, 129,1)"
        textcolor="#fff"
        className="font-medium my-3"
        bordercolor={'rgba(16, 185, 129,1)'}
        lineheight="30px"
        onClick={handleOpenProductForm}
      >
        Add +
      </Button>
      <TableProduct
        data={productsResp?.data?.responseData ?? []}
        total={productsResp?.data?.total}
        pageSize={queries.pageSize}
        handleOpenEdit={handleOpenEditProduct}
        handleDelete={handleDeleteProduct}
        handleChangePageIndex={handleChangePageIndex}
        loading={isFetching || isLoading}
      />
      <Modal
        centered
        closable
        title={isEdit ? 'Edit Product' : 'Add New Product'}
        open={openProductForm}
        footer={null}
        onOk={handleOpenProductForm}
        onCancel={handleOpenProductForm}
        className="my-10"
        width={screens.xs ? '90vw' : screens.md ? '80vw' : screens.lg ? '70vw' : '60vw'}
        bodyStyle={{
          background: '#ffffff',
          margin: '0',
        }}
      >
        <div ref={animated} className="w-full h-full">
          <ProductForm product={selectedProduct} isEdit={isEdit} handleCloseForm={handleOpenProductForm} />
        </div>
      </Modal>
    </div>
  );
};
export default ManageProducts;
