import '.././styles/App.css';
import { Layout } from 'antd';
import NavBar from './NavBar';
import HomePage from '../model_site/HomePage';

const { Header, Content } = Layout;

function Home() {
  return (
    <>
      <Header>
        <NavBar />
      </Header>

      <Content style={{ padding: '0 50px' }}>
        <HomePage />
      </Content>
    </>
  );
}

export default Home;
