import styled from '@emotion/styled';
import Head from 'next/head';
import { NextPageContext } from 'next';
import { Footer } from '@components/Footer';
import { Header } from '@components/Header';
import { BackTop } from 'antd';
import { VerticalAlignTopOutlined } from '@ant-design/icons';

export interface LayoutProps {
  headerStyle?: 'transparent' | 'default';
  transparentProps?: boolean;
  pathName?: string;
}
const withLayout = (Component) => {
  const Wrapper = (props: LayoutProps) => {
    const { headerStyle, transparentProps = null, pathName } = props;

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
        <Component {...props} />
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
  };

  Wrapper.getInitialProps = async (ctx: NextPageContext) => {
    const componentProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : null;
    return {
      ...componentProps,
    };
  };

  return Wrapper;
};

export const BackTopBtn = styled.div`
  z-index: 100;
  background: rgba(41, 99, 126, 0.45);
  transition: background 0.3s;
  &:hover {
    background: rgba(41, 99, 126, 0.9);
  }
`;

export default withLayout;
