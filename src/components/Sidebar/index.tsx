import {
  BarChartOutlined,
  DollarOutlined,
  LeftCircleOutlined,
  PictureOutlined,
  ShopOutlined,
  SolutionOutlined,
} from '@ant-design/icons';
import { getItem, MenuItem } from '@components/Header';
import NextImage from '@components/NextImage';
import { ROUTES } from '@constants/routes';
import { Menu, MenuTheme } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AiOutlineLogout, AiOutlineStar } from 'react-icons/ai';
const NavItem = ({ label, url }: { label: string; url?: string; handleClick?: () => void }) => {
  return url ? (
    <Link href={url} passHref>
      <a>{label}</a>
    </Link>
  ) : (
    <span>{label}</span>
  );
};
const items: MenuItem[] = [
  getItem(<NavItem label="Statistic" url={ROUTES.CMS} />, 'cms', <BarChartOutlined />),
  getItem(<NavItem label="Products" url={ROUTES.CMS_PRODUCTS} />, 'products', <ShopOutlined />),
  getItem(<NavItem label="Orders" url={ROUTES.CMS_ORDER} />, 'orders', <DollarOutlined />),
  getItem(<NavItem label="Rate&Reviews" url={ROUTES.CMS_RATE} />, 'Reviews', <AiOutlineStar />),
  getItem(<NavItem label="Users" url={ROUTES.CMS_USER} />, 'users', <SolutionOutlined />),
  getItem(<NavItem label="Adverstiment" url={ROUTES.CMS_AD} />, 'advertisement', <PictureOutlined />),
  getItem(<NavItem label="Logout" />, '6', <AiOutlineLogout />),
];
const Sidebar = () => {
  const [theme, setTheme] = useState<MenuTheme>('dark');
  const router = useRouter();
  const changeTheme = (value: boolean) => {
    setTheme(value ? 'dark' : 'light');
  };

  return (
    // <div className="sticky z-10 top-0 h-screen">
    <div className="sticky z-10 top-0 h-screen flex flex-col bg-[#001529]">
      <Link href="/" passHref>
        <a className="bg-[#001529] p-3">
          <NextImage
            src={`${router.basePath}/assets/images/logo/logo.png`}
            layout="fill"
            containerClass="h-10 relative mx-auto"
          />
        </a>
      </Link>
      <Menu
        theme="dark"
        style={{ width: 200 }}
        defaultSelectedKeys={[router.route.split('/')[2] || router.route.split('/')[1]]}
        mode="inline"
        items={items}
        className="flex-grow"
      />
      <LeftCircleOutlined className="text-white text-3xl flex-grow text-right mr-6 cursor-pointer" />
    </div>
  );
};

export default Sidebar;
