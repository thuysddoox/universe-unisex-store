import { SearchOutlined } from '@ant-design/icons';
import { Category } from '@interfaces/common';
import { Button, Image, Input, InputRef, Space, Table } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { AiOutlineSave } from 'react-icons/ai';
import { TableProps } from './TableProduct';
import ButtonIcon from '@ui/button';
import { Upload } from '@ui/upload';
import UploadSingle from '@components/UploadSingle';
import { Ellipsis } from '@ui/ellipsis';

type DataIndex = keyof Category;

const TableCategory = ({ data, loading, handleSave }: TableProps) => {
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
    (dataIndex: DataIndex): ColumnType<Category> => ({
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

  const columns: ColumnsType<Category> = useMemo(
    () => [
      {
        title: 'ID',
        dataIndex: '_id',
        key: 'id',
        width: '5%',
        className: 'min-w-[40px]',
        render: (value, record, index) => <>{index + 1}</>,
      },
      {
        title: 'Thumbnail',
        dataIndex: 'thumbnail',
        key: 'thumbnail',
        className: 'min-w-[100px] min-h-[100px]',
        render: (value, record) => (
          <Ellipsis title={'Upload Image'}>
            <UploadSingle id={record?._id} handleSave={handleSave} imgUrl={value} />
          </Ellipsis>
        ),
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '25%',
        className: 'min-w-[220px]',
        ...getColumnSearchProps('name'),
        sorter: (a, b) => a.name.localeCompare(b.name),
        sortDirections: ['descend', 'ascend'],
      },
      // {
      //   title: 'Stock',
      //   dataIndex: 'stock',
      //   key: 'stock',
      //   width: '15%',
      //   className: 'min-w-[150px]',
      //   sorter: (a, b) => a.stock - b.stock,
      //   sortDirections: ['descend', 'ascend'],
      // },
      {
        title: 'Sold',
        dataIndex: 'sold',
        key: 'sold',
        width: '15%',
        className: 'min-w-[150px]',
        sorter: (a, b) => a.sold - b.sold,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Total',
        dataIndex: 'total',
        key: 'total',
        width: '20%',
        className: 'min-w-[200px]',
        sorter: (a, b) => a.total - b.total,
        sortDirections: ['descend', 'ascend'],
        render: (value, _) => <span>{value?.toLocaleString()} vnđ</span>,
      },
    ],
    [],
  );

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={false}
      className="shadow bg-white"
      title={() => <h3 className="font-medium text-base">All Categories</h3>}
    />
  );
};

export default React.memo(TableCategory);
