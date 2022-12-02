import styled from '@emotion/styled';
import { Col, Row } from 'antd';
import OrderInfo from './OrderInfo';
import CheckoutForm from '@components/Form/Checkout';
import Button from '@ui/button';
import BackButton from '@components/BackButton';
import HeadingSection from '../../components/HeadingSection/index';
import OrderItemList from './OderItemList';

const Checkout = () => {
  return (
    <CheckoutWrapper className="pt-32 pb-24">
      <div className="container">
        <Row>
          <Col xs={24} md={16} className="pr-5">
            <BackButton />
            <HeadingSection title="Shipment Details" className={'my-0 mt-4 ml-3'} />
            <CheckoutForm />
          </Col>
          <Col xs={24} md={8}>
            <OrderItemList data={[]} />
            <OrderInfo subtotal={35} shipCost={10} />
            <Button
              borderradius={'3px'}
              hoverBgColor={'var(--navy)'}
              hoverTextColor={'#fff'}
              textcolor={'var(--navy)'}
              className="text-base my-5 w-full text-blue-500 font-medium"
              bordercolor={'var(--navy)'}
            >
              Place Order
            </Button>
          </Col>
        </Row>
      </div>
    </CheckoutWrapper>
  );
};
const CheckoutWrapper = styled.div`
  textarea {
    resize: none;
  }
`;
export default Checkout;
