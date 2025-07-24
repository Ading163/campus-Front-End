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

const requestData = [
  {
    id: 101,
    applicant: '钱七',
    department: '研发部',
    purpose: '新项目启动资金',
    amount: 50000,
    date: '2024-06-15',
    status: '待审批',
  },
  {
    id: 102,
    applicant: '孙八',
    department: '人事部',
    purpose: '培训课程预算',
    amount: 12000,
    date: '2024-06-18',
    status: '已通过',
  },
  {
    id: 103,
    applicant: '周九',
    department: '行政部',
    purpose: '办公设备采购',
    amount: 20000,
    date: '2024-06-20',
    status: '已拒绝',
  },
]

const statusColors: Record<string, 'warning' | 'success' | 'error'> = {
  '待审批': 'warning',
  '已通过': 'success',
  '已拒绝': 'error',
}

export default function Budget() {
  const [status, setStatus] = useState('全部')

  const filtered = status === '全部' ? requestData : requestData.filter((d) => d.status === status)

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="p-4 flex flex-wrap gap-2">
        {['全部', '待审批', '已通过', '已拒绝'].map((s) => (
          <button
            key={s}
            className={`px-4 py-1 rounded text-sm ${status === s
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
              }`}
            onClick={() => setStatus(s)}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1100px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 text-start">申请人</TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">部门</TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">申请用途</TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">申请金额</TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">申请日期</TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">状态</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {filtered.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="px-5 py-4 text-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-100 text-blue-600 font-semibold text-sm">
                        {item.applicant.charAt(0)}
                      </div>
                      <span className="text-gray-800 text-theme-sm dark:text-white/90">
                        {item.applicant}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start text-gray-500">{item.department}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-gray-500">{item.purpose}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-gray-500">¥{item.amount.toLocaleString()}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-gray-500">{item.date}</TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <Badge color={statusColors[item.status]} size="sm">
                      {item.status}
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
