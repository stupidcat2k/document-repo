
import Button from '@/components/Button';
import { useLoading } from '@/hooks/LoadingHook';
import { useNotify } from '@/hooks/NotificationHook';
import { loginAction } from '@/redux/authAction';
import { selectAuthenticated } from '@/redux/authSelectors';
import { Form, Input, Alert, Layout } from 'antd';
import Router from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const LoginForm = () => {
  const notify = useNotify();
  const isAuthenticated = useSelector(selectAuthenticated);
  const dispatch = useDispatch();
  const [showLoading, hideLoading] = useLoading();

  useEffect(() => {
    if (isAuthenticated) {
      Router.push("/");
    }
  }, [ isAuthenticated ]);

  const onFinish = async (values) => {
    try {
      showLoading();
      const { success, message } = await dispatch(loginAction(values)).unwrap();
      if (success) {
        Router.push("/");
      } else {
        notify("error", message);
      }
    } finally {
      hideLoading();
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Form
        name='basic'
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete='off'
      >
        <Form.Item
          label='Username'
          name='username'
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        {isAuthenticated  ? (
            <Alert
              message='Invalid username or password'
              type='error'
              showIcon
            />
          ) : null}
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            type='submit'
            className='bg-primary text-white px-5 py-2 opacity-100 rounded hover:opacity-90'
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>

  );
}



export default LoginForm;