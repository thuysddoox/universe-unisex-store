import CheckoutFrom from '@components/Form/Checkout';
import { Tabs } from '@ui/tabs';
// import { ChangePasswordForm } from '../../components/Form/ChangePassword';
import { useContext, useMemo } from 'react';
import ManagePurchases from './ManagePurchases';
import { Col } from 'antd';
import ProfilePhoto from './ProfilePhoto';
import HeadingSection from '@components/HeadingSection';
import { BiLogOutCircle } from 'react-icons/bi';
import { confirm } from '@ui/modal';
import { UserContext } from '../../contexts/userContext';

const TabsManageAccount = () => {
  const { logout } = useContext(UserContext);
  const handleLogout = () => {
    confirm({
      title: 'Confirm',
      content: 'Do you want to logout?',
      onOk: logout,
    });
  };
  const tabs = useMemo(
    () => [
      {
        key: 'Tab-1',
        label: 'User Information',
        children: (
          <>
            <HeadingSection title="User Information" className="my-0 capitalize pb-2" />
            <CheckoutFrom />
          </>
        ),
      },
      {
        key: 'Tab-2',
        label: 'Change Password',
        children: (
          <>
            <HeadingSection title="Change Password" className="my-0 capitalize pb-2" />
            {/* <ChangePasswordForm /> */}
          </>
        ),
      },
      {
        key: 'Tab-3',
        label: 'My Purchases',
        children: (
          <>
            <ManagePurchases />
          </>
        ),
        // <HeadingSection title="My Purchases" className="my-0 capitalize pb-2"/>
      },
      {
        key: 'Tab-4',
        label: 'My Wishlist',
        children: (
          <>
            <HeadingSection title="My Wishlist" className="my-0 capitalize pb-2" />
            <ManagePurchases />
          </>
        ),
      },
    ],
    [],
  );
  return (
    <div className="">
      <Tabs
        defaultActiveKey="tab-1"
        tabPosition={'left'}
        items={tabs}
        renderTabBar={(props, DefaultTabBar) => (
          <Col span={5} className="bg-gray-200 p-4 md:p-6 rounded-lg min-h-screen mr-5">
            <ProfilePhoto />
            <DefaultTabBar {...props} className="site-custom-tab-bar" />
            <span
              className="flex items-center mt-4 font-medium text-base cursor-pointer hover:text-blue-500"
              onClick={handleLogout}
            >
              <BiLogOutCircle className="text-2xl mr-2" />
              Logout
            </span>
          </Col>
        )}
      />
    </div>
  );
};

export default TabsManageAccount;
