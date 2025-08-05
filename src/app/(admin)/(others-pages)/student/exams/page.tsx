"use client";
import { useState, useEffect } from 'react';
import { 
  Card, Typography, Table, Tag, Space, Button, 
  Input, Spin, Empty, Badge, Tooltip, 
  Select, Row, Col, Statistic,
  Timeline, Progress, Divider
} from 'antd';
import { 
  SearchOutlined, CalendarOutlined, ClockCircleOutlined,
   BookOutlined, AlertOutlined,
  DownloadOutlined, UserOutlined, FileTextOutlined,
  CheckCircleOutlined, InfoOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { SelectProps } from 'antd/es/select';
import moment from 'moment';
import 'moment/locale/en-gb';

// 考试数据类型定义
interface Exam {
  id: string;
  courseId: string;
  courseName: string;
  courseCode: string;
  type: 'midterm' | 'final' | 'quiz' | 'practical' | 'oral';
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  room: string;
  seatNumber?: string;
  instructor: {
    name: string;
    email: string;
  };
  status: 'upcoming' | 'completed' | 'rescheduled';
  notes?: string;
  materials?: string[];
  coverage?: string;
  weight: number; // 占总成绩百分比
  rescheduleInfo?: {
    originalDate: string;
    newDate: string;
    reason: string;
  };
}

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

// 格式化日期显示
const formatDate = (dateString: string) => {
  return moment(dateString).format('MMMM Do, YYYY (dddd)');
};

// 计算距离考试的天数
const getDaysUntilExam = (dateString: string) => {
  const examDate = moment(dateString).startOf('day');
  const today = moment().startOf('day');
  
  const diffDays = examDate.diff(today, 'days');
  
  if (diffDays < 0) return 'Completed';
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  return `${diffDays} days`;
};

// 获取考试类型配置 - 增强类型约束
const getExamTypeConfig = (type: Exam['type']) => {
  const configMap: Record<Exam['type'], { 
    label: string; 
    color: string;
    badgeColor: string;
    icon: React.ReactNode;
  }> = {
    'midterm': { 
      label: 'Midterm Exam', 
      color: '#1890ff',
      badgeColor: 'blue',
      icon: <BookOutlined />
    },
    'final': { 
      label: 'Final Exam', 
      color: '#722ed1',
      badgeColor: 'purple',
      icon: <FileTextOutlined />
    },
    'quiz': { 
      label: 'Quiz', 
      color: '#52c41a',
      badgeColor: 'green',
      icon: <InfoOutlined />
    },
    'practical': { 
      label: 'Practical Exam', 
      color: '#faad14',
      badgeColor: 'orange',
      icon: <AlertOutlined />
    },
    'oral': { 
      label: 'Oral Exam', 
      color: '#f5222d',
      badgeColor: 'red',
      icon: <UserOutlined />
    }
  };
  
  return configMap[type];
};

// 获取状态配置 - 增强类型约束
const getStatusConfig = (status: Exam['status']) => {
  const configMap: Record<Exam['status'], { 
    label: string; 
    color: string;
    badgeColor: string;
    icon: React.ReactNode;
  }> = {
    'upcoming': { 
      label: 'Upcoming', 
      color: '#1890ff',
      badgeColor: 'processing',
      icon: <ClockCircleOutlined />
    },
    'completed': { 
      label: 'Completed', 
      color: '#52c41a',
      badgeColor: 'success',
      icon: <CheckCircleOutlined />
    },
    'rescheduled': { 
      label: 'Rescheduled', 
      color: '#faad14',
      badgeColor: 'warning',
      icon: <AlertOutlined />
    }
  };
  
  return configMap[status];
};

export default function StudentExams() {
  // 状态管理
  const [exams, setExams] = useState<Exam[]>([]);
  const [filteredExams, setFilteredExams] = useState<Exam[]>([]);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('upcoming');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);

  // 加载考试数据
  useEffect(() => {
    // 模拟API请求延迟
    const timer = setTimeout(() => {
      const mockData: Exam[] = [
        {
          id: 'e1',
          courseId: 'ma102',
          courseName: 'Calculus II',
          courseCode: 'MA-102',
          type: 'midterm',
          date: '2024-04-15',
          startTime: '10:00',
          endTime: '12:00',
          location: 'Academic Building',
          room: 'AB-205',
          seatNumber: '14',
          instructor: {
            name: 'Prof. Michael Chen',
            email: 'm.chen@campus.edu'
          },
          status: 'upcoming',
          notes: 'Bring your student ID and a calculator. No graphing calculators allowed.',
          materials: ['Student ID', 'Calculator (non-graphing)', 'Pens', 'Pencils', 'Eraser'],
          coverage: 'Chapters 4-7: Differentiation and Integration',
          weight: 30
        },
        {
          id: 'e2',
          courseId: 'cs101',
          courseName: 'Introduction to Computer Science',
          courseCode: 'CS-101',
          type: 'midterm',
          date: '2024-04-10',
          startTime: '14:00',
          endTime: '16:00',
          location: 'Computer Science Building',
          room: 'CSB-301',
          seatNumber: '08',
          instructor: {
            name: 'Dr. Sarah Johnson',
            email: 's.johnson@campus.edu'
          },
          status: 'upcoming',
          notes: 'Lab exam - computer provided. No personal devices allowed.',
          materials: ['Student ID', 'Photo ID'],
          coverage: 'Modules 1-3: Basic Programming Concepts',
          weight: 25
        },
        {
          id: 'e3',
          courseId: 'ph101',
          courseName: 'General Physics I',
          courseCode: 'PH-101',
          type: 'quiz',
          date: '2024-04-05',
          startTime: '09:00',
          endTime: '09:50',
          location: 'Science Hall',
          room: 'SH-112',
          seatNumber: '22',
          instructor: {
            name: 'Dr. Emily Rodriguez',
            email: 'e.rodriguez@campus.edu'
          },
          status: 'completed',
          notes: 'Short quiz on mechanics and motion',
          coverage: 'Chapters 4-6: Newtonian Mechanics',
          weight: 10
        },
        {
          id: 'e4',
          courseId: 'en103',
          courseName: 'Academic Writing',
          courseCode: 'EN-103',
          type: 'midterm',
          date: '2024-04-20',
          startTime: '11:00',
          endTime: '13:00',
          location: 'Humanities Building',
          room: 'HB-102',
          seatNumber: '31',
          instructor: {
            name: 'Prof. David Wilson',
            email: 'd.wilson@campus.edu'
          },
          status: 'rescheduled',
          notes: 'Essay exam - blue books provided',
          materials: ['Student ID', 'Pens', 'Dictionary (for ESL students)'],
          coverage: 'Argumentative essay techniques and citation formats',
          weight: 35,
          rescheduleInfo: {
            originalDate: '2024-04-18',
            newDate: '2024-04-20',
            reason: 'Instructor attending academic conference'
          }
        },
        {
          id: 'e5',
          courseId: 'ph101',
          courseName: 'General Physics I',
          courseCode: 'PH-101',
          type: 'practical',
          date: '2024-04-25',
          startTime: '13:00',
          endTime: '17:00',
          location: 'Physics Lab Building',
          room: 'PLB-204',
          seatNumber: '05',
          instructor: {
            name: 'Dr. Emily Rodriguez',
            email: 'e.rodriguez@campus.edu'
          },
          status: 'upcoming',
          notes: 'Lab practical - wear appropriate safety gear',
          materials: ['Student ID', 'Lab coat', 'Safety goggles', 'Lab notebook'],
          coverage: 'Experiments 1-5: Force and Motion',
          weight: 20
        }
      ];

      setExams(mockData);
      setFilteredExams(mockData.filter(exam => exam.status === 'upcoming'));
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // 筛选考试 - 优化状态同步逻辑
  useEffect(() => {
    let result = [...exams];
    
    // 状态筛选
    if (statusFilter !== 'all') {
      result = result.filter(exam => exam.status === statusFilter);
    }
    
    // 类型筛选
    if (typeFilter !== 'all') {
      result = result.filter(exam => exam.type === typeFilter);
    }
    
    // 搜索筛选
    if (searchText) {
      const text = searchText.toLowerCase();
      result = result.filter(exam => 
        exam.courseName.toLowerCase().includes(text) || 
        exam.courseCode.toLowerCase().includes(text) ||
        exam.location.toLowerCase().includes(text) ||
        exam.instructor.name.toLowerCase().includes(text)
      );
    }
    
    // 按日期排序
    result.sort((a, b) => moment(a.date).diff(moment(b.date)));
    
    setFilteredExams(result);
    
    // 确保选中的考试在筛选结果中
    if (result.length > 0) {
      if (!selectedExam || !result.some(item => item.id === selectedExam.id)) {
        setSelectedExam(result[0]);
      }
    } else {
      setSelectedExam(null);
    }
  }, [searchText, statusFilter, typeFilter, exams, selectedExam]);

  // 处理类型筛选变化
  const handleTypeChange: SelectProps['onChange'] = (value) => {
    setTypeFilter(value as string);
  };

  // 处理状态筛选变化
  const handleStatusChange: SelectProps['onChange'] = (value) => {
    setStatusFilter(value as string);
  };

  // 表格列配置 - 修复样式依赖问题
  const columns: ColumnsType<Exam> = [
    {
      title: 'Course',
      dataIndex: 'courseName',
      key: 'courseName',
      render: (text, record) => {
        const typeConfig = getExamTypeConfig(record.type);
        return (
          <Space direction="vertical">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {typeConfig.icon}
              <Text strong style={{ marginLeft: 4 }}>{text}</Text>
            </div>
            <Text type="secondary">{record.courseCode}</Text>
          </Space>
        );
      },
      sorter: (a, b) => a.courseName.localeCompare(b.courseName)
    },
    {
      title: 'Exam Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => {
        const config = getExamTypeConfig(type);
        return (
          <Badge color={config.badgeColor}>
            {config.label}
          </Badge>
        );
      },
      filters: [
        { text: 'All Types', value: 'all' },
        { text: 'Midterm', value: 'midterm' },
        { text: 'Final', value: 'final' },
        { text: 'Quiz', value: 'quiz' },
        { text: 'Practical', value: 'practical' },
        { text: 'Oral', value: 'oral' }
      ],
      onFilter: (value, record) => value === 'all' || record.type === value
    },
    {
      title: 'Date & Time',
      key: 'datetime',
      render: (_, record) => (
        <Space direction="vertical">
          <Text>{formatDate(record.date)}</Text>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ClockCircleOutlined style={{ fontSize: 14, color: '#1890ff', marginRight: 4 }} />
            <Text type="secondary">
              {record.startTime} - {record.endTime}
            </Text>
          </div>
          <Badge 
            count={getDaysUntilExam(record.date)} 
            size="small"
            style={{ 
              backgroundColor: getDaysUntilExam(record.date) === 'Today' ? '#faad14' : '#f0f2f5',
              color: getDaysUntilExam(record.date) === 'Today' ? '#fff' : '#000'
            }}
          />
        </Space>
      ),
      sorter: (a, b) => moment(a.date).diff(moment(b.date))
    },
    {
      title: 'Location',
      key: 'location',
      render: (_, record) => (
        <Space direction="vertical">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <AlertOutlined style={{ fontSize: 14, color: '#1890ff', marginRight: 4 }} />
            <Text>{record.location}</Text>
          </div>
          <Text type="secondary">
            Room: {record.room} {record.seatNumber ? `• Seat: ${record.seatNumber}` : ''}
          </Text>
        </Space>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const config = getStatusConfig(status);
        return (
          <Badge color={config.badgeColor}>
            {config.label}
          </Badge>
        );
      },
      filters: [
        { text: 'All', value: 'all' },
        { text: 'Upcoming', value: 'upcoming' },
        { text: 'Completed', value: 'completed' },
        { text: 'Rescheduled', value: 'rescheduled' }
      ],
      onFilter: (value, record) => value === 'all' || record.status === value
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button 
          type="text" 
          size="small"
          onClick={() => setSelectedExam(record)}
        >
          View Details
        </Button>
      )
    }
  ];

  // 计算考试统计
  const getExamStats = () => {
    return {
      total: exams.length,
      upcoming: exams.filter(exam => exam.status === 'upcoming').length,
      completed: exams.filter(exam => exam.status === 'completed').length,
      rescheduled: exams.filter(exam => exam.status === 'rescheduled').length,
      midterms: exams.filter(exam => exam.type === 'midterm').length,
      finals: exams.filter(exam => exam.type === 'final').length,
      quizzes: exams.filter(exam => exam.type === 'quiz').length,
      practicals: exams.filter(exam => exam.type === 'practical').length
    };
  };

  const stats = getExamStats();

  return (
    <div style={{ padding: '16px' }}>
      <Card 
        title={<Title level={2}>Exam Schedule</Title>}
        className="mb-6"
      >
        <Paragraph>
          View and manage your upcoming and past exams, including details on schedule, location, and requirements.
        </Paragraph>
      </Card>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={12} sm={6} lg={3}>
          <Card>
            <Statistic 
              title="Total Exams" 
              value={stats.total} 
              prefix={<BookOutlined />} 
            />
          </Card>
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <Card>
            <Statistic 
              title="Upcoming" 
              value={stats.upcoming} 
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <Card>
            <Statistic 
              title="Completed" 
              value={stats.completed} 
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <Card>
            <Statistic 
              title="Midterms" 
              value={stats.midterms} 
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <Card>
            <Statistic 
              title="Finals" 
              value={stats.finals} 
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <Card>
            <Statistic 
              title="Quizzes" 
              value={stats.quizzes} 
              prefix={<InfoOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 筛选和搜索 */}
      <Card className="mb-6">
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '16px', 
          alignItems: 'flex-start' 
        }}>
          <div style={{ width: '100%' }}>
            <Input
              placeholder="Search by course name, code, or instructor..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ maxWidth: '320px' }}
            />
          </div>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '8px', 
            width: '100%',
            justifyContent: 'flex-end'
          }}>
            <Select
              defaultValue="upcoming"
              style={{ width: 130 }}
              onChange={handleStatusChange}
              value={statusFilter}
            >
              <Option value="all">All Status</Option>
              <Option value="upcoming">Upcoming</Option>
              <Option value="completed">Completed</Option>
              <Option value="rescheduled">Rescheduled</Option>
            </Select>
            <Select
              defaultValue="all"
              style={{ width: 130 }}
              onChange={handleTypeChange}
              value={typeFilter}
            >
              <Option value="all">All Types</Option>
              <Option value="midterm">Midterm</Option>
              <Option value="final">Final</Option>
              <Option value="quiz">Quiz</Option>
              <Option value="practical">Practical</Option>
              <Option value="oral">Oral</Option>
            </Select>
            <Button icon={<DownloadOutlined />}>
              Export Schedule
            </Button>
          </div>
        </div>
      </Card>

      {/* 主要内容区域 */}
      <Row gutter={[16, 16]}>
        {/* 考试列表 */}
        <Col xs={24} lg={14}>
          <Card title="Exam List">
            <Spin spinning={loading} tip="Loading your exams...">
              {filteredExams.length > 0 ? (
                <Table
                  columns={columns}
                  dataSource={filteredExams}
                  rowKey="id"
                  pagination={{ pageSize: 5 }}
                  scroll={{ x: 'max-content' }}
                  onRow={(record) => ({
                    onClick: () => setSelectedExam(record),
                    style: {
                      cursor: 'pointer',
                      backgroundColor: selectedExam?.id === record.id ? '#f5f7fa' : 'inherit'
                    }
                  })}
                />
              ) : (
                <Empty description="No exams found matching your criteria" />
              )}
            </Spin>
          </Card>
        </Col>

        {/* 考试详情 */}
        <Col xs={24} lg={10}>
          <Card title="Exam Details">
            {loading ? (
              <div style={{ display: 'block', margin: '40px auto' }}>
                Loading exam details
              </div>

            ) : selectedExam ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* 考试基本信息 */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <Title level={4} style={{ margin: 0 }}>{selectedExam.courseName}</Title>
                    <Badge
                      color={getStatusConfig(selectedExam.status).badgeColor} 
                      size="default"
                    >
                      {getStatusConfig(selectedExam.status).label}
                    </Badge>
                  </div>
                  <Text type="secondary">{selectedExam.courseCode}</Text>
                  
                  <div style={{ display: 'flex', alignItems: 'center', marginTop: '12px' }}>
                    {getExamTypeConfig(selectedExam.type).icon}
                    <Badge 
                      color={getExamTypeConfig(selectedExam.type).badgeColor} 
                      style={{ marginLeft: 8 }}
                    >
                      {getExamTypeConfig(selectedExam.type).label}
                    </Badge>
                    <Badge 
                      style={{ marginLeft: 8, backgroundColor: '#f0f2f5', color: '#000' }}
                    >
                      {selectedExam.weight}% of final grade
                    </Badge>
                  </div>
                </div>

                {/* 日期和时间 */}
                <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <CalendarOutlined style={{ color: '#1890ff', marginRight: '8px', marginTop: '2px' }} />
                    <div>
                      <Text strong>Date & Time</Text>
                      <p style={{ margin: '5px 0 0 0' }}>{formatDate(selectedExam.date)}</p>
                      <p style={{ margin: 0 }}>
                        <ClockCircleOutlined style={{ fontSize: 14, marginRight: 4 }} />
                        {selectedExam.startTime} - {selectedExam.endTime}
                      </p>
                      <Badge 
                        count={getDaysUntilExam(selectedExam.date)} 
                        style={{ 
                          marginTop: 5,
                          backgroundColor: getDaysUntilExam(selectedExam.date) === 'Today' ? '#faad14' : '#e8f3ff',
                          color: getDaysUntilExam(selectedExam.date) === 'Today' ? '#fff' : '#1890ff'
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* 地点信息 */}
                <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <ClockCircleOutlined style={{ color: '#1890ff', marginRight: '8px', marginTop: '2px' }} />
                    <div>
                      <Text strong>Location</Text>
                      <p style={{ margin: '5px 0 0 0' }}>{selectedExam.location}</p>
                      <p style={{ margin: 0 }}>
                        Room: {selectedExam.room} {selectedExam.seatNumber ? `• Seat: ${selectedExam.seatNumber}` : ''}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 讲师信息 */}
                <div>
                  <Text strong> Instructor</Text>
                  <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                    <UserOutlined style={{ color: '#1890ff', marginRight: '8px' }} />
                    <div>
                      <p style={{ margin: 0 }}>{selectedExam.instructor.name}</p>
                      <Text type="secondary">{selectedExam.instructor.email}</Text>
                    </div>
                  </div>
                </div>

                {/* 考试范围 */}
                <div>
                  <Text strong> Coverage</Text>
                  <p style={{ margin: '5px 0 0 0' }}>{selectedExam.coverage}</p>
                </div>

                {/* 所需材料 */}
                {selectedExam.materials && selectedExam.materials.length > 0 && (
                  <div>
                    <Text strong> Required Materials</Text>
                    <ul style={{ paddingLeft: 20, margin: '5px 0 0 0' }}>
                      {selectedExam.materials.map((material, index) => (
                        <li key={index}>{material}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 备注 */}
                {selectedExam.notes && (
                  <div style={{ padding: '12px', backgroundColor: '#e6f7ff', borderRadius: '6px' }}>
                    <div style={{ display: 'flex' }}>
                      <InfoOutlined style={{ color: '#1890ff', marginRight: '8px', marginTop: '2px' }} />
                      <p style={{ margin: 0 }}>{selectedExam.notes}</p>
                    </div>
                  </div>
                )}

                {/* 重新安排信息 */}
                {selectedExam.rescheduleInfo && (
                  <div style={{ padding: '12px', backgroundColor: '#fff7e6', borderRadius: '6px' }}>
                    <div style={{ display: 'flex' }}>
                      <AlertOutlined style={{ color: '#faad14', marginRight: '8px', marginTop: '2px' }} />
                      <div>
                        <Text strong>Rescheduled Exam</Text>
                        <p style={{ margin: '5px 0 0 0' }}>
                          Originally scheduled for: {formatDate(selectedExam.rescheduleInfo.originalDate)}
                        </p>
                        <p style={{ margin: 0 }}>Reason: {selectedExam.rescheduleInfo.reason}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 倒计时进度 */}
                {selectedExam.status === 'upcoming' && (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <Text strong>Preparation Progress</Text>
                      <Text>{getDaysUntilExam(selectedExam.date)} remaining</Text>
                    </div>
                    <Progress 
                      percent={Math.min(100, Math.max(0, 100 - (moment(selectedExam.date).diff(moment(), 'days') * 5)))} 
                      status="active" 
                    />
                  </div>
                )}

                {/* 备考时间线 - 添加key属性 */}
                {selectedExam.status === 'upcoming' && (
                  <div>
                    <Text strong>Study Timeline</Text>

                  </div>
                )}
              </div>
            ) : (
              <Empty description="Select an exam to view details" />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}