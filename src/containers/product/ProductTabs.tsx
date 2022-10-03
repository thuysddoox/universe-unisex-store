import ReviewProduct from "@components/Review";
import styled from "@emotion/styled";
import { TabPane, Tabs } from "@ui/tabs";

const ProductTabs = ()=>{
  return (
    <ProductTabsWrapper className="mt-10">
      <Tabs defaultActiveKey="1">
        <TabPane tab={<span className="uppercase text-lg md:text-xl font-medium">Description</span>} key="1">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab={<span className="uppercase text-lg md:text-xl font-medium">Review & Rate</span>} key="2">
          <ReviewProduct />
        </TabPane>
      </Tabs>
    </ProductTabsWrapper>
  )
}

const ProductTabsWrapper = styled.div`
.ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn{
  color: var(--navy);
}
.ant-tabs-ink-bar{
  background: var(--navy);
}

`;
export default ProductTabs;