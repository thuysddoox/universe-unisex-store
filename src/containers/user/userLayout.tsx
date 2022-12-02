import React from 'react';
import HeadingSection from '@components/HeadingSection';
import styled from '@emotion/styled';
interface UserLayoutProps {
  title?: string;
  children: React.ReactNode | React.ReactElement;
}
const UserLayout = ({ title, children }) => {
  return (
    <MyAccountWrapper className="pt-24 min-h-[80vh]">
      <div className="container">
        <HeadingSection title={title} className="mt-0 mb-5" />
        {children}
      </div>
    </MyAccountWrapper>
  );
};

const MyAccountWrapper = styled.div`
  .ant-tabs-left > .ant-tabs-content-holder,
  .ant-tabs-left > div > .ant-tabs-content-holder {
    border: 0;
  }
  .ant-tabs-tab {
    margin-top: 4px !important;
    font-size: 16px;
    font-weight: 500;
  }
`;
export default UserLayout;
