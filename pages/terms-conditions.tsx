
import PageWapper from '@components/PageWrapper';
import withLayout from '@containers/layout/withLayout';
import TermsConditions from '@containers/terms-conditions';

export function TermsPage() {
  return (
    <PageWapper>
      <TermsConditions />
    </PageWapper>
  );
}

TermsPage.getInitialProps = () => {
};

export default withLayout(TermsPage);
