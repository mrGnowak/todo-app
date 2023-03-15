import { Button, Form, Input } from 'antd';
import Title from 'antd/es/typography/Title';
import { useNavigate } from 'react-router-dom';
import { useRefreshUser, useUser } from '../UserProvider';

type ChangePassForm = {
  id: number;
  email: string;
  password: string;
  userName: string;
};

function ChangePassPage() {
  const navigate = useNavigate();
  const refreshUser = useRefreshUser();
  const sessionUser = useUser();

  const onFinish = async (values: ChangePassForm) => {
    try {
      await fetch('api/auth/changepass', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: sessionUser?.id, userName: sessionUser?.userName, password: values.password }),
      });
      navigate('/');
      refreshUser();
    } catch (e) {
      console.log('Wrong pass', e);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Title level={3}>Change password</Title>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="New password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your new password!',
            },
            {
              min: 8,
              message: 'Wrong password! Password be at least 8 characters ',
            },
            {
              pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!#$%\-_=+<>])([a-zA-Z0-9!#$%\-_=+<>]+)$/,
              message:
                'Password must contains: uppecrase letter, lovercase letter, any number 0 - 9, special characters (!#$%\\-_=+<>)',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm password"
          name="confpassword"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your new password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default ChangePassPage;
