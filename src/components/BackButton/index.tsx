import styled from "@emotion/styled";
import { useRouter } from "next/router";
import {AiOutlineLeft} from "react-icons/ai";
const BackButton = ()=>{
  const router = useRouter();
  const handleBack = ()=>{
    router.back();
  }
  return (
    <BackButtonWrapper className='inline-flex items-center text-lg sm:text-xl font-medium transition-all cursor-pointer' onClick={handleBack} >
      <AiOutlineLeft className="text-2xl sm:text-3xl"/>
      <span className="ml-2"> Back</span>
    </BackButtonWrapper>
  )
}
const BackButtonWrapper = styled.div`
  &:hover{
    margin-left: -0.75rem;
  }
`;
export default BackButton;