import { CategoryItem } from "@components/CategoryItem";
import HeadingSection from "@components/HeadingSection";
import styled from "@emotion/styled";
import { Col, Row } from "antd";
import React from 'react';
const ShopByCategory = () => {
  return (
    <ShopByCategoryWrap>
      <HeadingSection title="SHOP BY CATEGORY" />
      <Row>
        <Col className='p-2' xs={12} md={8}>
          <CategoryItem size='large' />
        </Col>
        <Col xs={12} md={16}>
          <Row>
            <Col className="p-2" xs={24} md={12}>
              <CategoryItem />
            </Col>
            <Col className="p-2" xs={24} md={12}>
              <CategoryItem />
            </Col>
            <Col className="p-2 hidden md:block" xs={24} md={12}>
              <CategoryItem />
            </Col>
            <Col className="p-2 hidden md:block" xs={24} md={12}>
              <CategoryItem />
            </Col>
          </Row>
        </Col>
        <Col className="p-2 block md:hidden" xs={12}>
          <CategoryItem />
        </Col>
        <Col className="p-2 block md:hidden" xs={12}>
          <CategoryItem />
        </Col>
        <Col className='p-2' xs={12} md={8}>
          <CategoryItem />
        </Col>
        <Col className='p-2' xs={12} md={8}>
          <CategoryItem />
        </Col>
        <Col className='p-2' xs={12} md={8}>
          <CategoryItem />
        </Col>
        <Col className='p-2' xs={12} md={8}>
          <CategoryItem />
        </Col>
        <Col className='p-2' xs={12} md={8}>
          <CategoryItem />
        </Col>
        <Col className='p-2' xs={12} md={8}>
          <CategoryItem />
        </Col>
      </Row>
    </ShopByCategoryWrap>
  )
}
const ShopByCategoryWrap = styled.div``;
export default ShopByCategory;