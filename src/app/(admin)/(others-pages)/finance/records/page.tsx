import ComponentCard from '@/components/common/ComponentCard'
import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import FinanceRecordTable from './financeRecord'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '财务记录查询 | 管理后台',
  description: '展示所有财务交易记录，可按类型筛选',
}

export default function FinanceRecordsPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="财务记录查询" />
      <div className="space-y-6">
        <ComponentCard title="财务流水表">
          <FinanceRecordTable />
        </ComponentCard>
      </div>
    </div>
  )
}
