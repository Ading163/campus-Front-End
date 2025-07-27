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

const disciplineData = [
  {
    id: 401,
    studentName: '赵强',
    studentId: '20230111',
    class: '软件工程一班',
    type: '课堂打闹',
    date: '2024-06-10',
    status: '待处理',
  },
  {
    id: 402,
    studentName: '钱敏',
    studentId: '20230112',
    class: '软件工程二班',
    type: '迟到早退',
    date: '2024-06-11',
    status: '已处理',
  },
  {
    id: 403,
    studentName: '孙亮',
    studentId: '20230113',
    class: '计算机科学一班',
    type: '考试作弊',
    date: '2024-06-12',
    status: '已申诉',
  },
]

const statusColors: Record<string, 'warning' | 'success' | 'info'> = {
  '待处理': 'warning',
  '已处理': 'success',
  '已申诉': 'info',
}

export default function DisciplineRecords() {
  const { t } = useI18n()
  const [status, setStatus] = useState('全部')

  const statusTabs = ['全部', '待处理', '已处理', '已申诉']

  const filtered =
    status === '全部' ? disciplineData : disciplineData.filter((d) => d.status === status)

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      {/* 状态筛选按钮 */}
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
              : t(`studentsDiscipline.status.${getStatusKey(s)}` as any)}
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
                  {t('studentsDiscipline.table.name' as any)}
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">
                  {t('studentsDiscipline.table.id' as any)}
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">
                  {t('studentsDiscipline.table.class' as any)}
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">
                  {t('studentsDiscipline.table.type' as any)}
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">
                  {t('studentsDiscipline.table.date' as any)}
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">
                  {t('studentsDiscipline.table.status' as any)}
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
                  <TableCell className="px-4 py-3 text-start text-gray-500">{item.date}</TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <Badge color={statusColors[item.status]} size="sm">
                      {t(`studentsDiscipline.status.${getStatusKey(item.status)}` as any)}
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
    '已处理': 'resolved',
    '已申诉': 'appealed',
  }
  return map[cn] || cn
}
