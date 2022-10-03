import styled from "@emotion/styled";
import { Select } from "@ui/select";
import { Pagination } from "antd";
const listSort = ['Latest','Sale','Price: Low To High','Price: High To Low']
const SortBy = ()=>{
  return (
    <SortByWrap>
      <Select defaultValue={'Latest'} borderradius={'0px'} options={listSort.map(item=>({label: item, value:item}))} />
      <Pagination
      total={85}
      showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
      defaultPageSize={20}
      defaultCurrent={1}
    />
    </SortByWrap>
  )
}
const SortByWrap = styled.div`
  .ant-select{
    width: 200px;
    background: #d5e0e6;
    .ant-select-selector{
      border: 0!important;
      background: transparent;
    }
    .ant-select-arrow{
      background: var(--navy);
      color: #fff;
      top:0;
      right:0;
      margin:0;
      height: 32px;
      padding: 0 10px;
    }
  }
`;
export default SortBy;