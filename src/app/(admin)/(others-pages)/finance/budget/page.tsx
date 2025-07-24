import ComponentCard from '@/components/common/ComponentCard'
import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import Budget from './budget'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '预算申请管理 | 管理后台',
  description: '展示所有预算申请记录，支持状态筛选',
}

export default function BudgetRequestPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="预算申请管理" />
      <div className="space-y-6">
        <ComponentCard title="预算申请列表">
          <Budget />
        </ComponentCard>
      </div>
    </div>
  )
}
