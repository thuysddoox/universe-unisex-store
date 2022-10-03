import styled from '@emotion/styled';
import Link from 'next/link';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
const HeadingSection = ({ title, link, mode,className }: { title?: string; link?: string; mode?: string,className?: string }) => {
  return (
    <HeadingSectionWrap>
      <div className={`flex flex-wrap justify-between items-center my-8 uppercase ${mode === 'center' ? 'flex-col' : ''} ${className}`}>
        <h3 className="font-semibold text-lg sm:text-3xl text-blue-500">{title}</h3>
        {link && (
          <Link href={link} passHref>
            <a className="text-blue-600 flex items-center text-sm font-medium p-2">
              <span className='mr-2'>View all</span> <HiOutlineArrowNarrowRight className="text-blue-600 transition-all" />
            </a>
          </Link>
        )}
      </div>
    </HeadingSectionWrap>
  );
};
const HeadingSectionWrap = styled.div`
  a:hover {
    text-decoration: underline;
    svg{
      margin-right: -0.8rem;
    }
  }
`;
export default HeadingSection;
