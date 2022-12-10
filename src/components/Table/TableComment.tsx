import { SearchOutlined } from '@ant-design/icons';
import { Comment } from '@interfaces/common';
import { Ellipsis } from '@ui/ellipsis';
import { Button, Image, Input, InputRef, Space, Table } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import dayjs from 'dayjs';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsReply } from 'react-icons/bs';
import { MdVisibility } from 'react-icons/md';
import { RiDeleteBackLine } from 'react-icons/ri';
import { TableProps } from './TableProduct';

type DataIndex = keyof Comment;

const TableComment = ({ data, total, pageSize, loading, handleChangePageIndex }: TableProps) => {
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
    (dataIndex: DataIndex): ColumnType<Comment> => ({
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

  const columns: ColumnsType<Comment> = useMemo(
    () => [
      {
        title: 'ID',
        dataIndex: '_id',
        key: 'id',
        width: '4%',
        className: 'min-w-[40px]',
        render: (value, record, index) => <>{index + 1}</>,
      },

      {
        title: 'Images',
        dataIndex: 'images',
        key: 'images',
        width: '10%',
        className: 'min-w-[130px]',
        render: (value, record) => (
          <Image
            preview={false}
            width={'100%'}
            className="max-h-[100px] object-contain mx-auto"
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        ),
      },
      {
        title: 'Username',
        dataIndex: 'user',
        key: 'user',
        width: '15%',
        className: 'min-w-[150px]',
        ...getColumnSearchProps('user'),
        sorter: (a, b) => a.user.username.localeCompare(b.user.username),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Product Name',
        dataIndex: 'product',
        key: 'product',
        width: '17%',
        className: 'min-w-[180px]',
        ...getColumnSearchProps('product'),
        sorter: (a, b) => a.product.name.localeCompare(b.product.name),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Rate',
        dataIndex: 'rate',
        key: 'rate',
        width: '10%',
        className: 'min-w-[150px]',
      },
      {
        title: 'Content',
        dataIndex: 'content',
        key: 'content',
        width: '20%',
        className: 'min-w-[220px]',
      },
      {
        title: 'Published Date',
        dataIndex: 'publishedAt',
        key: 'publishedAt',
        width: '12%',
        className: 'min-w-[150px]',
        render: (value) => <span>{dayjs(value).format('DD MMM YYYY')}</span>,
      },
      {
        title: 'Actions',
        dataIndex: 'actions',
        key: 'actions',
        className: 'min-w-[150px]',
        render: () => (
          <div className="flex items-center">
            <Ellipsis placement="top" title="Delete" className=" mr-1 cursor-pointer">
              <AiOutlineDelete className="text-lg" />
            </Ellipsis>
            <Ellipsis placement="top" title="Hidden" className=" mr-1 cursor-pointer">
              <RiDeleteBackLine className="text-lg" />
            </Ellipsis>
            <Ellipsis placement="top" title="Reply" className=" mr-1 cursor-pointer">
              <BsReply className="text-lg" />
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

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={{ pageSize: pageSize ?? 5, total: total ?? data.length, onChange: handleChangePageIndex }}
    />
  );
};

export default React.memo(TableComment);
