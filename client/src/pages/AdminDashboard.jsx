import { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Typography, Table } from 'antd';
import { UserOutlined, QuestionCircleOutlined, FileTextOutlined, WarningOutlined } from '@ant-design/icons';
import { analyticsAPI, assignmentAPI } from '../utils/api';
import AppLayout from '../components/AppLayout';

const { Title } = Typography;

function AdminDashboard({ user, onLogout }) {
  const [analytics, setAnalytics] = useState(null);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetchAnalytics();
    fetchAssignments();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await analyticsAPI.getAll();
      setAnalytics(response.data.data);
    } catch (error) {
      console.error('Failed to fetch analytics');
    }
  };

  const fetchAssignments = async () => {
    try {
      const response = await assignmentAPI.getAllForAdmin();
      setAssignments(response.data.data);
    } catch (error) {
      console.error('Failed to fetch assignments');
    }
  };

  const columns = [
    { title: 'Student', dataIndex: ['users', 'full_name'], key: 'student' },
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Subject', dataIndex: 'subject', key: 'subject' },
    { title: 'Score', key: 'score', render: (_, record) => `${record.score}/${record.max_score}` }
  ];

  return (
    <AppLayout user={user} onLogout={onLogout} selectedKey="admin">
      <Title level={2}>Admin Dashboard</Title>
      
      {analytics && (
        <>
          <Row gutter={16} style={{ marginBottom: 24 }}>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Total Students"
                  value={analytics.totalUsers}
                  prefix={<UserOutlined />}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Doubts Answered"
                  value={analytics.totalDoubts}
                  prefix={<QuestionCircleOutlined />}
                  valueStyle={{ color: '#52c41a' }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Assignments"
                  value={analytics.totalAssignments}
                  prefix={<FileTextOutlined />}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="High Risk Students"
                  value={analytics.riskDistribution?.high || 0}
                  prefix={<WarningOutlined />}
                  valueStyle={{ color: '#f5222d' }}
                />
              </Card>
            </Col>
          </Row>

          <Card title="Recent Assignments" style={{ marginTop: 24 }}>
            <Table columns={columns} dataSource={assignments.slice(0, 10)} rowKey="id" />
          </Card>
        </>
      )}
    </AppLayout>
  );
}

export default AdminDashboard;
