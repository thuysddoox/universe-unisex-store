import styled from "@emotion/styled";
import { Col, Row } from "antd";
import CheckoutForm from '@components/Form/Checkout';
import ProfilePhoto from "./ProfilePhoto";
import TabsManageAccount from "./Tabs";

const MyAccount = ()=>{
  return (
    <MyAccountWrapper className="pt-32">
      <div className="container">

            {/* <ProfilePhoto />       */}
          <TabsManageAccount />


      </div>
    </MyAccountWrapper>
  )
}

const MyAccountWrapper = styled.div`
.ant-tabs-left > .ant-tabs-content-holder, .ant-tabs-left > div > .ant-tabs-content-holder{
  border: 0;
}
  .ant-tabs-tab{
    margin-top: 4px!important;
    font-size: 16px;
    font-weight: 500;
  }
`;
export default MyAccount;