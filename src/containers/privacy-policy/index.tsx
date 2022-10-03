import styled from '@emotion/styled';
import React from 'react';
import SectionHeading from '../../components/SectionHeading';
const PrivacyPolicyWrapper = styled.div`
  .section-intro h3 {
    color: var(--blue-primary) !important;
    font-weight: bold !important;
    text-transform: uppercase !important;
    line-height: 2rem !important;
    margin-left: 0.5rem;
  }
  .description {
    p {
      margin: 1rem 0;
    }
    a,
    span,
    p {
      line-height: 2rem !important;
    }
    ul {
      list-style: disc;
      margin-left: 3rem;
      li {
        line-height: 1.8rem !important;
        font-size: 18px;
        margin: 0.5rem 0;
      }
    }
    div {
      margin: 1.5rem 0;
      h3 {
        font-size: 20px !important;
        font-weight: 600;
        position: relative;
        display: inline-block;
        padding: 0.5rem 0 !important;
        &:after {
          content: '';
          position: absolute;
          top: 100%;
          left: 0%;
          right: 50%;
          height: 1.5px;
          min-width: 80px;
          /* width: 130px; */
          background: var(--blue-primary);
        }
      }
    }
  }
`;
const PrivacyPolicy = () => {
  return (
    <PrivacyPolicyWrapper className="pt-48 sm:pt-56 md:pt-64 pb-24">
      <div className="">
        <div className="mb-16 sm:mb-0 mt-2">
          <SectionHeading mainTitle="PRIVACY POLICY" isNotAnimated={true} />
        </div>
        <div className="description lg:w-11/12 mx-auto px-4 sm:px-12 md:px-6 xl:px-16 font-normal text-blue-500 text-lg leading-8 md:leading-10">
          <div id='policy'>
            <p>
              Thank you for visiting Bluebottle Digital and its privacy policy. This privacy policy tells you how we use
              personal information collected at this site and the Bluebottle Digital apps. Please read this privacy
              policy before using the site or submitting any personal information or reports. By using the site and
              Bluebottle Digital mobile applications, you are accepting the practices described in this privacy policy.
              You are encouraged to review the privacy policy whenever you visit the site to make sure that you
              understand how any personal information you provide will be used.
            </p>
            <p>
              Note: the privacy practices set forth in this privacy policy are for this website and the Bluebottle
              Digital app only . If you link to other websites, please review the privacy policies posted at those
              sites.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium py-2">Collection of Information</h3>
            <p>
              We collect personally identifiable information, including, names, email addresses and phone numbers when
              voluntarily submitted by our visitors. The information you provide is primarily used for the purpose of
              our moderating team having the ability to verify shark reports submitted to Bluebottle Digital. You are
              under no obligation to provide us with personal information of any kind, however your refusal to do so may
              prevent you from using certain features of the site and our mobile applications.
            </p>
            <p>
              We may use the Personal Information we collect or receive through the service for the purposes identified
              below:
            </p>
            <ul>
              <li>To send email newsletters in which you will have the option to opt-out at any time.</li>
              <li>To communicate with you about your account and provide customer support.</li>
              <li>
                To provide suggestions to you and to provide tailored features within our service that optimise and
                personalise your experience.
              </li>
              <li>
                To deliver marketing information, product recommendations and non-transactional communications (e.g.,
                email, SMS, or push notifications) about us.
              </li>
            </ul>
          </div>
          <div id='refund'>
            <h3>Internet-Based Advertising</h3>
            <p>
              We may use third-party software to serve ads on the site [and our mobile application], implement email
              marketing campaigns, and manage other interactive marketing initiatives. This third-party software may use
              cookies or similar tracking technology to help manage and optimise your online experience with us.
            </p>
          </div>
          <div>
            <h3>Cookie/Tracking Technology</h3>
            <p>
              The site and app may use cookie and tracking technology depending on the features offered. Cookie and
              tracking technology are useful for gathering information such as browser type and operating system,
              tracking the number of visitors to the site, and understanding how visitors use the site. Cookies can also
              help customise the site for visitors. Personal information cannot be collected via cookies and other
              tracking technology, however, if you previously provided personally identifiable information, cookies may
              be tied to such information. Aggregate cookie and tracking information may be shared with third parties.
            </p>
          </div>
          <div>
            <h3>Distribution of Information</h3>
            <p>
              We may share information with governmental agencies or other companies assisting us in fraud prevention or
              investigation. We may do so when: (1) permitted or required by law; or, (2) trying to protect against or
              prevent actual or potential fraud or unauthorised transactions; or, (3) investigating fraud which has
              already taken place. The information is not provided to these companies for marketing purposes.
            </p>
          </div>
          <div>
            <h3>Commitment to Data Security</h3>
            <p>
              Your personally identifiable information is kept secure. Only authorised employees, agents and contractors
              (who have agreed to keep information secure and confidential) have access to this information. All emails
              and newsletters from this site allow you to opt out of further mailings.
            </p>
          </div>
          <div id='payment-shipping'>
            <h3>Updates</h3>
            <p>
              We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will
              indicate at the top of the Privacy Statement when it was last updated. Any changes or modifications will
              be effective immediately upon posting the updated Privacy Policy on the site, and you waive the right to
              receive specific notice of each such change or modification.
            </p>
          </div>
          <div>
            <h3>Still concerned?</h3>
            <p>
              If you have any questions, concerns, or comments about our privacy policy you may contact us by email{' '}
              <a href="mailto:info@bluebottle.vn" className="underline">
                info@bluebottle.vn
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </PrivacyPolicyWrapper>
  );
};
export default PrivacyPolicy;
