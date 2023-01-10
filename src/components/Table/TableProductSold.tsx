import { SearchOutlined } from '@ant-design/icons';
import { OrderItem, Product } from '@interfaces/common';
import { truncate } from '@utils';
import { Button, Image, Input, InputRef, Space, Table } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import dayjs from 'dayjs';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { TableProps } from './TableProduct';

type DataIndex = keyof OrderItem;

const TableProductSold = ({ data, total, pageSize, loading, handleChangePageIndex }: TableProps) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = useCallback(
    (dataIndex: DataIndex): ColumnType<OrderItem> => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({ closeDropdown: false });
                setSearchText((selectedKeys as string[])[0]);
                setSearchedColumn(dataIndex);
              }}
            >
              Filter
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) =>
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes((value as string).toLowerCase()),
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
    }),
    [],
  );

  const columns: ColumnsType<OrderItem> = useMemo(
    () => [
      {
        title: 'ID',
        dataIndex: 'productId',
        key: 'productId',
        width: '4%',
        className: 'min-w-[40px]',
        render: (value, record, index) => <>{index + 1}</>,
      },
      {
        title: 'Image',
        dataIndex: 'thumbnails',
        key: 'image',
        width: '15%',
        className: 'min-w-[130px]',
        render: (value, record) => (
          <Image preview={false} width={'100%'} className="max-h-[60px] object-contain mx-auto" src={value?.[0]} />
        ),
      },
      {
        title: 'Name',
        dataIndex: 'productName',
        key: 'productName',
        width: '20%',
        className: 'min-w-[180px]',
        ...getColumnSearchProps('productName'),
        sorter: (a, b) => a.productName.localeCompare(b.productName),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        width: '20%',
        className: 'min-w-[150px]',
        sorter: (a, b) => a.price - b.price,
        sortDirections: ['descend', 'ascend'],
        render: (value, record) => <span>{value.toLocaleString()} vnđ</span>,
      },
      {
        title: 'Color',
        dataIndex: 'color',
        key: 'color',
        width: '10%',
        className: 'max-w-[120px]',
        render: (value) => <span className="capitalize">{value} </span>,
      },
      {
        title: 'Size',
        dataIndex: 'size',
        key: 'size',
        width: '10%',
        className: 'max-w-[120px]',
        render: (value) => <span className="uppercase">{value} </span>,
      },
      {
        title: 'Sold',
        dataIndex: 'quantity',
        key: 'quantity',
        width: '15%',
        className: 'min-w-[120px]',
        sorter: (a, b) => a?.quantity - b?.quantity,
        sortDirections: ['descend', 'ascend'],
      },
    ],
    [data],
  );

  return (
    <Table
      className="mb-5"
      columns={columns}
      dataSource={data}
      loading={loading}
      title={() => <h3 className="font-medium text-base">Products Sold</h3>}
      pagination={{ pageSize: pageSize ?? 5, total: total ?? data?.length, onChange: handleChangePageIndex }}
    />
  );
};

export default React.memo(TableProductSold);
