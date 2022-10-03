import SectionHeading from "@components/SectionHeading";
import styled from "@emotion/styled";
import Link from "next/link";

const About = () => {
  return (
    <AboutPageWrap className="pt-24 sm:pt-36 pb-24">
      <div className="sm:flex flex-row gap-8 ">
        <div className="w-1/5 mb-20 sm:mb-0 mt-2">
          <SectionHeading mainTitle="About" />
        </div>
        <div className="px-5 sm:pl-8 sm:pr-14 md:px-16 lg:px-20 font-normal text-blue-500 text-lg leading-8 md:leading-10">
          <p>Bluebottle Digital is a different type of digital agency.</p>
          <p>
            We do all the heavy lifting below the surface so you can shine
            above it.
          </p>
          <p>
            We don’t care about fancy pants offices, industry awards,
            running massive disconnected account teams, the latest coffee
            trends, hospitality tickets or the number or ‘profile’ of our
            clients.
          </p>
          <p>
            We care about only about helping our clients transition,
            innovate and excel in this new digital world.
          </p>
          <p>
            With offices in Melbourne and Hanoi and a development team
            running 60 strong across all disciples, we provide a full spread
            of digital services, from digital strategy and blue one off
            website/mobile app jobs and right up to fully integrated
            ‘insourced’ IT teams for clients who have limited IT or digital
            capability in house.
          </p>
          <p>
            And because we don’t care for a lot of the periphery, we ensure
            our clients get the highest quality output, delivered on time
            and at a fraction of the cost of traditional agencies.
          </p>
          <p>
            So if you are interested in maximising your commercial
            opportunities in this brave new digital world, then why not get
            in touch. We love a challenge!
          </p>
          <div className="text-center mt-8">
            <Link href="/contact">
              <span className="inline-block cursor-pointer btn text-white rounded-3xl text-15 font-semibold text-base py-2 px-6 leading-6 bg-blue-500 mt-10 sm:mt-0 transition-all">
                Contact Us
              </span>
            </Link>
          </div>
        </div>
      </div>
    </AboutPageWrap>
  )
}
const AboutPageWrap = styled.div``;
export default About;