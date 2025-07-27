import ComponentCard from '@/components/common/ComponentCard'
import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import LeaveApprovalTable from './LeaveApprovalTable'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '请假审批管理',
  description: '展示所有请假审批记录，支持状态筛选',
}

export default function LeaveApprovalPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle={metadata.title as string} />
      <div className="space-y-6">
        <ComponentCard title={metadata.title as string} desc={metadata.description as string}>
          <LeaveApprovalTable />
        </ComponentCard>
      </div>
    </div>
  )
}
