
import React from "react";
import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  userName: string;
  userRole: string;
}

const DashboardLayout = ({ children, userName, userRole }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userName={userName} userRole={userRole} />
      <Sidebar userRole={userRole} />
      <main className="ml-64 pt-16 min-h-screen">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
