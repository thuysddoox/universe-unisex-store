import withPrivateLayout from '@containers/layout/withPrivateLayout';
import Cart from '@containers/cart';
import PageWapper from '@components/PageWrapper';

export function CartPage() {
  return (
    <PageWapper>
      <Cart />
    </PageWapper>
  );
}

export default withPrivateLayout(CartPage);
