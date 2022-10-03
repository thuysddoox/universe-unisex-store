import Head from 'next/head';
import withLayout from '@containers/layout/withLayout';
import styled from '@emotion/styled';
import HomePage from '@containers/home';
import { SafeAny } from '@interfaces';
import smoothscroll from 'smoothscroll-polyfill';

interface IndexProps {
  homeData?: Record<string, SafeAny>[];
}
if (typeof window !== 'undefined') {
  smoothscroll.polyfill();
}
export function Index({homeData}: IndexProps) {
  return (
    <HomeWrapper>
      <Head>
        <meta content="width=device-width, height=device-height,  initial-scale=1.0, user-scalable=no;user-scalable=0; maximum-scale=1" />
        <title>Bloodstock Exchange</title>
      </Head>
      <HomePage />
    </HomeWrapper>
  );
}

Index.getInitialProps = () => {
  return {
    headerStyle: 'transparent',
  };
};

const HomeWrapper = styled.div``;

export default withLayout(Index);
