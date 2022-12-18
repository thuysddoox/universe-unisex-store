import { SearchOutlined } from '@ant-design/icons';
import { Product, SafeAny } from '@interfaces/common';
import { Ellipsis } from '@ui/ellipsis';
import { truncate } from '@utils';
import { Button, Image, Input, InputRef, Space, Table } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import dayjs from 'dayjs';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { AiFillStar, AiOutlineDelete, AiOutlineEdit, AiOutlineEyeInvisible } from 'react-icons/ai';

type DataIndex = keyof Product;

export interface TableProps {
  handleOpenEdit?: (product?: SafeAny) => void;
  handleDelete?: (product?: SafeAny) => void;
  handleSave?: (product?: SafeAny, resetFunc?: SafeAny) => void;
  handleOpenDetail?: (product?: SafeAny) => void;
  data: SafeAny[];
  total?: number;
  pageSize?: number;
  loading?: boolean;
  name?: string;
  handleChangePageIndex?: (page: number, pageSize: number) => void;
}
const TableProduct = ({
  handleOpenEdit,
  handleDelete,
  data,
  total,
  pageSize,
  loading,
  handleChangePageIndex,
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
    (dataIndex: DataIndex): ColumnType<Product> => ({
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

  const columns: ColumnsType<Product> = useMemo(
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
        title: 'Image',
        dataIndex: 'thumbnails',
        key: 'image',
        width: '10%',
        className: 'min-w-[130px]',
        render: (value, record) => (
          <Image preview={false} width={'100%'} className="max-h-[60px] object-contain mx-auto" src={value?.[0]} />
        ),
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '17%',
        className: 'min-w-[180px]',
        ...getColumnSearchProps('name'),
        sorter: (a, b) => a.name.localeCompare(b.name),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        width: '20%',
        className: 'max-w-[210px]',
        render: (value) => (
          <div
            className="truncate whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: truncate(value, 200) }}
          ></div>
        ),
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        width: '10%',
        className: 'min-w-[120px]',
        sorter: (a, b) => a.price - b.price,
        sortDirections: ['descend', 'ascend'],
        render: (value, record) => <span>${value}</span>,
      },
      {
        title: 'Stock',
        dataIndex: 'stock',
        key: 'stock',
        width: '10%',
        className: 'min-w-[100px]',
      },
      {
        title: 'Discount',
        dataIndex: 'discount',
        key: 'discount',
        width: '5%',
        className: 'min-w-[100px]',
        render: (value, record) => <span>{value}%</span>,
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
        render: (value, record) => (
          <div className="flex items-center">
            <Ellipsis placement="top" title="Edit" className=" mr-1 cursor-pointer">
              <AiOutlineEdit className="text-lg" onClick={() => handleOpenEdit(record)} />
            </Ellipsis>
            <Ellipsis placement="top" title="Delete" className=" mr-1 cursor-pointer">
              <AiOutlineDelete className="text-lg" onClick={() => handleDelete(record)} />
            </Ellipsis>
            <Ellipsis placement="top" title="Hidden" className=" mr-1 cursor-pointer">
              <AiOutlineEyeInvisible className="text-lg" />
            </Ellipsis>
            <Ellipsis placement="top" title="Hot" className=" mr-1 cursor-pointer">
              <AiFillStar className="text-lg" />
            </Ellipsis>

            {/* <MdVisibility /> */}
          </div>
        ),
      },
    ],
    [data],
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

export default React.memo(TableProduct);
