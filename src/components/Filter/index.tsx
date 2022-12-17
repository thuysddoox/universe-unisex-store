import { Colors } from '@constants/enum';
import styled from '@emotion/styled';
import FilterComponent from './FilterComponent';
import { BaseListRequest, SafeAny } from '../../interfaces/common';
const Categories = ['T-shirt', 'Shirt', 'Short', 'Hoodie/Sweater', 'Jeans/Pants', 'Accessories', 'Jacket'];
const Price = ['Under 20$', '20$ to 40$', '40$ to 60$', '60$ to 100$', '100$ & above'];
const Size = ['All', 'S', 'M', 'L', 'XL'];
const Filter = ({
  hasCategory = true,
  setFilter,
  filterValue,
}: {
  hasCategory?: boolean;
  setFilter?: React.Dispatch<SafeAny>;
  filterValue?: SafeAny;
}) => {
  const filterList = [
    ...(hasCategory
      ? [
          {
            type: 'checkbox',
            name: 'category',
            label: 'Category',
            options: Categories.map((category) => ({ label: category, value: category })),
          },
        ]
      : []),
    {
      type: 'radio',
      name: 'price',
      label: 'Price',
      options: Price.map((item, index) => ({ label: item, value: index + 1 })),
    },
    { type: 'select', name: 'size', label: 'Size', options: Size.map((item) => ({ label: item, value: item })) },
    {
      type: 'select',
      name: 'color',
      label: 'Color',
      options: ['All', ...Colors].map((item) => ({ label: item, value: item })),
    },
  ];
  const handleUpdateQueries = (name, value) => {
    setFilter((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <FilterWrapper>
      {filterList.map((filter, id) => (
        // <Row key={id}>
        <FilterComponent filter={filterValue} name={filter?.name} onChange={handleUpdateQueries} {...filter} key={id} />
        // </Row>
      ))}
    </FilterWrapper>
  );
};
const FilterWrapper = styled.div`
  .ant-select {
    width: 100% !important;
    margin: 1rem 0 2rem 0;
  }
`;
export default Filter;
