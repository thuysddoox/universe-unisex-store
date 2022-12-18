import styled from '@emotion/styled';
import Head from 'next/head';
import { NextPageContext } from 'next';
import { Footer } from '@components/Footer';
import { Header } from '@components/Header';
import { BackTop } from 'antd';
import { VerticalAlignTopOutlined } from '@ant-design/icons';
import Sidebar from '@components/Sidebar';
import HeaderAdmin from '@components/HeaderAdmin';
import { useContext, useMemo, useEffect } from 'react';
import { UserContext } from '../../contexts/userContext';
import { useRouter } from 'next/router';
import { PERMISSION_DENIED } from './withPrivateLayout';
import { Message } from '@ui/message';
import { getServerSideProps } from '../../../pages/product/[id]';

export interface LayoutProps {
  headerStyle?: 'transparent' | 'default';
  transparentProps?: boolean;
  pathName?: string;
}
const withCMSLayout = (Component) => {
  const Wrapper = (props: LayoutProps) => {
    const userContext = useContext(UserContext);
    const router = useRouter();

    const permissions = true;
    useMemo(() => {
      if (userContext.contextLoaded) {
        const user = userContext.currentUser;
        if (!user || user.role === 1) {
          Message.warning('You dont have permission to access this page.');
          router.push('/');
          return false;
        }
        return true;
      }
    }, [userContext.currentUser, userContext.contextLoaded, router]);
    useEffect(() => {
      if (!userContext.currentUser) {
        router.push('/');
      }
    }, []);
    return permissions ? (
      <div className="page">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
          {/* <link rel="manifest" href="/favicon/site.webmanifest" /> */}
        </Head>
        <div className="flex">
          <Sidebar />
          <div className="flex-grow bg-gray-200">
            <HeaderAdmin />
            <div className="p-5">
              <Component {...props} />
            </div>
          </div>
        </div>

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
  background: rgba(41, 99, 126, 0.45);
  transition: background 0.3s;
  &:hover {
    background: rgba(41, 99, 126, 0.9);
  }
`;

export default withCMSLayout;
