import '.././styles/App.css';
import { Layout } from 'antd';
import NavBar from './NavBar';
import ChangePassPage from '../model_site/ChangePassPage';

const { Header, Content } = Layout;

function ChangePass() {
  return (
    <>
      <Header>
        <NavBar />
      </Header>

      <Content style={{ padding: '0 50px' }}>
        <ChangePassPage />
      </Content>
    </>
  );
}

export default ChangePass;
