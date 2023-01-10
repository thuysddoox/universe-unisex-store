import ProfileForm from '@components/Form/Profile';
import { Col, Row } from 'antd';
import ProfilePhoto from './ProfilePhoto';
import UserLayout from './userLayout';

const MyAccount = () => {
  return (
    <UserLayout title={'Profile'}>
      <Row className="justify-between flex-wrap">
        <Col className="w-full md:w-1/3 lg:w-1/4">
          <ProfilePhoto />
        </Col>
        <Col className="w-full pt-6 md:pt-0 md:pl-5 md:w-2/3 lg:w-3/4">
          <div className="bg-white rounded-sm p-4">
            <ProfileForm />
          </div>
        </Col>
      </Row>
    </UserLayout>
  );
};

export default MyAccount;
