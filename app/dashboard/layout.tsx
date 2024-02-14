import React from "react";

import DashBoardSideBar from "@/components/dashboard/DashBoardSideBar";

export default function DashBoardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-blueDark md:flex-row md:overflow-hidden">
      <DashBoardSideBar />
      <div className="grow bg-blueDarker p-4 md:ml-64 md:overflow-y-auto md:rounded-tl-[50px] md:p-6">{children}</div>
    </div>
  );
}