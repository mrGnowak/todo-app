import { Layout } from 'antd';
import MainRender from '../model_todoapp/MainRender';
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
