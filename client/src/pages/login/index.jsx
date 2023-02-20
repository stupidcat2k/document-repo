import { Form, Input, Button } from 'antd'
import { login } from '../../utils/auth';
import Router from 'next/router';

const LoginForm = () => {

  const onFinish = async (values) => {
    await login(values.username,values.password);
    return Router.push('/');
  };

  return (
    <Form className="login-form" onFinish={onFinish}>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
}



export default LoginForm;