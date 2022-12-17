import { CategoryItem } from '@components/CategoryItem';
import HeadingSection from '@components/HeadingSection';
import styled from '@emotion/styled';
import { Col, Row } from 'antd';
import _ from 'lodash';
import React from 'react';
import { Category } from '../../interfaces/common';
const ShopByCategory = ({ categories }: { categories: Category[] }) => {
  const restCategories = _.filter(categories, (item) => item?.name !== 'Jeans/Pants');
  return (
    <ShopByCategoryWrap>
      <HeadingSection title="SHOP BY CATEGORY" />
      <Row>
        <Col className="p-2" xs={12} md={8}>
          <CategoryItem category={_.find(categories, (item) => item?.name === 'Jeans/Pants')} size="large" />
        </Col>
        <Col xs={12} md={16}>
          <Row>
            <Col className="p-2" xs={24} md={12}>
              <CategoryItem category={restCategories[0]} />
            </Col>
            <Col className="p-2" xs={24} md={12}>
              <CategoryItem category={restCategories[1]} />
            </Col>
            <Col className="p-2 hidden md:block" xs={24} md={12}>
              <CategoryItem category={restCategories[2]} />
            </Col>
            <Col className="p-2 hidden md:block" xs={24} md={12}>
              <CategoryItem category={restCategories[3]} />
            </Col>
          </Row>
        </Col>
        <Col className="p-2 block md:hidden" xs={12}>
          <CategoryItem category={restCategories[2]} />
        </Col>
        <Col className="p-2 block md:hidden" xs={12}>
          <CategoryItem category={restCategories[3]} />
        </Col>
        <Col className="p-2" xs={12} md={8}>
          <CategoryItem category={restCategories[4]} />
        </Col>
        <Col className="p-2" xs={12} md={8}>
          <CategoryItem category={restCategories[5]} />
        </Col>
      </Row>
    </ShopByCategoryWrap>
  );
};
const ShopByCategoryWrap = styled.div``;
export default ShopByCategory;
