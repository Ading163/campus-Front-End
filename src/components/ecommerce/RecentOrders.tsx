"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { 
  Server, Clock, Users, Activity, AlertTriangle, 
  CheckCircle, XCircle, RefreshCw, FileText, 
  HelpCircle, Settings, Bell,
  Badge
} from "lucide-react";
import useAuthStore from "@/store/useAuthStore";

// 定义角色类型
type Role = 
  | "admin" 
  | "teacher" 
  | "staff_finance" 
  | "staff_logistics" 
  | "staff_student_affairs" 
  | "staff_hr" 
  | "student" 
  | "default";

// 校园子系统接口
interface CampusSubSystem {
  id: number;
  systemName: string;
  module: "Student Affairs" | "Finance" | "Logistics" | "Human Resources";
  status: "Operational" | "Performance Warning" | "Partial Failure" | "Under Maintenance";
  serverAddress: string;
  currentUsers: number;
  weeklyAccess: number;
  lastMaintenance: string;
  contactPerson: string;
  uptime: string;
}

// 校园系统监控数据
const systemData: CampusSubSystem[] = [
  {
    id: 1,
    systemName: "Student Information System",
    module: "Student Affairs",
    status: "Operational",
    serverAddress: "srv-sis-01.campus.edu",
    currentUsers: 142,
    weeklyAccess: 28547,
    lastMaintenance: "2024-07-20",
    contactPerson: "Ms. Zhang (Student Affairs)",
    uptime: "99.8%",
  },
  {
    id: 2,
    systemName: "Financial Payment Platform",
    module: "Finance",
    status: "Performance Warning",
    serverAddress: "srv-fin-02.campus.edu",
    currentUsers: 89,
    weeklyAccess: 12753,
    lastMaintenance: "2024-08-02",
    contactPerson: "Mr. Li (Finance Office)",
    uptime: "98.5%",
  },
  {
    id: 3,
    systemName: "Facility Repair System",
    module: "Logistics",
    status: "Operational",
    serverAddress: "srv-log-01.campus.edu",
    currentUsers: 36,
    weeklyAccess: 4289,
    lastMaintenance: "2024-06-15",
    contactPerson: "Mr. Wang (Logistics Dept)",
    uptime: "99.2%",
  },
  {
    id: 4,
    systemName: "Staff Records Management",
    module: "Human Resources",
    status: "Under Maintenance",
    serverAddress: "srv-hr-01.campus.edu",
    currentUsers: 0,
    weeklyAccess: 1842,
    lastMaintenance: "2024-08-05",
    contactPerson: "Ms. Zhao (HR Department)",
    uptime: "99.5%",
  },
  {
    id: 5,
    systemName: "Campus Card System",
    module: "Finance",
    status: "Partial Failure",
    serverAddress: "srv-card-03.campus.edu",
    currentUsers: 12,
    weeklyAccess: 9632,
    lastMaintenance: "2024-07-10",
    contactPerson: "Mr. Chen (IT Center)",
    uptime: "97.3%",
  },
];

// 角色配置 - 每个角色看到的内容完全不同
const roleSettings:any = {
  admin: {
    title: "System Administration Dashboard",
    description: "Full oversight of all campus systems and infrastructure",
    columns: [
      { key: "system", label: "System & Server" },
      { key: "status", label: "Operational Status" },
      { key: "performance", label: "System Performance" },
      { key: "maintenance", label: "Maintenance Schedule" },
      { key: "technical", label: "Technical Details" }
    ],
    actions: [
      { label: "Generate Health Report", icon: <FileText className="w-4 h-4" /> },
      { label: "System Configuration", icon: <Settings className="w-4 h-4" />, primary: true },
      { label: "Alert Center", icon: <Bell className="w-4 h-4" /> }
    ],
    // 管理员能看到所有系统
    filter: () => systemData
  },
  
  teacher: {
    title: "Teaching & Classroom Systems",
    description: "Systems relevant to your teaching activities and courses",
    columns: [
      { key: "system", label: "System Name" },
      { key: "status", label: "Availability" },
      { key: "usage", label: "Class Usage" },
      { key: "support", label: "Support Contact" }
    ],
    actions: [
      { label: "Report Issue", icon: <AlertTriangle className="w-4 h-4" /> },
      { label: "Help Resources", icon: <HelpCircle className="w-4 h-4" />, primary: true }
    ],
    // 教师只看到学生事务和后勤相关系统
    filter: (systems: CampusSubSystem[]) => systems.filter(s => 
      s.module === "Student Affairs" || s.module === "Logistics"
    )
  },
  
  staff_finance: {
    title: "Financial Systems Monitor",
    description: "Payment processing and financial management systems",
    columns: [
      { key: "system", label: "Financial System" },
      { key: "status", label: "System Status" },
      { key: "transactions", label: "Transaction Volume" },
      { key: "uptime", label: "System Reliability" }
    ],
    actions: [
      { label: "Reconciliation Report", icon: <FileText className="w-4 h-4" /> },
      { label: "Resolve Issues", icon: <AlertTriangle className="w-4 h-4" />, primary: true }
    ],
    // 财务人员只看到财务相关系统
    filter: (systems: CampusSubSystem[]) => systems.filter(s => 
      s.module === "Finance"
    )
  },
  
  student: {
    title: "Student Services Portal",
    description: "Systems and services available for your academic needs",
    columns: [
      { key: "system", label: "Service Name" },
      { key: "status", label: "Current Status" },
      { key: "access", label: "Your Recent Access" },
      { key: "help", label: "Get Assistance" }
    ],
    actions: [
      { label: "FAQ & Guides", icon: <HelpCircle className="w-4 h-4" /> },
      { label: "Submit Request", icon: <FileText className="w-4 h-4" />, primary: true }
    ],
    // 学生看到学生事务、财务和后勤系统
    filter: (systems: CampusSubSystem[]) => systems.filter(s => 
      s.module === "Student Affairs" || s.module === "Finance" || s.module === "Logistics"
    )
  },
  
  default: {
    title: "Campus Systems",
    description: "Available systems for your role",
    columns: [
      { key: "system", label: "System Name" },
      { key: "status", label: "Status" },
      { key: "module", label: "Category" }
    ],
    actions: [
      { label: "System Directory", icon: <Server className="w-4 h-4" />, primary: true }
    ],
    // 默认角色看到有限的系统
    filter: (systems: CampusSubSystem[]) => systems.filter(s => 
      s.status === "Operational"
    )
  }
};

// 状态样式和图标配置
const statusConfig: Record<CampusSubSystem["status"], { color: string; icon: React.ReactNode }> = {
  "Operational": { color: "success", icon: <CheckCircle className="w-4 h-4 mr-1" /> },
  "Performance Warning": { color: "warning", icon: <AlertTriangle className="w-4 h-4 mr-1" /> },
  "Partial Failure": { color: "error", icon: <XCircle className="w-4 h-4 mr-1" /> },
  "Under Maintenance": { color: "info", icon: <RefreshCw className="w-4 h-4 mr-1" /> }
};

// 格式化大数字显示
const formatNumber = (num: number): string => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
};

export default function CampusSystemMonitor() {
  const user = useAuthStore((state) => state.user);
  const userRole = (user?.role?.name as Role) || "default";
  const config = roleSettings[userRole] || roleSettings.default;
  const filteredSystems = config.filter(systemData);

  // 根据角色渲染不同的表格单元格内容
  const renderCellContent = (system: CampusSubSystem, columnKey: string) => {
    switch (userRole) {
      case "admin":
        switch (columnKey) {
          case "system":
            return (
              <div>
                <p className="font-medium">{system.systemName}</p>
                <p className="text-xs text-gray-500">{system.serverAddress}</p>
              </div>
            );
          case "status":
            return (
              <Badge color={statusConfig[system.status].color} className="flex items-center">
                {statusConfig[system.status].icon}
                {system.status}
              </Badge>
            );
          case "performance":
            return (
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div 
                      className={`h-full rounded-full ${
                        parseFloat(system.uptime) > 99 ? 'bg-green-500' : 
                        parseFloat(system.uptime) > 95 ? 'bg-yellow-500' : 'bg-red-500'
                      }`} 
                      style={{ width: system.uptime }}
                    ></div>
                  </div>
                  <span className="text-xs font-medium w-12">{system.uptime}</span>
                </div>
                <div className="text-xs text-gray-500">
                  {system.currentUsers} users online
                </div>
              </div>
            );
          case "maintenance":
            return (
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-gray-500" />
                <span className="text-sm">{system.lastMaintenance}</span>
              </div>
            );
          case "technical":
            return (
              <div>
                <p className="text-sm">Contact: {system.contactPerson}</p>
                <p className="text-xs text-gray-500">
                  Weekly: {formatNumber(system.weeklyAccess)} visits
                </p>
              </div>
            );
          default:
            return null;
        }

      case "teacher":
        switch (columnKey) {
          case "system":
            return <p className="font-medium">{system.systemName}</p>;
          case "status":
            return (
              <Badge color={statusConfig[system.status].color} className="flex items-center">
                {statusConfig[system.status].icon}
                {system.status}
              </Badge>
            );
          case "usage":
            return (
              <div className="space-y-1">
                <div className="text-sm">{system.currentUsers} active users</div>
                <div className="text-xs text-gray-500">
                  {formatNumber(system.weeklyAccess)} weekly
                </div>
              </div>
            );
          case "support":
            return (
              <div className="text-sm">{system.contactPerson}</div>
            );
          default:
            return null;
        }

      case "staff_finance":
        switch (columnKey) {
          case "system":
            return <p className="font-medium">{system.systemName}</p>;
          case "status":
            return (
              <Badge color={statusConfig[system.status].color} className="flex items-center">
                {statusConfig[system.status].icon}
                {system.status}
              </Badge>
            );
          case "transactions":
            return (
              <div className="text-sm">
                {formatNumber(system.weeklyAccess)} weekly transactions
              </div>
            );
          case "uptime":
            return (
              <div className="flex items-center gap-2">
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div 
                    className={`h-full rounded-full ${
                      parseFloat(system.uptime) > 99 ? 'bg-green-500' : 
                      parseFloat(system.uptime) > 95 ? 'bg-yellow-500' : 'bg-red-500'
                    }`} 
                    style={{ width: system.uptime }}
                  ></div>
                </div>
                <span className="text-xs font-medium">{system.uptime}</span>
              </div>
            );
          default:
            return null;
        }

      case "student":
        switch (columnKey) {
          case "system":
            return <p className="font-medium">{system.systemName}</p>;
          case "status":
            return (
              <Badge color={statusConfig[system.status].color} className="flex items-center">
                {statusConfig[system.status].icon}
                {system.status}
              </Badge>
            );
          case "access":
            // 模拟学生最近访问时间
            const lastAccess = system.id % 2 === 0 
              ? "Today, " + (9 + system.id) + ":30 AM"
              : "Yesterday, " + (14 + system.id) + ":45 PM";
            return (
              <div className="text-sm">{lastAccess}</div>
            );
          case "help":
            return (
              <div className="text-sm">{system.contactPerson}</div>
            );
          default:
            return null;
        }

      default:
        switch (columnKey) {
          case "system":
            return <p className="font-medium">{system.systemName}</p>;
          case "status":
            return (
              <Badge color={statusConfig[system.status].color} className="flex items-center">
                {statusConfig[system.status].icon}
                {system.status}
              </Badge>
            );
          case "module":
            return <p className="text-sm">{system.module}</p>;
          default:
            return null;
        }
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            {config.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {config.description}
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {config.actions.map((action, index) => (
            <button 
              key={index}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium shadow-sm transition-colors ${
                action.primary
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
              }`}
            >
              {action.icon}
              {action.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              {config.columns.map((column) => (
                <TableCell 
                  key={column.key} 
                  isHeader 
                  className="py-3 font-medium text-gray-500 text-start text-xs dark:text-gray-400"
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {filteredSystems.length > 0 ? (
              filteredSystems.map((system) => (
                <TableRow key={system.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  {config.columns.map((column) => (
                    <TableCell key={column.key} className="py-3">
                      {renderCellContent(system, column.key)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={config.columns.length} className="py-8 text-center">
                  <p className="text-gray-500 dark:text-gray-400">
                    No relevant systems available for your role
                  </p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
