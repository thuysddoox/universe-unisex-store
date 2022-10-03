import React, { useMemo } from 'react';
import styled from "@emotion/styled";
import Image, {ImageProps as NextImageProps} from "next/image";
import { SafeAny } from '@interfaces/common';
interface ImageProps extends NextImageProps {
    width?: number | string;
    height?: number | string;
    containerClass?: string;
    src: string;
}

const NextImage = React.forwardRef<SafeAny,ImageProps>(({containerClass, ...rest}: ImageProps, ref)=> {
    return (
        <ImageWrapper className={containerClass} ref={ref}>
            <Image {...rest} />
        </ImageWrapper>
    )
})
export const FixedRatioImage = ({
    ratio,
    additionHeight = 0,
    className = '',
    children,
    maxWidth = 'auto',
    maxHeight = 'auto',
    onContainerClick,
    style = {},
  }: {
    ratio: [number, number];
    additionHeight?: number;
    className?: string;
    children?: React.ReactNode;
    maxWidth?: string;
    maxHeight?: string;
    style?: React.CSSProperties;
    onContainerClick?: () => void;
  }) => {
    const paddingValue = useMemo(() => (ratio[1] / ratio[0]) * 100, [ratio]);
    return (
      <div
        className={`w-full m-auto ${className}`}
        style={{ maxHeight, maxWidth, ...style }}
      >
        <div
          className={`relative`}
          onClick={onContainerClick}
          style={{ paddingTop: `calc(${paddingValue}% + ${additionHeight}px)` }}
        >
          {children}
        </div>
      </div>
    );
  };
const ImageWrapper = styled.div`
    img{
        min-width: 100%!important;
        width: auto!important;
        object-fit: contain;
        object-position: center;
        margin: 0!important;
        height: unset!important;
    }
`

export default NextImage;