import HeadingSection from '@components/HeadingSection';
import ProductsList from '@components/ProductsList';
import styled from '@emotion/styled';
import { Tabs } from '@ui/tabs';
import { SafeAny } from '../../interfaces/common';
import { useNewProducts } from '../../network/queries/product';
import { useMemo } from 'react';
const Categories = ['T-Shirt', 'Shirt', 'Hoodie/Sweater', 'Jacket', 'Jeans/Pants', 'Short'];
const NewCollection = ({ refetchCart }: { refetchCart?: SafeAny }) => {
  const { data: dataResp, refetch } = useNewProducts();
  const data = useMemo(() => dataResp?.data?.responseData, [dataResp]);
  return (
    <NewCollectionWrapper className="py-8">
      <HeadingSection title="New Collection" mode="center" />
      <Tabs
        defaultActiveKey="1"
        tabPosition={'top'}
        className="mx-auto my-8"
        items={data?.map((item, i) => {
          const id = String(i);
          return {
            label: <span className="font-medium text-base mx-1 sm:mx-2">{item?.name}</span>,
            key: id,
            disabled: i === 10,
            children: (
              <ProductsList
                refetchCart={refetchCart}
                refetch={refetch}
                data={item?.products ?? []}
                className="mt-5 justify-center"
              />
            ),
          };
        })}
      />
    </NewCollectionWrapper>
  );
};

const NewCollectionWrapper = styled.div`
  .ant-tabs-nav-wrap {
    justify-content: center;
  }
`;
export default NewCollection;
