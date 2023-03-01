import { Button, Checkbox, Form, Input } from 'antd';
import Paragraph from 'antd/es/skeleton/Paragraph';
import Title from 'antd/es/typography/Title';
import { useForm, SubmitHandler } from 'react-hook-form';

interface IFormInput {
  userName: string;
  email: string;
  password: string;
  confPassword: number;
}

export default function SignUpPage() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  //const onFinish = (values: any) => {
  //  console.log('Success:', values);
  //};

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
        onFinish={handleSubmit(onSubmit)}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            { required: true, message: 'Please input your username!' },
            { max: 20, message: 'Wrong username!' },
          ]}
        >
          <Input {...register('userName')} />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please input your E-mail!' },
            { type: 'email', message: 'The input is not valid E-mail!' },
          ]}
        >
          <Input {...register('email')} />
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
                'Wrong password! Password must contains: uppecrase letter, lovercase letter, any number 0 - 9, special characters: (~!@#$%^&*_-+=`|\\(){}[]:;"\'<>,.?/)',
            },
          ]}
          hasFeedback
        >
          <Input.Password {...register('password')} />
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
          <Input.Password {...register('confPassword')} />
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
