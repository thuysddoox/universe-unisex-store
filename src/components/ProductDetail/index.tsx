import React, { useState } from "react";
import styled from "@emotion/styled";
import { Rate } from "antd";
import ShareOnSocials from "@components/ShareOnSocials";
import Favorite from "@components/Favorite";
import { RadioGroup } from "@ui/radio";
// import Quantity from "@components/Quantity";
import { FaShoppingCart } from "react-icons/fa";
import Button from "@ui/button";
import dynamic from "next/dynamic";
const  Quantity = dynamic(() => import("@components/Quantity"), { ssr: false })
const ProductDetail = () => {
  const colors = [{value: 'red',label: <span className={`m-1 bg-blue-400 w-5 h-5 block rounded-circle`}></span>},{value: 'green',label: <span className={`m-1 bg-blue-400 w-5 h-5 block rounded-circle`}></span>},{value: 'blue',label: <span className={`m-1 bg-blue-400 w-5 h-5 block rounded-circle`}></span>},{value: 'yellow',label: <span className={`m-1 bg-blue-400 w-5 h-5 block rounded-circle`}></span>}]
  const [quantity, setQuantity] = useState<number>(1);
  const price = 30;
  return (
    <ProductDetailWrap className="mt-8 md:mt-0">
      <h3 className="product-title text-xl md:text-2xl lg:text-3xl font-semibold mb-4 md:mb-0">Bodum Bistro Electric Blade Coffee Grinder Ivory</h3>
      <div className="flex items-center justify-between">
        <div>
          <Rate allowClear={true} defaultValue={3} allowHalf={true} className={'text-sm'} />
        <span className="text-sm text-gray-500">| Đã Bán 10</span>
        </div>
        <div className="flex">
            <Favorite isFavorite={false} containerClass='relative text-red-500 mr-4' heartClass="text-sm py-1 px-2"/>
            <ShareOnSocials shareUrl={''} />
        </div>
      </div>
      <div>
        <div>
          <span className='font-medium text-blue-800 line-through text-gray-500 text-base md:text-xl lg:text-2xl'>$1,725.00</span>
          <span className='font-semibold text-red-600 ml-2 text-xl md:text-2xl lg:text-3xl'>$1,725.00</span>
        </div>
        <RadioGroup options={colors} size="large" label="Color" buttonStyle='solid' optionType="button" containerClass="color-picker"/>
        <RadioGroup options={['s','m','l','xl']} label="Size" optionType="button" buttonStyle="solid"/>
        <Quantity quantity={quantity} setQuantity={setQuantity} containClass="mt-4"/>
        <div className="flex items-center justify-between font-medium text-lg my-4">
          <span>Subtotal</span>
          <span>${(price*quantity).toFixed(2)}</span>
        </div>
        <Button borderradius={'3px'} className="w-1/2"><FaShoppingCart className='text-lg'/><span className='ml-2 text-base font-medium'>Add to cart</span></Button>
        {/* <span>add to cart/ out of stock</span> */}
      </div>
    </ProductDetailWrap>
  )
}
const ProductDetailWrap = styled.div``;
export default ProductDetail;