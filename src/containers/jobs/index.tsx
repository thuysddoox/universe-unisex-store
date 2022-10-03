import JobItem from "@components/Job";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
const NameCategoryWrapper = styled.div`
    display: flex;
    align-items: center;
    .line{
      height: 0.125rem;
      flex-basis: 15%;

      @media (min-width: 768px) {
        flex-basis: 8.333333%;
      }
    }
    .dot{
      flex: 0 1 auto;
      width: 0.625rem;
      height: 0.625rem;
      border-radius: 50%;
      margin-right: 1.25rem;
    }
    .box-name{
        flex-basis: 80%;
        padding-right: 1rem !important;
      .name{
        span{
          @media (max-width: 768px) {
            background-image: none !important;
            padding: 0;
          }
        }
      }
    }
  }
}`;

const BenefitWrapper = styled.div`
  padding-bottom: 15px;
  .item-benefit {
    margin: 8px 0;
    .icon-tick {
      flex-basis: 5%;
      img {
        margin-left: auto;
        margin-right: 1rem;
      }
      @media (max-width: 768px) {
        flex-basis: 15%;
        margin-right: 10px;
      }
    }
    .content-benefit {
      flex-basis: 95%;
      @media (max-width: 768px) {
        flex-basis: 85%;
      }
    }
  }
`;
const Jobs = ()=>{
  const router = useRouter();
  const ImgBaseUrl = `${router.basePath}/assets/images`;
  return (
    <JobsPageWrapper className="pt-36">
      <NameCategoryWrapper style={{ marginBottom: '2rem' }}>
        <div className="line bg-blue-500"></div>
        <div className="dot border-2 border-solid border-blue-500"></div>
        <div className="box-name">
          <div className="name text-xl md:text-2xl lg:text-3xl text-dark-blue uppercase font-medium">
            JOIN US NOW
          </div>
        </div>
      </NameCategoryWrapper>
    <ul className="pb-10 mx-4 sm:mx-10 lg:w-11/12 lg:mx-auto lg:pr-10 xl:pl-16">
            <li key={1}>
              <JobItem
                stt={1}
                // job={job}
                arrowButton={false}
                displayDate={true}
              />
            </li>
        {/* <li className="text-center">No Jobs Now</li> */}
    </ul>
      <NameCategoryWrapper style={{ margin: '40px 0' }}>
        <div className="line bg-blue-500"></div>
        <div className="dot border-2 border-solid border-blue-500"></div>
        <div className="box-name">
          <div className="name text-xl md:text-2xl lg:text-3xl font-medium">
            Why should you{' '}
            <span
              className="py-6 px-8 bg-no-repeat bg-center bg-contain"
              style={{
                backgroundImage: `url(${ImgBaseUrl}/icons/join.png)`,
              }}
            >
              join
            </span>{' '}
            our company?
          </div>
        </div>
      </NameCategoryWrapper>
    <BenefitWrapper className="mx-4 sm:mx-10 xl:w-4/5 xl:mx-auto">
      <ul>
        <li className="item-benefit flex justify-start items-center ">
          <div className="icon-tick">
            <img src={`${ImgBaseUrl}/icons/tick.png`} alt="" key={1} />
          </div>
          <span className="content-benefit">
            Competitive salary, 13th-month salary, annual bonus.
          </span>
        </li>
        <li className="item-benefit flex justify-start items-center ">
          <div className="icon-tick">
            <img src={`${ImgBaseUrl}/icons/tick.png`} alt="" key={2} />
          </div>
          <span className="content-benefit">
            Creative, dynamic, friendly working environment.
          </span>
        </li>
        <li className="item-benefit flex justify-start items-center ">
          <div className="icon-tick">
            <img src={`${ImgBaseUrl}/icons/tick.png`} alt="" key={3} />
          </div>
          <span className="content-benefit">
            Regular professional seminar on the latest technologies.
          </span>
        </li>
        <li className="item-benefit flex justify-start items-center ">
          <div className="icon-tick">
            <img src={`${ImgBaseUrl}/icons/tick.png`} alt="" key={3} />
          </div>
          <span className="content-benefit">
            Paid company trip and permanent teambuilding activities.
          </span>
        </li>
      </ul>
    </BenefitWrapper>
    <div className="bg-main-color pt-10 pb-8 mt-12">
        <NameCategoryWrapper style={{ marginBottom: '2.5rem' }}>
          <div className="line bg-white"></div>
          <div className="dot border-2 border-solid border-white"></div>
          <div className="box-name">
            <div className="name text-white uppercase font-medium">
              Work environment
            </div>
          </div>
        </NameCategoryWrapper>
    </div>
  </JobsPageWrapper>
  )
}
const JobsPageWrapper = styled.div``;
export default Jobs;