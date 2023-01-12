import { useCreateCheckout, useQueryCart } from '@api/api';
import BackButton from '@components/BackButton';
import CheckoutForm from '@components/Form/Checkout';
import messages from '@constants/messages';
import styled from '@emotion/styled';
import { CartItem, Order } from '@interfaces';
import Button from '@ui/button';
import { useForm } from '@ui/form';
import { Message } from '@ui/message';
import { covertCartItemToOrderItem, getTotal } from '@utils/convertors';
import { Col, Row } from 'antd';
import { useCallback, useContext, useMemo, useState } from 'react';
import HeadingSection from '../../components/HeadingSection/index';
import { UserContext } from '../../contexts/userContext';
import { SafeAny } from '../../interfaces/common';
import { useCreateOrder } from '../../network/queries/order';
import OrderItemList from './OderItemList';
import OrderInfo from './OrderInfo';
import { useRouter } from 'next/router';

const Checkout = () => {
  const router = useRouter();
  const { currentUser } = useContext(UserContext);
  const { data: CartResp, refetch } = useQueryCart(currentUser);
  const cartItems: CartItem[] = useMemo(() => CartResp?.data?.responseData?.products ?? [], [CartResp]);
  const totalCart: number = useMemo(() => getTotal(cartItems), [CartResp]);
  const [data, setData] = useState<SafeAny>({ ...currentUser, payment: 1 });
  const [form] = useForm();
  const { mutate: createCheckoutFunc, isLoading: isCheckoutLoading } = useCreateCheckout({
    onSuccess: (response) => {
      const data = response?.data?.responseData;
      const error = response?.data?.error;
      console.log(data);
      if (data?.url) {
        Message.success(messages.requiredPayment);
        window.location.href = data?.url;
      } else if (error) {
        Message.error(error?.message);
      }
    },
    onError: (error) => {
      Message.error(error?.response?.data?.message ?? error.message);
    },
  });
  const { mutate: createOrderFunc, isLoading: isOrderLoading } = useCreateOrder({
    onSuccess: (response) => {
      const data = response?.data?.responseData;
      const error = response?.data?.error;
      if (data) {
        Message.success(messages.createOrderSuccess);
        if (data.payment === 2) createCheckoutFunc(data);
        else router.push('/purchases');
      } else if (error) {
        Message.error(error?.message);
      }
    },
    onError: (error) => {
      Message.error(error?.response?.data?.message ?? error.message);
    },
  });

  const handleSubmitCheckout = useCallback(async (data: SafeAny) => {
    const { fullName, phone, email, payment, dob, note, noHome, address, commune, district, city } = data;
    const order = {
      fullname: fullName,
      cartId: CartResp?.data?.responseData?._id,
      isPaid: false,
      email,
      phone,
      payment,
      note,
      commune,
      district,
      city,
      address: noHome ?? '' + ' ' + address,
      total: totalCart,
      status: payment === 1 ? 0 : 1,
      products: covertCartItemToOrderItem(cartItems),
    };
    createOrderFunc(order as Order);
  }, []);
  return (
    <CheckoutWrapper className="pt-32 pb-24">
      <div className="container">
        <Row>
          <Col xs={24} md={16} className="pr-5">
            <BackButton />
            <HeadingSection title="Shipment Details" className={'my-0 mt-4 ml-3'} />
            <CheckoutForm handleSubmitCheckout={handleSubmitCheckout} form={form} data={data} getData={setData} />
          </Col>
          <Col xs={24} md={8}>
            <OrderItemList data={cartItems} />
            <OrderInfo subtotal={totalCart} shipCost={totalCart > 800000 || totalCart === 0 ? 0 : 30000} />
            <Button
              borderradius={'3px'}
              hoverBgColor={'var(--navy)'}
              hoverTextColor={'#fff'}
              textcolor={'var(--navy)'}
              className="text-base my-5 w-full text-blue-500 font-medium"
              bordercolor={'var(--navy)'}
              loading={isOrderLoading || isCheckoutLoading}
              onClick={form.submit}
            >
              {data.payment === 1 ? 'Order' : 'Order and Pay'}
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
