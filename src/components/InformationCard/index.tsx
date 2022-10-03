import React from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

const InformationWrapper = styled.div`
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  .aspect-ratio-custom {
    padding-top: 36% !important;
  }
  .hover:hover {
    text-decoration: underline;
  }
  @media screen and (max-width: 675px) {
    .aspect-ratio-custom {
      padding-top: 56.25% !important;
    }
    &.mb-flex-col {
      flex-direction: column !important;
    }
    .mb-w-full {
      width: 100% !important;
    }
    .mb-p-0 {
      padding: 0 !important;
    }
    .mb-mt-6 {
      margin-top: 1.5rem !important;
    }
    .mb-mb-6 {
      margin-bottom: 1.5rem !important;
    }
    .mb-mx-0 {
      margin-left: 0 !important;
      margin-right: 0 !important;
    }
  }
`;
const InformationCard = ({
  title,
  address,
  mobile,
  email,
  thumbnail,
  odd,
}: {
  title: string;
  address: string;
  mobile: string;
  email: string;
  thumbnail: string;
  odd?: boolean;
}) => {
  const router = useRouter();
  const ImgBaseUrl = `${router.basePath}/assets/images`;
  return (
    <InformationWrapper className="p-6 sm:p-8 lg:p-10 flex flex-row mb-flex-col items-center justify-between my-12 mx-4 mb-mx-0 ">
      <div
        className={`mb-w-full w-3/5 aspect-ratio-custom rounded-lg ${
          odd ?? 'order-2'
        }`}
        style={{
          background: `url(${thumbnail}) center bottom / cover no-repeat scroll`,
        }}
      ></div>
      <div
        className={`${
          odd
            ? 'mb-mt-6 order-1 pl-6 md:pl-8 xl:pl-10'
            : 'mb-mb-6 pr-6 md:pr-8 xl:pr-10'
        } mb-p-0 mb-w-full w-2/5`}
      >
        <h3 className="font-medium text-lg md:text-xl lg:text-2xl uppercase leading-8 text-blue-900">
          {title}
        </h3>
        <ul className="contact mt-3 md:mt-5">
          <li className="py-1 md:py-2">
            <a className="flex justify-start item-center" rel="noreferrer">
              <img
                src={`${ImgBaseUrl}/icons/address-dark.png`}
                alt=""
                className="inline-block mr-2 object-contain"
              />
              <span className="text-base text-blue-900 transition-all">
                {address}
              </span>
            </a>
          </li>
          <li className="cursor-pointer py-1 md:py-2">
            <a
              href={`tell:${mobile}`}
              className="flex justify-start item-center"
            >
              <img
                src={`${ImgBaseUrl}/icons/phone-dark.png`}
                alt=""
                className="inline-block mr-2 object-contain"
              />
              <span className="text-base text-blue-900 transition-all hover">
                {mobile}
              </span>
            </a>
          </li>
          <li className="cursor-pointer py-1 md:py-2">
            <a
              href={`mailto:${email}`}
              className="flex justify-start item-center"
            >
              <img
                src={`${ImgBaseUrl}/icons/mail-dark.png`}
                alt=""
                className="inline-block mr-2 object-contain"
              />
              <span className="text-base text-blue-900 transition-all hover">
                {email}
              </span>
            </a>
          </li>
        </ul>
      </div>
    </InformationWrapper>
  );
};
export default InformationCard;
