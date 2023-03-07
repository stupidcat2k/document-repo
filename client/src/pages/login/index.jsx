
import { Button } from '@/components';
import { STATUS_TYPE } from '@/core/Constants';
import { useLoading } from '@/hooks/LoadingHook';
import { useNotify } from '@/hooks/NotificationHook';
import { loginAction } from '@/redux/authAction';
import { selectAuthenticated } from '@/redux/authSelectors';
import { Form, Input } from 'antd';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector, } from 'react-redux';

const LoginForm = () => {
  const notify = useNotify();
  const isAuthenticated = useSelector(selectAuthenticated);
  const dispatch = useDispatch();
  const [showLoading, hideLoading] = useLoading();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [ isAuthenticated ]);

  const onFinish = async (values) => {
    try {
      showLoading();
      const { success, message } = await dispatch(loginAction(values)).unwrap();
      if (success) {
        router.push('/');
      } else {
        notify(STATUS_TYPE.ERROR, message);
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