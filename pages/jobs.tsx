import PageWapper from '@components/PageWrapper';
import Jobs from '@containers/jobs';
import withLayout from '@containers/layout/withLayout';

export function JobsPage() {
  return (
    <PageWapper>
      <Jobs />
    </PageWapper>
  );
}

JobsPage.getInitialProps = () => {
};

export default withLayout(JobsPage);
