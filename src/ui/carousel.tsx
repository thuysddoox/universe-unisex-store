import {
  Carousel as AntdCarousel,
  CarouselProps as AntdCarouselProps,
} from 'antd';
import styled from '@emotion/styled';
import React from 'react';
import { CarouselRef } from 'antd/lib/carousel';
import { down } from 'styled-breakpoints';
export interface CarouselProps extends AntdCarouselProps {
  containerStyle?: any;
  containerClass?: string;
}

export const CarouselWrapper = styled.div`
  .ant-carousel {
    .slick-arrow{
      display: flex!important;
      svg{
        fill: #000;
        font-size: 1.6rem;
      }
    } 
    .slick-arrow:hover{
      background-color: #000;
      svg{
        fill: #fff;
      }
    } 
    .slick-dots-bottom{
      bottom: 50px;
      ${down('lg')} {
        bottom: 35px;
      }
    }
    .slick-list {
      flex: 98;
    }
    .slick-slider {
      display: flex;
    }
    .slick-next,
    .slick-prev {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .slick-next {
      right: -50px;
      ${down('md')} {
        right: -25px;
      }
    }
    .slick-prev {
      left: -50px;
      ${down('md')} {
        left: -25px;
      }
    }
    .slick-slide {
      pointer-events: all;
    }
  }
`;

export const Carousel = React.forwardRef<CarouselRef, CarouselProps>(
  (props: CarouselProps, ref) => {
    const { containerClass, children } = props;
    return (
      <CarouselWrapper
        className={`${containerClass || ''}`}
        style={props.containerStyle}
      >
        <AntdCarousel autoplay={true} {...props} ref={ref}>
          {children}
        </AntdCarousel>
      </CarouselWrapper>
    );
  }
);
