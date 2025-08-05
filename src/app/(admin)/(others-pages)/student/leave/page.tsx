'use client';
import { useState, useEffect } from 'react';
import { 
  Card, Typography, Table, Tag, Space, Button, 
  Input, Spin, Empty, Form, DatePicker,
  Select, Modal, notification, Divider, Badge,
  Popconfirm,
  Tooltip
} from 'antd';
import { 
  PlusOutlined, SearchOutlined, EditOutlined, 
  DeleteOutlined, CheckOutlined, CloseOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { DatePickerProps } from 'antd/es/date-picker';
import { RangePickerProps } from 'antd/es/date-picker';
import type { SelectProps } from 'antd/es/select';
import moment from 'moment';
import type { Moment } from 'moment';

// 请假数据类型定义
interface LeaveRequest {
  id: string;
  type: 'sick' | 'personal' | 'academic' | 'other';
  reason: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  approvedBy?: string;
  approvedAt?: string;
  notes?: string;
  days: number;
}

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Item } = Form;

export default function StudentLeave() {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<LeaveRequest[]>([]);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingRecord, setEditingRecord] = useState<LeaveRequest | null>(null);

  // 加载请假记录
  useEffect(() => {
    // 模拟API请求
    const timer = setTimeout(() => {
      const mockData: LeaveRequest[] = [
        {
          id: 'l1',
          type: 'sick',
          reason: 'Flu symptoms, high fever and headache',
          startDate: '2024-03-15',
          endDate: '2024-03-16',
          status: 'approved',
          submittedAt: '2024-03-14',
          approvedBy: 'Ms. Zhang',
          approvedAt: '2024-03-14',
          notes: 'Get well soon',
          days: 2
        },
        {
          id: 'l2',
          type: 'personal',
          reason: 'Family emergency requiring travel',
          startDate: '2024-04-05',
          endDate: '2024-04-07',
          status: 'pending',
          submittedAt: '2024-04-01',
          days: 3
        },
        {
          id: 'l3',
          type: 'academic',
          reason: 'Attending national mathematics conference',
          startDate: '2024-04-20',
          endDate: '2024-04-22',
          status: 'approved',
          submittedAt: '2024-03-28',
          approvedBy: 'Dr. Johnson',
          approvedAt: '2024-03-29',
          days: 3
        },
        {
          id: 'l4',
          type: 'personal',
          reason: 'Scheduled medical appointment',
          startDate: '2024-02-10',
          endDate: '2024-02-10',
          status: 'rejected',
          submittedAt: '2024-02-08',
          approvedBy: 'Ms. Zhang',
          approvedAt: '2024-02-09',
          notes: 'Appointment during non-class hours, no need for leave',
          days: 1
        }
      ];

      setLeaveRequests(mockData);
      setFilteredRequests(mockData);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // 筛选请假记录
  useEffect(() => {
    let result = [...leaveRequests];
    
    // 状态筛选
    if (statusFilter !== 'all') {
      result = result.filter(request => request.status === statusFilter);
    }
    
    // 搜索筛选
    if (searchText) {
      const text = searchText.toLowerCase();
      result = result.filter(request => 
        request.reason.toLowerCase().includes(text) || 
        request.type.toLowerCase().includes(text) ||
        (request.notes && request.notes.toLowerCase().includes(text))
      );
    }
    
    // 按提交时间排序
    result.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
    
    setFilteredRequests(result);
  }, [searchText, statusFilter, leaveRequests]);

  // 处理新建/编辑请假申请
  const handleOpenModal = (record?: LeaveRequest) => {
    setEditingRecord(record || null);
    setIsModalVisible(true);
    
    // 重置表单或填充编辑数据
    if (record) {
      form.setFieldsValue({
        type: record.type,
        reason: record.reason,
        dateRange: [
          moment(record.startDate),
          moment(record.endDate)
        ],
        notes: record.notes
      });
    } else {
      form.resetFields();
    }
  };

  // 关闭模态框
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingRecord(null);
    form.resetFields();
  };

  // 提交请假申请
  const handleSubmit = () => {
    form.validateFields()
      .then(values => {
        const startDate = values.dateRange[0].format('YYYY-MM-DD');
        const endDate = values.dateRange[1].format('YYYY-MM-DD');
        const days = values.dateRange[1].diff(values.dateRange[0], 'days') + 1;
        
        const newRequest: LeaveRequest = {
          id: editingRecord ? editingRecord.id : `l${Date.now()}`,
          type: values.type,
          reason: values.reason,
          startDate,
          endDate,
          status: editingRecord ? editingRecord.status : 'pending',
          submittedAt: editingRecord ? editingRecord.submittedAt : new Date().toISOString().split('T')[0],
          approvedBy: editingRecord?.approvedBy,
          approvedAt: editingRecord?.approvedAt,
          notes: values.notes,
          days
        };

        // 更新列表数据
        if (editingRecord) {
          setLeaveRequests(leaveRequests.map(req => 
            req.id === editingRecord.id ? newRequest : req
          ));
        } else {
          setLeaveRequests([newRequest, ...leaveRequests]);
        }

        notification.success({
          message: editingRecord ? 'Leave request updated' : 'Leave request submitted',
          description: 'Your leave request has been processed successfully'
        });

        handleCancel();
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  // 删除请假申请
  const handleDelete = (id: string) => {
    setLeaveRequests(leaveRequests.filter(req => req.id !== id));
    notification.success({
      message: 'Leave request deleted',
      description: 'The leave request has been removed'
    });
  };

  // 获取请假类型标签
  const getTypeTag = (type: string) => {
    const typeMap: Record<string, { label: string; color: string }> = {
      'sick': { label: 'Sick Leave', color: 'red' },
      'personal': { label: 'Personal Leave', color: 'blue' },
      'academic': { label: 'Academic Leave', color: 'green' },
      'other': { label: 'Other', color: 'purple' }
    };
    
    const config = typeMap[type] || { label: type, color: 'default' };
    return <Tag color={config.color}>{config.label}</Tag>;
  };

  // 获取状态标签
  const getStatusTag = (status: string) => {
    const statusMap: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
      'pending': { label: 'Pending', color: 'orange', icon: <ClockCircleOutlined /> },
      'approved': { label: 'Approved', color: 'green', icon: <CheckOutlined /> },
      'rejected': { label: 'Rejected', color: 'red', icon: <CloseOutlined /> }
    };
    
    const config = statusMap[status];
    return (
      <Tag color={config.color} icon={config.icon}>
        {config.label}
      </Tag>
    );
  };

  // 表格列配置
  const columns: ColumnsType<LeaveRequest> = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => getTypeTag(type)
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
      key: 'reason',
      render: (reason) => (
        <Tooltip title={reason}>
          <Text ellipsis style={{ maxWidth: 200 }}>{reason}</Text>
        </Tooltip>
      )
    },
    {
      title: 'Dates',
      key: 'dates',
      render: (_, record) => (
        <Space direction="vertical">
          <Text>{record.startDate} - {record.endDate}</Text>
          <Text type="secondary">{record.days} day{record.days !== 1 ? 's' : ''}</Text>
        </Space>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => getStatusTag(status),
      filters: [
        { text: 'All', value: 'all' },
        { text: 'Pending', value: 'pending' },
        { text: 'Approved', value: 'approved' },
        { text: 'Rejected', value: 'rejected' }
      ],
      onFilter: (value, record) => value === 'all' || record.status === value
    },
    {
      title: 'Submitted',
      dataIndex: 'submittedAt',
      key: 'submittedAt',
      render: (text) => <Text type="secondary">{text}</Text>,
      sorter: (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          {record.status === 'pending' && (
            <Button 
              icon={<EditOutlined />} 
              size="small" 
              type="text"
              onClick={() => handleOpenModal(record)}
            >
              Edit
            </Button>
          )}
          
          {record.status === 'pending' && (
            <Popconfirm
              title="Are you sure you want to delete this leave request?"
              onConfirm={() => handleDelete(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button 
                icon={<DeleteOutlined />} 
                size="small" 
                type="text" 
                danger
              >
                Delete
              </Button>
            </Popconfirm>
          )}
          
          {record.status !== 'pending' && (
            <Tooltip 
              title={
                record.status === 'approved' 
                  ? `Approved by ${record.approvedBy} on ${record.approvedAt}`
                  : `Rejected: ${record.notes || 'No reason provided'}`
              }
            >
              <Button type="text" size="small">Details</Button>
            </Tooltip>
          )}
        </Space>
      )
    }
  ];

  // 计算请假统计
  const getLeaveStats = () => {
    return {
      total: leaveRequests.length,
      pending: leaveRequests.filter(req => req.status === 'pending').length,
      approved: leaveRequests.filter(req => req.status === 'approved').length,
      rejected: leaveRequests.filter(req => req.status === 'rejected').length,
      totalDays: leaveRequests.reduce((sum, req) => sum + req.days, 0)
    };
  };

  const stats = getLeaveStats();

  return (
    <div className="p-4">
      <Card title={<Title level={2}>Leave Requests</Title>}>
        {/* 统计信息 */}
        <div className="mb-6">
          <Paragraph>Track and manage your leave requests</Paragraph>
          <Space size="large" className="mt-2">
            <Badge count={stats.total} showZero>Total Requests</Badge>
            <Badge count={stats.pending} status="processing" showZero>Pending</Badge>
            <Badge count={stats.approved} status="success" showZero>Approved</Badge>
            <Badge count={stats.rejected} status="error" showZero>Rejected</Badge>
            <Text type="secondary">Total days: {stats.totalDays}</Text>
          </Space>
        </div>

        {/* 操作栏 */}
        <div className="mb-4 flex flex-col sm:flex-row gap-3 justify-between">
          <div className="flex-1 max-w-md">
            <Input
              placeholder="Search by reason or type..."
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
              onClick={() => setStatusFilter('pending')}
              type={statusFilter === 'pending' ? 'primary' : 'default'}
            >
              Pending
            </Button>
            <Button 
              icon={<PlusOutlined />} 
              type="primary"
              onClick={() => handleOpenModal()}
            >
              New Request
            </Button>
          </Space>
        </div>

        {/* 请假记录表格 */}
        <Spin spinning={loading} tip="Loading your leave requests...">
          {filteredRequests.length > 0 ? (
            <Table
              columns={columns}
              dataSource={filteredRequests}
              rowKey="id"
              pagination={{ pageSize: 5 }}
              scroll={{ x: 'max-content' }}
            />
          ) : (
            <Empty description="No leave requests found" />
          )}
        </Spin>

        {/* 新建/编辑请假申请模态框 */}
        <Modal
          title={editingRecord ? "Edit Leave Request" : "New Leave Request"}
          open={isModalVisible}
          onCancel={handleCancel}
          onOk={handleSubmit}
          maskClosable={false}
          destroyOnHidden
        >
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              type: 'personal',
              dateRange: [moment(), moment()]
            }}
          >
            <Item
              name="type"
              label="Leave Type"
              rules={[{ required: true, message: 'Please select leave type' }]}
            >
              <Select placeholder="Select leave type">
                <Option value="sick">Sick Leave</Option>
                <Option value="personal">Personal Leave</Option>
                <Option value="academic">Academic Leave</Option>
                <Option value="other">Other</Option>
              </Select>
            </Item>
            
            <Item
              name="dateRange"
              label="Date Range"
              rules={[{ required: true, message: 'Please select date range' }]}
            >
              <RangePicker 
                disabledDate={(current) => 
                  current && current < moment().subtract(1, 'days').endOf('day')
                }
                placeholder={['Start Date', 'End Date']}
              />
            </Item>
            
            <Item
              name="reason"
              label="Reason for Leave"
              rules={[{ required: true, message: 'Please provide reason for leave' }]}
            >
              <Input placeholder="Please explain the reason for your leave..." />
            </Item>
            
            <Item
              name="notes"
              label="Additional Notes"
            >
              <Input placeholder="Any additional information..." />
            </Item>
            
            {editingRecord && editingRecord.status !== 'pending' && (
              <Item>
                <Text type="warning">
                  This request has already been {editingRecord.status}. Changes may require re-approval.
                </Text>
              </Item>
            )}
          </Form>
        </Modal>
      </Card>
    </div>
  );
}