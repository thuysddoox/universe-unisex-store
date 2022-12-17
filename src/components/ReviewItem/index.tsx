// import Editor from '@components/Editor';
import NextImage from '@components/NextImage';
import styled from '@emotion/styled';
import { Col, Rate, Row } from 'antd';
import { useRouter } from 'next/router';
import { OrderItem, Product, SafeAny } from '../../interfaces/common';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
const Editor = dynamic(() => import('@components/Editor'), { ssr: false });
const ReviewItem = ({ data, isGetData, getData }: { data: OrderItem; isGetData?: boolean; getData?: SafeAny }) => {
  const router = useRouter();
  const defaultImg = `${router.basePath}/assets/images/logo/default.png`;
  const [content, setContent] = useState<string>('');
  const [rate, setRate] = useState<number>(5);
  useEffect(() => {
    isGetData && getData((prev) => [...prev, { rate, content, productId: data?.productId }]);
  }, [isGetData]);
  return (
    <ReviewItemWrapper className="py-5 border-b border-blue-500">
      <div>
        <Row className="items-start">
          <Col span={24} md={6} className="mb-4">
            <NextImage
              src={data?.thumbnails?.[0] ?? defaultImg}
              layout="fill"
              containerClass="h-20 md:h-24 relative ml-0 "
            />
            <div className="mt-4">
              <h4 className="">{data?.productName}</h4>
              <div className="">
                <span className="mr-2">
                  Size: <span className="font-semibold text-black uppercase">{data?.size}</span>
                </span>
                <span>
                  Color: <span className="font-semibold text-black">{data?.color}</span>
                </span>
              </div>
            </div>
          </Col>
          <Col span={24} md={18}>
            <div className="flex items-center mb-2">
              <span className="font-medium text-base mr-2">Product Quality</span>
              <Rate
                allowClear={false}
                defaultValue={5}
                count={5}
                onChange={(value) => setRate(value)}
                className="text-sm"
              />
            </div>
            <Editor value={content} onChange={setContent} />
          </Col>
        </Row>
      </div>
    </ReviewItemWrapper>
  );
};
const ReviewItemWrapper = styled.div`
  img {
    min-width: auto !important;
  }
`;
export default ReviewItem;
