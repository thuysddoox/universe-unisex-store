import { Typography } from 'antd';
import styled from '@emotion/styled';
import { down } from 'styled-breakpoints';

const HeadingWrapper = styled.div`
  padding-top: 10px;
  color: #808fb1;
  .ant-typography {
    font-size: 24px;
    line-height: 50px;
  }
  .line1 {
    width: 50px;
    height: 2px;
    background-color: var(--gray);
  }
  .line2 {
    width: 100%;
    height: 1px;
    background-color: var(--gray);
    ${down('sm')} {
      background-color: var(--gray-400);
    }
  }
`;

// export interface HeadingProps {}

export function Heading(props: any) {
  return (
    <HeadingWrapper className="heading-wrapper" style={props.style}>
      <Typography.Text {...props} />
      <div className="line1"></div>
      <div className="line2"></div>
    </HeadingWrapper>
  );
}

export default Heading;
