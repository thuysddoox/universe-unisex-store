import { useGetUsers } from '@api/api';
import TableUser from '@components/Table/TableUser';
import UserCard from '@components/UserCard';
import { QueryParam } from '@constants/enum';
import messages from '@constants/messages';
import styled from '@emotion/styled';
import { BaseListRequest, User } from '@interfaces/common';
import Button from '@ui/button';
import { Search } from '@ui/input';
import { Message } from '@ui/message';
import { Modal, confirm } from '@ui/modal';
import { Grid } from 'antd';
import { useEffect, useState, useContext } from 'react';
import { useDeleteUser, useAddUser, useUpdateUser } from '../../../network/queries/user';
import SignupPopup from '@components/Form/Signup';
import { UserContext } from '../../../contexts/userContext';
import { Ellipsis } from '@ui/ellipsis';
const { useBreakpoint } = Grid;
const ManageUsers = () => {
  const screens = useBreakpoint();
  const [queries, setQueries] = useState<BaseListRequest>(QueryParam);
  const [selectedUser, setSelectedUser] = useState<User>();
  const { currentUser } = useContext(UserContext);
  const [openModal, setIsOpenModal] = useState<boolean>(false);
  const [isAddForm, setIsAddForm] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { data: usersResp, refetch, isFetching } = useGetUsers();
  const { mutate: deleteUserFunc } = useDeleteUser({
    onSuccess: (response) => {
      const error = response?.data?.error;
      if (response?.status === 200) {
        Message.success(messages.disabledUserSuccess);
        refetch();
      } else if (error) {
        Message.error(error?.message);
      }
    },
    onError: (error) => {
      Message.error(error?.response?.data?.message ?? error.message);
    },
  });
  const { mutate: addUserFunc } = useAddUser({
    onSuccess: (response) => {
      const error = response?.data?.error;
      if (response?.status === 201 || response?.data?.responseData) {
        Message.success(messages.addUserSuccess);
        refetch();
      } else if (error) {
        Message.error(error?.message);
      }
    },
    onError: (error) => {
      Message.error(error?.response?.data?.message ?? error.message);
    },
  });

  const handleDeleteUser = (user: User) => {
    confirm({
      title: 'Confirm',
      content: 'Do you want to delete this user?',
      onOk: () => {
        deleteUserFunc(user?._id);
      },
    });
  };
  const handleChangePageIndex = (page: number, pageSize: number) => {
    setQueries((prev) => ({ ...prev, pageIndex: page }));
  };
  const handleOpenModal = () => {
    setIsOpenModal(!openModal);
  };
  const handleOpenDetail = (record: User) => {
    handleOpenModal();
    setSelectedUser(record);
  };
  const handleOpenEdit = (record: User) => {
    handleOpenModal();
    setSelectedUser(record);
    setIsEdit(!isEdit);
  };
  const handleAddUser = (user: User) => {
    addUserFunc(user);
    setIsOpenModal(!openModal);
  };
  useEffect(() => {
    refetch();
  }, [...Object.values(queries)]);
  return (
    <MangageUsersWrapper>
      <div className="flex items-center justify-between mb-5">
        <Ellipsis title={currentUser?.role != 2 ? 'You dont allow to do that' : 'Add Staff For Store'}>
          <Button
            borderradius={'3px'}
            size="small"
            borderless={true}
            bgColor="rgba(16, 185, 129,1)"
            textcolor="#fff"
            className="font-medium my-3"
            bordercolor={'rgba(16, 185, 129,1)'}
            lineheight="30px"
            disabled={currentUser?.role != 2}
            onClick={() => {
              handleOpenModal();
              setIsAddForm(!isAddForm);
            }}
          >
            Add +
          </Button>
        </Ellipsis>

        <Search
          placeholder="Search..."
          size="large"
          allowClear={true}
          bordercolor={'#fff'}
          borderradius={'3px'}
          // className="mx-4 search-desktop"
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
        handleOpenEdit={handleOpenEdit}
        handleOpenDetail={handleOpenDetail}
      />
      <Modal
        centered
        closable
        title={isAddForm ? 'Add Staff' : 'Review detail'}
        open={openModal}
        footer={null}
        // onOk={handleOpenProductForm}
        onCancel={handleOpenModal}
        className="my-10"
        width={screens.xs ? '90vw' : screens.md ? '60vw' : screens.lg ? '55vw' : '50vw'}
        bodyStyle={{
          background: '#ffffff',
          margin: '0',
        }}
      >
        <div className="w-full h-full">
          {isAddForm || isEdit ? (
            <SignupPopup data={selectedUser} isAddUser={isAddForm} isEdit={isEdit} addUserFunc={handleAddUser} />
          ) : (
            <UserCard user={selectedUser} />
          )}
        </div>
      </Modal>
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
