import BackButton from '@components/BackButton';
import SliderDetail from '@components/SliderDetail';
import ProductDetail from '@components/ProductDetail';
import withLayout, { BackTopBtn } from '@containers/layout/withLayout';
import { BackTop, Col, Row } from 'antd';
import ProductTabs from '@containers/product/ProductTabs';
import RelateProductList from '@components/RelateProductList';
import PageWapper from '@components/PageWrapper';
import { GetServerSideProps } from 'next';
import { getProductDetail } from '@api/services/product';
import { Product } from '@interfaces/common';
import Head from 'next/head';
import { Header } from '@components/Header';
import { Footer } from '@components/Footer';
import { VerticalAlignTopOutlined } from '@ant-design/icons';

export function ProductDetailPage({ productDetailSSR }: { productDetailSSR: Product }) {
  return (
    <div className="page">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
        {/* <link rel="manifest" href="/favicon/site.webmanifest"/> */}
      </Head>
      <Header />
      <PageWapper className="pb-24 pt-28 ">
        <div className="container ">
          <BackButton />
          <Row className="mt-5">
            <Col span={24} md={14}>
              <SliderDetail data={productDetailSSR?.thumbnails ?? []} />
            </Col>
            <Col span={24} md={10} className="pl-6">
              <ProductDetail product={productDetailSSR} />
            </Col>
          </Row>
          <ProductTabs product={productDetailSSR} />
          <RelateProductList />
        </div>
      </PageWapper>
      <Footer />
      <BackTop duration={900} style={{ zIndex: 1100 }} visibilityHeight={300}>
        <BackTopBtn
          style={{
            zIndex: 1100,
            lineHeight: '40px',
          }}
          className="h-10 w-10 rounded-sm text-white text-2xl flex items-center justify-center"
        >
          <VerticalAlignTopOutlined />
        </BackTopBtn>
      </BackTop>
    </div>
  );
}
export const getServerSideProps = async (context) => {
  const { id } = context.query;
  const productResponse = id ? await getProductDetail(id.toString()) : null;
  return {
    props: {
      productDetailSSR: productResponse?.data?.responseData ?? {},
    },
  };
};
export default ProductDetailPage;
