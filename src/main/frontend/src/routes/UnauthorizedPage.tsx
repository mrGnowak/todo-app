import { Button, Result } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { useRouteError } from 'react-router-dom';
import NavBar from './NavBar';

export default function UnauthorizedPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error = useRouteError() as any;
  console.error(error);

  return (
    <>
      <Header>
        <NavBar />
      </Header>

      <Content style={{ padding: '0 50px' }}>
        <Result
          status="403"
          title="403"
          subTitle="Sorry, you are not authorized to access this page."
          extra={
            <Button type="primary" href={'/login'}>
              Log in
            </Button>
          }
        />
      </Content>
    </>
  );
}
