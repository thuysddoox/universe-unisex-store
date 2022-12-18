import React from 'react';
import { ReactNode } from 'react';
import { Carousel, CarouselProps } from '@ui';
import { CarouselRef } from 'antd/lib/carousel';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

export interface SliderProps extends CarouselProps {
  children?: ReactNode;
  settings?: any;
}
export const renderResponseSiveSetting = (len: number) => {
  return [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: len > 3,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: len > 2,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: len > 1,
      },
    },
  ];
};
export const responsiveSettGeneral = [
  {
    breakpoint: 1200,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 1,
    },
  },
  {
    breakpoint: 992,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 1,
    },
  },
  {
    breakpoint: 576,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
    },
  },
];
interface ArrowProps {
  currentSlide?: number;
  slideCount?: number;
  [k: string]: any;
}

export const NextArrow = ({ currentSlide, slideCount, onClick, className, ...props }: ArrowProps) => (
  <RightOutlined
    className={`text-blue-500 text-base xs:text-lg transition-all flex items-center justify-center ${className}`}
    onClick={onClick}
  />
);
export const PrevArrow = ({ currentSlide, slideCount, onClick, className, ...props }: ArrowProps) => (
  <LeftOutlined
    className={`text-blue-500 text-base xs:text-lg transition-all flex items-center justify-center ${className}`}
    onClick={onClick}
  />
);

const settingsDefault = {
  infinite: true,
  speed: 500,
  dots: false,
  arrows: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

export const Slider = React.forwardRef<CarouselRef, SliderProps>(
  ({ children, settings, ...rest }: SliderProps, ref) => {
    const _settings = {
      ...settingsDefault,
      ...settings,
    };
    return (
      <Carousel arrows {..._settings} {...rest} ref={ref}>
        {children}
      </Carousel>
    );
  },
);
