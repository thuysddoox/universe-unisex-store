import { Colors } from '@constants/enum';
import styled from '@emotion/styled';
import FilterComponent from './FilterComponent';
import { BaseListRequest, SafeAny } from '../../interfaces/common';
const Categories = ['T-shirt', 'Shirt', 'Short', 'Hoodie/Sweater', 'Jeans/Pants', 'Accessories', 'Jacket'];
const Price = [
  'Under 300,000 vnđ',
  '300,000 vnđ to 500,000',
  '500,000 vnđ to 1,000,000 vnđ',
  '1,000,000 vnđ to 2,000,000 vnđ',
  'Above 2,000,000 vnđ',
];
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
