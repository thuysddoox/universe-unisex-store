import BackButton from '@components/BackButton';
import SliderDetail from '@components/SliderDetail';
import ProductDetail from '@components/ProductDetail';
import withLayout from '@containers/layout/withLayout';
import { Col, Row } from 'antd';
import ProductTabs from '@containers/product/ProductTabs';
import RelateProductList from '@components/RelateProductList';
import PageWapper from '@components/PageWrapper';

export function ProductDetailPage() {
  return (
    <PageWapper className="pb-24 pt-28 ">
      <div className="container ">
        <BackButton />
        <Row className='mt-5'>
          <Col span={24} md={14}>
            <SliderDetail />
          </Col>
          <Col span={24} md={10} className='pl-6'>
            <ProductDetail />
          </Col>
        </Row>
        <ProductTabs />
        <RelateProductList />
      </div>
    </PageWapper>
  );
}
export default withLayout(ProductDetailPage);
