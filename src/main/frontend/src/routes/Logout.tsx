import '.././styles/App.css';
import { Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useRefreshUser } from '../UserProvider';
import React from 'react';
const { Content } = Layout;

export default function Logout() {
  const navigate = useNavigate();
  const refreshUser = useRefreshUser();

  React.useEffect(() => {
    const logout = async () => {
      try {
        await fetch('api/auth/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (e) {
        console.warn(`Logout exception ${e}`);
      } finally {
        navigate('/');
        refreshUser();
      }
    };
    logout();
  }, [navigate, refreshUser]);

  return <Content style={{ padding: '0 50px' }}>Logging out...</Content>;
}
