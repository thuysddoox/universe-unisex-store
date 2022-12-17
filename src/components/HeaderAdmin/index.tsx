import { BellFilled, MenuOutlined, PlusCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown } from '@ui/dropdown';
import { Search } from '@ui/input';
import { Avatar, Badge } from 'antd';
import { FiMenu } from 'react-icons/fi';
import { IoAddCircleOutline } from 'react-icons/io5';
import { UserContext } from '../../contexts/userContext';
import { useContext, useMemo } from 'react';
import { Menu, MenuItem } from '@ui/menu';
import Link from 'next/link';
import { confirm } from '@ui/modal';
const HeaderAdmin = () => {
  const userContext = useContext(UserContext);
  const { currentUser } = userContext;
  const ACCOUNT_TABS = useMemo(
    () => [
      { url: '/account', title: 'Profile' },
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
      <FiMenu className="mr-5 text-xl font-semibold cursor-pointer" />
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
            <Avatar size={40} icon={<UserOutlined />} className="ml-5" />
          </span>
        </Dropdown>
      </div>
    </div>
  );
};

export default HeaderAdmin;
