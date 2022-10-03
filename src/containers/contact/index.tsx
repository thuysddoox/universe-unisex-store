import InformationCard from "@components/InformationCard";
import SectionHeading from "@components/SectionHeading";
import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";

const Contact = () => {
  const router = useRouter();
  const ImgBaseUrl = `${router.basePath}/assets/images`;
  return (
    <ContactPageWrap className="pt-24 sm:pt-36 pb-24">
       <SectionHeading
          subTitle="Contact Us"
          mainTitle="Contact for advice and support"
        />
        <div className="lg:w-11/12 mx-auto px-4 sm:px-10 md:px-5 xl:px-14">
          <InformationCard
            title="BLUEBOTTLE DIGITAL VIETNAM"
            thumbnail={`${ImgBaseUrl}/PhamHung.jpg`}
            address="Toyota Buliding, 15 Pham Hung, My Dinh II, Hanoi"
            mobile="(+84) 24 666 24320"
            email="info@bluebottle.vn"
            odd={true}
          />
          <InformationCard
            title="BLUEBOTTLE DIGITAL AUSTRALIA"
            thumbnail={`${ImgBaseUrl}/Melbourne.jpeg`}
            address="823/1 Queens Road, Melbourne, VIC 3004, Australia"
            mobile="(+84) 24 666 24320"
            email="info@bluebottle.digital"
          />
        </div>
    </ContactPageWrap>
  )
}
const ContactPageWrap = styled.div``;
export default Contact;