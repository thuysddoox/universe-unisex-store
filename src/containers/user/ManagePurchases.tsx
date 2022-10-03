import { AndroidOutlined, AppleOutlined } from "@ant-design/icons";
import styled from "@emotion/styled"
import { Tabs } from "@ui/tabs";
import { useMemo } from "react";

const ManagePurchases = ()=>{
  const tabs = useMemo(() => [
    {
      key: 'Tab-1',
      label: 'Confirming',
      children: <></>,
    },
    {
      key: 'Tab-2',
      label: 'Preparing',
      children: <></>,
    },
    {
      key: 'Tab-3',
      label: 'Shipping',
      children: <></>,
    },
    {
      key: 'Tab-4',
      label: 'Compeleted',
      children: <></>,
    },
    {
      key: 'Tab-5',
      label: 'Review & Rate',
      children: <></>,
    }
  ],[])
  return (
    <ManagePurchasesWrapper>
      <Tabs
        // defaultActiveKey="2"
        items={tabs}
      />
    </ManagePurchasesWrapper>
  )
}
const ManagePurchasesWrapper = styled.div``
export default ManagePurchases