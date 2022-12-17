import { ArrowRightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import styled from '@emotion/styled';
import Link from 'next/link';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import NextImage, { FixedRatioImage } from '@components/NextImage';
import { useRouter } from 'next/router';
import { Category } from '../../interfaces/common';

export const CategoryItem = ({ category, size }: { category?: Category; size?: 'large' | 'normal' }) => {
  const breakpoints = useBreakpoint();
  const router = useRouter();
  return (
    <CategoryItemWrapper>
      <Link
        href={
          `/shop/${category?.name.toLowerCase().split('/').join('&')}`
          // query: { category: category.slug },
        }
      >
        <a>
          <div className={`text-center shadow-md hover:shadow-lg shop-category relative overflow-hidden`}>
            {!breakpoints.xs && (
              <div
                className="absolute category-name tracking-wider hover:bottom-10 left-4 text-white font-medium text-xs md:text-2xl uppercase"
                style={{
                  textShadow: '2px 3px 3px rgba(0, 0, 0, 0.4)',
                }}
              >
                {category?.name}
              </div>
            )}

            {!breakpoints.xs && (
              <Button
                className="absolute z-50 left-1 bottom-2 text-base font-bold font-title opacity-0 text-white flex items-center"
                style={{
                  textShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
                }}
                type="link"
              >
                SHOP NOW <ArrowRightOutlined className="pb-1" />
              </Button>
            )}

            <FixedRatioImage ratio={size === 'large' ? [8, 9] : [16, 9]} additionHeight={size === 'large' ? 16 : 0}>
              <NextImage
                src={
                  category?.thumbnail ? category?.thumbnail : `${router.basePath}/assets/images/background/default.png`
                }
                className="absolute top-0 w-full left-0"
                layout="fill"
                objectFit="cover"
                height="100%"
                alt="Sample"
              />
            </FixedRatioImage>
            {breakpoints.xs && (
              <div
                className="absolute bottom-1 left-1 text-white text-xs font-medium text-left"
                style={{
                  textShadow: '2px 3px 3px rgba(0, 0, 0, 0.4)',
                }}
              >
                T-SHIRT
              </div>
            )}
          </div>
        </a>
      </Link>
    </CategoryItemWrapper>
  );
};

const CategoryItemWrapper = styled.div`
  .shop-category {
    > div.category-name {
      transition: all 0.3s ease-out;
      bottom: 24px;
      z-index: 51;
    }
    transition: all 0.3s ease-out;
    border-bottom-color: rgba(41, 99, 126, 0.8);
    border-top-color: rgba(41, 99, 126, 0.8);
    .ant-btn {
      z-index: 51;
      .ant-btn-primary {
        background: rgba(0, 0, 0, 0.75);
        &:hover {
          background: rgba(0, 0, 0, 1);
          color: white;
        }
      }
    }
    > div {
      transition: color 0.2s ease-out;
    }
    &:hover {
      transform: scale(1.01);
      > div.category-name {
        bottom: 40px;
      }
      .ant-btn {
        opacity: 1;
      }
      ::after {
        background-color: rgba(0, 0, 0, 0);
        background-image: linear-gradient(rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.8) 100%);
      }
    }
    ::after {
      position: absolute;
      z-index: 50;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.15);
      background-image: none;
      opacity: 1;
      transition: all 0.3s;
      content: '';
      pointer-events: none;
    }
  }
`;
