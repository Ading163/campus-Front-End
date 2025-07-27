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

const onboardingData = [
  {
    id: 1,
    name: 'Emily Johnson',
    employeeId: 'INTL2023010',
    department: 'academicAffairs',
    position: 'Curriculum Coordinator',
    startDate: '2025-08-01',
    status: 'inProgress',
  },
  {
    id: 2,
    name: 'Liam Wang',
    employeeId: 'INTL2023011',
    department: 'computerScience',
    position: 'Research Assistant',
    startDate: '2025-07-15',
    status: 'notStarted',
  },
  {
    id: 3,
    name: 'Isabella Müller',
    employeeId: 'INTL2023012',
    department: 'languages',
    position: 'Language Instructor',
    startDate: '2025-07-20',
    status: 'completed',
  },
]

const statusColors: Record<string, 'warning' | 'success' | 'error'> = {
  notStarted: 'error',
  inProgress: 'warning',
  completed: 'success',
}

export default function OnboardingManagement() {
  const { t } = useI18n()
  const [searchName, setSearchName] = useState('')
  const [searchId, setSearchId] = useState('')
  const [selectedDept, setSelectedDept] = useState('All Departments')
  const [selectedStatus, setSelectedStatus] = useState('All Statuses')

  const filtered = onboardingData.filter((e) => {
    const matchesName = e.name.toLowerCase().includes(searchName.toLowerCase())
    const matchesId = e.employeeId.toLowerCase().includes(searchId.toLowerCase())
    const matchesDept = selectedDept === 'All Departments' || e.department === selectedDept
    const matchesStatus = selectedStatus === 'All Statuses' || e.status === selectedStatus
    return matchesName && matchesId && matchesDept && matchesStatus
  })

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="p-4 text-lg font-semibold text-gray-800 dark:text-white">
        {/* {t('onboarding.title' as any)} */}
      </div>

      <div className="px-4 pb-4 flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder={t('hrEmployees.filters.name' as any)}
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <input
          type="text"
          placeholder={t('hrEmployees.filters.employeeId' as any)}
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="All Departments">{t('onboarding.filters.allDepartments' as any)}</option>
          {departmentList.map((dept) => (
            <option key={dept} value={dept}>
              {t(`onboarding.departmentList.${dept}` as any)}
            </option>
          ))}
        </select>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="All Statuses">{t('onboarding.filters.allStatuses' as any)}</option>
          <option value="notStarted">{t('onboarding.status.notStarted' as any)}</option>
          <option value="inProgress">{t('onboarding.status.inProgress' as any)}</option>
          <option value="completed">{t('onboarding.status.completed' as any)}</option>
        </select>
      </div>

      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1100px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 text-start">{t('onboarding.table.name' as any)}</TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">{t('onboarding.table.employeeId' as any)}</TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">{t('onboarding.table.department' as any)}</TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">{t('onboarding.table.position' as any)}</TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">{t('onboarding.table.startDate' as any)}</TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">{t('onboarding.table.status' as any)}</TableCell>
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
                  <TableCell className="px-4 py-3 text-start text-gray-500">{t(`onboarding.departmentList.${item.department}` as any)}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-gray-500">{item.position}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-gray-500">{item.startDate}</TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <Badge color={statusColors[item.status]} size="sm">
                      {t(`onboarding.status.${item.status}` as any)}
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
