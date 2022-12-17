// import BannerForm from '@components/BannerForm';
import styled from '@emotion/styled';
import Button from '@ui/button';
import { AiOutlineSave } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import { Banner } from '@interfaces/common';
import { BannerInitial } from '@constants/enum';
import { useGetBanners } from '../../../network/queries/banner';
import dynamic from 'next/dynamic';
import Spin from '@ui/spin';
const BannerForm = dynamic(() => import('@components/BannerForm'), { ssr: false });
const MangageAdvertisement = () => {
  const { data: bannersResp, isFetching, refetch } = useGetBanners();
  const [banners, setBanners] = useState<Banner[]>(
    bannersResp?.data?.responseData?.length > 0 ? bannersResp?.data?.responseData : [BannerInitial],
  );
  const handleAddBannerForm = () => {
    setBanners([...banners, BannerInitial]);
  };
  useEffect(() => {
    setBanners(bannersResp?.data?.responseData?.length > 0 ? bannersResp?.data?.responseData : [BannerInitial]);
  }, [bannersResp]);
  return (
    <ManageAdWrapper>
      <Button
        borderradius={'3px'}
        size="small"
        borderless={true}
        bgColor="rgba(16, 185, 129,1)"
        textcolor="#fff"
        className="font-medium my-3"
        bordercolor={'rgba(16, 185, 129,1)'}
        lineheight="30px"
        onClick={handleAddBannerForm}
      >
        Add +
      </Button>
      {banners?.map((banner, index) => (
        <BannerForm refetchList={refetch} banner={banner} key={banner?._id ?? index} />
      ))}
      {isFetching && (
        <div className="text-center p-10">
          <Spin size="large" spinning={isFetching} />
        </div>
      )}
    </ManageAdWrapper>
  );
};
const ManageAdWrapper = styled.div`
  .ant-form-item-row {
    display: block;
  }
  .ant-form-item-label > label {
    font-weight: 600;
    display: block;
    font-size: 15px;
    line-height: 2rem;
  }
  textarea.ant-input {
    resize: none;
  }
  .ant-upload.ant-upload-drag p.ant-upload-text {
    color: var(--success);
    font-weight: 500;
  }
  .ant-upload.ant-upload-drag p.ant-upload-drag-icon {
    margin-bottom: 0;
  }
`;
export default MangageAdvertisement;
