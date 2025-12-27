import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Card, message, Typography, Select } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, BookOutlined, HomeOutlined } from '@ant-design/icons';
import { authAPI } from '../utils/api';

const { Title, Text } = Typography;
const { Option } = Select;

function Register({ onLogin }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await authAPI.register(values);
      
      message.success('Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      message.error(error.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <Card style={{ maxWidth: 500, width: '100%', borderRadius: 12 }}>
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <Title level={2} style={{ marginBottom: 8 }}>🎓 Create Account</Title>
          <Text type="secondary">Join AI Education Platform</Text>
        </div>

        <Form
          name="register"
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="fullName"
            rules={[{ required: true, message: 'Please input your full name!' }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Full Name" 
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input 
              prefix={<MailOutlined />} 
              placeholder="Email" 
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 6, message: 'Password must be at least 6 characters!' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item
            name="gradeLevel"
            rules={[{ required: true, message: 'Please select your grade level!' }]}
          >
            <Select placeholder="Select Grade Level" prefix={<BookOutlined />}>
              <Option value="Grade 6">Grade 6</Option>
              <Option value="Grade 7">Grade 7</Option>
              <Option value="Grade 8">Grade 8</Option>
              <Option value="Grade 9">Grade 9</Option>
              <Option value="Grade 10">Grade 10</Option>
              <Option value="Grade 11">Grade 11</Option>
              <Option value="Grade 12">Grade 12</Option>
              <Option value="Undergraduate">Undergraduate</Option>
            </Select>
          </Form.Item>

          <Form.Item name="schoolName">
            <Input 
              prefix={<HomeOutlined />} 
              placeholder="School/College Name (Optional)" 
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              block
              style={{ height: 45 }}
            >
              Create Account
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            <Text type="secondary">
              Already have an account? <Link to="/login">Sign in</Link>
            </Text>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default Register;
