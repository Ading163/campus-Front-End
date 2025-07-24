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

const paymentData = [
    {
        id: 201,
        payee: '刘一',
        department: '采购部',
        reason: '原材料付款',
        amount: 35000,
        date: '2024-07-01',
        status: '待审批',
    },
    {
        id: 202,
        payee: '陈二',
        department: '技术部',
        reason: '服务器续费',
        amount: 12000,
        date: '2024-07-02',
        status: '已通过',
    },
    {
        id: 203,
        payee: '吴三',
        department: '行政部',
        reason: '办公场地租金',
        amount: 50000,
        date: '2024-07-03',
        status: '已拒绝',
    },
]

const statusColors: Record<string, 'warning' | 'success' | 'error'> = {
    '待审批': 'warning',
    '已通过': 'success',
    '已拒绝': 'error',
}

export default function PaymentApprovalTable() {
    const [status, setStatus] = useState('全部')

    const filtered = status === '全部' ? paymentData : paymentData.filter((d) => d.status === status)

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
                <div className="min-w-[1000px]">
                    <Table>
                        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                            <TableRow>
                                <TableCell isHeader className="px-5 py-3 text-start">收款人</TableCell>
                                <TableCell isHeader className="px-5 py-3 text-start">所属部门</TableCell>
                                <TableCell isHeader className="px-5 py-3 text-start">付款事由</TableCell>
                                <TableCell isHeader className="px-5 py-3 text-start">付款金额</TableCell>
                                <TableCell isHeader className="px-5 py-3 text-start">付款日期</TableCell>
                                <TableCell isHeader className="px-5 py-3 text-start">审批状态</TableCell>
                            </TableRow>
                        </TableHeader>

                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {filtered.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="px-5 py-4 text-start">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-100 text-blue-600 font-semibold text-sm">
                                                {item.payee.charAt(0)}
                                            </div>
                                            <span className="text-gray-800 text-theme-sm dark:text-white/90">
                                                {item.payee}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-start text-gray-500">{item.department}</TableCell>
                                    <TableCell className="px-4 py-3 text-start text-gray-500">{item.reason}</TableCell>
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
