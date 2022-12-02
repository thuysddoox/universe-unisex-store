import { CloseOutlined, DownOutlined, MenuOutlined } from '@ant-design/icons';
import NextImage from '@components/NextImage';
import SignupLoginModal from '@components/SignupLoginModal';
import { useBreakpoints, UserContext } from '@contexts';
import styled from '@emotion/styled';
import Button from '@ui/button';
import { Drawer } from '@ui/drawer';
import { Dropdown } from '@ui/dropdown';
import { Search } from '@ui/input';
import { Menu, MenuItem } from '@ui/menu';
import { confirm } from '@ui/modal';
import { Badge, MenuProps } from 'antd';
import { isEmpty } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useMemo, useState } from 'react';
import { AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { UserPopupType } from '../../interfaces/common';
import { useQueryCart } from '../../network/queries/cart';
export type MenuItem = Required<MenuProps>['items'][number];

export function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}
function Label({ title, url, isSuper }: { title: string; url?: string; isSuper?: boolean }) {
  return url ? (
    <Link href={url} passHref>
      <a className="text-base uppercase">
        {title}
        {isSuper && <DownOutlined style={{ fontSize: '12px', marginLeft: '0.875rem' }} />}
      </a>
    </Link>
  ) : (
    <span>
      {title}
      {isSuper && <DownOutlined style={{ fontSize: '12px', marginLeft: '0.875rem' }} />}
    </span>
  );
}
export function Header() {
  const [isScroll, setIsScroll] = useState<boolean>(false);
  const [showSearchPopUp, setShowSearchPopUp] = useState<boolean>(false);
  const [showIconSearch, setShowIconSearch] = useState<boolean>(false);
  const { width, mobileMode } = useBreakpoints();
  const [isDesktop, setIsDesktop] = useState<boolean>(width > 992);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isHome, setIsHome] = useState<boolean>(true);
  const [isShowLoginSignup, setIsShowLoginSignup] = useState<boolean>(false);
  const [typePopup, setTypePopup] = useState<UserPopupType>('login');
  const router = useRouter();
  const userContext = useContext(UserContext);
  const items: MenuItem[] = useMemo(
    () => [
      getItem(<Label title="Shop" url="/shop" />, 'shop'),
      getItem(<Label title="Sale" url="/sale" />, 'sale'),
      getItem(<Label title="Categories" url="/category" isSuper />, 'category', null, [
        getItem(<Label title="T-Shirt" url="/category/t-shirt" />, 't-shirt'),
        getItem(<Label title="Shirt" url="/category/shirt" />, 'shirt'),
        getItem(<Label title="Hoodie/Sweater" url="/category/t-shirt" />, 'Hoodie/Sweater'),
        getItem(<Label title="Jacket" url="/category/t-shirt" />, 'Jacket'),
        getItem(<Label title="Jeans/Pants" url="/category/t-shirt" />, 'Jeans/Pants'),
        getItem(<Label title="Short" url="/category/t-shirt" />, 'Short'),
        // getItem(<Label title="Accessories" url="/category/accessories" />, 'Accessories'),
        // getItem(<Label title="Other" url="/category/other" />, 'Other'),
      ]),
      getItem(<Label title="About us" url="/about" isSuper />, 'about', null, [
        getItem(<Label title="Us" url="/about" />, 'us'),
        getItem(<Label title="Jobs" url="/jobs" />, 'jobs'),
        getItem(<Label title="Contact" url="/contact" />, 'contact'),
      ]),
    ],
    [],
  );
  const ACCOUNT_TABS = useMemo(
    () => [
      { url: '/account', title: 'Profile' },
      { url: '/favourite', title: 'My Favorites' },
      { url: '/purchases', title: 'Purchases' },
      {
        title: 'Change Password',
        handleClick: () => {
          setTypePopup('changepassword');
          setIsShowLoginSignup(true);
        },
      },
      {
        title: 'Logout',
        handleClick: () => {
          confirm({
            title: 'Confirm',
            content: 'Do you want to logout?',
            onOk: userContext.logout,
          });
        },
      },
    ],
    [],
  );
  const isLoggedIn = useMemo(() => {
    if (userContext.contextLoaded) {
      const user = userContext.currentUser;
      return !!user;
    }
    return false;
  }, [userContext.contextLoaded, userContext.currentUser]);

  const handleScroll = () => {
    if (typeof Window !== undefined) {
      window.scrollY >= 30 && !isScroll ? setIsScroll(true) : window.scrollY < 30 && isScroll ? setIsScroll(false) : '';
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
  useEffect(() => {
    if (width > 992 && width <= 1200) setShowIconSearch(true);
    else setShowIconSearch(false);
    width > 992 ? setIsDesktop(true) : setIsDesktop(false);
  }, [width]);
  useEffect(() => {
    if (router.asPath === '/') !isHome && setIsHome(true);
    else isHome && setIsHome(false);
  }, [router.pathname]);

  return (
    <HeaderWrapper
      className={`z-[55] w-full transition-all fixed ${isScroll || !isHome ? 'text-white bg-blue-500 ' : 'py-2'}`}
    >
      <div className="flex justify-between container items-center flex-wrap">
        <span onClick={() => setIsOpened(true)} className="block lg:hidden">
          {isOpened ? (
            <CloseOutlined style={{ fontSize: '22px', color: '#fff' }} />
          ) : (
            <MenuOutlined style={{ fontSize: '22px', color: '#fff' }} />
          )}
        </span>
        <Link href="/" passHref>
          <a className="flex-grow lg:flex-grow-0">
            <NextImage
              src={`${router.basePath}/assets/images/logo/logo.png`}
              layout="fill"
              containerClass="h-12 relative w-40 mx-auto lg:m-0"
            />
          </a>
        </Link>
        <div className="w-0 lg:w-auto overflow-hidden">
          <Menu mode="horizontal" items={items} className="w-max" defaultSelectedKeys={[router.route.split('/')[1]]} />
        </div>
        <div className="hidden lg:flex items-center">
          <div className="relative">
            <Search
              placeholder="Search"
              size="large"
              style={{ width: 220 }}
              bordercolor={'#fff'}
              className="mx-4 search-desktop"
              onSearch={() => (showIconSearch ? setShowSearchPopUp(true) : '')}
            />
            {showSearchPopUp && (
              <Search
                autoFocus={true}
                placeholder="Search"
                size="large"
                style={{ width: 220 }}
                bordercolor={'#fff'}
                className="absolute mx-4 search-popup"
                onSearch={(value) => console.log(value)}
                onBlur={() => setShowSearchPopUp(false)}
              />
            )}
          </div>
          {isLoggedIn ? (
            <Account tabs={ACCOUNT_TABS} />
          ) : (
            <Button
              className="text-white border-white btn-login hidden md:block"
              onClick={() => {
                setIsShowLoginSignup(true);
              }}
            >
              Login / Signup
            </Button>
          )}
        </div>
      </div>
      <Drawer
        title={<Title />}
        placement="left"
        bodyStyle={{ padding: '1rem' }}
        width={mobileMode ? '60%' : '45%'}
        onClose={() => setIsOpened(false)}
        open={isOpened && !isDesktop}
        className="nav-bar"
      >
        <Search
          placeholder="Search"
          size="large"
          style={{ width: '90%' }}
          bordercolor={'var(--light-gray-4)'}
          className="m-4"
          onSearch={(value) => console.log(value)}
        />
        <Menu
          mode="inline"
          items={[getItem(<Label title="Home" url="/" />, 'home'), ...items]}
          defaultSelectedKeys={[router.route.split('/')[1]]}
          className="w-full"
        />
      </Drawer>
      <SignupLoginModal
        visible={isShowLoginSignup}
        setVisible={setIsShowLoginSignup}
        {...(typePopup && { type: typePopup })}
      />
    </HeaderWrapper>
  );
}
const Title = ({
  setIsShowLoginSignup,
  isShowLoginSignup,
}: {
  isShowLoginSignup?: boolean;
  setIsShowLoginSignup?: (isShowLoginSignup: boolean) => void;
}) => {
  const userContext = useContext(UserContext);
  const userCurrent = userContext.currentUser;

  return (
    <div
      className="flex items-center"
      onClick={() => {
        setIsShowLoginSignup(!isShowLoginSignup);
      }}
    >
      <FaUserCircle style={{ color: 'var(--navy)', fontSize: '40px' }} />
      <span className="ml-2 text-base cursor-pointer w-[120px] md:w-[200px] truncate capitalize">
        {isEmpty(userCurrent) ? 'LOGIN/SIGNUP' : userCurrent?.username}
      </span>
    </div>
  );
};
interface Tab {
  title: string;
  url?: string;
  handleClick?: () => void;
}
const Account = ({ tabs }: { tabs: Tab[] }) => {
  const userContext = useContext(UserContext);
  const userCurrent = userContext.currentUser;
  const { data: CartResp, refetch } = useQueryCart();
  const menu = useMemo(() => {
    return (
      <>
        <Menu className="py-2">
          {tabs.map((item) => (
            <MenuItem key={item.title} onClick={item?.handleClick}>
              {item.url ? (
                <Link href={item.url} passHref>
                  <a className="p-1">{item.title}</a>
                </Link>
              ) : (
                <span className="p-1">{item.title}</span>
              )}
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  }, [tabs]);
  console.log(CartResp);
  useEffect(() => {
    refetch();
  }, [userCurrent]);
  return (
    <>
      <Link href="/cart" passHref>
        <a className="ml-5 mr-2 flex">
          <Badge count={CartResp?.data?.responseData?.products?.length ?? 0} overflowCount={5}>
            <AiOutlineShoppingCart style={{ color: '#ffff', fontSize: '30px' }} />
          </Badge>
        </a>
      </Link>
      {/* <Link href="/account" passHref> */}
      <Dropdown overlay={menu} placement="bottom">
        <span className="flex items-center justify-start cursor-pointer ">
          <span className="ml-5 mr-2 text-base max-w-[80px] truncate capitalize text-white">
            {userCurrent?.username ?? userCurrent?.lastName ?? 'User'}
          </span>
          <span className=" border-2 border-white rounded-full p-1">
            <AiOutlineUser style={{ color: '#ffff', fontSize: '20px' }} />
          </span>
        </span>
      </Dropdown>
      {/* </Link> */}
    </>
  );
};

const HeaderWrapper = styled.div`
  .ant-menu-horizontal > .ant-menu-item a,
  .ant-menu-overflow-item,
  .btn-login span {
    color: #fff;
  }
  input {
    border-color: #fff !important;
  }
  .btn-login.border-white button {
    border: 2px solid #fff !important;
  }
  .ant-menu-item {
    margin: 0 0.25rem;
  }
  button {
    font-size: 16px !important;
  }
  .btn-login:hover {
    button {
      background-color: #fff !important;
    }
    span {
      color: var(--navy) !important;
    }
  }
  .ant-input-search-button {
    background-color: #fff !important;
  }
  .search-popup {
    transform: translate(-78%, 16px);
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
    border-radius: 30px;
    &:before {
      position: absolute;
      content: '';
      right: 20px;
      top: -15px;
      border: 8px solid;
      border-color: transparent transparent #fff transparent;
      filter: drop-shadow(1px 1px 5px rgba(0, 0, 0, 0.4));
    }
  }

  @media (max-width: 1200px) and (min-width: 992px) {
    .search-desktop.ant-input-search {
      width: auto !important;
      .ant-input-search-button {
        border: 1px solid #fff !important;
        border-radius: 50% !important;
      }
      input {
        display: none;
      }
    }
  }
`;
