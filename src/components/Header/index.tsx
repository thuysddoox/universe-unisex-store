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
import { Avatar, Badge, Grid, MenuProps } from 'antd';
import { isEmpty } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useMemo, useState } from 'react';
import { AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { UserPopupType } from '../../interfaces/common';
import { useQueryCart } from '../../network/queries/cart';
import OrderItem from '@components/OrderItem';
import SimpleBar from 'simplebar-react';
import NoResults from '@components/NoResults';
export type MenuItem = Required<MenuProps>['items'][number];
const { useBreakpoint } = Grid;
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
        getItem(<Label title="Hoodie/Sweater" url="/category/hoodie&sweater" />, 'Hoodie/Sweater'),
        getItem(<Label title="Jacket" url="/category/jacket" />, 'Jacket'),
        getItem(<Label title="Jeans/Pants" url="/category/jeans&pants" />, 'Jeans/Pants'),
        getItem(<Label title="Short" url="/category/short" />, 'Short'),
        getItem(<Label title="Accessories" url="/category/accessories" />, 'Accessories'),
        // getItem(<Label title="Other" url="/category/other" />, 'Other'),
      ]),
      getItem(<Label title="About us" url="/about" isSuper />, 'about', null, [
        getItem(<Label title="Us" url="/about" />, 'us'),
        // getItem(<Label title="Jobs" url="/jobs" />, 'jobs'),
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
      { url: '/cms', title: 'Manager Portal' },
      { url: '/', title: 'Client Portal' },
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
  const handleSearch = (value) => {
    router.push(
      {
        pathname: '/search',
        query: {
          keyword: value,
        },
      },
      '/search',
    );
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
              onSearch={(value) => (showIconSearch ? setShowSearchPopUp(true) : handleSearch(value))}
            />
            {showSearchPopUp && (
              <Search
                autoFocus={true}
                placeholder="Search"
                size="large"
                style={{ width: 220 }}
                bordercolor={'#fff'}
                className="absolute mx-4 search-popup"
                onSearch={handleSearch}
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
        title={<Title isShowLoginSignup={isShowLoginSignup} setIsShowLoginSignup={setIsShowLoginSignup} />}
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
          onSearch={handleSearch}
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
  const { currentUser } = useContext(UserContext);

  return (
    <div
      className="flex items-center"
      onClick={() => {
        setIsShowLoginSignup(!isShowLoginSignup);
      }}
    >
      {currentUser?.avatar ? (
        <Avatar src={currentUser?.avatar} size={40} />
      ) : (
        <FaUserCircle style={{ color: 'var(--navy)', fontSize: '40px' }} />
      )}
      <span className="ml-2 text-base cursor-pointer w-[120px] md:w-[200px] truncate capitalize">
        {isEmpty(currentUser) ? 'LOGIN/SIGNUP' : currentUser?.username}
      </span>
    </div>
  );
};
interface Tab {
  title: string;
  url?: string;
  handleClick?: () => void;
}

export const Account = ({ tabs }: { tabs: Tab[] }) => {
  const userContext = useContext(UserContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const screens = useBreakpoint();
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
  useEffect(() => {
    userCurrent && refetch();
  }, [userCurrent]);
  return (
    <>
      <span className="px-3 flex items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <Badge count={CartResp?.data?.responseData?.products?.length ?? 0} overflowCount={5}>
          <AiOutlineShoppingCart style={{ color: '#ffff', fontSize: '30px' }} />
        </Badge>
      </span>
      <Drawer
        placement="right"
        bodyStyle={{ padding: '1rem' }}
        width={screens.lg ? '45vw' : screens.md ? '60vw' : screens.sm ? '65vw' : '85vw'}
        onClose={() => setIsOpen(false)}
        open={isOpen}
        className="nav-bar"
      >
        {CartResp?.data?.responseData?.products?.length > 0 ? (
          <SimpleBar style={{ maxHeight: '100vh' }}>
            {CartResp?.data?.responseData?.products?.map((cartItem, index) => (
              <OrderItem data={cartItem} key={cartItem?.product?._id + index} refetchCart={refetch} isDropdown={true} />
            ))}
          </SimpleBar>
        ) : (
          <NoResults description="No product in cart" />
        )}
        <div className="text-right">
          <Link href="/cart" passHref>
            <a className="text-center underline inline-block mx-auto py-2">See all</a>
          </Link>
        </div>
      </Drawer>
      {/* <Link href="/account" passHref> */}
      <Dropdown overlay={menu} placement="bottom">
        <span className="flex items-center justify-start cursor-pointer ">
          <span className="ml-5 mr-2 text-base max-w-[80px] truncate capitalize text-white">
            {userCurrent?.username ?? userCurrent?.lastName ?? 'User'}
          </span>
          {userCurrent?.avatar ? (
            <Avatar src={userCurrent?.avatar} size={40} />
          ) : (
            <span className=" border-2 border-white rounded-full p-1">
              <AiOutlineUser style={{ color: '#ffff', fontSize: '20px' }} />
            </span>
          )}
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
