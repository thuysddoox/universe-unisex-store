import { SocialMedia } from '@components/Footer';
import SubcribeForm from '@components/Form/Subcribe';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

const Subcribes = () => {
  const router = useRouter();
  const imgUrl = router.basePath + '/assets/images/background/bg3.jpg';
  return (
    <SubcribesWrapper
      className="relative h-[350px] lg:h-[400px] flex items-center justify-center"
      style={{ background: `url(${imgUrl}) no-repeat center center` }}
    >
      <div className="px-4 z-10">
        <h3 className="font-semibold text-lg md:text-2xl text-center">Sign up for offers</h3>
        <p className="text-center py-4 text-white">Subcribe to receive notifications of offers and discounts.</p>
        <div className={'max-w-md mx-auto my-4'}>
          <SubcribeForm />
        </div>
        <div className="flex items-center justify-center">
          <h4 className="mr-4 font-semibold text-base md:text-xl">FOLLOW US</h4>
          <SocialMedia />
        </div>
      </div>
    </SubcribesWrapper>
  );
};
const SubcribesWrapper = styled.div`
  &:before {
    position: absolute;
    content: '';
    inset: 0;
    background: rgba(0, 0, 0, 0.15);
  }
`;
export default Subcribes;
