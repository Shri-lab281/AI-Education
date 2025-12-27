import { useState, useEffect } from 'react';
import { Layout, Menu, Card, Row, Col, Statistic, Typography, Avatar, Button, Spin } from 'antd';
import {
  BookOutlined,
  QuestionCircleOutlined,
  FileTextOutlined,
  LineChartOutlined,
  LogoutOutlined,
  UserOutlined,
  RocketOutlined,
  TrophyOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { performanceAPI, doubtAPI, assignmentAPI } from '../utils/api';

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

function Dashboard({ user, onLogout }) {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [stats, setStats] = useState({
    studyHours: 0,
    doubtsSolved: 0,
    assignmentsCompleted: 0,
    averageScore: 0
  });
  const [loading, setLoading] = useState(true);

  // Fetch stats on mount and whenever component becomes visible
  useEffect(() => {
    fetchDashboardStats();
  }, []);

  // Refresh data when navigating back to dashboard
  useEffect(() => {
    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        fetchDashboardStats();
      }
    }, 30000); // Check every 30 seconds if page is visible

    return () => clearInterval(interval);
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      
      // Fetch performance data
      const perfResponse = await performanceAPI.getHistory();
      const performanceData = perfResponse.data.data || [];
      
      // Calculate study hours (estimate based on test count - 2 hours per test)
      const studyHours = performanceData.length * 2;
      
      // Fetch doubts
      const doubtResponse = await doubtAPI.getHistory();
      const doubts = doubtResponse.data.data || [];
      const doubtsSolved = doubts.length;
      
      // Fetch assignments
      const assignmentResponse = await assignmentAPI.getAll();
      const assignments = assignmentResponse.data.data || [];
      const completedAssignments = assignments.filter(a => a.score !== null).length;
      
      // Calculate average score
      const scoredAssignments = assignments.filter(a => a.score !== null && a.max_score > 0);
      const averageScore = scoredAssignments.length > 0
        ? Math.round(scoredAssignments.reduce((sum, a) => sum + (a.score / a.max_score * 100), 0) / scoredAssignments.length)
        : 0;
      
      setStats({
        studyHours,
        doubtsSolved,
        assignmentsCompleted: completedAssignments,
        averageScore
      });
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
      // Keep default values on error
    } finally {
      setLoading(false);
    }
  };

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

  if (user.role === 'admin' || user.role === 'teacher') {
    menuItems.push({
      key: 'admin',
      icon: <TrophyOutlined />,
      label: 'Admin Panel',
      onClick: () => navigate('/admin')
    });
  }

  const features = [
    {
      icon: <BookOutlined style={{ fontSize: 32, color: '#1890ff' }} />,
      title: 'Personalized Learning',
      description: 'Get custom study plans tailored to your needs',
      path: '/learning-path'
    },
    {
      icon: <QuestionCircleOutlined style={{ fontSize: 32, color: '#52c41a' }} />,
      title: '24/7 Doubt Solver',
      description: 'Ask questions anytime and get instant explanations',
      path: '/doubt-solver'
    },
    {
      icon: <FileTextOutlined style={{ fontSize: 32, color: '#faad14' }} />,
      title: 'Assignment Evaluator',
      description: 'Submit work and receive AI-powered feedback',
      path: '/assignments'
    },
    {
      icon: <LineChartOutlined style={{ fontSize: 32, color: '#f5222d' }} />,
      title: 'Performance Tracking',
      description: 'Monitor progress and identify weak areas',
      path: '/performance'
    }
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={setCollapsed}
        style={{ background: '#fff' }}
      >
        <div style={{ 
          height: 64, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          borderBottom: '1px solid #f0f0f0'
        }}>
          <Title level={4} style={{ margin: 0 }}>
            {collapsed ? '🎓' : '🎓 EduAI'}
          </Title>
        </div>
        <Menu 
          mode="inline" 
          defaultSelectedKeys={['dashboard']} 
          items={menuItems}
          style={{ borderRight: 0 }}
        />
      </Sider>

      <Layout>
        <Header style={{ 
          background: '#fff', 
          padding: '0 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <Title level={3} style={{ margin: 0 }}>Welcome, {user.full_name}!</Title>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Avatar icon={<UserOutlined />} />
            <Button 
              type="text" 
              icon={<LogoutOutlined />} 
              onClick={onLogout}
            >
              Logout
            </Button>
          </div>
        </Header>

        <Content style={{ margin: '24px', minHeight: 280 }}>
          <div style={{ marginBottom: 24 }}>
            <Card 
              style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                color: '#fff'
              }}
            >
              <Row align="middle">
                <Col span={16}>
                  <Title level={2} style={{ color: '#fff', marginBottom: 8 }}>
                    Your Learning Journey Starts Here
                  </Title>
                  <Text style={{ color: '#fff', fontSize: 16 }}>
                    {user.grade_level} • {user.school_name || 'Student'}
                  </Text>
                </Col>
                <Col span={8} style={{ textAlign: 'right' }}>
                  <RocketOutlined style={{ fontSize: 80, opacity: 0.3 }} />
                </Col>
              </Row>
            </Card>
          </div>

          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Study Hours This Week"
                  value={loading ? 0 : stats.studyHours}
                  prefix={<ClockCircleOutlined />}
                  suffix="hrs"
                  loading={loading}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Doubts Solved"
                  value={loading ? 0 : stats.doubtsSolved}
                  prefix={<QuestionCircleOutlined />}
                  valueStyle={{ color: '#52c41a' }}
                  loading={loading}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Assignments Completed"
                  value={loading ? 0 : stats.assignmentsCompleted}
                  prefix={<FileTextOutlined />}
                  valueStyle={{ color: '#faad14' }}
                  loading={loading}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Average Score"
                  value={loading ? 0 : stats.averageScore}
                  precision={0}
                  suffix="%"
                  prefix={<TrophyOutlined />}
                  valueStyle={{ color: '#1890ff' }}
                  loading={loading}
                />
              </Card>
            </Col>
          </Row>

          <Title level={4} style={{ marginBottom: 16 }}>Quick Access</Title>
          <Row gutter={[16, 16]}>
            {features.map((feature, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <Card 
                  hoverable
                  onClick={() => navigate(feature.path)}
                  style={{ height: '100%' }}
                  className="hover-card"
                >
                  <div style={{ textAlign: 'center' }}>
                    {feature.icon}
                    <Title level={5} style={{ marginTop: 16, marginBottom: 8 }}>
                      {feature.title}
                    </Title>
                    <Text type="secondary">{feature.description}</Text>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Dashboard;
