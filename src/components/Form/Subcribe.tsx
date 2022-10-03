import Form, { useForm } from '../../ui/form';
import Input from '../../ui/input';
import Button from '../../ui/button';
import { Col, Row } from 'antd';
import FormItem from '@ui/formitem';
const SubcribeForm = () => {
  const [form] = useForm();
  return (
    <Form name="subcribe" form={form}>
      <Row>
        <Col span={12}>
          <FormItem
            name="firstname"
            required={true}
            rules={[{ required: true, message: 'Please input your first name!' }]}
            className="ml-0 md:ml-2 m-2"
          >
            <Input type="text" placeholder="First Name" borderradius={'0px'} />
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem
            name="lastname"
            required={true}
            rules={[{ required: true, message: 'Please input your last name!' }]}
            className="m-2"
          >
            <Input type="text" placeholder="Last Name" borderradius={'0px'} />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col className="flex-grow">
          <FormItem
            name="email"
            required={true}
            rules={[
              { required: true, message: 'Please input your email address!' },
              { pattern: /\S+@\S+\.\S+/, message: 'Email address is invalid!' },
            ]}
            className="ml-0 md:ml-2 m-2"
          >
            <Input type="email" placeholder="Email Adress" borderradius={'0px'} />
          </FormItem>
        </Col>
        <Col>
          <Button borderradius={'0px'} lineheight={'26px'} containerClass="m-2 bg-[#808080]" textcolor={'#fff'} htmlType="submit">
            Subscribe
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
export default SubcribeForm;
