import { useState } from 'react';
import { Layout, Card, Form, Input, Select, DatePicker, Button, message, Typography, Tag } from 'antd';
import { BookOutlined, RocketOutlined } from '@ant-design/icons';
import { learningPathAPI } from '../utils/api';
import AppLayout from '../components/AppLayout';

const { TextArea } = Input;
const { Title, Text } = Typography;
const { Option } = Select;

function LearningPath({ user, onLogout }) {
  const [loading, setLoading] = useState(false);
  const [studyPlan, setStudyPlan] = useState(null);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await learningPathAPI.create({
        subjects: values.subjects,
        weakTopics: values.weakTopics ? values.weakTopics.split(',').map(t => t.trim()) : [],
        strongTopics: values.strongTopics ? values.strongTopics.split(',').map(t => t.trim()) : [],
        examDate: values.examDate?.format('YYYY-MM-DD')
      });

      setStudyPlan(response.data.data.ai_generated);
      message.success('Personalized learning path created!');
    } catch (error) {
      message.error('Failed to create learning path');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout user={user} onLogout={onLogout} selectedKey="learning-path">
      <Card>
        <Title level={2}>
          <BookOutlined /> Personalized Learning Assistant
        </Title>
        <Text type="secondary">
          Create a custom study plan tailored to your needs and goals
        </Text>

        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          style={{ marginTop: 24 }}
        >
          <Form.Item
            name="subjects"
            label="Select Subjects"
            rules={[{ required: true, message: 'Please select at least one subject' }]}
          >
            <Select mode="multiple" placeholder="Choose subjects">
              <Option value="Mathematics">Mathematics</Option>
              <Option value="Science">Science</Option>
              <Option value="English">English</Option>
              <Option value="History">History</Option>
              <Option value="Computer Science">Computer Science</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="weakTopics"
            label="Weak Topics (comma-separated)"
          >
            <Input placeholder="e.g., Algebra, Physics Motion, Grammar" />
          </Form.Item>

          <Form.Item
            name="strongTopics"
            label="Strong Topics (comma-separated)"
          >
            <Input placeholder="e.g., Geometry, Chemistry, Reading" />
          </Form.Item>

          <Form.Item
            name="examDate"
            label="Target Exam Date"
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} icon={<RocketOutlined />}>
              Generate Study Plan
            </Button>
          </Form.Item>
        </Form>

        {studyPlan && (
          <Card style={{ marginTop: 24, background: '#f0f2f5' }}>
            <Title level={4}>🎓 Your Personalized Study Plan</Title>
            
            {/* Long-term Plan */}
            {studyPlan.long_term_plan && (
              <div style={{ marginTop: 24 }}>
                <Title level={5}>📊 Long-Term Planning & Exam Alignment</Title>
                
                {/* Exam Timeline */}
                {studyPlan.exam_alignment && (
                  <Card size="small" style={{ marginBottom: 16, background: '#fff7e6', borderColor: '#faad14' }}>
                    <Text strong>🎯 Exam Timeline: </Text>
                    <Text>{studyPlan.exam_alignment.timeline}</Text>
                    
                    <div style={{ marginTop: 12 }}>
                      <Text strong>Milestones:</Text>
                      <ul style={{ marginTop: 4, marginBottom: 0 }}>
                        {studyPlan.exam_alignment.milestones?.map((milestone, i) => (
                          <li key={i}><Text>Day {milestone.day}: {milestone.goal}</Text></li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                )}
                
                {/* Three Phases */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
                  {Object.values(studyPlan.long_term_plan).map((phase, index) => (
                    <Card 
                      key={index} 
                      size="small" 
                      style={{ 
                        borderLeft: `4px solid ${index === 0 ? '#52c41a' : index === 1 ? '#1890ff' : '#f5222d'}` 
                      }}
                    >
                      <Text strong style={{ fontSize: '15px', color: index === 0 ? '#52c41a' : index === 1 ? '#1890ff' : '#f5222d' }}>
                        Phase {index + 1}: {phase.name}
                      </Text>
                      <div style={{ marginTop: 8 }}>
                        <Text type="secondary">⏰ {phase.duration}</Text>
                      </div>
                      <div style={{ marginTop: 8 }}>
                        <Text strong>Focus: </Text>
                        <Text>{phase.focus}</Text>
                      </div>
                      <div style={{ marginTop: 8 }}>
                        <Text strong>Activities:</Text>
                        <ul style={{ marginTop: 4, marginBottom: 0, paddingLeft: 20 }}>
                          {phase.activities?.map((activity, i) => (
                            <li key={i}><Text>{activity}</Text></li>
                          ))}
                        </ul>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            
            {/* Weekly Schedule */}
            <div style={{ marginTop: 24 }}>
              <Title level={5}>📅 Week 1 Daily Schedule:</Title>
              {studyPlan.daily_schedule?.map((day, index) => (
                <Card key={index} size="small" style={{ marginBottom: 12, borderLeft: '4px solid #1890ff' }}>
                  <div>
                    <Text strong style={{ fontSize: '16px', color: '#1890ff' }}>Day {day.day}</Text>
                    <Tag color="blue" style={{ marginLeft: 8 }}>{day.focus}</Tag>
                  </div>
                  <div style={{ marginTop: 8 }}>
                    <Text strong>Topics: </Text>
                    <Text>{day.topics.join(', ')}</Text>
                  </div>
                  <div style={{ marginTop: 4 }}>
                    <Text type="secondary">⏱️ Duration: {day.duration}</Text>
                  </div>
                </Card>
              ))}
            </div>

            {/* Recommended Resources */}
            <div style={{ marginTop: 24 }}>
              <Title level={5}>📚 Recommended Resources:</Title>
              <div style={{ marginLeft: 16 }}>
                {studyPlan.recommended_resources?.map((resource, index) => {
                  const icon = resource.type === 'video' ? '🎥' : resource.type === 'practice' ? '📝' : '📄';
                  return (
                    <div key={index} style={{ marginBottom: 8 }}>
                      <Text>{icon} <strong>{resource.title}</strong></Text>
                      <Tag color="green" style={{ marginLeft: 8 }}>{resource.type}</Tag>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Revision Strategy - Enhanced */}
            <div style={{ marginTop: 24 }}>
              <Title level={5}>🎯 Revision Strategy</Title>
              <Card size="small" style={{ background: '#e6f7ff', borderColor: '#1890ff', marginBottom: 16 }}>
                <div style={{ marginBottom: 8 }}>
                  <Text strong>📖 Technique: </Text>
                  <Text>{studyPlan.revision_strategy?.technique}</Text>
                </div>
                
                {/* Spaced Repetition Intervals */}
                {studyPlan.revision_strategy?.intervals && (
                  <div style={{ marginTop: 12 }}>
                    <Text strong>🔄 Spaced Repetition Schedule:</Text>
                    <ul style={{ marginTop: 4, marginBottom: 0 }}>
                      {studyPlan.revision_strategy.intervals.map((interval, i) => (
                        <li key={i}>
                          <Text strong style={{ color: '#1890ff' }}>{interval.period}:</Text> 
                          <Text> {interval.activity}</Text>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Revision Tools */}
                {studyPlan.revision_strategy?.tools && (
                  <div style={{ marginTop: 16 }}>
                    <Text strong>🛠️ Revision Tools:</Text>
                    {studyPlan.revision_strategy.tools.map((tool, index) => (
                      <Card key={index} size="small" style={{ marginTop: 8, background: '#fff' }}>
                        <Text strong style={{ fontSize: '14px' }}>{index + 1}. {tool.name}</Text>
                        <div style={{ marginTop: 4 }}>
                          <Text type="secondary">{tool.description}</Text>
                        </div>
                        {tool.topics && (
                          <ul style={{ marginTop: 4, marginBottom: 4 }}>
                            {tool.topics.map((topic, i) => (
                              <li key={i}><Text>{topic}</Text></li>
                            ))}
                          </ul>
                        )}
                        {tool.subjects && (
                          <div style={{ marginTop: 4 }}>
                            {tool.subjects.map((subj, i) => (
                              <div key={i}>
                                <Tag color="blue">{subj.subject}</Tag>
                                <Text> {subj.papers_to_solve} - Priority: {subj.priority}</Text>
                              </div>
                            ))}
                          </div>
                        )}
                        {tool.usage && (
                          <div style={{ marginTop: 4 }}>
                            <Text strong>Usage: </Text>
                            <Text type="secondary">{tool.usage}</Text>
                          </div>
                        )}
                        {tool.weekly_target && (
                          <div style={{ marginTop: 4 }}>
                            <Text strong>Weekly Target: </Text>
                            <Text type="secondary">{tool.weekly_target}</Text>
                          </div>
                        )}
                      </Card>
                    ))}
                  </div>
                )}
                
                {/* Daily Routine */}
                {studyPlan.revision_strategy?.daily_routine && (
                  <div style={{ marginTop: 16 }}>
                    <Text strong>⏰ Suggested Daily Routine:</Text>
                    <ul style={{ marginTop: 4, marginBottom: 0 }}>
                      {studyPlan.revision_strategy.daily_routine.map((routine, i) => (
                        <li key={i}><Text>{routine}</Text></li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Tips */}
                {studyPlan.revision_strategy?.tips && (
                  <div style={{ marginTop: 16 }}>
                    <Text strong>💡 Key Tips:</Text>
                    <ul style={{ marginTop: 8, marginBottom: 0 }}>
                      {studyPlan.revision_strategy.tips.map((tip, i) => (
                        <li key={i}><Text>{tip}</Text></li>
                      ))}
                    </ul>
                  </div>
                )}
              </Card>
            </div>
          </Card>
        )}
      </Card>
    </AppLayout>
  );
}

export default LearningPath;
