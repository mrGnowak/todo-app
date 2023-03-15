import { Content, Header } from 'antd/es/layout/layout';
import { useRouteError } from 'react-router-dom';
import NavBar from './NavBar';

export default function ErrorPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error = useRouteError() as any;
  console.error(error);

  return (
    <>
      <Header>
        <NavBar />
      </Header>

      <Content style={{ padding: '0 50px' }}>
        <div id="error-page">
          <h1>Oops!</h1>
          <p>Sorry, an unexpected error has occurred.</p>
          <p>
            <i>{error.statusText || error.message}</i>
          </p>
        </div>
      </Content>
    </>
  );
}
