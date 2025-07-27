import ComponentCard from '@/components/common/ComponentCard'
import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import { Metadata } from 'next'
import DisciplineRecords from './DisciplineRecords'

export const metadata: Metadata = {
  title: '学生违纪记录管理',
  description: '展示所有学生违纪记录，支持状态筛选',
}

export default function DisciplineRecordsPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle={metadata.title as string} />
      <div className="space-y-6">
        <ComponentCard title={metadata.title as string} desc={metadata.description as string}>
          <DisciplineRecords />
        </ComponentCard>
      </div>
    </div>
  )
}
