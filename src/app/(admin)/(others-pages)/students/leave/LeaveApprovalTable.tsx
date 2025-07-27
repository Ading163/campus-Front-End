'use client'

import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Badge from '@/components/ui/badge/Badge'
import { useI18n } from '@/context/I18nContext'

const leaveData = [
  {
    id: 301,
    studentName: '林小雨',
    studentId: '20230101',
    class: '计算机一班',
    type: '病假',
    dateRange: '2024-07-10 ~ 2024-07-12',
    status: '待审批',
  },
  {
    id: 302,
    studentName: '张晨',
    studentId: '20230102',
    class: '计算机二班',
    type: '事假',
    dateRange: '2024-07-15 ~ 2024-07-16',
    status: '已批准',
  },
  {
    id: 303,
    studentName: '李雪',
    studentId: '20230103',
    class: '计算机一班',
    type: '病假',
    dateRange: '2024-07-08 ~ 2024-07-09',
    status: '已驳回',
  },
]

const statusColors: Record<string, 'warning' | 'success' | 'error'> = {
  '待审批': 'warning',
  '已批准': 'success',
  '已驳回': 'error',
}

export default function LeaveApprovalTable() {
  const { t } = useI18n()
  const [status, setStatus] = useState('全部')

  const statusTabs = ['全部', '待审批', '已批准', '已驳回']
  const filtered =
    status === '全部' ? leaveData : leaveData.filter((d) => d.status === status)

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      {/* 状态按钮 */}
      <div className="p-4 flex flex-wrap gap-2">
        {statusTabs.map((s) => (
          <button
            key={s}
            className={`px-4 py-1 rounded text-sm ${
              status === s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setStatus(s)}
          >
            {s === '全部'
              ? t('common.all' as any)
              : t(`studentsLeave.status.${getStatusKey(s)}` as any)}
          </button>
        ))}
      </div>

      {/* 表格 */}
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1100px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 text-start">
                  {t('studentsLeave.table.name' as any)}
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">
                  {t('studentsLeave.table.id' as any)}
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">
                  {t('studentsLeave.table.class' as any)}
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">
                  {t('studentsLeave.table.type' as any)}
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">
                  {t('studentsLeave.table.dateRange' as any)}
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">
                  {t('studentsLeave.table.status' as any)}
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {filtered.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="px-5 py-4 text-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-100 text-blue-600 font-semibold text-sm">
                        {item.studentName.charAt(0)}
                      </div>
                      <span className="text-gray-800 text-theme-sm dark:text-white/90">
                        {item.studentName}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start text-gray-500">{item.studentId}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-gray-500">{item.class}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-gray-500">{item.type}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-gray-500">{item.dateRange}</TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <Badge color={statusColors[item.status]} size="sm">
                      {t(`studentsLeave.status.${getStatusKey(item.status)}` as any)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

function getStatusKey(cn: string): string {
  const map: Record<string, string> = {
    '待审批': 'pending',
    '已批准': 'approved',
    '已驳回': 'rejected',
  }
  return map[cn] || cn
}
