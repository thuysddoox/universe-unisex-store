import { Slider } from '../../ui/slider';
import NextImage from '@components/NextImage';
import { Banner } from '@interfaces/common';
import { useRouter } from 'next/router';
const Advertisement = ({ bannersList }: { bannersList: Banner[] }) => {
  const router = useRouter();
  const imgBaseUrl = `${router.basePath}/assets/images/background`;
  bannersList = [
    {
      imgUrl: `${imgBaseUrl}/bg1.jpg`,
    },
    {
      imgUrl: `${imgBaseUrl}/bg2.jpg`,
    },
    {
      imgUrl: `${imgBaseUrl}/bg3.jpg`,
    },
  ];
  return (
    <div className="mb-8">
      <Slider slidesToShow={1} arrows={false} fade={true} speed={2000} autoplaySpeed={3000}>
        {bannersList.map((banner, id) => (
          <NextImage
            key={id}
            src={banner.imgUrl}
            layout="fill"
            objectFit="cover"
            containerClass="h-[300px] md:h-[400px] relative w-screen relative"
          />
        ))}
      </Slider>
    </div>
  );
};

export default Advertisement;
