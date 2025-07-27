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

const gradeData = [
  {
    id: 1,
    studentName: '王明',
    studentId: '20230101',
    class: '计算机一班',
    subject: '数学',
    score: 95,
    level: '优秀',
  },
  {
    id: 2,
    studentName: '李红',
    studentId: '20230102',
    class: '计算机一班',
    subject: '英语',
    score: 72,
    level: '及格',
  },
  {
    id: 3,
    studentName: '张伟',
    studentId: '20230103',
    class: '计算机二班',
    subject: '物理',
    score: 58,
    level: '不及格',
  },
]

const levelColors: Record<string, 'success' | 'warning' | 'error'> = {
  '优秀': 'success',
  '及格': 'warning',
  '不及格': 'error',
}

export default function StudentGradesTable() {
  const { t } = useI18n()
  const [levelFilter, setLevelFilter] = useState('全部')
  const [searchId, setSearchId] = useState('')

  const levels = ['全部', '优秀', '及格', '不及格']

  const filtered = gradeData.filter((item) => {
    const matchLevel =
      levelFilter === '全部' || item.level === levelFilter
    const matchId =
      searchId.trim() === '' || item.studentId.includes(searchId.trim())
    return matchLevel && matchId
  })

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      {/* 筛选和搜索 */}
      <div className="p-4 flex flex-wrap justify-between gap-4 items-center">
        <div className="flex flex-wrap gap-2">
          {levels.map((l) => (
            <button
              key={l}
              className={`px-4 py-1 rounded text-sm ${
                levelFilter === l
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setLevelFilter(l)}
            >
            {l === '全部'
              ? t('common.all' as any)
              : t(`studentsPerformance.level.${getLevelKey(l)}` as any)}
            </button>
          ))}
        </div>
        <input
          type="text"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="请输入学号查询"
          className="w-60 px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-white/10 dark:text-white dark:border-white/20"
        />
      </div>

      {/* 表格区域 */}
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1100px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 text-start">
                  {t('studentsPerformance.table.name' as any)}
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">
                  {t('studentsPerformance.table.id' as any)}
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">
                  {t('studentsPerformance.table.class' as any)}
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">
                  {t('studentsPerformance.table.subject' as any)}
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">
                  {t('studentsPerformance.table.score' as any)}
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">
                  {t('studentsPerformance.table.level' as any)}
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
                  <TableCell className="px-4 py-3 text-start text-gray-500">{item.subject}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-gray-500">{item.score}</TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <Badge color={levelColors[item.level]} size="sm">
                      {t(`studentsPerformance.level.${getLevelKey(item.level)}` as any)}
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

function getLevelKey(cn: string): string {
  const map: Record<string, string> = {
    '优秀': 'excellent',
    '及格': 'pass',
    '不及格': 'fail',
  }
  return map[cn] || cn
}
