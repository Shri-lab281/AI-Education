import { useState } from 'react';
import { Card, Form, Input, Select, Button, message, Typography, Divider, List } from 'antd';
import { QuestionCircleOutlined, SendOutlined, StarOutlined } from '@ant-design/icons';
import { doubtAPI } from '../utils/api';
import AppLayout from '../components/AppLayout';

const { TextArea } = Input;
const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

function DoubtSolver({ user, onLogout }) {
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState(null);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      console.log('Submitting doubt:', values);
      const response = await doubtAPI.submit(values);
      console.log('Response received:', response.data);
      console.log('AI Response:', response.data.data.ai_response);
      setAnswer(response.data.data.ai_response);
      message.success('Doubt answered successfully!');
      form.resetFields();
    } catch (error) {
      console.error('Doubt submission error:', error);
      message.error('Failed to get answer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout user={user} onLogout={onLogout} selectedKey="doubt-solver">
      <Card>
        <Title level={2}>
          <QuestionCircleOutlined /> AI Doubt Solver / Tutor Bot
        </Title>
        <Text type="secondary">
          Get instant, detailed explanations for any topic 24/7
        </Text>

        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          style={{ marginTop: 24 }}
        >
          <Form.Item
            name="subject"
            label="Subject"
            rules={[{ required: true, message: 'Please select a subject' }]}
          >
            <Select placeholder="Choose subject">
              <Option value="Mathematics">Mathematics</Option>
              <Option value="Science">Science</Option>
              <Option value="English">English</Option>
              <Option value="History">History</Option>
              <Option value="Computer Science">Computer Science</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="question"
            label="Your Question"
            rules={[{ required: true, message: 'Please enter your question' }]}
          >
            <TextArea
              rows={4}
              placeholder="e.g., Explain photosynthesis in a simple way and give me 3 practice questions"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} icon={<SendOutlined />}>
              Ask Question
            </Button>
          </Form.Item>
        </Form>

        {answer && (
          <Card style={{ marginTop: 24, background: '#f6ffed', borderColor: '#52c41a' }}>
            <Title level={4}>
              <StarOutlined /> AI Tutor Response
            </Title>
            
            <Divider />
            
            <Title level={5}>Step-by-Step Explanation:</Title>
            <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8' }}>
              {answer.step_by_step_explanation.split('\n').map((line, i) => {
                // Handle bold text
                const parts = line.split(/(\*\*.*?\*\*)/g);
                return (
                  <div key={i}>
                    {parts.map((part, j) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={j}>{part.slice(2, -2)}</strong>;
                      }
                      return part;
                    })}
                  </div>
                );
              })}
            </div>

            <Divider />

            <Title level={5}>Key Concepts:</Title>
            <List
              size="small"
              dataSource={answer.key_concepts || []}
              renderItem={item => <List.Item>• {item}</List.Item>}
            />

            <Divider />

            <Title level={5}>Practice Questions:</Title>
            <List
              size="small"
              dataSource={answer.practice_questions || []}
              renderItem={(item, index) => (
                <List.Item>
                  <Text strong>Q{index + 1}:</Text> {item.question} 
                  <Text type="secondary"> ({item.difficulty})</Text>
                </List.Item>
              )}
            />

            {answer.solved_examples && answer.solved_examples.length > 0 && (
              <>
                <Divider />
                <Title level={5}>Solved Examples:</Title>
                {answer.solved_examples.map((example, index) => (
                  <Card key={index} size="small" style={{ marginBottom: 8 }}>
                    <Text strong>{example.example}</Text>
                    <br />
                    <Text type="secondary">{example.solution}</Text>
                  </Card>
                ))}
              </>
            )}
          </Card>
        )}
      </Card>
    </AppLayout>
  );
}

export default DoubtSolver;
