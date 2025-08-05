import ChatPage from "@/components/chatbox/page";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";

export default function DeepSeek() {
  return (
    <div>
      <PageBreadcrumb pageTitle="DeepSeek" />
      <div className="space-y-8 ">

        {/* <ComponentCard title="DeepSeek"> */}
          <ChatPage />
        {/* </ComponentCard> */}
      </div>
    </div>
  );
}
