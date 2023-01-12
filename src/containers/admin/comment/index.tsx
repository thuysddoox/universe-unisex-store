import { useReplyComment, useUpdateOrder } from '@api/api';
import TableComment from '@components/Table/TableComment';
import { QueryParam } from '@constants/enum';
import messages from '@constants/messages';
import { BaseListRequest, Comment, Order } from '@interfaces';
import { Message } from '@ui/message';
import { confirm, Modal } from '@ui/modal';
import { Grid } from 'antd';
import { useState, useContext } from 'react';
import { useComments, useDeleteComment } from '../../../network/queries/comment';
import ReviewComponent from '../../../components/Review/ReviewComponent';
import Button from '@ui/button';
import { UserContext } from '../../../contexts/userContext';
import dynamic from 'next/dynamic';
const Editor = dynamic(() => import('@components/Editor'), { ssr: false });
const { useBreakpoint } = Grid;
const ManageComment = () => {
  const screens = useBreakpoint();
  const { currentUser } = useContext(UserContext);
  const [queries, setQueries] = useState<BaseListRequest>(QueryParam);
  const [openModal, setIsOpenModal] = useState<boolean>(false);
  const [selectedComment, setSelectedComment] = useState<Comment>();
  const [response, setResponse] = useState<string>('');
  const { data: commentsResp, refetch, isFetching } = useComments(queries);
  const { mutate: replyCommentFunc, isLoading } = useReplyComment({
    onSuccess: (response) => {
      const error = response?.data?.error;
      if (response?.status === 201) {
        Message.success(messages.replyCommentSuccess);
        setIsOpenModal(!openModal);
        refetch();
      } else if (error) {
        Message.error(error?.message);
      }
    },
    onError: (error) => {
      Message.error(error?.response?.data?.message ?? error.message);
    },
  });
  const { mutate: deleteCommentFunc } = useDeleteComment({
    onSuccess: (response) => {
      const error = response?.data?.error;
      if (response?.status === 200) {
        Message.success(messages.deleteCommentSuccess);
        refetch();
      } else if (error) {
        Message.error(error?.message);
      }
    },
    onError: (error) => {
      Message.error(error?.response?.data?.message ?? error.message);
    },
  });
  const handleChangePageIndex = (page: number, pageSize: number) => {
    setQueries((prev) => ({ ...prev, pageIndex: page }));
  };
  const handleOpenModal = (selectedComment: Comment) => {
    setIsOpenModal(!openModal);
    setSelectedComment(selectedComment);
  };
  const handleReply = () => {
    replyCommentFunc({ commentId: selectedComment?._id, replyComment: { owner: currentUser?._id, content: response } });
    setResponse('');
  };
  const handleDeleteReview = (comment: Comment) => {
    confirm({
      title: 'Confirm',
      content: 'Do you want to hiden this review?',
      onOk: () => {
        deleteCommentFunc(comment?._id);
      },
    });
  };

  return (
    <>
      <TableComment
        data={commentsResp?.data?.responseData ?? []}
        total={commentsResp?.data?.total}
        pageSize={queries.pageSize}
        handleChangePageIndex={handleChangePageIndex}
        loading={isFetching}
        handleOpenEdit={handleOpenModal}
        handleDelete={handleDeleteReview}
      />
      <Modal
        centered
        closable
        title={'Review detail'}
        open={openModal}
        footer={
          <>
            <Button className="font-semibold mr-4" block size="large" type="primary" loading={isLoading}>
              <span onClick={handleReply}>Reply</span>
            </Button>
            <Button
              className="font-semibold"
              bordercolor="var(--navy)"
              block
              size="large"
              onClick={() => setIsOpenModal(!openModal)}
            >
              Cancel
            </Button>
          </>
        }
        // onOk={handleOpenProductForm}
        onCancel={() => setIsOpenModal(!openModal)}
        className="my-10"
        width={screens.xs ? '90vw' : screens.md ? '80vw' : screens.lg ? '70vw' : '60vw'}
        bodyStyle={{
          background: '#ffffff',
          margin: '0',
        }}
      >
        <div className="w-full h-full">
          <ReviewComponent comment={selectedComment} />
          <div className="mb-8">
            <p className="font-medium my-4">Response Review:</p>
            <Editor value={response} onChange={setResponse} />
            <div></div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ManageComment;
