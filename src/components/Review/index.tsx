import { useState, useMemo, useContext } from 'react';
import RateResult from './RateResult';
import ReviewComponent from './ReviewComponent';
import { BaseListRequest, Comment } from '../../interfaces/common';
import { useGetRateComments, useQueryCommentOfProduct } from '@api/api';
import NoResults from '../NoResults/index';
import Spin from '@ui/spin';
import { UserContext } from '../../contexts/userContext';
import _ from 'lodash';

const ReviewProduct = ({ productId }: { productId?: string }) => {
  const { currentUser } = useContext(UserContext);
  const [queries, setQueries] = useState<BaseListRequest>({ status: 1, pageSize: 6, pageIndex: 0 });
  const {
    data: commentsResp,
    fetchNextPage,
    hasNextPage,
    isFetching,
    refetch,
  } = useQueryCommentOfProduct(productId, queries);
  const comments: Comment[] = useMemo(
    () => commentsResp?.pages?.reduce((total, page) => [...total, ...(page?.data?.responseData ?? [])], []),
    [commentsResp],
  );
  const { data: rateOverviewResp } = useGetRateComments(productId);
  const rateList = useMemo(() => {
    const data = Array.from({ length: 5 }, (_, i) => ({ _id: i + 1, count: 0 }));
    return _.unionWith(rateOverviewResp?.data?.responseData, data, (a, b) => a._id === b._id).sort((a, b) =>
      a._id > b._id ? 1 : -1,
    );
  }, [rateOverviewResp]);
  return (
    <div className="px-12">
      {rateOverviewResp?.data?.total > 0 && (
        <RateResult
          total={rateOverviewResp?.data?.total}
          average={rateOverviewResp?.data?.average}
          rateList={rateList}
        />
      )}

      {comments?.length > 0
        ? comments?.map((comment) => <ReviewComponent comment={comment} key={comment?._id} />)
        : !isFetching && <NoResults description="No review yet." />}
      {isFetching && (
        <div className="text-center p-10">
          <Spin size="large" spinning={isFetching} />
        </div>
      )}
      {hasNextPage && (
        <span className="italic underline text-blue-500" onClick={() => fetchNextPage()}>
          See more...
        </span>
      )}
      {queries?.pageIndex > 0 && (
        <span
          className="italic underline text-blue-500"
          onClick={() => setQueries((prev) => ({ ...prev, pageIndex: 0 }))}
        >
          See less...
        </span>
      )}
    </div>
  );
};
export default ReviewProduct;
