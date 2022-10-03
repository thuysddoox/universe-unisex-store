import OrderItem from '@components/OrderItem';
import styled from '@emotion/styled';
import { Col, Row } from 'antd';
import OrderInfo from './OrderInfo';
import Button from '../../ui/button';
import HeadingSection from '@components/HeadingSection';

const Cart = () => {
  return (
    <CartWrapper className="pt-24 pb-24">
      <div className="container">
        <HeadingSection title='My Shopping Cart' mode='center' />
        <Row className='pt-5'>
          <Col xs={24} md={16} className="pr-10">
            <OrderItem />
            <OrderItem />
            <OrderItem />
          </Col>
          <Col xs={24} md={8}>
            <OrderInfo subtotal={35} />
            <Button
              borderradius={'3px'}
              hoverBgColor={'var(--navy)'}
              hoverTextColor={'#fff'}
              textcolor={'var(--navy)'}
              className="text-base my-5 w-full text-blue-500 font-medium"
              bordercolor={'var(--navy)'}
            >
              Checkout
            </Button>
            <Button borderradius={'3px'} className="text-base my-5 w-full font-medium">
              Continue Shopping
            </Button>
          </Col>
        </Row>
      </div>
    </CartWrapper>
  );
};

const CartWrapper = styled.div`
button.ant-btn{
  border-width: 2px!important;
}
`;
export default Cart;
