'use client';
import { useState, useEffect } from 'react';
import { 
  Table, Card, Typography, Tag, Space, Button, Input, 
  Badge, Spin, Empty, Tooltip, Progress, Dropdown, Menu 
} from 'antd';
import { 
  SearchOutlined, DownloadOutlined, MoreOutlined, 
  BookOutlined, ClockCircleOutlined, UserOutlined, 
  StarOutlined, CalendarOutlined 
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

// 课程数据类型定义
interface Course {
  id: string;
  name: string;
  code: string;
  credits: number;
  instructor: string;
  schedule: string;
  progress: number;
  status: 'ongoing' | 'completed' | 'upcoming';
  rating: number;
  students: number;
  room: string;
}

const { Title, Text, Paragraph } = Typography;

export default function StudentCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // 模拟课程数据
  useEffect(() => {
    // 模拟API请求
    const timer = setTimeout(() => {
      const mockData: Course[] = [
        {
          id: 'cs101',
          name: 'Introduction to Computer Science',
          code: 'CS-101',
          credits: 3,
          instructor: 'Dr. Sarah Johnson',
          schedule: 'Mon, Wed, Fri 9:00-10:30',
          progress: 65,
          status: 'ongoing',
          rating: 4.7,
          students: 128,
          room: 'CSB-105'
        },
        {
          id: 'ma102',
          name: 'Calculus II',
          code: 'MA-102',
          credits: 4,
          instructor: 'Prof. Michael Chen',
          schedule: 'Tue, Thu 13:00-14:30',
          progress: 42,
          status: 'ongoing',
          rating: 4.2,
          students: 96,
          room: 'AB-201'
        },
        {
          id: 'ph101',
          name: 'General Physics I',
          code: 'PH-101',
          credits: 4,
          instructor: 'Dr. Emily Rodriguez',
          schedule: 'Mon, Wed 15:00-16:30 + Lab Fri 10:00-12:00',
          progress: 30,
          status: 'ongoing',
          rating: 4.5,
          students: 84,
          room: 'PHY-102'
        },
        {
          id: 'en103',
          name: 'Academic Writing',
          code: 'EN-103',
          credits: 3,
          instructor: 'Prof. David Wilson',
          schedule: 'Tue, Thu 10:00-11:30',
          progress: 95,
          status: 'completed',
          rating: 4.3,
          students: 72,
          room: 'HB-108'
        },
        {
          id: 'his101',
          name: 'World History',
          code: 'HIS-101',
          credits: 3,
          instructor: 'Dr. Lisa Martinez',
          schedule: 'Mon, Wed 14:00-15:30',
          progress: 0,
          status: 'upcoming',
          rating: 4.6,
          students: 68,
          room: 'HB-205'
        }
      ];
      
      setCourses(mockData);
      setFilteredCourses(mockData);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // 筛选课程
  useEffect(() => {
    let result = [...courses];
    
    // 状态筛选
    if (statusFilter !== 'all') {
      result = result.filter(course => course.status === statusFilter);
    }
    
    // 搜索筛选
    if (searchText) {
      const text = searchText.toLowerCase();
      result = result.filter(course => 
        course.name.toLowerCase().includes(text) || 
        course.code.toLowerCase().includes(text) ||
        course.instructor.toLowerCase().includes(text)
      );
    }
    
    setFilteredCourses(result);
  }, [searchText, statusFilter, courses]);

  // 课程状态标签配置
  const getStatusTag = (status: string) => {
    switch (status) {
      case 'ongoing':
        return <Tag color="processing">Ongoing</Tag>;
      case 'completed':
        return <Tag color="success">Completed</Tag>;
      case 'upcoming':
        return <Tag color="warning">Upcoming</Tag>;
      default:
        return <Tag>Unknown</Tag>;
    }
  };

  // 表格列配置
  const columns: ColumnsType<Course> = [
    {
      title: 'Course',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space direction="vertical">
          <Text strong>{text}</Text>
          <Text type="secondary">{record.code} • {record.credits} credits</Text>
        </Space>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      title: 'Instructor',
      dataIndex: 'instructor',
      key: 'instructor',
      render: (text) => (
        <Space align="center">
          <UserOutlined style={{ color: '#1890ff' }} />
          <Text>{text}</Text>
        </Space>
      )
    },
    {
      title: 'Schedule',
      dataIndex: 'schedule',
      key: 'schedule',
      render: (text, record) => (
        <Space direction="vertical">
          <Space align="center">
            <ClockCircleOutlined style={{ color: '#1890ff' }} />
            <Text>{text}</Text>
          </Space>
          <Space align="center">
            <BookOutlined style={{ color: '#1890ff' }} />
            <Text type="secondary">{record.room}</Text>
          </Space>
        </Space>
      )
    },
    {
      title: 'Progress',
      dataIndex: 'progress',
      key: 'progress',
      render: (progress, record) => (
        record.status !== 'upcoming' ? (
          <Progress percent={progress} size="small" status={progress === 100 ? "success" : "active"} />
        ) : (
          <Text type="secondary">Not started</Text>
        )
      ),
      sorter: (a, b) => a.progress - b.progress
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => getStatusTag(status),
      filters: [
        { text: 'All', value: 'all' },
        { text: 'Ongoing', value: 'ongoing' },
        { text: 'Completed', value: 'completed' },
        { text: 'Upcoming', value: 'upcoming' }
      ],
      onFilter: (value, record) => value === 'all' || record.status === value
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              {
                label: 'View Details',
                key: 'view'
              },
              {
                label: 'Course Materials',
                key: 'materials'
              },
              {
                label: 'Add to Calendar',
                key: 'calendar'
              }
            ]
          }}

          trigger={['click']}
        >
          <Button size="small" icon={<MoreOutlined />} type="text" />
        </Dropdown>
      )
    }
  ];

  return (
    <div className="p-4">
      <Card title={
        <Title level={2}>My Courses</Title>
      }>
        <div className="mb-4 flex flex-col sm:flex-row gap-3 justify-between">
          <div className="flex-1 max-w-md">
            <Input
              placeholder="Search courses, instructors..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <Space>
            <Button 
              onClick={() => setStatusFilter('all')}
              type={statusFilter === 'all' ? 'primary' : 'default'}
            >
              All
            </Button>
            <Button 
              onClick={() => setStatusFilter('ongoing')}
              type={statusFilter === 'ongoing' ? 'primary' : 'default'}
            >
              Ongoing
            </Button>
            <Button 
              onClick={() => setStatusFilter('upcoming')}
              type={statusFilter === 'upcoming' ? 'primary' : 'default'}
            >
              Upcoming
            </Button>
            <Button icon={<DownloadOutlined />} type="default">
              Export
            </Button>
          </Space>
        </div>

        <Spin spinning={loading} tip="Loading your courses...">
          {filteredCourses.length > 0 ? (
            <Table
              columns={columns}
              dataSource={filteredCourses}
              rowKey="id"
              pagination={{ pageSize: 5 }}
              scroll={{ x: 'max-content' }}
            />
          ) : (
            <Empty description="No courses found" />
          )}
        </Spin>

        <div className="mt-4">
          <Paragraph type="secondary">
            Total courses: {courses.length} • 
            <Badge count={courses.filter(c => c.status === 'ongoing').length} style={{ backgroundColor: '#1890ff', marginLeft: 8 }} /> Ongoing •
            <Badge count={courses.filter(c => c.status === 'completed').length} style={{ backgroundColor: '#52c41a', marginLeft: 8 }} /> Completed •
            <Badge count={courses.filter(c => c.status === 'upcoming').length} style={{ backgroundColor: '#faad14', marginLeft: 8 }} /> Upcoming
          </Paragraph>
        </div>
      </Card>
    </div>
  );
}