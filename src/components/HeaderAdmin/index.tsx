import { Dropdown } from '@ui/dropdown';
import { Search } from '@ui/input';
import { Menu, MenuItem } from '@ui/menu';
import { confirm } from '@ui/modal';
import { Avatar } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { SetStateAction, useContext, useMemo } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import { UserContext } from '../../contexts/userContext';
const HeaderAdmin = ({ setIsCollapsed }: { setIsCollapsed?: React.Dispatch<SetStateAction<boolean>> }) => {
  const userContext = useContext(UserContext);
  const { currentUser } = userContext;
  const router = useRouter();
  const ACCOUNT_TABS = useMemo(
    () => [
      { url: '/account', title: 'Profile' },
      router.asPath.split('/')[1] === 'cms'
        ? { url: '/', title: 'Client Portal' }
        : { url: '/cms', title: 'Manager Portal' },
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
    [router],
  );
  const menu = useMemo(() => {
    return (
      <>
        <Menu className="py-2">
          {ACCOUNT_TABS.map((item) => (
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
  }, [ACCOUNT_TABS]);
  return (
    <div className="py-3 px-4 flex items-center sticky top-0 w-full z-10 bg-white shadow">
      <FiMenu className="mr-5 text-xl font-semibold cursor-pointer" onClick={() => setIsCollapsed((prev) => !prev)} />
      <Search
        placeholder="Search"
        size="middle"
        style={{ width: 300 }}
        bordercolor={'#333'}
        className="mx-4 search-desktop "
        onSearch={() => console.log('hrllo')}
      />
      <div className="flex-grow text-right flex items-center justify-end">
        {/* <Badge count={5}>
          <BellFilled className="text-xl" />
        </Badge> */}
        <Dropdown overlay={menu} placement="bottom">
          <span className="flex items-center justify-start cursor-pointer ">
            <span className="ml-5 text-base max-w-[80px] truncate capitalize text-blue-500">
              Hi, {currentUser?.username ?? currentUser?.lastName ?? 'User'}
            </span>
            {currentUser?.avatar ? (
              <Avatar src={currentUser?.avatar} size={40} className="ml-5" />
            ) : (
              <FaUserCircle style={{ color: 'var(--navy)', fontSize: '40px' }} className="ml-5" />
            )}
          </span>
        </Dropdown>
      </div>
    </div>
  );
};

export default HeaderAdmin;
