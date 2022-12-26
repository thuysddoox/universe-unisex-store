import { Image } from 'antd';
import { useRouter } from 'next/router';
const Testimonial = ({
  description,
  position,
  name,
  imgUrl,
}: {
  description?: string;
  position?: string;
  name?: string;
  imgUrl?: string;
}) => {
  return (
    <div className="bg-blue-200 text-blue-500 p-5 m-4 rounded-lg flex flex-wrap items-center">
      <div className="w-full sm:w-1/3">
        <div className="flex items-center">
          <span className="inline-block border-4 border-blue-500 p-2 rounded-full"></span>
          <span className="ml-2 font-semibold text-red-500">UNIS</span>
        </div>
        <Image preview={false} width={'100%'} className="h-[100px] object-contain mx-auto w-fit my-2" src={imgUrl} />
        <p className="text-sm font-semibold text-center">{name}</p>
        <p className="text-sm font-medium text-center mb-4">UNIS, {position}</p>
      </div>
      <div className="w-full sm:w-2/3">{description}</div>
    </div>
  );
};
export default Testimonial;
