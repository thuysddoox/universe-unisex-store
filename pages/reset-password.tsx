import ChangePasswordPopup from '@components/Form/ChangePassword';
import PageWapper from '@components/PageWrapper';
import withLayout from '@containers/layout/withLayout';
import Head from 'next/head';
import smoothscroll from 'smoothscroll-polyfill';

if (typeof window !== 'undefined') {
  smoothscroll.polyfill();
}
export function ResetPassPage({ idReset }: { idReset?: string }) {
  return (
    <PageWapper className="pb-24 pt-28 ">
      <Head>
        <meta content="width=device-width, height=device-height,  initial-scale=1.0, user-scalable=no;user-scalable=0; maximum-scale=1" />
        <title>Unisex Universe Store</title>
      </Head>
      <div className="container w-full md:w-2/3 lg:w-1/2">
        <ChangePasswordPopup isReset={true} idReset={idReset} />
      </div>
    </PageWapper>
  );
}

ResetPassPage.getInitialProps = async (context) => {
  const { idReset } = context.query;
  console.log(idReset);
  return {
    idReset,
  };
};

export default withLayout(ResetPassPage);
