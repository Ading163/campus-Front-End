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

const recordData = [
  {
    id: 301,
    type: '报销',
    operator: '王五',
    department: '财务部',
    description: '差旅费用报销',
    amount: 1500,
    date: '2024-07-01',
  },
  {
    id: 302,
    type: '付款',
    operator: '李四',
    department: '技术部',
    description: '云服务器续费',
    amount: 6000,
    date: '2024-07-03',
  },
  {
    id: 303,
    type: '预算',
    operator: '赵六',
    department: '市场部',
    description: '广告投放预算申请',
    amount: 20000,
    date: '2024-07-04',
  },
]

const typeColors: Record<string, 'primary' | 'success' | 'warning'> = {
  报销: 'primary',
  付款: 'success',
  预算: 'warning',
}

export default function FinanceRecordTable() {
  const [type, setType] = useState('全部')

  const filtered = type === '全部' ? recordData : recordData.filter((d) => d.type === type)

  return (
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">

      <div className="p-4 flex flex-wrap gap-2">
        {['全部', '报销', '付款', '预算'].map((t) => (
          <button
            key={t}
            className={`px-4 py-1 rounded text-sm ${
              type === t
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setType(t)}
          >
            {t}
          </button>
        ))}
      </div>

        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[1000px]">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell isHeader className="px-5 py-3 text-start">类型</TableCell>
                  <TableCell isHeader className="px-5 py-3 text-start">经办人</TableCell>
                  <TableCell isHeader className="px-5 py-3 text-start">部门</TableCell>
                  <TableCell isHeader className="px-5 py-3 text-start">摘要说明</TableCell>
                  <TableCell isHeader className="px-5 py-3 text-start">金额</TableCell>
                  <TableCell isHeader className="px-5 py-3 text-start">日期</TableCell>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {filtered.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="px-4 py-3 text-start">
                      <Badge color={typeColors[item.type]} size="sm">
                        {item.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-start text-gray-800">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-100 text-blue-600 text-xs font-bold">
                          {item.operator.charAt(0)}
                        </div>
                        {item.operator}
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-start text-gray-500">{item.department}</TableCell>
                    <TableCell className="px-4 py-3 text-start text-gray-500">{item.description}</TableCell>
                    <TableCell className="px-4 py-3 text-start text-gray-500">¥{item.amount.toLocaleString()}</TableCell>
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
