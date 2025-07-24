import ComponentCard from '@/components/common/ComponentCard'
import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import PaymentApprovalTable from './paymentApproval'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '付款审批 | 管理后台',
  description: '付款审批记录管理页面，包含状态筛选、表格展示',
}

export default function PaymentApprovalPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="付款审批管理" />
      <div className="space-y-6">
        <ComponentCard title="付款审批列表">
          <PaymentApprovalTable />
        </ComponentCard>
      </div>
    </div>
  )
}
