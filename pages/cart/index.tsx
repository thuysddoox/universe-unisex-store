import withLayout from '@containers/layout/withLayout';
import Cart from '@containers/cart';
import PageWapper from '@components/PageWrapper';

export function CartPage() {
  return (
    <PageWapper>
      <Cart />
    </PageWapper>
  );
}

export default withLayout(CartPage);
