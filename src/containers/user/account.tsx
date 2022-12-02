import ProfileForm from '@components/Form/Profile';
import { Col, Row } from 'antd';
import ProfilePhoto from './ProfilePhoto';
import UserLayout from './userLayout';

const MyAccount = () => {
  return (
    <UserLayout title={'Profile'}>
      <Row className="justify-between">
        <Col className="w-full sm:w-1/3 lg:w-1/4">
          <ProfilePhoto />
        </Col>
        <Col className="flex-grow ml-5">
          <div className="bg-white rounded-sm p-4">
            <ProfileForm />
          </div>
        </Col>
      </Row>
    </UserLayout>
  );
};

export default MyAccount;
