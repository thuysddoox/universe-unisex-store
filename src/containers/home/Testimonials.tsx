import { SocialMedia } from '@components/Footer';
import SubcribeForm from '@components/Form/Subcribe';
import styled from '@emotion/styled';
import { Slider } from '@ui/slider';
import { useRouter } from 'next/router';
import { renderResponseSiveSetting } from '../../ui/slider';
import Testimonial from '../../components/Testimonial/index';
import HeadingSection from '@components/HeadingSection';
import { RelateProductListWrapper } from '@components/RelateProductList';
import { useBreakpoints } from '../../contexts/breakpointsContext';

const Testimonials = () => {
  const router = useRouter();
  const imgUrlBase = router.basePath + '/assets/images/icons';
  const { width } = useBreakpoints();
  return (
    <RelateProductListWrapper>
      <div className="lg:w-10/12 mx-auto pb-20">
        <HeadingSection title="UNIS® MISSION" mode="center" />
        <Slider
          slidesToShow={1}
          infinite={true}
          centerMode={true}
          centerPadding={width > 1200 ? '200px' : width > 992 ? '100px' : width > 576 ? '50px' : '0px'}
          arrows={false}
          dots={true}
          responsive={renderResponseSiveSetting(1)}
          className="mx-2 md:mx-4 lg:mx-8"
        >
          <Testimonial
            description="UNIS® is the first choice for discerning Streetwear fashionistas. UNIS®'s mission is to empower young people around the world to freely express their style through fashion, the brand transcends the boundaries of
        streetwear by constantly innovating with its collections. unique."
            position="Founder"
            name="THUYSDDOOX"
            imgUrl={`${imgUrlBase}/woman.png`}
          />
          <Testimonial
            description="We are constantly striving, focusing on product quality and the most outstanding shopping experience ever, our physical stores, optimizing the experience, helping users shop a product. Really high end product.
          Easy online shopping, cross-platform great experience. Reasonable price.
          This has solved the problem for you to both balance your financial ability and perfectly meet your fashion needs and the fast trends of the times."
            position="Co-Founder"
            name="Jonh Doe"
            imgUrl={`${imgUrlBase}/man.png`}
          />
          <Testimonial
            description="At Uniss®, each product is individual and stylish, representing the image of the modern youth - a symbol of the leadership of the new era. Clothing may go out of style, but fashion will not. The unique vision of Uniss® is to let each individual freely express his or her own style when wearing products created with passion and values ​​of the new generation, full of youth, dynamism and always constantly asserting themselves, looking to the future."
            position="Co-Founder"
            name="Jonh Doe"
            imgUrl={`${imgUrlBase}/woman.png`}
          />
        </Slider>
      </div>
    </RelateProductListWrapper>
  );
};

export default Testimonials;
