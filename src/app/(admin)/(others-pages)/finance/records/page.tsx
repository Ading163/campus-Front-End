import ComponentCard from '@/components/common/ComponentCard'
import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import FinanceRecordTable from './financeRecord'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '财务记录查询',
  description: '展示所有财务交易记录，可按类型筛选',
}

export default function FinanceRecordsPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle={metadata.title as string} />
      <div className="space-y-6">
        <ComponentCard title={metadata.title as string} desc={metadata.description as string}>
          <FinanceRecordTable />
        </ComponentCard>
      </div>
    </div>
  )
}
