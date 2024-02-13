import DashBoardSideBar from "@/components/dashboard/DashBoardSideBar";

export default function DashBoardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row md:overflow-hidden bg-blueDark">
      <DashBoardSideBar />
      <div className="flex-grow md:ml-64 p-4 md:overflow-y-auto md:p-6 md:rounded-tl-[50px] bg-blueDarker">{children}</div>
    </div>
  );
}