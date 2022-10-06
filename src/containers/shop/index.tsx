import Filter from "@components/Filter";
import SortBy from "@components/Filter/SortBy";
import styled from "@emotion/styled";
import { Col, Row } from "antd";

const Shop = () =>{
  return (
    <ShopWrapper className="container">
      <Row>
        <Col span={5}>
          <Filter />
        </Col>
        <Col span={19} className='px-6'>
          <SortBy />
        </Col>
      </Row>
    </ShopWrapper>
  )
}
const ShopWrapper = styled.div``;
export default Shop;