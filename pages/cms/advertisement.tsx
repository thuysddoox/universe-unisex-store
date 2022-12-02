import PageWapper from '@components/PageWrapper';
import MangageAdvertisement from '@containers/admin/advertisement';
import withCMSLayout from '@containers/layout/withCMSLayout';

export function CMSAdvertisementPage() {
  return (
    <PageWapper>
      <MangageAdvertisement />
    </PageWapper>
  );
}

export default withCMSLayout(CMSAdvertisementPage);
