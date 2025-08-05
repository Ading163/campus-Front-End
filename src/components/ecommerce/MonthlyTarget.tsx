"use client";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { MoreDotIcon } from "@/icons";
import { useState } from "react";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import useAuthStore from "@/store/useAuthStore";

// 定义角色类型
type Role = 
  | "admin" 
  | "teacher" 
  | "staff_finance" 
  | "staff_logistics" 
  | "staff_student_affairs" 
  | "staff_hr" 
  | "staff_dormitory" 
  | "student" 
  | "default";

// 定义角色对应的目标配置
interface TargetConfig {
  title: string;
  description: string;
  progress: number; // 完成百分比
  trend: string; // 与上月相比
  metrics: {
    target: number;
    processed: number;
    today: number;
    targetLabel: string;
    processedLabel: string;
    todayLabel: string;
  };
  color: string;
}

// 角色目标配置表
const roleTargetConfig: Record<Role, TargetConfig> = {
  admin: {
    title: "System Maintenance Target",
    description: "System stability and maintenance tasks completed this month",
    progress: 82.3,
    trend: "+5%",
    metrics: {
      target: 100,
      processed: 82,
      today: 3,
      targetLabel: "Monthly Tasks",
      processedLabel: "Completed",
      todayLabel: "Today"
    },
    color: "#465FFF"
  },
  teacher: {
    title: "Teaching Progress",
    description: "Course completion and student assessment tasks",
    progress: 68.5,
    trend: "+2%",
    metrics: {
      target: 120,
      processed: 82,
      today: 4,
      targetLabel: "Total Hours",
      processedLabel: "Completed",
      todayLabel: "Today"
    },
    color: "#22c55e"
  },
  staff_finance: {
    title: "Payment Processing",
    description: "Financial transactions and payment verifications completed",
    progress: 91.7,
    trend: "+8%",
    metrics: {
      target: 500,
      processed: 458,
      today: 24,
      targetLabel: "Target Transactions",
      processedLabel: "Processed",
      todayLabel: "Today"
    },
    color: "#f59e0b"
  },
  staff_logistics: {
    title: "Maintenance Completion",
    description: "Facility maintenance requests resolved this month",
    progress: 76.2,
    trend: "-3%",
    metrics: {
      target: 150,
      processed: 114,
      today: 5,
      targetLabel: "Target Requests",
      processedLabel: "Resolved",
      todayLabel: "Today"
    },
    color: "#ef4444"
  },
  staff_student_affairs: {
    title: "Student Services",
    description: "Student requests and service tasks completed",
    progress: 88.4,
    trend: "+10%",
    metrics: {
      target: 1200,
      processed: 1061,
      today: 42,
      targetLabel: "Target Cases",
      processedLabel: "Completed",
      todayLabel: "Today"
    },
    color: "#8b5cf6"
  },
  staff_hr: {
    title: "HR Tasks Completion",
    description: "Personnel management and recruitment activities",
    progress: 72.1,
    trend: "+4%",
    metrics: {
      target: 80,
      processed: 58,
      today: 2,
      targetLabel: "Target Tasks",
      processedLabel: "Completed",
      todayLabel: "Today"
    },
    color: "#06b6d4"
  },
  staff_dormitory: {
    title: "Dormitory Management",
    description: "Room assignments and maintenance requests",
    progress: 85.3,
    trend: "+1%",
    metrics: {
      target: 200,
      processed: 171,
      today: 3,
      targetLabel: "Target Tasks",
      processedLabel: "Completed",
      todayLabel: "Today"
    },
    color: "#ec4899"
  },
  student: {
    title: "Study Progress",
    description: "Course attendance and assignment completion status",
    progress: 62.8,
    trend: "+7%",
    metrics: {
      target: 30,
      processed: 19,
      today: 2,
      targetLabel: "Credit Target",
      processedLabel: "Completed",
      todayLabel: "Today"
    },
    color: "#10b981"
  },
  default: {
    title: "Task Completion",
    description: "System tasks and service requests completed this month",
    progress: 75.5,
    trend: "+10%",
    metrics: {
      target: 200,
      processed: 151,
      today: 8,
      targetLabel: "Target Tasks",
      processedLabel: "Completed",
      todayLabel: "Today"
    },
    color: "#64748b"
  }
};

// 动态导入图表组件
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => <div className="h-64 flex items-center justify-center">Loading progress...</div>
});

export default function RoleBasedTarget() {
  const user = useAuthStore((state) => state.user);
  const userRole = (user?.role?.name as Role) || "default";
  const config = roleTargetConfig[userRole];
  
  // 配置环形图
  const series = [config.progress];
  const options: ApexOptions = {
    colors: [config.color],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "radialBar",
      height: 330,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -85,
        endAngle: 85,
        hollow: {
          size: "80%",
        },
        track: {
          background: "#E4E7EC",
          strokeWidth: "100%",
          margin: 5,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontSize: "36px",
            fontWeight: "600",
            offsetY: -40,
            color: "#1D2939",
            formatter: function (val) {
              return val + "%";
            },
          },
        },
      },
    },
    fill: {
      type: "solid",
      colors: [config.color],
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Progress"],
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  // 确定趋势颜色
  const trendColor = config.trend.startsWith('+') ? 'success' : 'error';

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 sm:pt-6">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              {config.title}
            </h3>
            <p className="mt-1 font-normal text-gray-500 text-theme-sm dark:text-gray-400">
              {config.description}
            </p>
          </div>
          <div className="relative inline-block">
            <button 
              onClick={toggleDropdown} 
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Options"
            >
              <MoreDotIcon className="h-5 w-5 text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
            </button>
            <Dropdown
              isOpen={isOpen}
              onClose={closeDropdown}
              className="w-40 p-2"
            >
              <DropdownItem
                onItemClick={closeDropdown}
                className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                View Details
              </DropdownItem>
              <DropdownItem
                onItemClick={closeDropdown}
                className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                Export Report
              </DropdownItem>
            </Dropdown>
          </div>
        </div>
        
        <div className="relative">
          <div className="max-h-[330px]">
            <ReactApexChart
              options={options}
              series={series}
              type="radialBar"
              height={330}
            />
          </div>

          <span className={`absolute left-1/2 top-full -translate-x-1/2 -translate-y-[95%] rounded-full px-3 py-1 text-xs font-medium ${
            trendColor === 'success' 
              ? 'bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500' 
              : 'bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500'
          }`}>
            {config.trend}
          </span>
        </div>
        
        <p className="mx-auto mt-10 w-full max-w-[380px] text-center text-sm text-gray-500 sm:text-base">
          {config.description}
        </p>
      </div>

      <div className="flex items-center justify-center gap-5 px-6 py-3.5 sm:gap-8 sm:py-5">
        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
            {config.metrics.targetLabel}
          </p>
          <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
            {config.metrics.target.toLocaleString()}
          </p>
        </div>

        <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
            {config.metrics.processedLabel}
          </p>
          <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
            {config.metrics.processed.toLocaleString()}
          </p>
        </div>

        <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
            {config.metrics.todayLabel}
          </p>
          <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
            {config.metrics.today.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}