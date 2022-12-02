import { BellFilled, MenuOutlined, PlusCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Search } from '@ui/input';
import { Avatar, Badge } from 'antd';
import { FiMenu } from 'react-icons/fi';
import { IoAddCircleOutline } from 'react-icons/io5';

const HeaderAdmin = () => {
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
        <IoAddCircleOutline className="text-2xl mr-3" />
        <Badge count={5}>
          <BellFilled className="text-xl" />
        </Badge>
        <Avatar size={40} icon={<UserOutlined />} className="ml-5" />
      </div>
    </div>
  );
};

export default HeaderAdmin;
