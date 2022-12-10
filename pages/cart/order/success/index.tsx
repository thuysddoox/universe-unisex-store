import PageWapper from '@components/PageWrapper';
import withPrivateLayout from '@containers/layout/withPrivateLayout';
import Link from 'next/link';
import { BsFillPatchCheckFill } from 'react-icons/bs';

export function SuccessPage() {
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
export default withPrivateLayout(SuccessPage);
