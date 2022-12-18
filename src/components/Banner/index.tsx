import styled from '@emotion/styled';
import { Banner } from '@interfaces/common';
import { useRouter } from 'next/router';
import { Carousel } from '../../ui/carousel';
import NextImage from '../NextImage';
import Link from 'next/link';
import ReactPlayer from 'react-player';

const Banner = ({
  bannersList,
  isVideo = false,
  videoUrl = 'https://culinary-bucket-staging.s3.ap-southeast-2.amazonaws.com/video/user/admin/yt1s.com___tabletop_food_reel_2017_sebastian_mayr_1080p__online_video_cutter.com_.mp4',
}: {
  bannersList?: Banner[];
  isVideo?: boolean;
  videoUrl?: string;
}) => {
  const router = useRouter();
  const imgBaseUrl = `${router.basePath}/assets/images/background`;
  return (
    <BannerWrap className="h-[450px] lg:h-screen relative">
      {isVideo ? (
        <ReactPlayer
          className="react-player relative"
          url={videoUrl}
          loop={true}
          controls={false}
          muted={true}
          width="100%"
          height="100%"
          playing={true}
        />
      ) : (
        <Carousel className="h-[450px] lg:h-screen">
          {bannersList.map((banner, id) => (
            <div className="h-full relative wrap" key={id}>
              <NextImage
                src={banner.imgUrl}
                layout="fill"
                objectFit="cover"
                containerClass="h-[450px] lg:h-screen relative w-screen relative"
              />
              <div className="absolute w-full text-center top-1/2 -translate-y-2/4 z-30">
                {banner?.title1 && (
                  <h2 className="text-white text-xl md:text-3xl lg:text-4xl xl:text-5xl font-medium">
                    {banner?.title1}
                  </h2>
                )}
                {banner?.title2 && (
                  <h4 className="text-white text-base md:text-xl lg:text-2xl my-2 italic">{banner?.title2}</h4>
                )}
                {banner?.description && (
                  <p className="text-white text-base md:text-lg my-4 italic">{banner?.description}</p>
                )}
                {/* {banner?.link && (
                  <Link href={'/'} passHref>
                    <a className="font-medium text-white mt-2 text-base border-2 border-white py-[5px] px-4 rounded-3xl inline-block">
                      {banner?.nameLink}
                    </a>
                  </Link>
                )} */}
              </div>
            </div>
          ))}
        </Carousel>
      )}
    </BannerWrap>
  );
};
const BannerWrap = styled.div`
  .wrap:after,
  .react-player&:after {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.15);
  }
  a:hover {
    background: #fff;
  }
  h2,
  h4 {
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  }
  a {
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  }
  .react-player video {
    object-fit: cover;
  }
`;
export default Banner;
