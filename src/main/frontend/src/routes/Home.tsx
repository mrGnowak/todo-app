import '.././styles/App.css';
import { Layout } from 'antd';
import NavBar from './NavBar';

const { Header, Content } = Layout;

function Home() {
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
