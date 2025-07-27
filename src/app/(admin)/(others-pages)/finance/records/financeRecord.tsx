'use client';

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Badge from '@/components/ui/badge/Badge';
import { useI18n } from '@/context/I18nContext';

const reimburseData = [
  {
    id: 1,
    applicant: '张三',
    department: '市场部',
    amount: 1200.5,
    type: '差旅费',
    date: '2024-05-01',
    status: 'pending',
  },
  {
    id: 2,
    applicant: '李四',
    department: '技术部',
    amount: 800,
    type: '办公用品',
    date: '2024-05-03',
    status: 'approved',
  },
  {
    id: 3,
    applicant: '王五',
    department: '财务部',
    amount: 500,
    type: '交通费',
    date: '2024-05-05',
    status: 'rejected',
  },
  {
    id: 4,
    applicant: '赵六',
    department: '市场部',
    amount: 300,
    type: '差旅费',
    date: '2024-05-06',
    status: 'pending',
  },
];

const statusColors: Record<string, 'warning' | 'success' | 'error'> = {
  pending: 'warning',
  approved: 'success',
  rejected: 'error',
};

export default function Reimburse() {
  const { t } = useI18n();
  const [status, setStatus] = useState('all');

  const filteredData =
    status === 'all'
      ? reimburseData
      : reimburseData.filter((item) => item.status === status);

  const statusOptions = [
    { label: t('financeReimburse.status.pending' as any), value: 'pending' },
    { label: t('financeReimburse.status.approved' as any), value: 'approved' },
    { label: t('financeReimburse.status.rejected' as any), value: 'rejected' },
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="p-4 flex flex-wrap gap-2">
        <button
          className={`px-4 py-1 rounded text-sm ${status === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700'
            }`}
          onClick={() => setStatus('all')}
        >
          {t('common.all'as any)}
        </button>
        {statusOptions.map((option) => (
          <button
            key={option.value}
            className={`px-4 py-1 rounded text-sm ${status === option.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
              }`}
            onClick={() => setStatus(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1100px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 text-start">
                  {t('financeReimburse.table.applicant' as any)}
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">
                  {t('financeReimburse.table.department' as any)}
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">
                  {t('financeReimburse.table.type' as any)}   
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">
                  {t('financeReimburse.table.amount' as any)}
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">
                  {t('financeReimburse.table.date' as any)}
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">
                  {t('financeReimburse.table.status' as any)}
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="px-5 py-4 text-start">
                    <div className="flex items-center gap-3">
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

                  <TableCell className="px-4 py-3 text-start text-gray-500">
                    {item.department}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start text-gray-500">
                    {item.type}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start text-gray-500">
                    ¥{item.amount.toFixed(2)}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start text-gray-500">
                    {item.date}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <Badge color={statusColors[item.status]} size="sm">
                      {t(`financeReimburse.status.${item.status}` as any)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
