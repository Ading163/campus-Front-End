"use client";
import React from "react";
import { ApexOptions } from "apexcharts";
import ChartTab from "../common/ChartTab";
import dynamic from "next/dynamic";
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

// 定义图表配置类型
interface ChartDataConfig {
  title: string;
  description: string;
  series: {
    name: string;
    data: number[];
    color: string;
  }[];
  yAxisLabel: string;
}

// 角色对应的图表数据配置
const roleChartData: Record<Role, ChartDataConfig> = {
  admin: {
    title: "System Performance Statistics",
    description: "Comparison of system usage and performance metrics",
    series: [
      { name: "Active Users", data: [1250, 1420, 1380, 1560, 1620, 1750, 1820, 1950, 2100, 2050, 2200, 2350], color: "#465FFF" },
      { name: "System Load", data: [45, 52, 48, 58, 62, 65, 68, 72, 75, 70, 78, 82], color: "#9CB9FF" }
    ],
    yAxisLabel: "Count / Percentage"
  },
  teacher: {
    title: "Teaching Statistics",
    description: "Student attendance and course completion trends",
    series: [
      { name: "Attendance Rate", data: [89, 92, 87, 94, 91, 93, 88, 95, 92, 96, 94, 97], color: "#22c55e" },
      { name: "Assignment Completion", data: [78, 82, 75, 85, 88, 90, 85, 92, 90, 94, 92, 96], color: "#6ee7b7" }
    ],
    yAxisLabel: "Percentage (%)"
  },
  staff_finance: {
    title: "Financial Statistics",
    description: "Income and expenditure trends over the year",
    series: [
      { name: "Tuition Income", data: [1850000, 2100000, 2350000, 2200000, 2400000, 2456890, 2500000, 2650000, 2700000, 2850000, 2900000, 3100000], color: "#f59e0b" },
      { name: "Operational Expenses", data: [1200000, 1350000, 1450000, 1300000, 1500000, 1480000, 1550000, 1600000, 1650000, 1700000, 1750000, 1800000], color: "#fbbf24" }
    ],
    yAxisLabel: "Amount (¥)"
  },
  staff_logistics: {
    title: "Maintenance Statistics",
    description: "Maintenance requests and resolution trends",
    series: [
      { name: "Requests Received", data: [86, 92, 105, 118, 122, 128, 135, 142, 138, 145, 152, 160], color: "#ef4444" },
      { name: "Requests Resolved", data: [78, 85, 95, 105, 110, 103, 120, 130, 125, 135, 140, 150], color: "#fca5a5" }
    ],
    yAxisLabel: "Number of Requests"
  },
  staff_student_affairs: {
    title: "Student Services Statistics",
    description: "Student enrollment and service request trends",
    series: [
      { name: "New Enrollments", data: [120, 135, 150, 140, 160, 155, 170, 180, 175, 190, 185, 200], color: "#8b5cf6" },
      { name: "Service Requests", data: [580, 620, 650, 640, 680, 690, 720, 750, 730, 780, 760, 800], color: "#c4b5fd" }
    ],
    yAxisLabel: "Count"
  },
  staff_hr: {
    title: "HR Statistics",
    description: "Staff recruitment and turnover trends",
    series: [
      { name: "Total Staff", data: [802, 815, 824, 831, 837, 842, 848, 855, 862, 868, 875, 880], color: "#06b6d4" },
      { name: "New Hires", data: [5, 8, 6, 10, 7, 12, 9, 15, 11, 14, 10, 16], color: "#6dd5fa" }
    ],
    yAxisLabel: "Number of Staff"
  },
  staff_dormitory: {
    title: "Dormitory Statistics",
    description: "Occupancy and maintenance trends",
    series: [
      { name: "Occupancy Rate", data: [82, 85, 87, 88, 89, 89.2, 90, 91, 90.5, 92, 92.5, 93], color: "#ec4899" },
      { name: "Maintenance Requests", data: [25, 30, 28, 35, 32, 37, 40, 38, 42, 39, 45, 43], color: "#f472b6" }
    ],
    yAxisLabel: "Rate (%) / Count"
  },
  student: {
    title: "Academic Statistics",
    description: "Course progress and grades trends",
    series: [
      { name: "Completed Credits", data: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36], color: "#10b981" },
      { name: "Average Grade", data: [75, 78, 76, 80, 82, 81, 83, 85, 84, 86, 87, 88], color: "#34d399" }
    ],
    yAxisLabel: "Credits / Score"
  },
  default: {
    title: "System Activity Statistics",
    description: "System usage and activity trends",
    series: [
      { name: "Monthly Visits", data: [12500, 14200, 13800, 15600, 16200, 17500, 18200, 19500, 21000, 20500, 22000, 23500], color: "#64748b" },
      { name: "Active Sessions", data: [3200, 3500, 3400, 3800, 4000, 4200, 4500, 4800, 5000, 4900, 5200, 5500], color: "#94a3b8" }
    ],
    yAxisLabel: "Count"
  }
};

// 动态导入图表组件
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => <div className="h-64 flex items-center justify-center">Loading statistics...</div>
});

export default function RoleBasedStatisticsChart() {
  const user = useAuthStore((state) => state.user);
  const userRole = (user?.role?.name as Role) || "default";
  const config = roleChartData[userRole];

  // 图表配置项
  const options: ApexOptions = {
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit, sans-serif",
      labels: {
        useSeriesColors: true,
        font: {
          size: 12
        }
      }
    },
    colors: config.series.map(item => item.color),
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "line",
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    stroke: {
      curve: "smooth",
      width: 2
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.3,
        opacityTo: 0
      }
    },
    markers: {
      size: 3,
      strokeWidth: 2,
      hover: {
        size: 5
      }
    },
    grid: {
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true,
          opacity: 0.2
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    tooltip: {
      enabled: true,
      x: {
        format: "MMM"
      },
      y: {
        formatter: (val: number) => {
          if (config.yAxisLabel.includes('%')) return `${val}%`;
          if (config.yAxisLabel.includes('¥')) return `¥${val.toLocaleString()}`;
          return val.toLocaleString();
        }
      },
      style: {
        fontSize: "13px"
      }
    },
    xaxis: {
      type: "category",
      categories: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ],
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
          colors: ["#6B7280"]
        },
        formatter: (val: number) => {
          if (config.yAxisLabel.includes('%')) return `${val}%`;
          if (config.yAxisLabel.includes('¥')) return `¥${val.toLocaleString()}`;
          return val >= 1000 ? val.toLocaleString() : val;
        }
      },
      title: {
        text: config.yAxisLabel,
        style: {
          fontSize: "12px",
          fontWeight: "normal"
        }
      }
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            {config.title}
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            {config.description}
          </p>
        </div>
        <div className="flex items-start w-full gap-3 sm:justify-end">
          <ChartTab />
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-[1000px] xl:min-w-full">
          <ReactApexChart
            options={options}
            series={config.series}
            type="line"
            height={310}
          />
        </div>
      </div>
    </div>
  );
}