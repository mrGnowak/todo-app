import '.././styles/App.css';
import { Layout } from 'antd';
import NavBar from './NavBar';
import SignUpPage from '../model_site/SignUpPage';
import LoginPage from '../model_site/LoginPage';

const { Header, Content } = Layout;

function Login() {
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
