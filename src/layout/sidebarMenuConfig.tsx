import {
  BoxCubeIcon,
  CalenderIcon,
  GridIcon,
  ListIcon,
  PageIcon,
  PieChartIcon,
  PlugInIcon,
  TableIcon,
  UserCircleIcon,
} from "../icons/index";
import React from "react";

export type NavItem = {
  name: string;
  icon?: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean; roles?: string[] }[];
  roles?: string[];
};

export const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "menu.home",
    path: "/",
  },
  {
    icon: <CalenderIcon />,
    name: "menu.calendar",
    path: "/calendar",
  },
  {
    icon: <UserCircleIcon />,
    name: "menu.userProfile",
    path: "/profile",
  },
  {
    name: "menu.forms",
    icon: <ListIcon />,
    subItems: [
      { name: "menu.formElements", path: "/form-elements", pro: false }
    ],
  },
  {
    name: "menu.tables",
    icon: <TableIcon />,
    subItems: [
      { name: "menu.basicTables", path: "/basic-tables", pro: false }
    ],
  },
  {
    name: "menu.pages",
    icon: <PageIcon />,
    subItems: [
      { name: "menu.blank", path: "/blank", pro: false },
      { name: "menu.error404", path: "/error-404", pro: false }
    ],
  },
  // 新增财务审批
  {
    name: "menu.finance",
    icon: <PageIcon />,
    path: "/finance",
    roles: ["staff_finance"],
    subItems: [
      { path: "/finance/reimburse", name: "menu.financeReimburse", roles: ["staff_finance"] },
      { path: "/finance/budget", name: "menu.financeBudget", roles: ["staff_finance"] },
      { path: "/finance/payment", name: "menu.financePayment", roles: ["staff_finance"] },
      { path: "/finance/records", name: "menu.financeRecords", roles: ["staff_finance"] },
    ],
  },
  // 学生事务管理
  {
    name: "menu.students",
    icon: <PageIcon />,
    path: "/students",
    roles: ["staff_student_affairs", "teacher"],
    subItems: [
      { path: "/students/leave", name: "menu.studentsLeave", roles: ["staff_student_affairs", "teacher"] },
      { path: "/students/performance", name: "menu.studentsPerformance", roles: ["teacher"] },
      { path: "/students/discipline", name: "menu.studentsDiscipline", roles: ["staff_student_affairs"] },
      { path: "/students/consult", name: "menu.studentsConsult", roles: ["staff_student_affairs"] },
    ],
  },
    // 人事管理
    {
      name: "menu.hr",
      icon: <PageIcon />,
      path: "/hr",
      roles: ["staff_hr"],
      subItems: [
        { path: "/hr/employees", name: "menu.hrEmployees", roles: ["staff_hr"] },
        { path: "/hr/attendance", name: "menu.hrAttendance", roles: ["staff_hr"] },
        { path: "/hr/performance", name: "menu.hrPerformance", roles: ["staff_hr"] },
        { path: "/hr/onboarding", name: "menu.hrOnboarding", roles: ["staff_hr"] },
      ],
    },
    // 后勤管理
    {
      name: "menu.logistics",
      icon: <PageIcon />,
      path: "/logistics",
      roles: ["staff_logistics"],
      subItems: [
        { path: "/logistics/facilities", name: "menu.logisticsFacilities", roles: ["staff_logistics"] },
        { path: "/logistics/supplies", name: "menu.logisticsSupplies", roles: ["staff_logistics"] },
        { path: "/logistics/cleaning", name: "menu.logisticsCleaning", roles: ["staff_logistics"] },
      ],
    },
];

export const othersItems: NavItem[] = [
  {
    icon: <PieChartIcon />,
    name: "menu.charts",
    subItems: [
      { name: "menu.lineChart", path: "/line-chart", pro: false },
      { name: "menu.barChart", path: "/bar-chart", pro: false }
    ],
  },
  {
    icon: <BoxCubeIcon />,
    name: "menu.uiElements",
    subItems: [
      { name: "menu.alerts", path: "/alerts", pro: false },
      { name: "menu.avatar", path: "/avatars", pro: false },
      { name: "menu.badge", path: "/badge", pro: false },
      { name: "menu.buttons", path: "/buttons", pro: false },
      { name: "menu.images", path: "/images", pro: false },
      { name: "menu.videos", path: "/videos", pro: false }
    ],
  },
  {
    icon: <PlugInIcon />,
    name: "menu.authentication",
    subItems: [
      { name: "menu.signIn", path: "/signin", pro: false },
      { name: "menu.signUp", path: "/signup", pro: false }
    ],
  },
]; 