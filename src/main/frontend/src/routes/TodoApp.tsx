import React from 'react';
import { Layout, theme } from 'antd';
import MainRender from '../model/MainRender';
import NavBar from './NavBar';

function TodoApp() {
  const { Header } = Layout;

  return (
    <>
      <Header>
        <NavBar />
      </Header>
      <MainRender />;
    </>
  );
}

export default TodoApp;
