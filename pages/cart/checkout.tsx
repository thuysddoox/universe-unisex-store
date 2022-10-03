import withLayout from '@containers/layout/withLayout';
import Checkout from '@containers/cart/checkout';
import PageWapper from '@components/PageWrapper';

export function CheckoutPage() {
  return (
    <PageWapper>
      <Checkout />
    </PageWapper>
  );
}
export default withLayout(CheckoutPage);
