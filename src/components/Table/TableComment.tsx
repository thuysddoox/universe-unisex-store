import { SearchOutlined } from '@ant-design/icons';
import { Comment } from '@interfaces/common';
import { Ellipsis } from '@ui/ellipsis';
import { truncate } from '@utils';
import { Button, Image, Input, InputRef, Space, Table } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import dayjs from 'dayjs';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsReply } from 'react-icons/bs';
import { MdVisibility } from 'react-icons/md';
import { RiDeleteBackLine, RiFileUserLine } from 'react-icons/ri';
import { TableProps } from './TableProduct';
import Link from 'next/link';
import { FcApproval } from 'react-icons/fc';

type DataIndex = keyof Comment;

const TableComment = ({
  data,
  total,
  pageSize,
  loading,
  handleChangePageIndex,
  handleOpenEdit,
  handleDelete,
}: TableProps) => {
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
        title: 'Avatar',
        dataIndex: 'owner',
        key: 'avatar',
        width: '8%',
        className: 'min-w-[80px]',
        render: (value, record) =>
          typeof record?.owner != 'string' && record?.owner?.avatar ? (
            <Image
              preview={false}
              width={'100%'}
              className="max-h-[100px] object-contain mx-auto"
              src={typeof record?.owner != 'string' ? record?.owner?.avatar : ''}
            />
          ) : (
            <RiFileUserLine className="text-3xl text-center" />
          ),
      },
      {
        title: 'Username',
        dataIndex: 'owner',
        key: 'username',
        width: '15%',
        className: 'min-w-[150px]',
        ...getColumnSearchProps('user'),
        sorter: (a, b) => a.username.localeCompare(b.username),
        sortDirections: ['descend', 'ascend'],
        render: (value) => <span>{value?.username ?? value?.fullName}</span>,
      },
      {
        title: 'Product',
        dataIndex: 'productId',
        key: 'product',
        width: '30%',
        className: 'min-w-[250px]',
        ...getColumnSearchProps('product'),
        // sorter: (a, b) => a?.product?.name.localeCompare(b?.product?.name),
        sortDirections: ['descend', 'ascend'],
        render: (values) => (
          <div className="flex items-center">
            <div className="w-1/3">
              <Image
                preview={false}
                width={'100%'}
                className="max-h-[100px] object-contain mx-auto"
                src={values?.thumbnails?.[0]}
              />
            </div>
            <div className="pl-2">
              <Link passHref href={`/product/${values?._id}`}>
                <a className="underline font-medium text-blue-500">{values?.name}</a>
              </Link>
              <p>Size: {values?.size}</p>
              <p>Color: {values?.color}</p>
            </div>
          </div>
        ),
      },
      {
        title: 'Rate',
        dataIndex: 'rate',
        key: 'rate',
        width: '8%',
        className: 'min-w-[100px]',
      },
      {
        title: 'Content',
        dataIndex: 'content',
        key: 'content',
        width: '20%',
        className: 'min-w-[220px]',
        render: (value) => <div dangerouslySetInnerHTML={{ __html: truncate(value, 200) }}></div>,
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
        className: 'min-w-[130px]',
        render: (value, record) => (
          <div className="flex items-center">
            <Ellipsis placement="top" title="Delete" className=" mr-1 cursor-pointer">
              <AiOutlineDelete className="text-lg" onClick={() => handleDelete(record)} />
            </Ellipsis>
            {/* <Ellipsis placement="top" title="Hidden" className=" mr-1 cursor-pointer">
              <RiDeleteBackLine className="text-lg" />
            </Ellipsis> */}
            {/* <Ellipsis placement="top" title="Reply" className=" mr-1 cursor-pointer">
              <BsReply className="text-lg" />
            </Ellipsis> */}
            <Ellipsis placement="top" title="Detail" className=" mr-1 cursor-pointer">
              <MdVisibility className="text-lg" onClick={() => handleOpenEdit(record)} />
            </Ellipsis>
            {record?.replyComments?.length > 0 && (
              <Ellipsis placement="top" title="Replied" className=" mr-1 cursor-pointer">
                <FcApproval className="text-lg" />
              </Ellipsis>
            )}

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
