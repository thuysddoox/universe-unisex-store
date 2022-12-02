import PageWapper from '@components/PageWrapper';
import ManageJobs from '@containers/admin/job';
import withCMSLayout from '@containers/layout/withCMSLayout';

export function CMSJobPage() {
  return (
    <PageWapper>
      <ManageJobs />
    </PageWapper>
  );
}

export default withCMSLayout(CMSJobPage);
