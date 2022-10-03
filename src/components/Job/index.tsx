import Link from 'next/link';
import { useRouter } from 'next/router';
import { BsArrowRight } from 'react-icons/bs';

const JobItem = ({ stt, arrowButton, displayDate }: { stt?: number; arrowButton?: boolean; displayDate?: boolean }) => {
  return (
    <div className="flex flex-wrap justify-start items-center text-blue-900 border-gray-400 border-b py-4 relative">
      <span className="font-medium text-base md:text-lg">{`0${stt + 1}`.slice(-2)}</span>
      <div className={`${displayDate ? 'px-6 sm:px-8 w-3/5' : 'px-10 w-11/12'}`}>
        <h3 className="font-medium text-base md:text-lg pb-2 capitalize">sdfdsfdf</h3>
        <div className="flex justify-between items-left">
          <span className="salary">Salary: sàdafdf</span>
          <span className="experience">Exp: sadfsdf</span>
        </div>
      </div>
      {displayDate && (
        <span className="text-gray-500 text-sm flex-1 text-center">{new Date('03/03/2020').toLocaleDateString()}</span>
      )}

      {arrowButton ? (
        <Link href="/careers/[id]">
          <span
            className={`btn-apply transition-all inline-block cursor-pointer absolute right-0
            `}
          >
            <BsArrowRight />
          </span>
        </Link>
      ) : (
        <Link href="/careers/[id]" passHref>
          <a
            className={`bg-blue-500 transition-all rounded-lg text-white px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-base mb-mt-1`}
          >
            Apply
          </a>
        </Link>
      )}
    </div>
  );
};
export default JobItem;
