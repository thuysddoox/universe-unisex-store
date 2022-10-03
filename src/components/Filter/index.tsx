import styled from "@emotion/styled";
import { Row } from "antd";
import FilterComponent from "./FilterComponent";
const Categories = ['T-shirt','Shirt','Short','Hoodie/Sweater','Jeans/Pants','Accessories','Jacket','Other']
const Price = ['Under 20$','20$ to 40$','40$ to 60$','60$ to 100$','100$ & above']
const Weather = ['Summer','Winter','Other']
const Filter = ()=>{
  const filterList=[{type: 'checkbox',name:'Category',label: 'Category',options:Categories.map(category => ({label: category,value: category}))},{type: 'checkbox',name:'Weather',label: 'Weather',options:Weather.map(weather => ({label: weather,value: weather}))},{type: 'radio',name:'Price',label: 'Price',options:Price.map(item => ({label: item,value: item}))}]
  return (
    <FilterWrapper>
      {filterList.map((filter,id) => (
        // <Row key={id}>
          <FilterComponent {...filter} key={id}/>
        // </Row>
      ))}

    </FilterWrapper>
  )
}
const FilterWrapper = styled.div``;
export default Filter;
