import { useProducts } from '@api/api';
import Filter from '@components/Filter';
import SortBy from '@components/Filter/SortBy';
import ProductComponent from '@components/Product';
import { QueryParam } from '@constants/enum';
import styled from '@emotion/styled';
import { BaseListRequest } from '@interfaces';
import { Col, Row } from 'antd';
import { useState, useMemo } from 'react';
import NoResults from '../../components/NoResults/index';
import { data } from '../../components/Statistic/Chart/index';

const Shop = () => {
  const [queries, setQueries] = useState<BaseListRequest>(QueryParam);
  const { data: productsResp, refetch, isFetching } = useProducts(queries);
  const products = useMemo(() => productsResp?.data?.responseData, [productsResp]);
  return (
    <ShopWrapper className="container">
      <Row>
        <Col span={5}>
          <Filter />
        </Col>
        <Col span={19} className="px-6">
          <SortBy />
          <Row>
            {products?.length > 0 ? (
              products?.map((product) => (
                <Col sm={24} md={12} lg={8}>
                  <ProductComponent product={product} key={product?._id} />
                </Col>
              ))
            ) : (
              <NoResults />
            )}
          </Row>
        </Col>
      </Row>
    </ShopWrapper>
  );
};
const ShopWrapper = styled.div``;
export default Shop;
