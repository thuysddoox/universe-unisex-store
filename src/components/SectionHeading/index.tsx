import styled from '@emotion/styled';
import React from 'react';

interface HeadingProps {
  mainTitle?: string;
  subTitle?: string;
  urlImg?: string;
  lineOrder?: number;
  lineColor?: string;
  isNotAnimated?: boolean;
  hasLine?: boolean;
}
const SectionHeadingWrapper = styled.div`
  .line {
    height: 0.35rem;
    border-top-width: 2px;
    &:after {
      position: absolute;
      top: -1px;
      right: 0%;
      transform: translate(100%, -50%);
      content: '';
      height: 0.625rem;
      width: 0.625rem;
      border-radius: 50%;
      border: 2px solid var(--navy);
    }
  }
`;
const SectionHeading = ({hasLine=true,...props}: HeadingProps) => {
  return (
    <SectionHeadingWrapper className="w-full flex justify-start items-baseline">
      {/* <Slide
        direction="left"
        duration={props?.isNotAnimated ? 0 : 800}
        triggerOnce
      > */}
        {hasLine && <div
          className={`line w-8 md:w-12 lg:w-36 border-t border-blue-500 mr-3 sm:mr-5 relative`}
        ></div>}
        <div className="section-intro ml-1">
          {props?.subTitle && (
            <span className="text-xs sm:text-base leading-4 sm:leading-7 text-blue-900 font-semibold">
              {props?.subTitle}
            </span>
          )}
          {props?.mainTitle && (
            <h3 className="leading-7 text-lg sm:text-3xl text-blue-500 font-semibold">
              {props?.mainTitle}
            </h3>
          )}
          {props?.urlImg && (
            <img src={props?.urlImg} className="object-contain h-16" />
          )}
        </div>
      {/* </Slide> */}
    </SectionHeadingWrapper>
  );
};

export default SectionHeading;
