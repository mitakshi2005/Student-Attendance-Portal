
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Calendar, BookOpen, PieChart, Settings, Users, Clock } from "lucide-react";

interface SidebarProps {
  userRole: string;
}

interface SidebarItem {
  title: string;
  icon: React.ElementType;
  path: string;
  allowedRoles: string[];
}

const Sidebar = ({ userRole }: SidebarProps) => {
  const location = useLocation();
  
  const sidebarItems: SidebarItem[] = [
    {
      title: "Dashboard",
      icon: Home,
      path: "/dashboard",
      allowedRoles: ["student", "teacher", "admin", "parent", "hod", "dean"],
    },
    {
      title: "Attendance",
      icon: Calendar,
      path: "/attendance",
      allowedRoles: ["student", "teacher", "admin", "parent", "hod", "dean"],
    },
    {
      title: "Classes",
      icon: BookOpen,
      path: "/classes",
      allowedRoles: ["student", "teacher", "admin", "hod", "dean"],
    },
    {
      title: "Reports",
      icon: PieChart,
      path: "/reports",
      allowedRoles: ["teacher", "admin", "parent", "hod", "dean"],
    },
    {
      title: "User Management",
      icon: Users,
      path: "/users",
      allowedRoles: ["admin", "hod", "dean"],
    },
    {
      title: "Time Table",
      icon: Clock,
      path: "/timetable",
      allowedRoles: ["student", "teacher", "admin", "parent", "hod", "dean"],
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/settings",
      allowedRoles: ["student", "teacher", "admin", "parent", "hod", "dean"],
    },
  ];

  const filteredItems = sidebarItems.filter(item => 
    item.allowedRoles.includes(userRole.toLowerCase())
  );

  return (
    <div className="w-64 h-screen bg-sidebar fixed left-0 top-0 pt-16 shadow-lg">
      <div className="p-4">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-1">Quick Menu</h2>
          <div className="h-1 w-12 bg-blue-500 rounded-full"></div>
        </div>
        
        <ul className="space-y-2">
          {filteredItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`sidebar-link ${isActive ? "active" : ""}`}
                >
                  <item.icon size={18} className={isActive ? "text-blue-400" : "text-sidebar-foreground"} />
                  <span className={isActive ? "text-blue-400 font-medium" : "text-sidebar-foreground"}>
                    {item.title}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      
      <div className="absolute bottom-8 left-4 right-4">
        <div className="p-4 rounded-lg bg-sidebar-accent text-white text-sm">
          <p className="font-semibold mb-2">Need Help?</p>
          <p className="opacity-80 text-xs">Contact IT support at:</p>
          <p className="text-blue-300">support@university.edu</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
