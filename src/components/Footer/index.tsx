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
          <Col
            span={24}
            sm={{ span: 11 }}
            lg={{ span: 8 }}
            xl={{ span: 6 }}
            className="mt-10 md:mt-0 order-3 lg:order-1"
          >
            <ul className="flex">
              {[
                [
                  { label: 'Sale', link: '/sale' },
                  { label: 'Shop', link: '/shop' },
                  { label: 'About', link: '/about' },
                  { label: 'Contact', link: '/contact' },
                ],
                [
                  { label: 'Privacy Policy', link: '/privacy#policy' },
                  { label: 'Privacy Refund', link: '/privacy#refund' },
                  { label: 'Payment And Shipping', link: '/privacy#payment-shipping' },
                ],
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
          <Col span={24} md={{ span: 8 }} xl={{ span: 10 }} className="hidden lg:block lg:order-2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.2926381717425!2d105.78486297517514!3d20.98090348065657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135accdd8a1ad71%3A0xa2f9b16036648187!2zSOG7jWMgdmnhu4duIEPDtG5nIG5naOG7hyBCxrB1IGNow61uaCB2aeG7hW4gdGjDtG5n!5e0!3m2!1svi!2s!4v1671357901350!5m2!1svi!2s"
              width="90%"
              height="200"
              loading="lazy"
            />
          </Col>
          <Col span={24} sm={{ span: 12 }} lg={{ span: 8 }} xl={{ span: 8 }} className="order-1 lg:order-3">
            <div>
              <div className="relative py-4 md:py-2 ml-0 md:ml-2 mr-2 mb-4">
                <Link href="/" passHref>
                  <StyledImage
                    src={`${router.basePath}/assets/images/logo/logo-color.png`}
                    className="contain h-8 sm:h-9 lg:h-8 xl:h-10 cursor-pointer"
                  />
                </Link>
              </div>
              {/* <p className="mb-4 ml-0 md:ml-2 mr-2 uppercase text-base">
                Subcribe to receive notifications <br /> of offers and discounts.
              </p> */}
              <SubcribeForm />
            </div>
          </Col>
        </Row>
      </div>
      <div className=" md:border-t border-[#c6c6cf]">
        <div className="container md:flex lg:flex sm:block items-center justify-center lg:justify-between flex-wrap py-4">
          <p className="mb-0 text-medium text-sm md:text-center py-3 copy-right md:w-full lg:w-auto">
            © 2022 Unisex Universe Store. All rights reserved.
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
export const SocialMedia = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-start py-2">
      <a href="https://www.instagram.com/bloodstockexchange/" target="_blank" className="relative" rel="noreferrer">
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
  );
};
const FooterWrapper = styled.div`
  @media (max-width: 325px) {
    .line {
      margin: 0 !important;
    }
  }
`;
