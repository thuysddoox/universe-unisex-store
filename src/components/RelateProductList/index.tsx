import Product from "@components/Product";
import styled from "@emotion/styled";
import { responsiveSettGeneral, Slider } from "@ui/slider";

const RelateProductList = ()=>{
  return (
    <RelateProductListWrapper className="my-14">
      <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold">More Products</h3>
       <Slider slidesToShow={4} arrows={true} responsive={responsiveSettGeneral} autoplay={false} dots={true} className="mx-4 sm:mx-8">
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </Slider>
    </RelateProductListWrapper>
  )
}
const RelateProductListWrapper = styled.div`
.slick-dots-bottom{
  bottom: -35px!important;
  align-items: center;
  li{
    width: 10px;
    height: 10px;
    margin: 0 4px;
    border-radius: 50%!important;
    background: var(--light-gray-2);
    button{
      width: 10px;
      height: 10px;
    }
    &.slick-active{
      background: var(--navy)!important;
      width: 13px;
      height: 13px;
      button{
        width: 13px;
        height: 13px;
        border-radius: 50%!important;
        background: var(--navy)!important;
      }
    }
  }
  
}

`;
export default RelateProductList;