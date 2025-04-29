
import React from "react";
import { Link } from "react-router-dom";
import { Bell, LogOut, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface NavbarProps {
  userName: string;
  userRole: string;
}

const Navbar = ({ userName, userRole }: NavbarProps) => {
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logging out...",
      description: "You have been successfully logged out.",
    });
    // In a real implementation, this would clear auth state
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  };

  return (
    <nav className="bg-blue-gradient text-white shadow-md py-3 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link to="/dashboard" className="text-xl font-bold">
            Student Attendance Portal
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link to="/notifications" className="relative">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center text-xs">
              3
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-2">
            <div className="bg-white/20 px-3 py-1 rounded-full">
              <span className="text-sm font-medium">{userRole}</span>
            </div>
            <span className="font-medium">{userName}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-blue-600 rounded-full transition" title="Profile">
              <User size={20} />
            </button>
            <button 
              onClick={handleLogout}
              className="p-2 hover:bg-blue-600 rounded-full transition"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
