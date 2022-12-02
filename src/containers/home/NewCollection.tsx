import HeadingSection from '@components/HeadingSection';
import ProductsList from '@components/ProductsList';
import styled from '@emotion/styled';
import { Tabs } from '@ui/tabs';
import { SafeAny } from '../../interfaces/common';
const Categories = ['T-Shirt', 'Shirt', 'Hoodie/Sweater', 'Jacket', 'Jeans/Pants', 'Short'];
const NewCollection = ({ data = [] }: { data?: SafeAny[] }) => {
  console.log(data);
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
            children: <ProductsList data={item?.products ?? []} className="mt-5 justify-center" />,
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
