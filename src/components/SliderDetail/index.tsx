import NextImage, { FixedRatioImage } from '@components/NextImage';
import styled from '@emotion/styled';
import { NextArrow, PrevArrow, Slider } from '@ui/slider';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { CarouselRef } from 'antd/lib/carousel';
import { SafeAny } from '@interfaces/common';
import { Image } from 'antd';

const SliderDetail = () => {
  const slider1 = useRef<any>(null);
  const slider2 = useRef<any>(null);
  const [sliderList, setSliderList] = useState(null);
  const [sliderMain, setSliderMain] = useState(null);

  const router = useRouter();
  const imgUrl = router.basePath + '/assets/images/background/';
  useEffect(() => {
    setSliderList(slider2?.current);
    setSliderMain(slider1?.current);
  }, [slider1, slider2]);
  const nextSlide = () => {
    slider2.current.next();
  };
  const prevSlide = () => {
    slider2.current.prev();
  };
  return (
    <SliderDetailWrapper>
      <Slider asNavFor={sliderList} ref={slider1} arrows={false} slidesToShow={1} slidesToScroll={1} autoplay={false}>
        <div>
          <NextImage
            src={imgUrl + 'bg1.jpg'}
            layout="fill"
            objectFit="contain"
            containerClass="h-[200px] lg:h-[250px] relative w-full relative"
          />
        </div>
        <div>
          <NextImage
            src={imgUrl + 'bg2.jpg'}
            layout="fill"
            objectFit="contain"
            containerClass="h-[200px] lg:h-[250px] relative w-full relative"
          />
        </div>
        <div>
          <NextImage
            src={imgUrl + 'bg3.jpg'}
            layout="fill"
            objectFit="contain"
            containerClass="h-[200px] lg:h-[250px] relative w-full relative"
          />
        </div>
      </Slider>
      <div className="relative sm:px-14 w-full">
        <div className="max-w-full md:w-[400px] mt-12 relative z-10">
          <Slider
            asNavFor={sliderMain}
            className="image-carousel-list "
            ref={slider2}
            swipeToSlide={true}
            focusOnSelect={true}
            autoplay={false}
            infinite={true}
            arrows={true}
            slidesToShow={3}
            speed={0}
          >
            <div className="cursor-pointer capitalize relative shadow-lg p-4" >
              <FixedRatioImage ratio={[1, 1]}>
                <NextImage
                  src={imgUrl + 'bg1.jpg'}
                  layout="fill"
                  objectFit="cover"
                  containerClass="absolute top-0 left-0 w-full h-full"
                />
              </FixedRatioImage>
            </div>
            <div className="cursor-pointer capitalize relative shadow-lg p-4">
              <FixedRatioImage ratio={[1, 1]}>
                <NextImage
                  src={imgUrl + 'bg2.jpg'}
                  layout="fill"
                  objectFit="cover"
                  containerClass="absolute top-0 left-0 w-full h-full"
                />
              </FixedRatioImage>
            </div>
            <div className="cursor-pointer capitalize relative shadow-lg p-4">
              <FixedRatioImage ratio={[1, 1]}>
                <NextImage
                  src={imgUrl + 'bg3.jpg'}
                  layout="fill"
                  objectFit="cover"
                  containerClass="absolute top-0 left-0 w-full h-full"
                />
              </FixedRatioImage>
            </div>
          </Slider>
        </div>
        <div className="absolute top-1/2 flex justify-between w-full -translate-y-1/2">
          <PrevArrow className="slick-arrow slick-prev absolute top-0 -translate-y-1/2 -translate-x-8" onClick={prevSlide} />
          <NextArrow className="slick-arrow slick-next absolute top-0 -translate-y-1/2 -translate-x-8" onClick={nextSlide} />
        </div>
      </div>
    </SliderDetailWrapper>
  );
};
const SliderDetailWrapper = styled.div`
  .image-carousel-list {
    .slick-current.slick-active img {
      background-color: rgba(0, 0, 0, 0.1);
      filter: brightness(0.5);
    }
  }
  .slick-arrow svg {
    font-size: 1rem;
  }
  .slick-arrow:hover {
    background-color: #000;
    svg {
      fill: #fff;
    }
  }
  .slick-next,
  .slick-prev {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
  .slick-next {
    right: 50px;
  }
  .slick-prev {
    // left: -50px;
  }

  @media (max-width: 576px){
    .slick-next {
      right: -50px;
    }
    .slick-prev {
      left: 10px;
    }
  }
`;
export default SliderDetail;
