import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { Col, InputNumber, Row } from 'antd';
import Button from '../../ui/button';
const Quantity = ({
  containClass,
  quantity,
  setQuantity,
  maxQuantity,
}: {
  containClass?: string;
  quantity: number;
  maxQuantity: number;
  setQuantity: any;
}) => {
  return (
    <QuantityWrap className={`flex items-center justify-start ${containClass}`}>
      <Row className="bg-gray-200 w-1/2">
        <Col xs={8}>
          <Button
            containerClass="h-full"
            className="flex items-center justify-center h-full"
            style={{ borderColor: 'transparent' }}
            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
            borderradius={'2px'}
          >
            <MinusOutlined />
          </Button>
        </Col>
        <Col className="flex justify-center items-center" xs={8}>
          <InputNumber
            type={'number'}
            className="w-full h-full align-middle text-base text-black"
            size="large"
            min={1}
            value={quantity}
            onChange={(value) => setQuantity(value > maxQuantity ? maxQuantity : value <= 0 ? 1 : value)}
          />
        </Col>
        <Col xs={8}>
          <Button
            containerClass="h-full"
            className="flex items-center justify-center h-full"
            style={{ borderColor: 'transparent' }}
            onClick={() => quantity === maxQuantity && setQuantity(quantity + 1)}
            borderradius={'2px'}
          >
            <PlusOutlined />
          </Button>
        </Col>
      </Row>
    </QuantityWrap>
  );
};
const QuantityWrap = styled.div`
  input {
    text-align: center;
    color: #000;
  }
  button.ant-btn {
    height: 100% !important;
    width: 100%;
  }
`;
export default Quantity;
