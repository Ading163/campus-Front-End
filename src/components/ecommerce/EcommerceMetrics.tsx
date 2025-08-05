"use client";
import React from "react";
import Badge from "../ui/badge/Badge";
import { ArrowDownIcon, ArrowUpIcon } from "@/icons";
import useAuthStore from "@/store/useAuthStore";
import { 
  GroupIcon, 
  BoxIconLine,
} from "@/icons";

// 定义指标项的类型
interface MetricItem {
  id: string;
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

// 每个角色只保留两个关键指标
const roleMetricsConfig: Record<string, MetricItem[]> = {
  // 系统管理员
  admin: [
    {
      id: 'total-users',
      title: 'Total users',
      value: '12,547',
      change: 8.2,
      icon: <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
    },
    {
      id: 'system-status',
      title: 'System uptime',
      value: '99.9%',
      change: 0.2,
      icon: <BoxIconLine className="text-gray-800 dark:text-white/90" />
    }
  ],
  
  // 教师
  teacher: [
    {
      id: 'total-students',
      title: 'Total students',
      value: '147',
      change: 5.3,
      icon: <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
    },
    {
      id: 'courses-taught',
      title: 'Courses taught',
      value: '8',
      change: 14.3,
      icon: <GroupIcon className="text-gray-800 dark:text-white/90" />
    }
  ],
  
  // 财务人员
  staff_finance: [
    {
      id: 'total-transactions',
      title: 'Total transactions',
      value: '¥2,456,890',
      change: 12.8,
      icon: <BoxIconLine className="text-gray-800 dark:text-white/90" />
    },
    {
      id: 'pending-payments',
      title: 'Pending payments',
      value: '47',
      change: -8.5,
      icon: <BoxIconLine className="text-gray-800 dark:text-white/90" />
    }
  ],
  
  // 后勤保障人员
  staff_logistics: [
    {
      id: 'maintenance-requests',
      title: 'Maintenance requests',
      value: '128',
      change: 23.1,
      icon: <BoxIconLine className="text-gray-800 dark:text-white/90" />
    },
    {
      id: 'resolved-requests',
      title: 'Resolved requests',
      value: '103',
      change: 18.6,
      icon: <BoxIconLine className="text-gray-800 dark:text-white/90" />
    }
  ],
  
  // 学生事务中心工作人员
  staff_student_affairs: [
    {
      id: 'total-students',
      title: 'Total students',
      value: '6,672',
      change: 11.0,
      icon: <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
    },
    {
      id: 'student-requests',
      title: 'Student requests',
      value: '5,359',
      change: -9.1,
      icon: <BoxIconLine className="text-gray-800 dark:text-white/90" />
    }
  ],
  
  // 人事管理人员
  staff_hr: [
    {
      id: 'total-staff',
      title: 'Total staff',
      value: '842',
      change: 3.7,
      icon: <BoxIconLine className="text-gray-800 dark:text-white/90" />
    },
    {
      id: 'new-hires',
      title: 'New hires this month',
      value: '12',
      change: 50.0,
      icon: <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
    }
  ],
  
  // 宿舍管理人员
  staff_dormitory: [
    {
      id: 'total-rooms',
      title: 'Total rooms',
      value: '1,245',
      change: 0,
      icon: <BoxIconLine className="text-gray-800 dark:text-white/90" />
    },
    {
      id: 'occupied-rooms',
      title: 'Occupied rooms',
      value: '1,189',
      change: 89.2,
      icon: <BoxIconLine className="text-gray-800 dark:text-white/90" />
    }
  ],
  
  // 学生用户
  student: [
    {
      id: 'enrolled-courses',
      title: 'Enrolled courses',
      value: '5',
      change: 0,
      icon: <GroupIcon className="text-gray-800 dark:text-white/90" />
    },
    {
      id: 'upcoming-deadlines',
      title: 'Upcoming deadlines',
      value: '3',
      change: 50.0,
      icon: <BoxIconLine className="text-gray-800 dark:text-white/90" />
    }
  ],
  
  // 默认角色
  default: [
    {
      id: 'total-systems',
      title: 'Available systems',
      value: '12',
      change: 0,
      icon: <BoxIconLine className="text-gray-800 dark:text-white/90" />
    },
    {
      id: 'notifications',
      title: 'Recent notifications',
      value: '3',
      change: 50.0,
      icon: <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
    }
  ]
};

// 补充缺失的图标组件定义（如果项目中没有）
const CheckIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const BellIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
  </svg>
);

export const EcommerceMetrics = () => {
  const user = useAuthStore((state) => state.user);
  const userRole = user?.role?.name || 'default';
  
  // 获取当前角色对应的指标，如果没有则使用默认
  const metrics = roleMetricsConfig[userRole] || roleMetricsConfig.default;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {metrics.map((metric) => (
        <div 
          key={metric.id}
          className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6"
        >
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            {metric.icon}
          </div>

          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {metric.title}
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                {metric.value}
              </h4>
            </div>
            <Badge color={metric.change >= 0 ? "success" : "error"}>
              {metric.change >= 0 ? (
                <ArrowUpIcon />
              ) : (
                <ArrowDownIcon className="text-error-500" />
              )}
              {Math.abs(metric.change)}%
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
};
