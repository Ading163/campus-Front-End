import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import EmployeeInfo from "./EmployeeInfo";

export const metadata: Metadata = {
  title: "员工信息",
  description: "员工信息表格页面，使用 Next.js + Tailwind + ComponentCard 封装",
};

export default function BasicTables() {
  return (
    <div>
      <PageBreadcrumb pageTitle={metadata.title as string} />
      <div className="space-y-6">
        <ComponentCard title={metadata.title as string} desc={metadata.description as string}>
          <EmployeeInfo />
        </ComponentCard>
      </div>
    </div>
  );
}
