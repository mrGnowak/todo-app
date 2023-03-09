import '.././styles/App.css';
import { Layout } from 'antd';
import NavBar from './NavBar';
import LoginPage from '../model_site/LoginPage';
import React from 'react';
const { Header, Content } = Layout;

function Login() {
  React.useEffect(() => {
    fetch('api/getUser', { method: 'get' })
      .then((res) => res.json())
      .then((res) => console.log('res', res));
  }, []);

  return (
    <>
      <Header>
        <NavBar />
      </Header>

      <Content style={{ padding: '0 50px' }}>
        <LoginPage />
      </Content>
    </>
  );
}

export default Login;
