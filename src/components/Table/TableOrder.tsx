import { SearchOutlined } from '@ant-design/icons';
import { Order } from '@interfaces/common';
import { Ellipsis } from '@ui/ellipsis';
import { Image, InputRef } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import dayjs from 'dayjs';
import React, { useRef, useState, useCallback, useMemo } from 'react';
import Highlighter from 'react-highlight-words';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEyeInvisible } from 'react-icons/ai';
import { MdVisibility } from 'react-icons/md';
import { TbDiscount2 } from 'react-icons/tb';

type DataIndex = keyof Order;

const data: Order[] = [
  {
    id: '1',
    fullname: 'John Brown',
    createdAt: '2022-10-22',
  },
  {
    id: '2',
    createdAt: '2022-10-22',
    fullname: 'Joe Black',
  },
  {
    id: '3',
    fullname: 'Jim Green',
    createdAt: '2022-10-22',
  },
  {
    id: '4',
    fullname: 'Jim Red',
    createdAt: '2022-10-22',
  },
  {
    id: '5',
    fullname: 'Jim Green',
    createdAt: '2022-10-22',
  },
  {
    id: '6',
    fullname: 'Jim Red',
    createdAt: '2022-10-22',
  },
  {
    id: '7',
    fullname: 'Jim Green',
    createdAt: '2022-10-22',
  },
  {
    id: '8',
    fullname: 'Jim Red',
    createdAt: '2022-10-22',
  },
];
const TableOrder = () => {
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
    (dataIndex: DataIndex): ColumnType<Order> => ({
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

  const columns: ColumnsType<Order> = useMemo(
    () => [
      {
        title: 'OrderID',
        dataIndex: 'id',
        key: 'id',
        width: '4%',
        className: 'min-w-[40px]',
      },
      {
        title: 'Full Name',
        dataIndex: 'fullname',
        key: 'fullname',
        width: '15%',
        className: 'min-w-[150px]',
        ...getColumnSearchProps('fullname'),
        sorter: (a, b) => a.fullname.localeCompare(b.fullname),
        sortDirections: ['descend', 'ascend'],
      },

      {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
        width: '15%',
        className: 'min-w-[180px]',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        width: '20%',
        className: 'min-w-[210px]',
      },
      {
        title: 'Total',
        dataIndex: 'total',
        key: 'total',
        width: '15%',
        className: 'min-w-[120px]',
      },
      {
        title: 'Created Date',
        dataIndex: 'createAt',
        key: 'createAt',
        width: '12%',
        className: 'min-w-[150px]',
        render: (value) => <span>{dayjs(value).format('DD MMM YYYY')}</span>,
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        width: '12%',
        className: 'min-w-[150px]',
      },
      {
        title: 'Actions',
        dataIndex: 'actions',
        key: 'actions',
        className: 'min-w-[150px]',
        render: () => (
          <div className="flex items-center">
            <Ellipsis placement="top" title="Edit" className=" mr-1 cursor-pointer">
              <AiOutlineEdit className="text-lg" />
            </Ellipsis>
            <Ellipsis placement="top" title="Detail" className=" mr-1 cursor-pointer">
              <MdVisibility className="text-lg" />
            </Ellipsis>
            {/* <AiOutlineEyeInvisible /> */}
          </div>
        ),
      },
    ],
    [],
  );

  return <Table columns={columns} dataSource={data} pagination={{ pageSize: 1, total: 100 }} />;
};

export default React.memo(TableOrder);
