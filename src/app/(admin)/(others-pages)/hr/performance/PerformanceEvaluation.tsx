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

const departmentList = [
  'computerScience',
  'academicAffairs',
  'languages',
  'studentServices',
  'logistics',
]

const performanceData = [
  {
    id: 1,
    name: 'John Smith',
    employeeId: 'INTL2023001',
    department: 'computerScience',
    score: 'excellent',
    date: '2025-06-30',
  },
  {
    id: 2,
    name: 'Maria Garcia',
    employeeId: 'INTL2023002',
    department: 'academicAffairs',
    score: 'good',
    date: '2025-06-30',
  },
  {
    id: 3,
    name: 'Akira Tanaka',
    employeeId: 'INTL2023003',
    department: 'languages',
    score: 'average',
    date: '2025-06-30',
  },
  {
    id: 4,
    name: 'Emma Müller',
    employeeId: 'INTL2023004',
    department: 'studentServices',
    score: 'poor',
    date: '2025-06-30',
  },
  {
    id: 5,
    name: 'Carlos Silva',
    employeeId: 'INTL2023005',
    department: 'logistics',
    score: 'good',
    date: '2025-06-30',
  },
]

const scoreColors: Record<string, 'success' | 'warning' | 'error' > = {
  excellent: 'success',
  good: 'success',
  average: 'warning',
  poor: 'error',
}

export default function PerformanceEvaluation() {
  const { t } = useI18n()
  const [selectedDept, setSelectedDept] = useState('all')
  const [selectedScore, setSelectedScore] = useState('all')

  const filtered = performanceData.filter((item) => {
    const matchDept = selectedDept === 'all' || item.department === selectedDept
    const matchScore = selectedScore === 'all' || item.score === selectedScore
    return matchDept && matchScore
  })

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="p-4 text-lg font-semibold text-gray-800 dark:text-white">
        {/* {t('performance.title' as any)} */}
      </div>

      {/* 筛选区域 */}
      <div className="px-4 pb-4 flex flex-wrap gap-3 items-center">
        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="all">{t('performance.filters.allDepartments' as any)}</option>
          {departmentList.map((dept) => (
            <option key={dept} value={dept}>
              {t(`performance.departmentList.${dept}` as any)}
            </option>
          ))}
        </select>

        <select
          value={selectedScore}
          onChange={(e) => setSelectedScore(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="all">{t('performance.filters.allScores' as any)}</option>
          <option value="excellent">{t('performance.score.excellent' as any)}</option>
          <option value="good">{t('performance.score.good' as any)}</option>
          <option value="average">{t('performance.score.average' as any)}</option>
          <option value="poor">{t('performance.score.poor' as any)}</option>
        </select>
      </div>

      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1000px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 text-start">
                  {t('performance.table.name' as any)}
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">
                  {t('performance.table.employeeId' as any)}
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">
                  {t('performance.table.department' as any)}
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">
                  {t('performance.table.score' as any)}
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">
                  {t('performance.table.date' as any)}
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {filtered.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="px-5 py-4 text-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-100 text-blue-600 font-semibold text-sm">
                        {item.name.charAt(0)}
                      </div>
                      <span className="text-gray-800 text-theme-sm dark:text-white/90">
                        {item.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start text-gray-500">{item.employeeId}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-gray-500">
                    {t(`performance.departmentList.${item.department}` as any)}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <Badge color={scoreColors[item.score]} size="sm">
                      {t(`performance.score.${item.score}` as any)}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start text-gray-500">{item.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}