import { useGetRateComments } from '@api/api';
import styled from '@emotion/styled';
import { Progress } from '@ui/progress';
import { Col, Rate, Row } from 'antd';
import { SafeAny } from '../../interfaces/common';

const RateResult = ({ rateList, total, average }: { rateList?: SafeAny; total: number; average: number }) => {
  return (
    <RateResultWrap>
      <Row className="py-8 px-12">
        <Col span={12}>
          <div className="text-center">
            <h3 className="text-3xl font-semibold">{average}/5</h3>
            <Rate allowClear={true} defaultValue={4} allowHalf={true} className={'text-lg'} />
            <p className="mt-2">{total} Review</p>
          </div>
        </Col>
        <Col span={12}>
          <div>
            {rateList?.map((rate) => (
              <RateLine key={rate?._id} star={rate?._id} count={rate?.count} percent={(rate?.count / total) * 100} />
            ))}
          </div>
        </Col>
      </Row>
    </RateResultWrap>
  );
};
const RateLine = ({ percent, count, star }: { percent: number; count: number; star: number }) => {
  return (
    <div className="items-center flex justify-between">
      <div className="inline-block mr-8">
        <Rate allowClear={false} defaultValue={1} count={1} className={'text-sm'} />
        <span className="ml-4">{star}</span>
      </div>
      <div className="flex-grow">
        <Progress strokeColor="#fcba03" percent={percent} showInfo={false} className="w-2/3" />
        <span className="ml-4">{count}</span>
      </div>
    </div>
  );
};
const RateResultWrap = styled.div``;
export default RateResult;
