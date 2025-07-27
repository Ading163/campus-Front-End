import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Reimburse from "./reimburse";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "财务报销审批",
  description: "财务报销审批表格页面，使用 Next.js + Tailwind + ComponentCard 封装",
};

export default function BasicTables() {
  return (
    <div>
      <PageBreadcrumb pageTitle={metadata.title as string} />
      <div className="space-y-6">
        <ComponentCard title={metadata.title as string} desc={metadata.description as string}>
          <Reimburse />
        </ComponentCard>
      </div>
    </div>
  );
}
