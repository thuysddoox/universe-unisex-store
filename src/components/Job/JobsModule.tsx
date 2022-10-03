import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SectionHeading from '../SectionHeading';
import styled from '@emotion/styled';
import JobItem from '.';

const JobWrapper = styled.div`
  a:hover {
    color: var(--blue2-secondary) !important;
  }
  .btn-apply.cursor-pointer:hover {
    right: -10px !important;
  }
  @media screen and (max-width: 560px) {
    .note {
      font-size: 12px !important;
    }
    .px-sm-5 {
      padding-left: 1.25rem !important;
      padding-right: 1rem !important;
    }
  }
`;
const JobsModule = () => {
  const router = useRouter();
  const ImgBaseUrl = `${router.basePath}/assets/images`;
  return (
    <JobWrapper className="mt-10 sm:mt-14 overflow-hidden">
      <SectionHeading subTitle="Careers" mainTitle="Join Us Now" hasLine={false} lineOrder={2}/>
      <div className="block md:flex items-start my-10">
        <div className="w-full md:w-3/5 mb-10 md:mb-0">
          <ul className="w-full sm:px-8 lg:pr-16 lg:pl-4 ">
            <li>
              <JobItem
                // job={item}
                arrowButton={true}
                stt={1}
                displayDate={true}
              />
            </li>

            {/* <li className="text-center">No Jobs Now</li> */}
            {/* {Jobs?.length > 0 && ( */}
            <Link href="/careers" passHref>
              <a className="text-blue-500 underline block mt-6 text-right transition-all">See more jobs</a>
            </Link>
            {/* )} */}
          </ul>
        </div>

        <div className="w-full md:w-2/5 sm:px-8 md:px-0">
          <h3 className="font-semibold text-2xl md:text-3xl text-blue-900 leading-5 sm:leading-7">
            Do you want to{' '}
            <span
              className="text-blue-500 inline-block p-6"
              style={{
                background: `url(${ImgBaseUrl}/icons/join.png) center center / contain no-repeat scroll`,
              }}
            >
              join
            </span>{' '}
            us?
          </h3>
          <ul className="mt-2">
            <li className="flex justify-start items-center py-1">
              <img src={`${ImgBaseUrl}/icons/tick.png`} className="h-8 sm:h-10" />
              <p className="text-blue-900 font-normal ml-4">Competitive salary, 13th-month salary, annual bonus.</p>
            </li>
            <li className="flex justify-start items-center py-1">
              <img src={`${ImgBaseUrl}/icons/tick.png`} className="h-8 sm:h-10" />
              <p className="text-blue-900 font-normal ml-4">Creative, dynamic, friendly working environment.</p>
            </li>
            <li className="flex justify-start items-center py-1">
              <img src={`${ImgBaseUrl}/icons/tick.png`} className="h-8 sm:h-10" />
              <p className="text-blue-900 font-normal ml-4">Regular professional seminar on the latest technologies.</p>
            </li>
            <li className="flex justify-start items-center py-1">
              <img src={`${ImgBaseUrl}/icons/tick.png`} className="h-8 sm:h-10" />
              <p className="text-blue-900 font-normal ml-4">Paid company trip and permanent teambuilding activities.</p>
            </li>
          </ul>
        </div>
      </div>
    </JobWrapper>
  );
};

export default JobsModule;
