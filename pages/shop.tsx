import Advertisement from '@components/Advertisement';
import HeadingSection from '@components/HeadingSection';
import ShopByCategory from '@components/ShopByCategory';
import withLayout from '@containers/layout/withLayout';
import Shop from '@containers/shop';
import styled from '@emotion/styled';
import { Search } from '@ui/input';

export function ShopPage() {
  return (
    <ShopPageWrapper className="pt-32 pb-24">
      <div className='container'>
        <Search
          placeholder="Search products"
          size="large"
          allowClear={true}
          bordercolor={'#fff'}
          borderradius={'3px'}
          className="mx-4 search-desktop"
          onSearch={() => {}}
        />
        <div className='mt-8 mb-24'>
          <HeadingSection title='Shop Sale' />
          <Advertisement bannersList={[]}/>
        </div>
        <ShopByCategory />
        <div className='pt-8'>
          <HeadingSection title='Shop Now' />
          <Shop />
        </div>  
      </div>
    </ShopPageWrapper>
  );
}

ShopPage.getInitialProps = () => {
};

const ShopPageWrapper = styled.div`
.ant-input-wrapper{
  margin: auto 0 auto auto;
  width: 500px;
  max-width: 100%;
  background: #d5e0e6;
  .ant-input,.ant-input-affix-wrapper{
    border: 0!important;
    background: transparent;
    padding: 0 5px; 
  }
  .ant-input-affix-wrapper-lg,.ant-input-affix-wrapper-focused{
    line-height: 32px!important;
    padding: 4px 6px;
    font-size: 16px!important;
    box-shadow: none!important;
  }
  .ant-input-group-addon{
    background: var(--navy);
    .ant-input-search-button{
      color: #fff!important;
      border: 0;
    }
  }
}

`;

export default withLayout(ShopPage);
