
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, PlusCircle, Filter, UserPlus, Mail } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock users data
const users = [
  { id: "1", name: "John Smith", email: "john@student.edu", role: "student", status: "active", department: "Computer Science" },
  { id: "2", name: "Emily Johnson", email: "emily@teacher.edu", role: "teacher", status: "active", department: "Computer Science" },
  { id: "3", name: "David Wilson", email: "david@student.edu", role: "student", status: "active", department: "Physics" },
  { id: "4", name: "Sarah Williams", email: "sarah@teacher.edu", role: "teacher", status: "active", department: "Mathematics" },
  { id: "5", name: "Michael Brown", email: "michael@student.edu", role: "student", status: "inactive", department: "Chemistry" },
  { id: "6", name: "Jessica Davis", email: "jessica@teacher.edu", role: "teacher", status: "active", department: "Physics" },
  { id: "7", name: "Robert Miller", email: "robert@admin.edu", role: "admin", status: "active", department: "Administration" },
  { id: "8", name: "Lisa Anderson", email: "lisa@student.edu", role: "student", status: "inactive", department: "Mathematics" },
  { id: "9", name: "James Wilson", email: "james@teacher.edu", role: "teacher", status: "active", department: "Computer Science" },
  { id: "10", name: "Maria Rodriguez", email: "maria@hod.edu", role: "hod", status: "active", department: "Computer Science" },
  { id: "11", name: "Thomas Wilson", email: "thomas@dean.edu", role: "dean", status: "active", department: "Faculty of Science" },
  { id: "12", name: "Robert Smith", email: "robert@parent.edu", role: "parent", status: "active", department: "N/A" }
];

const UsersPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  
  if (!user) return null;

  // Only admin, HOD and Dean have access
  if (!["admin", "hod", "dean"].includes(user.role)) {
    return (
      <DashboardLayout userName={user.name} userRole={user.role}>
        <div className="flex flex-col items-center justify-center h-[80vh]">
          <div className="text-4xl text-gray-300 mb-4">
            <UserPlus size={64} />
          </div>
          <h1 className="text-2xl font-bold text-gray-700 mb-2">Access Restricted</h1>
          <p className="text-gray-500">You do not have permission to access this page.</p>
        </div>
      </DashboardLayout>
    );
  }

  const handleUserAction = (action: string, userId: string) => {
    toast({
      title: `User ${action}`,
      description: `User ${action} operation completed successfully.`,
    });
  };
  
  const handleInviteUser = () => {
    toast({
      title: "Invitation Sent",
      description: "User invitation has been sent via email.",
    });
  };
  
  // Filter users based on search query, role, and department
  const filteredUsers = users.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    const matchesDepartment = departmentFilter === "all" || u.department === departmentFilter;
    
    return matchesSearch && matchesRole && matchesDepartment;
  });

  return (
    <DashboardLayout userName={user.name} userRole={user.role}>
      <div className="mb-8">
        <h1 className="page-title">User Management</h1>
        <p className="text-gray-600">Manage users, roles, and permissions</p>
      </div>
      
      <div className="mb-6 flex flex-col md:flex-row justify-between gap-4">
        <div className="relative w-full md:w-auto md:flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <Select
            value={roleFilter}
            onValueChange={setRoleFilter}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="teacher">Teacher</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="parent">Parent</SelectItem>
              <SelectItem value="hod">HOD</SelectItem>
              <SelectItem value="dean">Dean</SelectItem>
            </SelectContent>
          </Select>
          
          <Select
            value={departmentFilter}
            onValueChange={setDepartmentFilter}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="Computer Science">Computer Science</SelectItem>
              <SelectItem value="Physics">Physics</SelectItem>
              <SelectItem value="Mathematics">Mathematics</SelectItem>
              <SelectItem value="Chemistry">Chemistry</SelectItem>
              <SelectItem value="Administration">Administration</SelectItem>
            </SelectContent>
          </Select>
          
          <Button className="blue-button">
            <Filter size={16} className="mr-2" />
            Apply Filters
          </Button>
        </div>
      </div>

      <Tabs defaultValue="users">
        <TabsList className="mb-6">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>All Users ({filteredUsers.length})</CardTitle>
              <Button className="blue-button" onClick={handleInviteUser}>
                <UserPlus size={16} className="mr-2" />
                Invite User
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-700">
                    <tr>
                      <th className="py-3 px-6">Name</th>
                      <th className="py-3 px-6">Email</th>
                      <th className="py-3 px-6">Role</th>
                      <th className="py-3 px-6">Department</th>
                      <th className="py-3 px-6">Status</th>
                      <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((u) => (
                      <tr key={u.id} className="bg-white border-b hover:bg-gray-50">
                        <td className="py-3 px-6">
                          <div className="flex items-center">
                            <Avatar className="w-8 h-8 mr-3">
                              <AvatarImage src="/placeholder.svg" alt={u.name} />
                              <AvatarFallback>{u.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {u.name}
                          </div>
                        </td>
                        <td className="py-3 px-6">{u.email}</td>
                        <td className="py-3 px-6">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            u.role === "student" ? "bg-blue-100 text-blue-800" :
                            u.role === "teacher" ? "bg-green-100 text-green-800" :
                            u.role === "admin" ? "bg-purple-100 text-purple-800" :
                            u.role === "parent" ? "bg-yellow-100 text-yellow-800" :
                            u.role === "hod" ? "bg-red-100 text-red-800" :
                            "bg-indigo-100 text-indigo-800"
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="py-3 px-6">{u.department}</td>
                        <td className="py-3 px-6">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            u.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}>
                            {u.status}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex justify-center gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleUserAction("edit", u.id)}
                            >
                              Edit
                            </Button>
                            
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-blue-600 border-blue-200 hover:bg-blue-50"
                              onClick={() => handleUserAction("email", u.id)}
                            >
                              <Mail size={14} className="mr-1" />
                              Email
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="permissions">
          <Card>
            <CardHeader>
              <CardTitle>Role Permissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-700">
                    <tr>
                      <th className="py-3 px-6">Permission</th>
                      <th className="py-3 px-6 text-center">Student</th>
                      <th className="py-3 px-6 text-center">Teacher</th>
                      <th className="py-3 px-6 text-center">Admin</th>
                      <th className="py-3 px-6 text-center">Parent</th>
                      <th className="py-3 px-6 text-center">HOD</th>
                      <th className="py-3 px-6 text-center">Dean</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: "p1", name: "View Attendance", permissions: { student: true, teacher: true, admin: true, parent: true, hod: true, dean: true } },
                      { id: "p2", name: "Mark Attendance", permissions: { student: false, teacher: true, admin: true, parent: false, hod: true, dean: true } },
                      { id: "p3", name: "Generate Reports", permissions: { student: false, teacher: true, admin: true, parent: false, hod: true, dean: true } },
                      { id: "p4", name: "Manage Users", permissions: { student: false, teacher: false, admin: true, parent: false, hod: true, dean: true } },
                      { id: "p5", name: "System Settings", permissions: { student: false, teacher: false, admin: true, parent: false, hod: true, dean: true } },
                      { id: "p6", name: "Add/Edit Classes", permissions: { student: false, teacher: true, admin: true, parent: false, hod: true, dean: true } },
                    ].map((permission) => (
                      <tr key={permission.id} className="bg-white border-b hover:bg-gray-50">
                        <td className="py-3 px-6 font-medium">{permission.name}</td>
                        {["student", "teacher", "admin", "parent", "hod", "dean"].map((role) => (
                          <td key={role} className="py-3 px-6 text-center">
                            {permission.permissions[role as keyof typeof permission.permissions] ? (
                              <span className="inline-block w-6 h-6 bg-green-100 text-green-800 rounded-full text-center leading-6">✓</span>
                            ) : (
                              <span className="inline-block w-6 h-6 bg-red-100 text-red-800 rounded-full text-center leading-6">✕</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button className="blue-button">
                  Save Permission Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default UsersPage;
