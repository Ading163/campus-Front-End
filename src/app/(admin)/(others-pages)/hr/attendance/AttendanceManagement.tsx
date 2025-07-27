'use client'

import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useI18n } from '@/context/I18nContext'
import Badge from '@/components/ui/badge/Badge'

const departmentList = [
  'computerScience',
  'academicAffairs',
  'languages',
  'studentServices',
  'logistics',
]

const statusList = ['Present', 'Absent', 'Late']
const statusColors: Record<string, 'warning' | 'success' | 'error'> = {
  'Present': 'success',
  'Absent': 'error',
  'Late': 'warning',
}
const attendanceData = [
  {
    id: 1,
    name: 'John Smith',
    employeeId: 'INTL2023001',
    department: 'computerScience',
    date: '2024-07-20',
    status: 'Present',
  },
  {
    id: 2,
    name: 'Maria Garcia',
    employeeId: 'INTL2023002',
    department: 'academicAffairs',
    date: '2024-07-20',
    status: 'Absent',
  },
  {
    id: 3,
    name: 'Emma Müller',
    employeeId: 'INTL2023004',
    department: 'studentServices',
    date: '2024-07-19',
    status: 'Late',
  },
  {
    id: 4,
    name: 'Carlos Silva',
    employeeId: 'INTL2023005',
    department: 'logistics',
    date: '2024-07-18',
    status: 'Present',
  },
]

export default function AttendanceManagement() {
  const { t } = useI18n()
  const [selectedDept, setSelectedDept] = useState('All Departments')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('All Statuses')

  const filtered = attendanceData.filter((item) => {
    const matchDept =
      selectedDept === 'All Departments' || item.department === selectedDept
    const matchDate = !selectedDate || item.date === selectedDate
    const matchStatus =
      selectedStatus === 'All Statuses' || item.status === selectedStatus
    return matchDept && matchDate && matchStatus
  })

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="p-4 text-lg font-semibold text-gray-800 dark:text-white">
        {/* {t('attendance.title' as any)} */}
      </div>

      {/* 筛选区域 */}
      <div className="px-4 pb-4 flex flex-wrap gap-3 items-center">
        {/* 部门筛选 */}
        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="All Departments">
            {t('attendance.filters.allDepartments' as any)}
          </option>
          {departmentList.map((dept) => (
            <option key={dept} value={dept}>
              {t(`attendance.departmentList.${dept}` as any)}
            </option>
          ))}
        </select>

        {/* 日期筛选：仅支持某一天 */}
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        {/* 考勤状态筛选 */}
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="All Statuses">
            {t('attendance.filters.allStatuses' as any)}
          </option>
          {statusList.map((status) => (
            <option key={status} value={status}>
              {t(`attendance.status.${status.toLowerCase()}` as any)}
            </option>
          ))}
        </select>
      </div>

      {/* 表格区域 */}
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1000px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 text-start">
                  {t('attendance.table.name' as any)}
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">
                  {t('attendance.table.employeeId' as any)}
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">
                  {t('attendance.table.department' as any)}
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">
                  {t('attendance.table.date' as any)}
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">
                  {t('attendance.table.status' as any)}
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
                  <TableCell className="px-4 py-3 text-start text-gray-500">
                    {item.employeeId}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start text-gray-500">
                    {t(`attendance.departmentList.${item.department}` as any)}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start text-gray-500">
                    {item.date}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-start">
                    <Badge color={statusColors[item.status]} size="sm">
                      {t(`attendance.status.${getStatusKey(item.status.toLowerCase())}` as any)}
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
function getStatusKey(status: string): string {
  const map: Record<string, string> = {
    present: 'present',
    absent: 'absent',
    late: 'late',
  }
  return map[status] || status
}
