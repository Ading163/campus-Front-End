import {
  BoxCubeIcon,
  CalenderIcon,
  ChatIcon,
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
  // {
  //   icon: <CalenderIcon />,
  //   name: "menu.calendar",
  //   path: "/calendar",
  // },
  {
    icon: <BoxCubeIcon />,
    name: "menu.student",
    path: "/student",
    roles: ["admin", "student"],
    subItems: [
      //材料申请
      { name: "menu.studentMaterial", path: "/student/material", roles: ["admin", "student"] },
      //课程列表
      { name: "menu.studentCourses", path: "/student/courses", roles: ["admin", "student"] },
      //查成绩
      { name: "menu.studentGrades", path: "/student/grades", roles: ["admin", "student"] },
      //请假
      { name: "menu.studentLeave", path: "/student/leave", roles: ["admin", "student"] },
      //考试安排
      { name: "menu.studentExams", path: "/student/exams", roles: ["admin", "student"] },
    ]
  },
  {
    icon: <UserCircleIcon />,
    name: "menu.userProfile",
    path: "/profile",
  },
  // {
  //   name: "menu.forms",
  //   icon: <ListIcon />,
  //   subItems: [
  //     { name: "menu.formElements", path: "/form-elements", pro: false }
  //   ],
  // },
  // {
  //   name: "menu.tables",
  //   icon: <TableIcon />,
  //   subItems: [
  //     { name: "menu.basicTables", path: "/basic-tables", pro: false }
  //   ],
  // },

  // 新增财务审批
  {
    name: "menu.finance",
    icon: <PageIcon />,
    path: "/finance",
    roles: ["admin", "staff_finance"],
    subItems: [
      { path: "/finance/reimburse", name: "menu.financeReimburse", roles: ["admin", "staff_finance"] },
      { path: "/finance/budget", name: "menu.financeBudget", roles: ["admin", "staff_finance"] },
      { path: "/finance/payment", name: "menu.financePayment", roles: ["admin", "staff_finance"] },
      { path: "/finance/records", name: "menu.financeRecords", roles: ["admin", "staff_finance"] },
    ],
  },
  // 学生事务管理
  {
    name: "menu.students",
    icon: <PageIcon />,
    path: "/students",
    roles: ["admin", "staff_student_affairs", "teacher"],
    subItems: [
      { path: "/students/leave", name: "menu.studentsLeave", roles: ["admin", "staff_student_affairs", "teacher"] },
      { path: "/students/performance", name: "menu.studentsPerformance", roles: ["admin", "teacher"] },
      { path: "/students/discipline", name: "menu.studentsDiscipline", roles: ["admin", "staff_student_affairs"] },
      { path: "/students/consult", name: "menu.studentsConsult", roles: ["admin", "staff_student_affairs"] },
    ],
  },
  // 人事管理
  {
    name: "menu.hr",
    icon: <PageIcon />,
    path: "/hr",
    roles: ["admin", "staff_hr"],
    subItems: [
      { path: "/hr/employees", name: "menu.hrEmployees", roles: ["admin", "staff_hr"] },
      { path: "/hr/attendance", name: "menu.hrAttendance", roles: ["admin", "staff_hr"] },
      { path: "/hr/performance", name: "menu.hrPerformance", roles: ["admin", "staff_hr"] },
      { path: "/hr/onboarding", name: "menu.hrOnboarding", roles: ["admin", "staff_hr"] },
    ],
  },
  // 后勤管理
  {
    name: "menu.logistics",
    icon: <PageIcon />,
    path: "/logistics",
    roles: ["admin", "staff_logistics"],
    subItems: [
      { path: "/logistics/facilities", name: "menu.logisticsFacilities", roles: ["admin", "staff_logistics"] },
      { path: "/logistics/supplies", name: "menu.logisticsSupplies", roles: ["admin", "staff_logistics"] },
      { path: "/logistics/cleaning", name: "menu.logisticsCleaning", roles: ["admin", "staff_logistics"] },
    ],
  },

];

export const othersItems: NavItem[] = [
  {
    name: "menu.chat",
    icon: <ChatIcon />,
    path: "/deepseek",
  },
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
  {
    name: "menu.pages",
    icon: <PageIcon />,
    subItems: [
      { name: "menu.blank", path: "/blank", pro: false },
      { name: "menu.error404", path: "/error-404", pro: false }
    ],
  },
]; 