import Product from '@components/Product';
import { Col, Row } from 'antd';
import React from 'react';
type ProductsListProp = {
  className?: string;
}
const ProductsList = ({className}:ProductsListProp)=>{
  return (
    <Row className={`w-full ${className}`}>
      <Col xs={24} sm={12} md={8} xl={6}>
        <Product />
      </Col>
      <Col xs={24} sm={12} md={8} xl={6}>
        <Product />
      </Col>
      <Col xs={24} sm={12} md={8} xl={6}>
        <Product />
      </Col>
    </Row>
  )
}

export default ProductsList;