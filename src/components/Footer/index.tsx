import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import NextImage from '@components/NextImage';
import { StyledImage } from '@ui/styledimage';
import SubcribeForm from '../Form/Subcribe';
import { Col, Row } from 'antd';

export function Footer() {
  const router = useRouter();

  return (
    <FooterWrapper className="pt-4 border-t ">
      <div className="container m-auto text-gray-750">
        <Row className="flex flex-wrap justify-between py-4 lg:py-10">
          <Col span={24} md={{span: 14}} className='order-1 md:order-0 mt-10 md:mt-0'>
            <ul className="flex">
              {[
                [{label:'Sale',link:'/sale'}, {label: 'Best Seller',link:'/'}, {label: 'Shop',link:'/shop'}],
                [{label:'About',link:'/about'}, {label: 'Contact',link:'/contact'}, {label: 'Jobs',link:'/jobs'}],
                [{label: 'Privacy Policy',link:'/privacy#policy'}, {label: 'Privacy Refund',link:'/privacy#refund'}, {label: 'Payment And Shipping',link:'/privacy#payment-shipping'}],
              ].map((list, listId) => (
                <li key={listId} className="mr-4 sm:mr-8 lg:mr-10">
                  <ul>
                  {list.map((item, id) => (
                    <li key={id}>
                      <Link href={item.link} passHref>
                        <a className="text-medium text-sm capitalize sm:uppercase">{item.label}</a>
                      </Link>
                    </li>
                  ))}
                  </ul>
                </li>
              ))}
            </ul>
          </Col>
          <Col span={24} sm={{span: 20}} md={{span: 10}} xl={{span: 8}} className='order-0 md:order-1'>
            <div>
              <div className="relative py-4 md:py-2 ml-0 md:ml-2 mr-2 mb-4">
                <Link href="/" passHref>
                  <StyledImage
                    src={`${router.basePath}/assets/images/logo/footer-logo-bex.png`}
                    className="contain h-8 sm:h-9 lg:h-8 xl:h-10 cursor-pointer"
                  />
                </Link>
            </div>
              <p className="mb-4 ml-0 md:ml-2 mr-2 uppercase text-base">
                Subcribe to receive notifications <br /> of offers and discounts.
              </p>
              <SubcribeForm />
            </div>
          </Col>
        </Row>
      </div>
      <div className=" md:border-t border-[#c6c6cf]">
        <div className="container md:flex lg:flex sm:block items-center justify-center lg:justify-between flex-wrap py-4">
          <p className="mb-0 text-medium text-sm md:text-center py-3 copy-right md:w-full lg:w-auto">
            © 2022 Bloodstock Exchange. All rights reserved.
          </p>
          <div className="flex items-center md:justify-center flex-wrap py-2">
            <Link href="/" passHref>
              <a className="text-medium text-sm">Terms & Conditions</a>
            </Link>
            <span className="mx-2 xl:mx-3 text-2xl line"> | </span>
            <span className="text-medium text-sm mr-4 xl:mr-6">Connect with us:</span>
            <SocialMedia />
          </div>
        </div>
      </div>
    </FooterWrapper>
  );
}
export const SocialMedia = ()=>{
  const router = useRouter();
  return (
    <div className="flex items-center justify-start py-2">
    <a
      href="https://www.instagram.com/bloodstockexchange/"
      target="_blank"
      className="relative"
      rel="noreferrer"
    >
      <NextImage
        layout={'fill'}
        objectFit="contain"
        src={`${router.basePath}/assets/images/icons/instagram.png`}
        containerClass="contain h-6 lg:h-5 xl:h-7 mr-2 w-6 xl:w-8"
      />
    </a>
    <a href="https://www.facebook.com/BloodstockEx" target="_blank" className="relative" rel="noreferrer">
      <NextImage
        layout={'fill'}
        objectFit="contain"
        src={`${router.basePath}/assets/images/icons/facebook.png`}
        containerClass="contain h-6 lg:h-5 xl:h-7 mr-2 w-6 xl:w-8"
      />
    </a>
    <a href="https://twitter.com/bloodstockex" target="_blank" className="relative " rel="noreferrer">
      <NextImage
        layout={'fill'}
        objectFit="contain"
        src={`${router.basePath}/assets/images/icons/twitter.png`}
        containerClass="contain h-6 lg:h-5 xl:h-7 mr-2 w-6 xl:w-8"
      />
    </a>
  </div>
  )
}
const FooterWrapper = styled.div`
  @media (max-width: 325px) {
    .line {
      margin: 0!important;
    }
  }
`;
