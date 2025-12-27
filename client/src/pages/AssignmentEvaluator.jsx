import { useState } from 'react';
import { Card, Form, Input, Select, Button, message, Typography, Progress, Tag } from 'antd';
import { FileTextOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { assignmentAPI } from '../utils/api';
import AppLayout from '../components/AppLayout';

const { TextArea } = Input;
const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

function AssignmentEvaluator({ user, onLogout }) {
  const [loading, setLoading] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await assignmentAPI.submit({
        ...values,
        submissionType: 'typed',
        maxScore: 100
      });
      setEvaluation(response.data.data.evaluation);
      message.success('Assignment evaluated successfully!');
    } catch (error) {
      message.error('Failed to submit assignment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout user={user} onLogout={onLogout} selectedKey="assignments">
      <Card>
        <Title level={2}>
          <FileTextOutlined /> Assignment Evaluator
        </Title>
        <Text type="secondary">
          Submit your work and receive instant AI-powered feedback
        </Text>

        <Form form={form} onFinish={onFinish} layout="vertical" style={{ marginTop: 24 }}>
          <Form.Item
            name="title"
            label="Assignment Title"
            rules={[{ required: true, message: 'Please enter title' }]}
          >
            <Input placeholder="e.g., English Essay - Climate Change" />
          </Form.Item>

          <Form.Item
            name="subject"
            label="Subject"
            rules={[{ required: true, message: 'Please select subject' }]}
          >
            <Select placeholder="Choose subject">
              <Option value="English">English</Option>
              <Option value="Mathematics">Mathematics</Option>
              <Option value="Science">Science</Option>
              <Option value="History">History</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="content"
            label="Assignment Content"
            rules={[{ required: true, message: 'Please enter your work' }]}
          >
            <TextArea rows={10} placeholder="Paste or type your assignment here..." />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} icon={<CheckCircleOutlined />}>
              Submit for Evaluation
            </Button>
          </Form.Item>
        </Form>

        {evaluation && (
          <Card style={{ marginTop: 24, background: '#fff7e6', borderColor: '#faad14' }}>
            <Title level={4}>Evaluation Results</Title>
            
            <div style={{ marginBottom: 16 }}>
              <Text strong>Score: </Text>
              <Tag color="blue" style={{ fontSize: 18 }}>
                {evaluation.score} / 100
              </Tag>
              <Progress 
                percent={evaluation.score} 
                status={evaluation.score >= 70 ? 'success' : 'normal'}
                style={{ marginTop: 8 }}
              />
            </div>

            <Title level={5}>Content Feedback:</Title>
            <Card size="small" style={{ marginBottom: 16 }}>
              <Text strong>Strengths:</Text>
              <ul>
                {evaluation.content_feedback?.strengths?.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
              <Text strong>Areas for Improvement:</Text>
              <ul>
                {evaluation.content_feedback?.improvements?.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </Card>

            <Title level={5}>Improvement Tips:</Title>
            <ul>
              {evaluation.improvement_tips?.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>

            <div style={{ marginTop: 16 }}>
              <Text strong>Plagiarism Score: </Text>
              <Tag color={evaluation.plagiarism_score >= 90 ? 'green' : 'orange'}>
                {evaluation.plagiarism_score}% Original
              </Tag>
            </div>
          </Card>
        )}
      </Card>
    </AppLayout>
  );
}

export default AssignmentEvaluator;
