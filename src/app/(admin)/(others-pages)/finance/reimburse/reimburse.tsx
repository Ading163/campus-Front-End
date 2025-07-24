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
import Image from 'next/image'

const reimburseData = [
  {
    id: 1,
    applicant: '张三',
    department: '市场部',
    amount: 1200.5,
    type: '差旅费',
    date: '2024-05-01',
    status: '待审批',
  },
  {
    id: 2,
    applicant: '李四',
    department: '技术部',
    amount: 800,
    type: '办公用品',
    date: '2024-05-03',
    status: '已通过',
  },
  {
    id: 3,
    applicant: '王五',
    department: '财务部',
    amount: 500,
    type: '交通费',
    date: '2024-05-05',
    status: '已拒绝',
  },
  {
    id: 4,
    applicant: '赵六',
    department: '市场部',
    amount: 300,
    type: '差旅费',
    date: '2024-05-06',
    status: '待审批',
  },
]

const statusColors: Record<string, 'warning' | 'success' | 'error'> = {
  '待审批': 'warning',
  '已通过': 'success',
  '已拒绝': 'error',
}

export default function Reimburse() {
  const [status, setStatus] = useState('全部')

  const filteredData =
    status === '全部'
      ? reimburseData
      : reimburseData.filter((item) => item.status === status)

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
                <TableCell isHeader className="px-5 py-3 text-start">报销类型</TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">报销金额</TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">申请日期</TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">审批状态</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="px-5 py-4 text-start">
                    <div className="flex items-center gap-3">
                      {/* 显示首字头像 */}
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-100 text-blue-600 font-semibold text-sm">
                        {item.applicant.charAt(0)}
                      </div>
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {item.applicant}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="px-4 py-3 text-start text-gray-500">{item.department}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-gray-500">{item.type}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-gray-500">¥{item.amount.toFixed(2)}</TableCell>
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
