"use client";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { MoreDotIcon } from "@/icons";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import useAuthStore from "@/store/useAuthStore";

// 1. 定义所有可能的角色类型（与 roleChartConfig 的键对应）
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

// 2. 定义单个图表配置的类型
interface ChartConfig {
  title: string;
  seriesName: string;
  yAxisLabel: string;
  data: number[];
  colors: string[];
  type: "line" | "bar";
}

// 3. 为角色图表配置添加类型约束（键必须是 Role 类型）
const roleChartConfig: Record<Role, ChartConfig> = {
  admin: {
    title: "User Growth Trend",
    seriesName: "Total Users",
    yAxisLabel: "Users",
    data: [10245, 10872, 11256, 11589, 11987, 12547],
    colors: ["#465fff"],
    type: "line"
  },
  teacher: {
    title: "Student Attendance Trend",
    seriesName: "Attendance Rate",
    yAxisLabel: "Rate (%)",
    data: [89, 92, 87, 94, 91, 93],
    colors: ["#22c55e"],
    type: "line"
  },
  staff_finance: {
    title: "Monthly Transactions",
    seriesName: "Amount (¥)",
    yAxisLabel: "Amount",
    data: [1850000, 2100000, 2350000, 2200000, 2400000, 2456890],
    colors: ["#f59e0b"],
    type: "bar"
  },
  staff_logistics: {
    title: "Maintenance Requests",
    seriesName: "Requests",
    yAxisLabel: "Count",
    data: [86, 92, 105, 118, 122, 128],
    colors: ["#ef4444"],
    type: "bar"
  },
  staff_student_affairs: {
    title: "Student Registration Trend",
    seriesName: "Total Students",
    yAxisLabel: "Students",
    data: [5890, 6120, 6350, 6480, 6590, 6672],
    colors: ["#8b5cf6"],
    type: "line"
  },
  staff_hr: {
    title: "Staff Growth Trend",
    seriesName: "Total Staff",
    yAxisLabel: "Staff",
    data: [802, 815, 824, 831, 837, 842],
    colors: ["#06b6d4"],
    type: "line"
  },
  staff_dormitory: {
    title: "Dormitory Occupancy Rate",
    seriesName: "Occupancy",
    yAxisLabel: "Rate (%)",
    data: [82, 85, 87, 88, 89, 89.2],
    colors: ["#ec4899"],
    type: "line"
  },
  student: {
    title: "Course Completion Progress",
    seriesName: "Completed Credits",
    yAxisLabel: "Credits",
    data: [3, 6, 9, 12, 15, 18],
    colors: ["#10b981"],
    type: "line"
  },
  default: {
    title: "System Access Trend",
    seriesName: "Monthly Visits",
    yAxisLabel: "Visits",
    data: [12500, 14200, 13800, 15600, 16200, 17500],
    colors: ["#64748b"],
    type: "bar"
  }
};

// 动态导入图表组件
const ReactApexChart = dynamic(
  () => import("react-apexcharts").then((mod) => mod.default),
  { ssr: false, loading: () => <div className="h-48 flex items-center justify-center">Loading chart...</div> }
);

// 生成图表配置
const getChartOptions = (config: ChartConfig): ApexOptions => ({
  colors: config.colors,
  chart: {
    fontFamily: "Outfit, sans-serif",
    type: config.type,
    height: 180,
    toolbar: { show: false },
    zoom: { enabled: false }
  },
  ...(config.type === "line" && {
    plotOptions: {
      line: {
        smooth: true,
        stroke: { width: 3 },
        marker: { size: 4, strokeWidth: 2, radius: 4 }
      }
    }
  }),
  ...(config.type === "bar" && {
    plotOptions: {
      bar: { columnWidth: "45%", borderRadius: 4 }
    }
  }),
  dataLabels: { enabled: false },
  stroke: { show: true, width: config.type === "bar" ? 0 : 3 },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    axisBorder: { show: false },
    axisTicks: { show: false }
  },
  yaxis: {
    title: { text: config.yAxisLabel, style: { fontSize: "12px" } },
    tickAmount: 4
  },
  grid: {
    yaxis: { lines: { show: true } }
  },
  tooltip: {
    x: { format: "MMM" },
    y: {
      formatter: (val: number) => {
        if (config.yAxisLabel.includes('%')) return `${val}%`;
        if (config.yAxisLabel.includes('¥')) return `¥${val.toLocaleString()}`;
        return val.toLocaleString();
      }
    }
  },
  legend: { show: false }
});

export default function RoleBasedTrendChart() {
  const user = useAuthStore((state) => state.user);
  // 4. 将 userRole 约束为 Role 类型（若不存在则默认为 'default'）
  const userRole = (user?.role?.name as Role) || "default";
  
  // 此时 TypeScript 能确认 userRole 是 roleChartConfig 的有效键
  const chartConfig = roleChartConfig[userRole];
  const options = getChartOptions(chartConfig);
  const series = [{ name: chartConfig.seriesName, data: chartConfig.data }];

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          {chartConfig.title}
        </h3>
        <div className="relative inline-block">
          <button onClick={toggleDropdown} className="p-1 rounded-full hover:bg-gray-100">
            <MoreDotIcon className="h-5 w-5 text-gray-400" />
          </button>
          <Dropdown isOpen={isOpen} onClose={closeDropdown} className="w-48 p-1">
            <DropdownItem onItemClick={closeDropdown} className="px-3 py-2 text-sm">
              View Full Report
            </DropdownItem>
            <DropdownItem onItemClick={closeDropdown} className="px-3 py-2 text-sm">
              Export as CSV
            </DropdownItem>
          </Dropdown>
        </div>
      </div>
      <div className="mt-4 h-[180px]">
        <ReactApexChart
          options={options}
          series={series}
          type={chartConfig.type}
          height={180}
          width="100%"
        />
      </div>
    </div>
  );
}