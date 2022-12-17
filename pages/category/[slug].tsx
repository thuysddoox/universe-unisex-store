import HeadingSection from '@components/HeadingSection';
import withLayout from '@containers/layout/withLayout';
import Shop from '@containers/shop';
import { ShopPageWrapper } from '../shop/index';

export function ShopPage({ category }: { category?: string }) {
  return (
    <ShopPageWrapper className="py-24">
      <div className="container">
        <HeadingSection title={category?.toUpperCase()} />
        <Shop category={category} />
      </div>
    </ShopPageWrapper>
  );
}

ShopPage.getInitialProps = async (context) => {
  const { slug } = context.query;
  console.log(context);
  return {
    category: slug,
  };
};

export default withLayout(ShopPage);
