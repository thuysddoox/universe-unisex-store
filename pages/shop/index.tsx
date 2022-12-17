import Advertisement from '@components/Advertisement';
import HeadingSection from '@components/HeadingSection';
import ShopByCategory from '@components/ShopByCategory';
import withLayout from '@containers/layout/withLayout';
import Shop from '@containers/shop';
import styled from '@emotion/styled';
import { Search } from '@ui/input';
import { getCategories } from '../../src/network/services/product';
import { Category } from '../../src/interfaces/common';
import { useState } from 'react';

export function ShopPage({ categories }: { categories?: Category[] }) {
  const [keyword, setKeyword] = useState<string>('');
  return (
    <ShopPageWrapper className="pt-32 pb-24">
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
        {/* <div className="mt-8 mb-24">
          <HeadingSection title="Shop Sale" />
          <Advertisement bannersList={[]} />
        </div> */}
        <ShopByCategory categories={categories} />
        <div className="pt-8">
          <HeadingSection title="Shop Now" />
          <Shop keyword={keyword} />
        </div>
      </div>
    </ShopPageWrapper>
  );
}

ShopPage.getInitialProps = async () => {
  const categoryResp = await getCategories();
  return {
    categories: categoryResp?.data?.responseData ?? [],
  };
};

export const ShopPageWrapper = styled.div`
  .ant-btn:hover,
  .ant-btn:focus,
  .ant-btn:active {
    background: var(--navy) !important;
  }
  .ant-input-wrapper {
    margin: auto 0 auto auto;
    width: 500px;
    max-width: 100%;
    background: #d5e0e6;
    .ant-input,
    .ant-input-affix-wrapper {
      border: 0 !important;
      background: transparent;
      padding: 0 5px;
    }
    .ant-input-affix-wrapper-lg,
    .ant-input-affix-wrapper-focused {
      line-height: 32px !important;
      padding: 4px 6px;
      font-size: 16px !important;
      box-shadow: none !important;
    }
    .ant-input-group-addon {
      background: var(--navy);
      .ant-input-search-button {
        color: #fff !important;
        border: 0;
      }
    }
  }
`;

export default withLayout(ShopPage);
