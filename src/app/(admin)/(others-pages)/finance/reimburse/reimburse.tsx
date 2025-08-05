'use client'

import React, { useState } from 'react'
import {
  Table, Button, Tag, Space, Modal, Form, Input,
  Typography, Card, Radio, message, InputNumber,
  DatePicker, Select
} from 'antd'
import {
  CheckOutlined, CloseOutlined, ExclamationCircleOutlined,
  FilterOutlined, PlusOutlined
} from '@ant-design/icons'
import { useI18n } from '@/context/I18nContext'
import type { Dayjs } from 'dayjs'
import type { Key } from 'react'

// 定义报销单数据类型
interface ReimburseItem {
  id: number;
  applicant: string;
  department: string;
  amount: number;
  type: string;
  date: string;
  status: '待审批' | '已通过' | '已拒绝';
  description?: string; // 报销描述
}

// 部门列表
const departments = [
  { label: '市场部', value: '市场部' },
  { label: '技术部', value: '技术部' },
  { label: '财务部', value: '财务部' },
  { label: '人力资源部', value: '人力资源部' },
  { label: '行政部', value: '行政部' }
]

// 报销类型
const reimburseTypes = [
  { label: '差旅费', value: '差旅费' },
  { label: '办公用品', value: '办公用品' },
  { label: '交通费', value: '交通费' },
  { label: '业务招待费', value: '业务招待费' },
  { label: '其他', value: '其他' }
]

const initialReimburseData: ReimburseItem[] = [
  {
    id: 1,
    applicant: '张三',
    department: '市场部',
    amount: 1200.5,
    type: '差旅费',
    date: '2024-05-01',
    status: '待审批',
    description: '上海客户拜访差旅费用'
  },
  {
    id: 2,
    applicant: '李四',
    department: '技术部',
    amount: 800,
    type: '办公用品',
    date: '2024-05-03',
    status: '已通过',
    description: '开发团队新员工办公设备'
  },
  {
    id: 3,
    applicant: '王五',
    department: '财务部',
    amount: 500,
    type: '交通费',
    date: '2024-05-05',
    status: '已拒绝',
    description: '外出银行办理业务交通费用'
  },
  {
    id: 4,
    applicant: '赵六',
    department: '市场部',
    amount: 300,
    type: '差旅费',
    date: '2024-05-06',
    status: '待审批',
    description: '北京展会差旅补贴'
  },
]

// 审批状态与标签颜色的映射
const statusConfig: Record<string, { color: string; text: string }> = {
  '待审批': { color: 'orange', text: '待审批' },
  '已通过': { color: 'green', text: '已通过' },
  '已拒绝': { color: 'red', text: '已拒绝' },
}

const { Title, Text } = Typography;
const { Option } = Select;

export default function ReimburseAntd() {
  const [form] = Form.useForm();
  const [createForm] = Form.useForm(); // 新建报销单的表单
  const { t } = useI18n()
  const [status, setStatus] = useState('全部')
  const [reimburseData, setReimburseData] = useState<ReimburseItem[]>(initialReimburseData)
  const [rejectModalVisible, setRejectModalVisible] = useState(false)
  const [createModalVisible, setCreateModalVisible] = useState(false) // 新建弹窗状态
  const [currentItem, setCurrentItem] = useState<ReimburseItem | null>(null)
  const [loading, setLoading] = useState<number | null>(null)
  const [createLoading, setCreateLoading] = useState(false) // 新建提交加载状态

  // 筛选数据
  const filteredData = status === '全部'
    ? reimburseData
    : reimburseData.filter(item => item.status === status)

  // 处理审批通过
  const handleApprove = async (item: ReimburseItem) => {
    try {
      setLoading(item.id)
      // API调用示例
      // const response = await fetch(`/api/reimburse/${item.id}/approve`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' }
      // })

      // 模拟API延迟
      await new Promise(resolve => setTimeout(resolve, 500))

      // 更新本地数据
      const updatedData = reimburseData.map(i =>
        i.id === item.id ? { ...i, status: '已通过' } : i
      )
      setReimburseData(updatedData as any)
      message.success(t('financeReimburse.approveSuccess' as any))
    } catch (error) {
      console.error('审批失败:', error)
      message.error(t('financeReimburse.approveFailed' as any))
    } finally {
      setLoading(null)
    }
  }

  // 打开驳回对话框
  const handleRejectOpen = (item: ReimburseItem) => {
    setCurrentItem(item)
    form.resetFields(['reason'])
    setRejectModalVisible(true)
  }

  // 处理驳回确认
  const handleRejectConfirm = async () => {
    if (!currentItem) return;

    try {
      const values = await form.validateFields()
      setLoading(currentItem.id)

      // API调用示例
      // const response = await fetch(`/api/reimburse/${currentItem.id}/reject`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ reason: values.reason })
      // })

      // 模拟API延迟
      await new Promise(resolve => setTimeout(resolve, 500))

      // 更新本地数据
      const updatedData = reimburseData.map(i =>
        i.id === currentItem.id ? { ...i, status: '已拒绝' } : i
      )
      setReimburseData(updatedData as any)
      setRejectModalVisible(false)
      message.success(t('financeReimburse.rejectSuccess' as any))
    } catch (error) {
      console.error('驳回失败:', error)
      message.error(t('financeReimburse.rejectFailed' as any))
    } finally {
      setLoading(null)
    }
  }

  // 打开新建报销单弹窗
  const handleCreateOpen = () => {
    createForm.resetFields();
    setCreateModalVisible(true);
  }

  // 处理新建报销单提交
  const handleCreateSubmit = async () => {
    try {
      setCreateLoading(true);
      const values = await createForm.validateFields();

      // 格式化日期
      const formattedDate = values.date.format('YYYY-MM-DD');

      // 生成新ID (实际应用中由后端生成)
      const newId = Math.max(...reimburseData.map(item => item.id), 0) + 1;

      // 构建新报销单数据
      const newReimburse: ReimburseItem = {
        id: newId,
        applicant: values.applicant,
        department: values.department,
        amount: values.amount,
        type: values.type,
        date: formattedDate,
        status: '待审批',
        description: values.description
      };

      // API调用示例
      // const response = await fetch('/api/reimburse', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(newReimburse)
      // });

      // 模拟API延迟
      await new Promise(resolve => setTimeout(resolve, 800));

      // 添加到本地数据
      setReimburseData([...reimburseData, newReimburse]);
      setCreateModalVisible(false);
      message.success(t('financeReimburse.createSuccess' as any));
    } catch (error) {
      console.error('创建报销单失败:', error);
      message.error(t('financeReimburse.createFailed' as any));
    } finally {
      setCreateLoading(false);
    }
  }

  // 表格列配置
  const columns = [
    {
      title: t('financeReimburse.table.applicant' as any),
      dataIndex: 'applicant',
      key: 'applicant',
      render: (text: string) => (
        <Space>
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium">
            {text.charAt(0)}
          </div>
          <span>{text}</span>
        </Space>
      ),
      sorter: (a: ReimburseItem, b: ReimburseItem) => a.applicant.localeCompare(b.applicant)
    },
    {
      title: t('financeReimburse.table.department' as any),
      dataIndex: 'department',
      key: 'department',
      sorter: (a: ReimburseItem, b: ReimburseItem) => a.department.localeCompare(b.department)
    },
    {
      title: t('financeReimburse.table.type' as any),
      dataIndex: 'type',
      key: 'type',
      filters: reimburseTypes.map(type => ({ text: type.label, value: type.value })),
      onFilter: (value: string, record: ReimburseItem) => record.type === value,
      render: (type: string) => {
        const typeItem = reimburseTypes.find(item => item.value === type);
        return typeItem?.label || type;
      }
    },

    {
      title: t('financeReimburse.table.amount' as any),
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `¥${amount.toFixed(2)}`,
      sorter: (a: ReimburseItem, b: ReimburseItem) => a.amount - b.amount
    },
    {
      title: t('financeReimburse.table.date' as any),
      dataIndex: 'date',
      key: 'date',
      sorter: (a: ReimburseItem, b: ReimburseItem) => a.date.localeCompare(b.date)
    },
    {
      title: t('financeReimburse.table.description' as any),
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: t('financeReimburse.table.status' as any),
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={statusConfig[status as keyof typeof statusConfig].color}>
          {statusConfig[status as keyof typeof statusConfig].text}
        </Tag>
      ),
      filters: [
        { text: '待审批', value: '待审批' },
        { text: '已通过', value: '已通过' },
        { text: '已拒绝', value: '已拒绝' },
      ],
      onFilter: (value: string, record: ReimburseItem) => record.status === value
    },
    {
      title: t('financeReimburse.table.action' as any),
      key: 'action',
      render: (_: any, record: ReimburseItem) => (
        <Space size="middle">
          {record.status === '待审批' ? (
            <>
              <Button
                type="primary"
                size="small"
                icon={<CheckOutlined />}
                loading={loading === record.id}
                onClick={() => handleApprove(record)}
              >
                {t('financeReimburse.approve' as any)}
              </Button>
              <Button
                danger
                size="small"
                icon={<CloseOutlined />}
                loading={loading === record.id}
                onClick={() => handleRejectOpen(record)}
              >
                {t('financeReimburse.reject' as any)}
              </Button>
            </>
          ) : (
            <Text type="secondary">
              {t('financeReimburse.noAction' as any)}
            </Text>
          )}
        </Space>
      ),
    },
  ]

  return (
    <Card className="mt-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <Title level={4} style={{ margin: 0 }}>
          {t('financeReimburse.title' as any)}
        </Title>

        <Space size="middle" className="w-full sm:w-auto flex-wrap">
          {/* 新建按钮 */}
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreateOpen}
          >
            {t('financeReimburse.createNew' as any)}
          </Button>

          <span className="text-sm text-gray-500 flex items-center">
            <FilterOutlined style={{ marginRight: 4 }} />
            {t('financeReimburse.filter' as any)}:
          </span>
          <Radio.Group
            value={status}
            onChange={e => setStatus(e.target.value)}
            buttonStyle="solid"
          >
            <Radio.Button value="全部">{t('common.all' as any)}</Radio.Button>
            <Radio.Button value="待审批">{t('financeReimburse.status.pending' as any)}</Radio.Button>
            <Radio.Button value="已通过">{t('financeReimburse.status.approved' as any)}</Radio.Button>
            <Radio.Button value="已拒绝">{t('financeReimburse.status.rejected' as any)}</Radio.Button>
          </Radio.Group>
        </Space>
      </div>
{/* 
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `${t('common.total' as any)} ${total} ${t('common.items' as any)}`
        }}
        scroll={{ x: 'max-content' }}
      /> */}

      {/* 驳回原因弹窗 */}
      <Modal
        title={
          <div className="flex items-center text-red-600">
            <ExclamationCircleOutlined style={{ marginRight: 8 }} />
            <span>{t('financeReimburse.rejectReasonTitle' as any)}</span>
          </div>
        }
        open={rejectModalVisible}
        onCancel={() => setRejectModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setRejectModalVisible(false)}>
            {t('common.cancel' as any)}
          </Button>,
          <Button
            key="confirm"
            danger
            onClick={handleRejectConfirm}
          >
            {t('common.confirm' as any)}
          </Button>
        ]}
      >
        {currentItem && (
          <Form form={form} layout="vertical">
            <Form.Item
              name="reason"
              label={t('financeReimburse.rejectReason' as any)}
              rules={[
                { required: true, message: t('financeReimburse.pleaseEnterReason' as any) },
                { min: 5, message: t('financeReimburse.reasonMinLength' as any) }
              ]}
            >
              <Input.TextArea
                rows={4}
                placeholder={t('financeReimburse.enterRejectReason' as any)}
              />
            </Form.Item>
          </Form>
        )}
      </Modal>

      {/* 新建报销单弹窗 */}
      <Modal
        title={
          <div className="flex items-center text-blue-600">
            <PlusOutlined style={{ marginRight: 8 }} />
            <span>{t('financeReimburse.createReimburse' as any)}</span>
          </div>
        }
        open={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setCreateModalVisible(false)}>
            {t('common.cancel' as any)}
          </Button>,
          <Button
            key="confirm"
            type="primary"
            loading={createLoading}
            onClick={handleCreateSubmit}
          >
            {t('common.submit' as any)}
          </Button>
        ]}
        width={600}
      >
        <Form form={createForm} layout="vertical" initialValues={{ date: new Date() }}>
          <Form.Item
            name="applicant"
            label={t('financeReimburse.table.applicant' as any)}
            rules={[
              { required: true, message: t('financeReimburse.pleaseEnterApplicant' as any) },
              { min: 2, message: t('financeReimburse.applicantMinLength' as any) }
            ]}
          >
            <Input placeholder={t('financeReimburse.enterApplicant' as any)} />
          </Form.Item>

          <Form.Item
            name="department"
            label={t('financeReimburse.table.department' as any)}
            rules={[{ required: true, message: t('financeReimburse.pleaseSelectDepartment' as any) }]}
          >
            <Select placeholder={t('financeReimburse.selectDepartment' as any)}>
              {departments.map(dept => (
                <Option key={dept.value} value={dept.value}>
                  {dept.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="type"
            label={t('financeReimburse.table.type' as any)}
            rules={[{ required: true, message: t('financeReimburse.pleaseSelectType' as any) }]}
          >
            <Select placeholder={t('financeReimburse.selectType' as any)}>
              {reimburseTypes.map(type => (
                <Option key={type.value} value={type.value}>
                  {type.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="amount"
            label={t('financeReimburse.table.amount' as any)}
            rules={[
              { required: true, message: t('financeReimburse.pleaseEnterAmount' as any) },
              { type: 'number', min: 0.01, message: t('financeReimburse.amountMin' as any) }
            ]}
          >
            <InputNumber
              placeholder={t('financeReimburse.enterAmount' as any)}
              formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value!.replace(/\¥\s?|(,*)/g, '')}
              style={{ width: '100%' }}
              step={0.01}
              precision={2}
            />
          </Form.Item>

          <Form.Item
            name="description"
            label={t('financeReimburse.table.description' as any)}
            rules={[
              { required: true, message: t('financeReimburse.pleaseEnterDescription' as any) },
              { min: 5, message: t('financeReimburse.descriptionMinLength' as any) }
            ]}
          >
            <Input.TextArea
              rows={4}
              placeholder={t('financeReimburse.enterDescription' as any)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  )
}
