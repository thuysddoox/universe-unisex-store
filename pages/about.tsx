import withLayout from '@containers/layout/withLayout';
import About from '@containers/about';
import PageWapper from '@components/PageWrapper';

export function AboutPage() {
  return (
    <PageWapper>
      <About />
    </PageWapper>
  );
}

export default withLayout(AboutPage);
