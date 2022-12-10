import { SearchOutlined } from '@ant-design/icons';
import { statusOrder } from '@constants/enum';
import { Order } from '@interfaces/common';
import { Dropdown } from '@ui/dropdown';
import { Ellipsis } from '@ui/ellipsis';
import { Select } from '@ui/select';
import { Button, Input, InputRef, Space, Table } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import dayjs from 'dayjs';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { AiFillSave, AiOutlineEdit } from 'react-icons/ai';
import { MdVisibility } from 'react-icons/md';
import { TableProps } from './TableProduct';
import { SafeAny } from '../../interfaces/common';

type DataIndex = keyof Order;

const TableOrder = ({
  data,
  total,
  pageSize,
  loading,
  handleChangePageIndex,
  handleOpenEdit,
  handleSave,
}: TableProps) => {
  const [searchText, setSearchText] = useState<string>('');
  const [searchedColumn, setSearchedColumn] = useState<string>('');
  const [rowEdit, setRowEdit] = useState<SafeAny>();
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
        dataIndex: '_id',
        key: 'id',
        width: '4%',
        className: 'min-w-[40px]',
        render: (value, record, index) => <>{index + 1}</>,
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
        editable: true,
        render: (value, record) => (
          <Select
            borderradius={'3px'}
            bordercolor={'var(--gray)'}
            options={statusOrder}
            defaultValue={value}
            disabled={record._id !== rowEdit?._id}
            onChange={(value) => setRowEdit((prev) => ({ ...prev, status: value }))}
          />
        ),
      },
      {
        title: 'Actions',
        dataIndex: 'actions',
        key: 'actions',
        className: 'min-w-[150px]',
        render: (value, record) => (
          <div className="flex items-center">
            <Ellipsis placement="top" title="Edit" className=" mr-1 cursor-pointer">
              <AiOutlineEdit className="text-lg" onClick={() => setRowEdit(record)} />
            </Ellipsis>
            {rowEdit?._id === record?._id && (
              <Ellipsis placement="top" title="Save" className=" mr-1 cursor-pointer">
                <AiFillSave className="text-lg" onClick={() => handleSave(rowEdit)} />
              </Ellipsis>
            )}
            <Ellipsis placement="top" title="Detail" className=" mr-1 cursor-pointer">
              <MdVisibility className="text-lg" onClick={() => handleOpenEdit(record)} />
            </Ellipsis>
          </div>
        ),
      },
    ],
    [rowEdit],
  );

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={{ pageSize: pageSize ?? 5, total: total ?? data.length, onChange: handleChangePageIndex }}
    />
  );
};

export default React.memo(TableOrder);
