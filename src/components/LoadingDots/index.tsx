import styled from "@emotion/styled";

interface LoadingDotsProps {
  className?: string;
  hidden?: boolean;
  dotColor?: string;
}

export const LoadingDots = ({ className, hidden = false, dotColor = '#6b7280' }: LoadingDotsProps) => {
  return (
    <LoadingDotsWrapper className={
      `flex space-x-1 py-4 justify-center items-center ${
        hidden ? 'hidden' : ''
      } ${className}`
    }>
      <div className="p-1.5 w-3 h-3 rounded-full animate-pulse pulse-dot1" style={{ backgroundColor: dotColor }}></div>
      <div className="p-1.5 w-3 h-3 rounded-full animate-pulse pulse-dot2" style={{ backgroundColor: dotColor }}></div>
      <div className="p-1.5 w-3 h-3 rounded-full animate-pulse pulse-dot3" style={{ backgroundColor: dotColor }}></div>
    </LoadingDotsWrapper>
  );
};

export const LoadingDotsWrapper = styled.div`
  .pulse-dot1 {
    animation-duration: 1s;
  }
  .pulse-dot2 {
    animation-delay: 0.25s;
    animation-duration: 1s;
  }
  .pulse-dot3 {
    animation-delay: 0.5s;
    animation-duration: 1s;
  }
`;