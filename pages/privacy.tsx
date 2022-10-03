import PageWapper from '@components/PageWrapper';
import withLayout from '@containers/layout/withLayout';
import PrivacyPolicy from '@containers/privacy-policy';

export function PrivacyPage() {
  return (
    <PageWapper>
      <PrivacyPolicy />
    </PageWapper>
  );
}

PrivacyPage.getInitialProps = () => {
};

export default withLayout(PrivacyPage);
