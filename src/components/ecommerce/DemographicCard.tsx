"use client";
import { useState } from "react";
import useAuthStore from "@/store/useAuthStore";
// 导入本地图标
import { 
  MoreDotIcon, 
  GroupIcon, 
  BoxIcon, 
  DollarLineIcon, 
  UserIcon, 
  TaskIcon, 
  PieChartIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from "@/icons"; // 确保路径与你的图标导入路径一致
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";

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

// 定义人口统计数据类型（使用本地图标）
interface DemographicData {
  title: string;
  description: string;
  type: "country" | "department" | "grade" | "major" | "position";
  color: string; // 角色主色调
  icon: React.ReactNode; // 主图标（使用本地SVG）
  items: {
    id: string;
    name: string;
    count: number;
    percentage: number;
    itemIcon: React.ReactNode; // 子项图标（使用本地SVG）
  }[];
}

// 角色对应的人口统计数据配置（完全使用本地图标）
const roleDemographicData: any = {
  admin: {
    title: "Institution Demographics",
    description: "Distribution of all members across departments",
    type: "department",
    color: "#465FFF", // 蓝色系
    icon: <BoxIcon className="h-6 w-6" />, // 使用本地BoxIcon
    items: [
      {
        id: "academic",
        name: "Academic",
        count: 3240,
        percentage: 45,
        itemIcon: <PieChartIcon className="h-5 w-5" /> // 用PieChartIcon代表学术
      },
      {
        id: "administrative",
        name: "Administrative",
        count: 1820,
        percentage: 25,
        itemIcon: <TaskIcon className="h-5 w-5" /> // 用TaskIcon代表行政
      },
      {
        id: "support",
        name: "Support Staff",
        count: 1210,
        percentage: 17,
        itemIcon: <UserIcon className="h-5 w-5" /> // 用UserIcon代表支持人员
      }
    ]
  },
  teacher: {
    title: "Class Demographics",
    description: "Distribution of students in your courses",
    type: "major",
    color: "#22c55e", // 绿色系
    icon: <PieChartIcon className="h-6 w-6" />, // 使用本地PieChartIcon
    items: [
      {
        id: "cs",
        name: "Computer Science",
        count: 187,
        percentage: 38,
        itemIcon: <BoxIcon className="h-5 w-5" /> // 用BoxIcon代表计算机
      },
      {
        id: "ee",
        name: "Electrical Engineering",
        count: 125,
        percentage: 25,
        itemIcon: <TaskIcon className="h-5 w-5" /> // 用TaskIcon代表工程
      },
      {
        id: "math",
        name: "Mathematics",
        count: 85,
        percentage: 17,
        itemIcon: <PieChartIcon className="h-5 w-5" /> // 用PieChartIcon代表数学
      }
    ]
  },
  staff_finance: {
    title: "Fee Payer Demographics",
    description: "Distribution of payment sources",
    type: "department",
    color: "#f59e0b", // 黄色系
    icon: <DollarLineIcon className="h-6 w-6" />, // 使用本地DollarLineIcon
    items: [
      {
        id: "undergrad",
        name: "Undergraduate",
        count: 4250,
        percentage: 62,
        itemIcon: <UserIcon className="h-5 w-5" /> // 用UserIcon代表本科生
      },
      {
        id: "graduate",
        name: "Graduate",
        count: 1870,
        percentage: 27,
        itemIcon: <UserIcon className="h-5 w-5" /> // 用UserIcon代表研究生
      },
      {
        id: "scholarship",
        name: "Scholarship",
        count: 720,
        percentage: 11,
        itemIcon: <DollarLineIcon className="h-5 w-5" /> // 用DollarLineIcon代表奖学金
      }
    ]
  },
  staff_dormitory: {
    title: "Dormitory Occupancy",
    description: "Distribution across dormitories",
    type: "department",
    color: "#ec4899", // 粉色系
    icon: <PieChartIcon className="h-6 w-6" />, // 使用本地PieChartIcon
    items: [
      {
        id: "north",
        name: "North Dormitory",
        count: 420,
        percentage: 34,
        itemIcon: <PieChartIcon className="h-5 w-5" /> // 用PieChartIcon代表宿舍
      },
      {
        id: "south",
        name: "South Dormitory",
        count: 380,
        percentage: 31,
        itemIcon: <PieChartIcon className="h-5 w-5" />
      },
      {
        id: "east",
        name: "East Dormitory",
        count: 250,
        percentage: 20,
        itemIcon: <PieChartIcon className="h-5 w-5" />
      }
    ]
  },
  student: {
    title: "Class Composition",
    description: "Distribution of students in your classes",
    type: "grade",
    color: "#10b981", // 青色系
    icon: <UserIcon className="h-6 w-6" />, // 使用本地UserIcon
    items: [
      {
        id: "freshman",
        name: "Freshmen",
        count: 125,
        percentage: 35,
        itemIcon: <UserIcon className="h-5 w-5" /> // 用UserIcon代表学生
      },
      {
        id: "sophomore",
        name: "Sophomores",
        count: 98,
        percentage: 28,
        itemIcon: <UserIcon className="h-5 w-5" />
      },
      {
        id: "senior",
        name: "Seniors",
        count: 56,
        percentage: 16,
        itemIcon: <UserIcon className="h-5 w-5" />
      }
    ]
  },
  default: {
    title: "Campus Demographics",
    description: "General distribution of campus population",
    type: "department",
    color: "#64748b", // 灰色系
    icon: <GroupIcon className="h-6 w-6" />, // 使用本地GroupIcon
    items: [
      {
        id: "students",
        name: "Students",
        count: 6672,
        percentage: 85,
        itemIcon: <UserIcon className="h-5 w-5" /> // 用UserIcon代表学生
      },
      {
        id: "faculty",
        name: "Faculty",
        count: 420,
        percentage: 5,
        itemIcon: <PieChartIcon className="h-5 w-5" /> // 用PieChartIcon代表教师
      },
      {
        id: "staff",
        name: "Staff",
        count: 842,
        percentage: 10,
        itemIcon: <TaskIcon className="h-5 w-5" /> // 用TaskIcon代表员工
      }
    ]
  }
};

// 可视化区域（使用本地图标和颜色）
const DemographicVisual = ({ type, color, icon }: { type: string; color: string; icon: React.ReactNode }) => {
  const getVisualText = () => {
    switch (type) {
      case "country": return "Global Distribution";
      case "department": return "Department Breakdown";
      case "grade": return "Grade Level Distribution";
      case "major": return "Academic Major Split";
      case "position": return "Job Position Distribution";
      default: return "Population Distribution";
    }
  };

  return (
    <div 
      className="flex items-center justify-center h-[212px] w-full rounded-lg"
      style={{ backgroundColor: `${color}10` }} // 主色调浅色背景
    >
      <div className="text-center p-4">
        <div 
          className="mx-auto flex items-center justify-center w-16 h-16 rounded-full mb-3"
          style={{ backgroundColor: `${color}20` }} // 稍深背景
        >
          <div style={{ color }}>
            {icon} {/* 使用角色主图标 */}
          </div>
        </div>
        <p className="text-base font-medium" style={{ color }}>
          {getVisualText()}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {new Date().getFullYear()} Academic Year
        </p>
      </div>
    </div>
  );
};

export default function DemographicCard() {
  const user = useAuthStore((state) => state.user);
  const userRole = (user?.role?.name as Role) || "default";
  const demographicData = roleDemographicData[userRole];
  
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 flex items-center gap-2">
            <span style={{ color: demographicData?.color }}>
              {demographicData?.icon} {/* 显示角色主图标 */}
            </span>
            {demographicData?.title}
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            {demographicData?.description}
          </p>
        </div>

        <div className="relative inline-block">
          <button 
            onClick={toggleDropdown} 
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Options"
          >
            <MoreDotIcon className="h-5 w-5 text-gray-400" /> {/* 使用本地MoreDotIcon */}
          </button>
          <Dropdown isOpen={isOpen} onClose={closeDropdown} className="w-40 p-2">
            <DropdownItem onItemClick={closeDropdown} className="text-sm">Detailed Report</DropdownItem>
            <DropdownItem onItemClick={closeDropdown} className="text-sm">Export Data</DropdownItem>
            <DropdownItem onItemClick={closeDropdown} className="text-sm">Filter</DropdownItem>
          </Dropdown>
        </div>
      </div>
      
      {/* 核心可视化区域 */}
      <div className="px-4 py-6 my-6 overflow-hidden border border-gray-200 rounded-2xl bg-gray-50 dark:border-gray-800 dark:bg-gray-900 sm:px-6">
        <DemographicVisual 
          type={demographicData?.type} 
          color={demographicData?.color} 
          icon={demographicData?.icon} // 传递主图标
        />
      </div>

      <div className="space-y-4">
        {demographicData?.items.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="flex items-center justify-center w-10 h-10 rounded-full"
                style={{ backgroundColor: `${demographicData?.color}10` }}
              >
                <span style={{ color: demographicData?.color }}>
                  {item.itemIcon} {/* 显示子项图标 */}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-theme-sm dark:text-white/90">
                  {item.name}
                </p>
                <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                  {item.count.toLocaleString()} {
                    demographicData?.type === 'country' ? 'Students' : 
                    demographicData?.type === 'position' ? 'Staff' : 'Members'
                  }
                </span>
              </div>
            </div>

            <div className="flex w-full max-w-[140px] items-center gap-3">
              <div className="relative block h-2 w-full max-w-[100px] rounded-sm bg-gray-200 dark:bg-gray-800">
                <div 
                  className="absolute left-0 top-0 h-full rounded-sm transition-all duration-500 ease-out"
                  style={{ 
                    width: `${item.percentage}%`,
                    backgroundColor: demographicData?.color
                  }}
                ></div>
              </div>
              <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                {item.percentage}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}