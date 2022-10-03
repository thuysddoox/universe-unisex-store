import Filter from "@components/Filter";
import styled from "@emotion/styled";
import { Col, Row } from "antd";

const Shop = () =>{
  return (
    <ShopWrapper>
      <Row>
        <Col span={8}>
          <Filter />
        </Col>
        <Col span={16}>
          <Filter />
        </Col>
      </Row>
    </ShopWrapper>
  )
}
const ShopWrapper = styled.div``;
export default Shop;