import { SearchOutlined } from '@ant-design/icons';
import { User } from '@interfaces/common';
import { Ellipsis } from '@ui/ellipsis';
import { Button, Image, Input, InputRef, Space, Table } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import dayjs from 'dayjs';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { FaUserTimes } from 'react-icons/fa';
import { MdVisibility } from 'react-icons/md';
import { RiFileUserLine } from 'react-icons/ri';
import { TableProps } from './TableProduct';
import { ROLE } from '@constants/enum';
import { useContext } from 'react';
import { UserContext } from '../../contexts/userContext';
import { AiOutlineEdit } from 'react-icons/ai';

type DataIndex = keyof User;

const TableUser = ({
  handleOpenEdit,
  handleDelete,
  data,
  total,
  pageSize,
  loading,
  handleOpenDetail,
  handleChangePageIndex,
}: TableProps) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const { currentUser } = useContext(UserContext);
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
    (dataIndex: DataIndex): ColumnType<User> => ({
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

  const columns: ColumnsType<User> = useMemo(
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
        dataIndex: 'avatar',
        key: 'avatar',
        width: '10%',
        className: 'min-w-[130px]',
        render: (value, record) =>
          value ? (
            <Image preview={false} width={'100%'} className="max-h-[100px] object-contain mx-auto" src={value} />
          ) : (
            <RiFileUserLine className="text-3xl text-center" />
          ),
      },
      {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        width: '15%',
        className: 'min-w-[180px]',
        ...getColumnSearchProps('username'),
        sorter: (a, b) => a.username.localeCompare(b.username),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        width: '17%',
        className: 'min-w-[180px]',
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
        width: '15%',
        className: 'min-w-[120px]',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        width: '22%',
        className: 'min-w-[210px]',
      },
      {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        width: '10%',
        className: 'min-w-[100px]',
        render: (value) => <span>{ROLE[value - 1]}</span>,
      },
      {
        title: 'Date of Birth',
        dataIndex: 'dob',
        key: 'dob',
        width: '12%',
        className: 'min-w-[150px]',
        render: (value) => <span>{dayjs(value).format('DD MMM YYYY')}</span>,
      },
      {
        title: 'Actions',
        dataIndex: 'actions',
        key: 'actions',
        className: 'min-w-[100px]',
        render: (values, record) => (
          <div className="flex items-center">
            {currentUser?.role === 2 && (
              <>
                <Ellipsis placement="top" title="Disable" className=" mr-1 cursor-pointer">
                  <FaUserTimes className="text-lg" onClick={() => handleDelete(record)} />
                </Ellipsis>
                {record?.role === 3 && (
                  <Ellipsis placement="top" title="Edit Staff" className=" mr-1 cursor-pointer">
                    <AiOutlineEdit className="text-lg" onClick={() => handleOpenEdit(record)} />
                  </Ellipsis>
                )}
              </>
            )}
            <Ellipsis placement="top" title="Detail" className=" mr-1 cursor-pointer">
              <MdVisibility className="text-lg" onClick={() => handleOpenDetail(record)} />
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
      pagination={{ pageSize: pageSize ?? 10, total: total ?? data.length, onChange: handleChangePageIndex }}
    />
  );
};

export default React.memo(TableUser);
