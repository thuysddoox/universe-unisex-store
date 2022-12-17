import HeadingSection from '@components/HeadingSection';
import withLayout from '@containers/layout/withLayout';
import Shop from '@containers/shop';
import styled from '@emotion/styled';
import { Search } from '@ui/input';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { ShopPageWrapper } from './shop';

export function SearchPage() {
  const router = useRouter();
  const key = router.query?.keyword as string;
  const [keyword, setKeyword] = useState<string>(key);
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
          <div className="flex items-center">
            <HeadingSection title={`Search Result: `} />
            <span className=" ml-2 font-semibold text-lg sm:text-3xl text-blue-500">{keyword}</span>
          </div>
          <Shop keyword={keyword} setKeyword={setKeyword} />
        </div>
      </div>
    </ShopPageWrapper>
  );
}

SearchPage.getInitialProps = () => {
  return null;
};

export default withLayout(SearchPage);
