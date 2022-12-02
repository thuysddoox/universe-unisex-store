import OrderItem from '@components/OrderItem';
import styled from '@emotion/styled';
import { Col, Row } from 'antd';
import OrderInfo from './OrderInfo';
import Button from '../../ui/button';
import HeadingSection from '@components/HeadingSection';
import Link from 'next/link';
import { useQueryCart } from '@api/api';
import { useMemo } from 'react';
import { Product } from '@interfaces/index';
import { CartItem } from '../../interfaces/common';
import NoResults from '../../components/NoResults/index';
import { getTotal } from '../../utils/convertors';

const Cart = () => {
  const { data: CartResp, refetch } = useQueryCart();
  const cartItems: CartItem[] = useMemo(() => CartResp?.data?.responseData?.products ?? [], [CartResp]);
  const totalCart: number = useMemo(() => getTotal(cartItems), [CartResp]);
  return (
    <CartWrapper className="py-20">
      <div className="container">
        <HeadingSection title="My Shopping Cart" />
        <Row className="pt-5">
          <Col xs={24} md={16} className="pr-10">
            {cartItems?.length > 0 ? (
              cartItems?.map((cartItem) => <OrderItem data={cartItem} key={cartItem.product._id} />)
            ) : (
              <NoResults description="You didn't add any product into your cart!" />
            )}
          </Col>
          <Col xs={24} md={8}>
            <OrderInfo subtotal={totalCart} shipCost={totalCart > 200 || totalCart === 0 ? 0 : 3} />
            <Button
              borderradius={'3px'}
              hoverBgColor={'var(--navy)'}
              hoverTextColor={'#fff'}
              textcolor={'var(--navy)'}
              className="text-base my-5 w-full text-blue-500 font-medium"
              bordercolor={'var(--navy)'}
              disabled={cartItems?.length <= 0}
            >
              <Link passHref href="/cart/checkout">
                <a>Checkout</a>
              </Link>
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
  button.ant-btn {
    border-width: 2px !important;
  }
`;
export default Cart;
