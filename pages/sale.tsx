import PageWapper from '@components/PageWrapper';
import Contact from '@containers/contact';
import withLayout from '@containers/layout/withLayout';

export function ContactPage() {
  return (
    <PageWapper>
      <Contact />
    </PageWapper>
  );
}

export default withLayout(ContactPage);
