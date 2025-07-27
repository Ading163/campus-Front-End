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

const departmentList = [
  'computerScience',
  'academicAffairs',
  'languages',
  'studentServices',
  'logistics',
]

const employeeData = [
  {
    id: 1,
    name: 'John Smith',
    employeeId: 'INTL2023001',
    department: 'computerScience',
    position: 'Associate Professor',
    phone: '+1-202-555-0143',
    entryDate: '2017-08-12',
  },
  {
    id: 2,
    name: 'Maria Garcia',
    employeeId: 'INTL2023002',
    department: 'academicAffairs',
    position: 'Registrar Assistant',
    phone: '+34-91-555-3281',
    entryDate: '2019-11-01',
  },
  {
    id: 3,
    name: 'Akira Tanaka',
    employeeId: 'INTL2023003',
    department: 'languages',
    position: 'Lecturer',
    phone: '+81-3-5555-2871',
    entryDate: '2021-03-20',
  },
  {
    id: 4,
    name: 'Emma Müller',
    employeeId: 'INTL2023004',
    department: 'studentServices',
    position: 'Academic Advisor',
    phone: '+49-30-555-9981',
    entryDate: '2018-05-17',
  },
  {
    id: 5,
    name: 'Carlos Silva',
    employeeId: 'INTL2023005',
    department: 'logistics',
    position: 'IT Technician',
    phone: '+55-11-5555-0192',
    entryDate: '2020-01-10',
  },
]

export default function EmployeeInfo() {
  const { t } = useI18n()
  const [searchName, setSearchName] = useState('')
  const [searchId, setSearchId] = useState('')
  const [selectedDept, setSelectedDept] = useState('All Departments')

  const filtered = employeeData.filter((e) => {
    const matchesName = e.name.toLowerCase().includes(searchName.toLowerCase())
    const matchesId = e.employeeId.toLowerCase().includes(searchId.toLowerCase())
    const matchesDept = selectedDept === 'All Departments' || e.department === selectedDept
    return matchesName && matchesId && matchesDept
  })

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="p-4 text-lg font-semibold text-gray-800 dark:text-white">
        {/* {t('hrEmployees.title' as any)} */}
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
          <option value="All Departments">{t('hrEmployees.filters.allDepartments' as any)}</option>
          {departmentList.map((dept) => (
            <option key={dept} value={dept}>
              {t(`hrEmployees.departmentList.${dept}` as any)}
            </option>
          ))}
        </select>
      </div>

      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1100px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 text-start">{t('hrEmployees.table.name' as any)}</TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">{t('hrEmployees.table.employeeId' as any)}</TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">{t('hrEmployees.table.department' as any)}</TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">{t('hrEmployees.table.position' as any)}</TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">{t('hrEmployees.table.phone' as any)}</TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">{t('hrEmployees.table.entryDate' as any)}</TableCell>
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
                  <TableCell className="px-4 py-3 text-start text-gray-500">{item.department}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-gray-500">{item.position}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-gray-500">{item.phone}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-gray-500">{item.entryDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
