'use client';
import { useState, useEffect } from 'react';
import { 
  Card, Typography, Table, Tag, Space, Input, 
  Spin, Empty, Progress, Statistic, Row, Col, 
  Badge, Tooltip, Select, 
  Button
} from 'antd';
import { SearchOutlined, BookOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { SelectProps } from 'antd/es/select';

// 成绩数据类型定义
interface Grade {
  id: string;
  courseId: string;
  courseName: string;
  courseCode: string;
  credits: number;
  grade: string;
  points: number;
  status: 'completed' | 'in-progress' | 'not-graded';
  lastUpdated: string;
  instructor: string;
  examScores: {
    midterm?: number;
    final?: number;
    quizzes?: number;
    assignments?: number;
    participation?: number;
  };
}

// 学期数据类型
interface Semester {
  id: string;
  name: string;
  year: string;
}

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

export default function StudentGrades() {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [filteredGrades, setFilteredGrades] = useState<Grade[]>([]);
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [selectedSemester, setSelectedSemester] = useState('current');
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [gpa, setGpa] = useState(0);

  // 加载数据
  useEffect(() => {
    // 模拟API请求
    const timer = setTimeout(() => {
      // 模拟学期数据
      const semestersData: Semester[] = [
        { id: 'current', name: 'Spring 2024', year: '2024' },
        { id: 'prev1', name: 'Fall 2023', year: '2023' },
        { id: 'prev2', name: 'Spring 2023', year: '2023' }
      ];

      // 模拟成绩数据
      const gradesData: Grade[] = [
        {
          id: 'g1',
          courseId: 'cs101',
          courseName: 'Introduction to Computer Science',
          courseCode: 'CS-101',
          credits: 3,
          grade: 'A',
          points: 4.0,
          status: 'completed',
          lastUpdated: '2024-04-15',
          instructor: 'Dr. Sarah Johnson',
          examScores: {
            midterm: 92,
            final: 95,
            quizzes: 90,
            assignments: 98,
            participation: 100
          }
        },
        {
          id: 'g2',
          courseId: 'ma102',
          courseName: 'Calculus II',
          courseCode: 'MA-102',
          credits: 4,
          grade: 'B+',
          points: 3.3,
          status: 'in-progress',
          lastUpdated: '2024-04-20',
          instructor: 'Prof. Michael Chen',
          examScores: {
            midterm: 85,
            quizzes: 82,
            assignments: 88
          }
        },
        {
          id: 'g3',
          courseId: 'ph101',
          courseName: 'General Physics I',
          courseCode: 'PH-101',
          credits: 4,
          grade: 'B',
          points: 3.0,
          status: 'in-progress',
          lastUpdated: '2024-04-18',
          instructor: 'Dr. Emily Rodriguez',
          examScores: {
            midterm: 80,
            quizzes: 78,
            assignments: 85,
            participation: 90
          }
        },
        {
          id: 'g4',
          courseId: 'en103',
          courseName: 'Academic Writing',
          courseCode: 'EN-103',
          credits: 3,
          grade: 'A-',
          points: 3.7,
          status: 'completed',
          lastUpdated: '2024-03-30',
          instructor: 'Prof. David Wilson',
          examScores: {
            midterm: 90,
            final: 88,
            assignments: 92,
            participation: 95
          }
        },
        {
          id: 'g5',
          courseId: 'his101',
          courseName: 'World History',
          courseCode: 'HIS-101',
          credits: 3,
          grade: 'IP',
          points: 0,
          status: 'not-graded',
          lastUpdated: '2024-04-01',
          instructor: 'Dr. Lisa Martinez',
          examScores: {
            quizzes: 85,
            participation: 92
          }
        }
      ];

      setSemesters(semestersData);
      setGrades(gradesData);
      setFilteredGrades(gradesData);
      
      // 计算GPA
      const completedCourses = gradesData.filter(g => g.status === 'completed');
      const totalPoints = completedCourses.reduce((sum, course) => sum + (course.points * course.credits), 0);
      const totalCredits = completedCourses.reduce((sum, course) => sum + course.credits, 0);
      setGpa(totalCredits > 0 ? parseFloat((totalPoints / totalCredits).toFixed(2)) : 0);
      
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // 筛选成绩
  useEffect(() => {
    let result = [...grades];
    
    // 搜索筛选
    if (searchText) {
      const text = searchText.toLowerCase();
      result = result.filter(grade => 
        grade.courseName.toLowerCase().includes(text) || 
        grade.courseCode.toLowerCase().includes(text) ||
        grade.instructor.toLowerCase().includes(text) ||
        grade.grade.toLowerCase().includes(text)
      );
    }
    
    setFilteredGrades(result);
  }, [searchText, grades]);

  // 处理学期选择
  const handleSemesterChange: SelectProps['onChange'] = (value) => {
    setSelectedSemester(value);
    // 在实际应用中，这里会根据选择的学期加载对应的数据
  };

  // 获取成绩标签样式
  const getGradeTag = (grade: string, status: string) => {
    if (status === 'in-progress') {
      return <Tag color="processing">In Progress</Tag>;
    }
    if (status === 'not-graded') {
      return <Tag color="warning">Not Graded</Tag>;
    }
    
    // 根据成绩设置不同颜色
    const gradeMap: Record<string, string> = {
      'A+': 'success', 'A': 'success', 'A-': 'success',
      'B+': 'processing', 'B': 'processing', 'B-': 'processing',
      'C+': 'warning', 'C': 'warning', 'C-': 'warning',
      'D+': 'error', 'D': 'error', 'D-': 'error',
      'F': 'error'
    };
    
    return <Tag color={gradeMap[grade] || 'default'}>{grade}</Tag>;
  };

  // 计算总分百分比
  const getTotalPercentage = (scores: Grade['examScores']) => {
    const scoreValues = Object.values(scores).filter(v => v !== undefined) as number[];
    if (scoreValues.length === 0) return 0;
    
    const total = scoreValues.reduce((sum, score) => sum + score, 0);
    return Math.round(total / scoreValues.length);
  };

  // 表格列配置
  const columns: ColumnsType<Grade> = [
    {
      title: 'Course',
      dataIndex: 'courseName',
      key: 'courseName',
      render: (text, record) => (
        <Space direction="vertical">
          <Text strong>{text}</Text>
          <Text type="secondary">{record.courseCode} • {record.credits} credits</Text>
        </Space>
      ),
      sorter: (a, b) => a.courseName.localeCompare(b.courseName)
    },
    {
      title: 'Instructor',
      dataIndex: 'instructor',
      key: 'instructor'
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      key: 'grade',
      render: (grade, record) => (
        <Space>
          {getGradeTag(grade, record.status)}
          {record.status === 'completed' && (
            <Text type="secondary">({record.points} pts)</Text>
          )}
        </Space>
      ),
      sorter: (a, b) => a.grade.localeCompare(b.grade)
    },
    {
      title: 'Progress',
      key: 'progress',
      render: (_, record) => (
        record.status === 'completed' ? (
          <Progress percent={getTotalPercentage(record.examScores)} size="small" status="success" />
        ) : (
          <Progress percent={getTotalPercentage(record.examScores)} size="small" status="active" />
        )
      )
    },
    {
      title: 'Last Updated',
      dataIndex: 'lastUpdated',
      key: 'lastUpdated',
      render: (text) => <Text type="secondary">{text}</Text>
    },
    {
      title: 'Details',
      key: 'details',
      render: (_, record) => (
        <Tooltip 
          title={
            <div style={{ width: 200 }}>
              {Object.entries(record.examScores).map(([type, score]) => score !== undefined && (
                <div key={type}>
                  <Text type="secondary">{type.charAt(0).toUpperCase() + type.slice(1)}:</Text>
                  <Text strong> {score}%</Text>
                </div>
              ))}
            </div>
          }
        >
          <Button type="text" size="small">View Details</Button>
        </Tooltip>
      )
    }
  ];

  return (
    <div className="p-4">
      <Card title={<Title level={2}>My Grades</Title>}>
        {/* GPA 统计卡片 */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Current GPA"
                value={gpa}
                precision={2}
                valueStyle={{ fontSize: '24px', color: gpa >= 3.5 ? '#52c41a' : '#1890ff' }}
                prefix={<BookOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Completed Credits"
                value={grades.filter(g => g.status === 'completed').reduce((sum, g) => sum + g.credits, 0)}
                prefix={<BookOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="In Progress"
                value={grades.filter(g => g.status === 'in-progress').length}
                suffix=" courses"
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Top Grade"
                value={grades
                  .filter(g => g.status === 'completed')
                  .sort((a, b) => b.grade.localeCompare(a.grade))[0]?.grade || 'N/A'}
              />
            </Card>
          </Col>
        </Row>

        {/* 筛选和搜索 */}
        <div className="mb-4 flex flex-col sm:flex-row gap-3 justify-between">
          <div className="flex-1 max-w-md">
            <Input
              placeholder="Search courses, grades..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div>
            <Select
              defaultValue="current"
              style={{ width: 200 }}
              onChange={handleSemesterChange}
              value={selectedSemester}
            >
              <Option value="current">Current Semester</Option>
              {semesters.filter(s => s.id !== 'current').map(semester => (
                <Option key={semester.id} value={semester.id}>
                  {semester.name}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        {/* 成绩表格 */}
        <Spin spinning={loading} tip="Loading your grades...">
          {filteredGrades.length > 0 ? (
            <Table
              columns={columns}
              dataSource={filteredGrades}
              rowKey="id"
              pagination={{ pageSize: 5 }}
              scroll={{ x: 'max-content' }}
            />
          ) : (
            <Empty description="No grades found for this semester" />
          )}
        </Spin>

        <div className="mt-4">
          <Paragraph type="secondary">
            <Badge count={grades.filter(g => g.status === 'completed').length} style={{ backgroundColor: '#52c41a', marginRight: 8 }} /> Completed •
            <Badge count={grades.filter(g => g.status === 'in-progress').length} style={{ backgroundColor: '#1890ff', marginRight: 8 }} /> In Progress •
            <Badge count={grades.filter(g => g.status === 'not-graded').length} style={{ backgroundColor: '#faad14', marginRight: 8 }} /> Not Graded
          </Paragraph>
        </div>
      </Card>
    </div>
  );
}