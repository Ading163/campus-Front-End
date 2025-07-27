import ComponentCard from '@/components/common/ComponentCard'
import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import { Metadata } from 'next'
import StudentGradesTable from './StudentGradesTable'

export const metadata: Metadata = {
  title: '学生成绩管理',
  description: '展示所有学生成绩记录，支持状态筛选',
}

export default function StudentGradesPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle={metadata.title as string} />
      <div className="space-y-6">
        <ComponentCard title={metadata.title as string} desc={metadata.description as string}>
          <StudentGradesTable />
        </ComponentCard>
      </div>
    </div>
  )
}
