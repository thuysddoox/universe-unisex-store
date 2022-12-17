import HeadingSection from '@components/HeadingSection';
import withLayout from '@containers/layout/withLayout';
import Shop from '@containers/shop';
import styled from '@emotion/styled';
import { Search } from '@ui/input';
import { useState } from 'react';
import { ShopPageWrapper } from './shop';

export function SalePage() {
  const [keyword, setKeyword] = useState<string>('');

  return (
    <ShopPageWrapper className="pt-28 pb-24">
      <div className="container">
        <Search
          placeholder="Search products"
          size="large"
          allowClear={true}
          bordercolor={'#fff'}
          borderradius={'3px'}
          className="mx-4 search-desktop"
          onSearch={(value) => {
            setKeyword(value);
          }}
        />
        <div className="">
          <HeadingSection title="Sale Products" />
          <Shop keyword={keyword} salePage={true} />
        </div>
      </div>
    </ShopPageWrapper>
  );
}

SalePage.getInitialProps = async () => {
  return null;
};

export default withLayout(SalePage);
