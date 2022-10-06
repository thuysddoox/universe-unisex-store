import styled from "@emotion/styled";
import { Timeline } from "antd";
import { ImTruck } from "react-icons/im";

const TimelineItem = ({icon,label,content,status}:{icon: React.ReactElement,label: string,content: string,status: string})=>{
  return (
    <li className="flex items-center mb-8 ">
      <span className=" inline-block border-4 timeline-icon rounded-circle p-3 lg:p-5 border-green-600 text-green-600 text-center relative ">
        {icon}
      </span>
      <div className="ml-2">
        <p className="lg:text-base font-medium">{label}</p>
        <p className="text-xs lg:text-sm text-gray-500">{content}</p>
      </div>

    </li>
  )
}
const OrderTimeLine = () =>{
  return (
    <OrderTimeLineWrap>
      <Timeline mode='left' className="">
        <TimelineItem icon={<ImTruck className="text-xl lg:text-2xl mx-auto text-green-600"/>} content='asfsdf' label="Confirmed Order" status=""/>
        <TimelineItem icon={<ImTruck className="text-xl lg:text-2xl mx-auto text-green-600"/>} content='sdfdf' label="Confirmed Order" status=""/>
        <TimelineItem icon={<ImTruck className="text-xl lg:text-2xl mx-auto"/>} content='sdfdsf' label="Confirmed Order" status=""/>
        <TimelineItem icon={<ImTruck className="text-xl lg:text-2xl mx-auto"/>} content='asfsdfsd' label="Confirmed Order" status=""/>
      </Timeline>
    </OrderTimeLineWrap>
  )
}
const OrderTimeLineWrap = styled.div`
  .timeline-icon::after{
    content: '';
    position: absolute;
    top:100%;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    background: currentColor;
    height: 2.5rem;
  }
  li:last-child .timeline-icon::after{
    display: none;
  }
`;
export default OrderTimeLine;