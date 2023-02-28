import React from 'react';
import '.././styles/App.css';
import { Layout, theme } from 'antd';
import NavBar from './NavBar';

const { Header, Content, Footer } = Layout;

function Home() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Header>
        <NavBar />
      </Header>

      <Content style={{ padding: '0 50px' }}>
        <h1 style={{ color: 'white' }}>Strona Domowa</h1>
      </Content>
    </>
  );
}

export default Home;
