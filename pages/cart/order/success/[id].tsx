import PageWapper from '@components/PageWrapper';
import messages from '@constants/messages';
import withPrivateLayout from '@containers/layout/withPrivateLayout';
import { Message } from '@ui/message';
import Link from 'next/link';
import { useEffect } from 'react';
import { BsFillPatchCheckFill } from 'react-icons/bs';
import { payOrder } from '../../../../src/network/services/order';

export function SuccessPage({ sessionId }: { sessionId: string }) {
  useEffect(() => {
    if (sessionId)
      (async () => {
        try {
          const resp = await payOrder(sessionId);
          if (resp?.data?.responseData) {
            Message.success(messages.paymentSuccess);
          }
        } catch (error) {
          Message.error(error?.response?.data?.message ?? error.message);
        }
      })();
  }, [sessionId]);
  return (
    <PageWapper className="pt-32 pb-24">
      <div className="container min-h-[50vh] flex items-center justify-center">
        <div>
          <BsFillPatchCheckFill className="text-6xl text-green-400 mx-auto mb-3" />
          <h3 className="font-semibold text-lg sm:text-2xl text-blue-500 text-center">Thank you for your order!</h3>
          <p className="text-center text-sm">
            You can track your orders at{' '}
            <Link passHref href="/purchases">
              <a className="text-blue-400 underline">here</a>
            </Link>
          </p>
        </div>
      </div>
    </PageWapper>
  );
}
SuccessPage.getInitialProps = async (context) => {
  const { id } = context.query;
  return {
    props: {
      sessionId: id,
    },
  };
};
export default withPrivateLayout(SuccessPage);
