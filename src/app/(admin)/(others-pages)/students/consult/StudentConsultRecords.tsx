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

const consultData = [
  {
    id: 501,
    studentName: '杨明',
    studentId: '20230121',
    class: '软件工程一班',
    topic: '心理辅导',
    date: '2024-06-05',
    status: '待处理',
  },
  {
    id: 502,
    studentName: '赵雪',
    studentId: '20230122',
    class: '计算机科学二班',
    topic: '职业规划',
    date: '2024-06-08',
    status: '已回复',
  },
  {
    id: 503,
    studentName: '陈刚',
    studentId: '20230123',
    class: '网络工程一班',
    topic: '课程选择',
    date: '2024-06-10',
    status: '已归档',
  },
]

const statusColors: Record<string, 'warning' | 'success' | 'primary'> = {
  '待处理': 'warning',
  '已回复': 'success',
  '已归档': 'primary'
}

export default function StudentConsultRecords() {
  const { t } = useI18n()
  const [status, setStatus] = useState('全部')

  const statusTabs = ['全部', '待处理', '已回复', '已归档']

  const filtered =
    status === '全部' ? consultData : consultData.filter((d) => d.status === status)

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      {/* 筛选按钮 */}
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
              : t(`studentsConsult.status.${getStatusKey(s)}` as any)}
          </button>
        ))}
      </div>

      {/* 表格内容 */}
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1100px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 text-start">
                  {t('studentsConsult.table.name' as any)}
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">
                  {t('studentsConsult.table.id' as any)}
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">
                  {t('studentsConsult.table.class' as any)}
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">
                  {t('studentsConsult.table.topic' as any)}
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">
                  {t('studentsConsult.table.date' as any)}
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">
                  {t('studentsConsult.table.status' as any)}
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
                  <TableCell className="px-4 py-3 text-start text-gray-500">{item.topic}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-gray-500">{item.date}</TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <Badge color={statusColors[item.status]} size="sm">
                    
                      {t(`studentsConsult.status.${getStatusKey(item.status)}` as any)}
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
    '待处理': 'pending',
    '已回复': 'replied',
    '已归档': 'archived',
  }
  return map[cn] || cn
}
