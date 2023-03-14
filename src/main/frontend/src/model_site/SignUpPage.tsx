import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, notification } from 'antd';
import Title from 'antd/es/typography/Title';
import { NotificationPlacement } from 'antd/es/notification/interface';

type SignInForm = {
  userName: string;
  email: string;
  password: string;
};

export default function SignUpPage() {
  //const [api, contextHolder] = notification.useNotification();
  const [response, setResponse] = useState<string | undefined>();

  const save = (values: SignInForm) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userName: values.userName, email: values.email, password: values.password }),
    };
    fetch('api/auth/register', requestOptions)
      .then((response) => response.text())
      .then((data) => {
        setResponse(data);
      });
    //.then(() => openNotification('topLeft', response));
  };

  //const openNotification = (placement: NotificationPlacement, newResponse: string | undefined) => {
  //  api.info({
  //    message: 'Notification',
  //    description: newResponse,
  //    placement,
  //  });
  //};
  const onFinish = (values: SignInForm) => {
    console.log('Success:', values);
    save(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Title level={3}>SIGN UP</Title>
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
          label="Username"
          name="userName"
          rules={[
            { required: true, message: 'Please input your username!' },
            { max: 20, message: 'Username too long!' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please input your E-mail!' },
            { type: 'email', message: 'The input is not valid E-mail!' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
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
              message: 'Please confirm your password!',
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
        <Form.Item
          name="agreement"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
            },
          ]}
        >
          <Checkbox>
            I have read the <a href="">agreement</a>
          </Checkbox>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
        <Form wrapperCol={{ offset: 8, span: 16 }}>{response}</Form>
      </Form>
    </>
  );
}
