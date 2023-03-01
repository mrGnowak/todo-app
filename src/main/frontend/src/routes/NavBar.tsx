import { useState } from 'react';
import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

const items: MenuProps['items'] = [
  {
    label: <a href="/">Home</a>,
    key: 'home',
    icon: <AppstoreOutlined />,
  },
  {
    label: <a href="/todoapp">TodoApp</a>,
    key: 'todoApp',
    icon: <SettingOutlined />,
  },
  {
    label: 'Log in',
    key: 'login',
  },
  {
    label: 'Sign up',
    key: 'signin',
  },
];

function NavBar() {
  const [current, setCurrent] = useState('mail');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
}

export default NavBar;
