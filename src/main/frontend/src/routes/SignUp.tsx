import '.././styles/App.css';
import { Layout } from 'antd';
import NavBar from './NavBar';
import SignUpPage from '../model_site/SignUpPage';

const { Header, Content } = Layout;

function SignUp() {
  return (
    <>
      <Header>
        <NavBar />
      </Header>

      <Content style={{ padding: '0 50px' }}>
        <SignUpPage />
      </Content>
    </>
  );
}

export default SignUp;
