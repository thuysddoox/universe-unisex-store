import styled from '@emotion/styled';
import Head from 'next/head';
import { NextComponentType, NextPageContext } from 'next';
import { Footer } from '@components/Footer';
import { Header } from '@components/Header';
import { BackTop } from 'antd';
import { VerticalAlignTopOutlined } from '@ant-design/icons';
import { useContext, useMemo, useEffect } from 'react';
import { UserContext } from '@contexts';
import { useRouter } from 'next/router';

interface LayoutPrivateProps {
  headerStyle?: 'transparent' | 'default';
  transparentProps?: boolean;
  pathName?: string;
}
export const PERMISSION_DENIED = 'You dont have permission to access this page.';

const withPrivateLayout = (Component: NextComponentType<NextPageContext, object, Record<string, unknown>>) => {
  const Wrapper = (props: LayoutPrivateProps) => {
    const userContext = useContext(UserContext);
    const router = useRouter();

    const permissions = useMemo(() => {
      if (userContext.contextLoaded || userContext.currentUser) {
        const user = userContext.currentUser;
        if (!user) {
          router.push('/');
          return false;
        }
        return true;
      }
    }, [userContext.currentUser, userContext.contextLoaded, router]);
    // useEffect(() => {
    //   if (!permissions) {
    //     router.push('/');
    //   }
    // }, [permissions]);
    return permissions ? (
      <div className="page">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
          <link rel="manifest" href="/favicon/site.webmanifest" />
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
    ) : (
      <div className="page text-center pt-28">
        <p>{PERMISSION_DENIED}</p>
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

const BackTopBtn = styled.div`
  z-index: 100;
  background: #50b3ff77;
  transition: background 0.3s;
  &:hover {
    background: var(--navy);
  }
`;

export default withPrivateLayout;
