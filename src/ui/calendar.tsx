import {
  Calendar as AntdCalendar,
  CalendarProps as AntdCalendarProps,
} from 'antd';
import styled from '@emotion/styled';

export interface CalendarProps extends AntdCalendarProps<any> {
  containerStyle?: any;
  containerClass?: string;
}

export const CalendarWrapper = styled.div`
  .ant-picker-cell-in-view.ant-picker-cell-today
    .ant-picker-cell-inner::before {
    border-color: #29637e;
  }
`;

export function Calendar(props: CalendarProps) {
  const { containerClass, containerStyle, ...rest } = props;
  return (
    <CalendarWrapper
      className={`${containerClass || ''}`}
      style={containerStyle}
    >
      <AntdCalendar {...rest} />
    </CalendarWrapper>
  );
}
