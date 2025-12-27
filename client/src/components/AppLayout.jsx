import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  RocketOutlined,
  BookOutlined,
  QuestionCircleOutlined,
  FileTextOutlined,
  LineChartOutlined,
  TrophyOutlined,
  LogoutOutlined
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

function AppLayout({ children, user, onLogout, selectedKey }) {
  const navigate = useNavigate();

  const menuItems = [
    {
      key: 'dashboard',
      icon: <RocketOutlined />,
      label: 'Dashboard',
      onClick: () => navigate('/dashboard')
    },
    {
      key: 'learning-path',
      icon: <BookOutlined />,
      label: 'Learning Path',
      onClick: () => navigate('/learning-path')
    },
    {
      key: 'doubt-solver',
      icon: <QuestionCircleOutlined />,
      label: 'Doubt Solver',
      onClick: () => navigate('/doubt-solver')
    },
    {
      key: 'assignments',
      icon: <FileTextOutlined />,
      label: 'Assignments',
      onClick: () => navigate('/assignments')
    },
    {
      key: 'performance',
      icon: <LineChartOutlined />,
      label: 'Performance',
      onClick: () => navigate('/performance')
    }
  ];

  if (user && (user.role === 'admin' || user.role === 'teacher')) {
    menuItems.push({
      key: 'admin',
      icon: <TrophyOutlined />,
      label: 'Admin Panel',
      onClick: () => navigate('/admin')
    });
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} style={{ background: '#fff' }}>
        <div style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h3>🎓 EduAI</h3>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          style={{ borderRight: 0 }}
        />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: '0 24px', display: 'flex', justifyContent: 'space-between' }}>
          <h3>AI Education Platform</h3>
          <div>
            <span style={{ marginRight: 16 }}>{user?.full_name}</span>
            <LogoutOutlined onClick={onLogout} style={{ cursor: 'pointer' }} />
          </div>
        </Header>
        <Content style={{ margin: '24px', minHeight: 280 }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default AppLayout;
