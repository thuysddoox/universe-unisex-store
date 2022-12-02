import { useGetUsers } from '@api/api';
import TableUser from '@components/Table/TableUser';
import { QueryParam } from '@constants/enum';
import styled from '@emotion/styled';
import { BaseListRequest, User } from '@interfaces/common';
import Button from '@ui/button';
import { Search } from '@ui/input';
import { confirm } from '@ui/modal';
import { useState, useEffect } from 'react';
const ManageUsers = () => {
  const [queries, setQueries] = useState<BaseListRequest>(QueryParam);
  const { data: usersResp, refetch, isFetching } = useGetUsers();
  const handleDeleteUser = (user: User) => {
    confirm({
      title: 'Confirm',
      content: 'Do you want to delete this user?',
      onOk: () => {
        // delUser(product._id);
      },
    });
  };
  const handleChangePageIndex = (page: number, pageSize: number) => {
    setQueries((prev) => ({ ...prev, pageIndex: page }));
  };
  useEffect(() => {
    refetch();
  }, [...Object.values(queries)]);
  return (
    <MangageUsersWrapper>
      <div className="flex items-center justify-between">
        <Button
          borderradius={'3px'}
          size="small"
          borderless={true}
          bgColor="rgba(16, 185, 129,1)"
          textcolor="#fff"
          className="font-medium my-3"
          bordercolor={'rgba(16, 185, 129,1)'}
          lineheight="30px"
        >
          Add +
        </Button>
        <Search
          placeholder="Search..."
          size="large"
          allowClear={true}
          bordercolor={'#fff'}
          borderradius={'3px'}
          className="mx-4 search-desktop"
          onSearch={() => {}}
        />
      </div>
      <TableUser
        data={usersResp?.data.responseData ?? []}
        total={usersResp?.data?.total}
        pageSize={queries.pageSize}
        handleChangePageIndex={handleChangePageIndex}
        loading={isFetching}
        handleDelete={handleDeleteUser}
      />
    </MangageUsersWrapper>
  );
};
const MangageUsersWrapper = styled.div`
  .ant-input-wrapper {
    margin: auto 0 auto auto;
    width: 300px;
    max-width: 100%;
    background: #d5e0e6;
    .ant-input,
    .ant-input-affix-wrapper {
      border: 0 !important;
      background: transparent;
      padding: 0 5px;
    }
    .ant-input-affix-wrapper-lg,
    .ant-input-affix-wrapper-focused {
      line-height: 32px !important;
      padding: 4px 6px;
      font-size: 16px !important;
      box-shadow: none !important;
    }
    .ant-input-group-addon {
      background: var(--navy);
      .ant-input-search-button {
        color: #fff !important;
        border: 0;
      }
    }
  }
`;
export default ManageUsers;
