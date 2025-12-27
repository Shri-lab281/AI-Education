import { useState, useEffect } from 'react';
import { Card, Form, Input, Select, Button, message, Typography, Table, Tag } from 'antd';
import { LineChartOutlined, PlusOutlined } from '@ant-design/icons';
import { performanceAPI } from '../utils/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import AppLayout from '../components/AppLayout';

const { Title, Text } = Typography;
const { Option } = Select;

function Performance({ user, onLogout }) {
  const [loading, setLoading] = useState(false);
  const [performances, setPerformances] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchPerformance();
    fetchAnalytics();
  }, []);

  const fetchPerformance = async () => {
    try {
      const response = await performanceAPI.getHistory();
      setPerformances(response.data.data);
    } catch (error) {
      message.error('Failed to fetch performance data');
    }
  };

  const fetchAnalytics = async () => {
    try {
      const response = await performanceAPI.getAnalytics();
      setAnalytics(response.data.data);
    } catch (error) {
      console.error('Failed to fetch analytics');
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await performanceAPI.add({
        ...values,
        score: parseInt(values.score),
        maxScore: parseInt(values.maxScore)
      });
      message.success('Performance data added!');
      form.resetFields();
      fetchPerformance();
      fetchAnalytics();
    } catch (error) {
      message.error('Failed to add performance data');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: 'Test Name', dataIndex: 'test_name', key: 'test_name' },
    { title: 'Subject', dataIndex: 'subject', key: 'subject' },
    {
      title: 'Score',
      key: 'score',
      render: (_, record) => `${record.score}/${record.max_score}`
    },
    {
      title: 'Percentage',
      key: 'percentage',
      render: (_, record) => `${((record.score / record.max_score) * 100).toFixed(1)}%`
    },
    {
      title: 'Risk Level',
      dataIndex: 'risk_level',
      key: 'risk_level',
      render: (level) => {
        const colors = { low: 'green', moderate: 'orange', high: 'red' };
        return <Tag color={colors[level]}>{level?.toUpperCase()}</Tag>;
      }
    }
  ];

  return (
    <AppLayout user={user} onLogout={onLogout} selectedKey="performance">
      <Card style={{ marginBottom: 24 }}>
        <Title level={2}>
          <LineChartOutlined /> Performance Tracker
        </Title>
        <Text type="secondary">Monitor your progress and identify areas for improvement</Text>

        <Form form={form} onFinish={onFinish} layout="inline" style={{ marginTop: 24 }}>
          <Form.Item name="testName" rules={[{ required: true }]}>
            <Input placeholder="Test Name" />
          </Form.Item>
          <Form.Item name="subject" rules={[{ required: true }]}>
            <Select placeholder="Subject" style={{ width: 150 }}>
              <Option value="Mathematics">Mathematics</Option>
              <Option value="Science">Science</Option>
              <Option value="English">English</Option>
              <Option value="History">History</Option>
            </Select>
          </Form.Item>
          <Form.Item name="score" rules={[{ required: true }]}>
            <Input placeholder="Score" type="number" style={{ width: 100 }} />
          </Form.Item>
          <Form.Item name="maxScore" rules={[{ required: true }]}>
            <Input placeholder="Max Score" type="number" style={{ width: 100 }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} icon={<PlusOutlined />}>
              Add
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {analytics && (
        <Card style={{ marginBottom: 24 }}>
          <Title level={4}>Performance Overview</Title>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics.weeklyProgress}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="score" stroke="#1890ff" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      )}

      <Card>
        <Title level={4}>Performance History</Title>
        <Table columns={columns} dataSource={performances} rowKey="id" />
      </Card>
    </AppLayout>
  );
}

export default Performance;
