import ProductComponent from '@components/Product';
import { Product } from '@interfaces/common';
import { Col, Row } from 'antd';
import React from 'react';
type ProductsListProp = {
  className?: string;
  data?: Product[];
};
const ProductsList = ({ data = [], className }: ProductsListProp) => {
  return (
    <Row className={`w-full ${className}`}>
      {data?.map((product) => (
        <Col xs={24} sm={12} md={8} xl={6} key={product?._id}>
          <ProductComponent product={product} />
        </Col>
      ))}
    </Row>
  );
};

export default ProductsList;
