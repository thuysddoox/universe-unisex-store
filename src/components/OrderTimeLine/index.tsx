import styled from '@emotion/styled';
import { getDateOfStatus } from '@utils/convertors';
import { Timeline } from 'antd';
import { FcShipped } from 'react-icons/fc';
import { ImTruck } from 'react-icons/im';
import { Status } from '../../interfaces/common';

const TimelineItem = ({
  icon,
  label,
  content,
  status,
}: {
  icon: React.ReactElement;
  label: string;
  content: string;
  status: boolean;
}) => {
  return (
    <li className="flex items-center mb-8 ">
      <span
        className={`inline-block border-4 timeline-icon rounded-circle p-3 lg:p-5 ${
          status ? 'border-green-300 text-green-300' : 'border-gray-400 text-gray-400'
        } text-center relative`}
      >
        {icon}
      </span>
      <div className="ml-2">
        <p className="lg:text-base font-medium">{label}</p>
        <p className={`text-xs lg:text-sm text-gray-500`}>{content}</p>
      </div>
    </li>
  );
};
const OrderTimeLine = ({ timeline }: { timeline: Status[] }) => {
  return (
    <OrderTimeLineWrap>
      <Timeline mode="left" className="">
        <TimelineItem
          icon={<ImTruck className="text-xl lg:text-2xl mx-auto" />}
          content={getDateOfStatus(1, timeline)}
          label="Approving"
          status={getDateOfStatus(1, timeline) !== '--'}
        />
        <TimelineItem
          icon={<ImTruck className="text-xl lg:text-2xl mx-auto" />}
          content={getDateOfStatus(2, timeline)}
          label="Preparing"
          status={getDateOfStatus(2, timeline) !== '--'}
        />
        <TimelineItem
          icon={<FcShipped className="text-xl lg:text-2xl mx-auto" />}
          content={getDateOfStatus(3, timeline)}
          label="Shipping"
          status={getDateOfStatus(3, timeline) !== '--'}
        />
        <TimelineItem
          icon={<ImTruck className="text-xl lg:text-2xl mx-auto" />}
          content={getDateOfStatus(4, timeline)}
          label="Completed"
          status={getDateOfStatus(4, timeline) !== '--'}
        />
        {getDateOfStatus(0, timeline) !== '--' && (
          <TimelineItem
            icon={<ImTruck className="text-xl lg:text-2xl mx-auto" />}
            content={getDateOfStatus(0, timeline)}
            label="Cancelled"
            status={true}
          />
        )}
      </Timeline>
    </OrderTimeLineWrap>
  );
};
const OrderTimeLineWrap = styled.div`
  .timeline-icon::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    background: currentColor;
    height: 2.5rem;
  }
  li:last-child .timeline-icon::after {
    display: none;
  }
`;
export default OrderTimeLine;
