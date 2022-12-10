import withPrivateLayout from '@containers/layout/withPrivateLayout';
import Checkout from '@containers/cart/checkout';
import PageWapper from '@components/PageWrapper';

export function CheckoutPage() {
  return (
    <PageWapper>
      <Checkout />
    </PageWapper>
  );
}
export default withPrivateLayout(CheckoutPage);
