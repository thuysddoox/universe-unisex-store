import { useProducts } from '@api/api';
import Filter from '@components/Filter';
import SortBy from '@components/Filter/SortBy';
import ProductComponent from '@components/Product';
import { QueryParam } from '@constants/enum';
import styled from '@emotion/styled';
import { BaseListRequest, SafeAny } from '@interfaces';
import { Select } from '@ui/select';
import { Col, Row } from 'antd';
import { useState, useMemo, useEffect } from 'react';
import NoResults from '../../components/NoResults/index';
import { Pagination } from 'antd';
import Button from '@ui/button';
import Spin from '@ui/spin';
import { useSaleProducts } from '../../network/queries/product';
import { useQueryCart } from '../../network/queries/cart';

const listSort = ['Latest', 'Price: Low To High', 'Price: High To Low'];
const Shop = ({
  category,
  keyword,
  salePage = false,
  setKeyword,
}: {
  category?: string;
  keyword?: string;
  salePage?: boolean;
  setKeyword?: React.Dispatch<string>;
}) => {
  const [queries, setQueries] = useState<BaseListRequest>({
    ...QueryParam,
    keyword,
    pageSize: 12,
    ...(category ? { category: [category] } : {}),
  });
  const [filter, setFilter] = useState<SafeAny>();
  const { data: productsResp, refetch, isFetching } = salePage ? useSaleProducts(queries) : useProducts(queries);
  const products = useMemo(() => productsResp?.data?.responseData, [productsResp]);
  const total = useMemo(() => productsResp?.data?.total, [productsResp?.data?.total]);
  const { refetch: refetchCart } = useQueryCart();
  const handleChangePageIndex = (page: number, pageSize: number) => {
    setQueries((prev) => ({ ...prev, pageIndex: page - 1 }));
  };
  const handleApplyFilter = () => {
    const { color = 'All', size = 'All', ...rest } = filter;
    let applyFilter = rest;
    if (color !== 'All') applyFilter = { ...applyFilter, color };
    if (size !== 'All') applyFilter = { ...applyFilter, size };
    console.log(applyFilter);
    setQueries({ ...queries, ...applyFilter, pageIndex: 0 });
  };
  const handleClearFilter = () => {
    setFilter({});
    setKeyword('');
    setQueries({
      ...QueryParam,
      pageSize: 12,
      ...(category ? { category: [category] } : {}),
    });
  };
  console.log(queries);
  const handleSort = (value) => {
    switch (value) {
      case 'Price: Low To High': {
        setQueries({ ...queries, orderBy: 'price', orderDirection: 'asc' });
        break;
      }
      case 'Price: High To Low': {
        setQueries({ ...queries, orderBy: 'price', orderDirection: 'desc' });
        break;
      }
      case 'Latest': {
        setQueries({ ...queries, orderBy: 'updatedAt', orderDirection: 'desc' });
        break;
      }
    }
  };
  useEffect(() => {
    setQueries({ ...queries, keyword });
  }, [keyword]);
  useEffect(() => {
    refetch();
  }, [queries]);

  return (
    <ShopWrapper className="container">
      <Row>
        <Col span={5}>
          <Filter filterValue={filter} setFilter={setFilter} hasCategory={!category} />
          <div className="text-right">
            <span
              className="text-sm p-2 py-1 border border-blue-500 bg-blue-500 text-white rounded-sm inline-block mr-2 cursor-pointer"
              onClick={handleApplyFilter}
            >
              Apply
            </span>
            <span
              className="text-sm p-2 py-1 border border-blue-500 text-blue-500 rounded-sm inline-block cursor-pointer"
              onClick={handleClearFilter}
            >
              Clear
            </span>
          </div>
        </Col>
        <Col span={19} className="px-6">
          <div className="flex justify-between items-center mx-2 mb-4">
            <Select
              defaultValue={'Latest'}
              defaultActiveFirstOption
              borderradius={'0px'}
              options={listSort.map((item) => ({ label: item, value: item }))}
              onChange={handleSort}
            />
            {total > 0 && (
              <Pagination
                className="flex"
                total={total}
                defaultPageSize={queries?.pageSize}
                defaultCurrent={queries?.pageIndex + 1 ?? 1}
                current={queries?.pageIndex + 1 ?? 1}
                onChange={handleChangePageIndex}
              />
            )}
          </div>
          {isFetching ? (
            <div className="text-center p-10">
              <Spin size="large" spinning={isFetching} />
            </div>
          ) : (
            <Row>
              {products?.length > 0 ? (
                products?.map((product) => (
                  <Col sm={24} md={12} lg={8}>
                    <ProductComponent
                      product={product}
                      key={product?._id}
                      refetchCart={refetchCart}
                      refetch={refetch}
                    />
                  </Col>
                ))
              ) : (
                <Col span={24}>
                  <NoResults />
                </Col>
              )}
            </Row>
          )}
        </Col>
      </Row>
    </ShopWrapper>
  );
};
const ShopWrapper = styled.div`
  .ant-select {
    width: 200px;
    background: #d5e0e6;
    .ant-select-selector {
      border: 0 !important;
      border-radius: 0px !important;
      background: transparent;
    }
    .ant-select-arrow {
      background: var(--navy);
      color: #fff;
      top: 0;
      right: 0;
      margin: 0;
      height: 32px;
      padding: 0 10px;
    }
  }
`;
export default Shop;
