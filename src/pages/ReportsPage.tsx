
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Download, Filter, Users, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell 
} from "recharts";

// Mock data
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const monthlyData = [
  { name: "Jan", attendance: 94 },
  { name: "Feb", attendance: 92 },
  { name: "Mar", attendance: 88 },
  { name: "Apr", attendance: 96 },
  { name: "May", attendance: 91 },
  { name: "Jun", attendance: 87 },
  { name: "Jul", attendance: 90 },
  { name: "Aug", attendance: 89 },
  { name: "Sep", attendance: 94 },
  { name: "Oct", attendance: 92 },
  { name: "Nov", attendance: 86 },
  { name: "Dec", attendance: 89 },
];

const departmentData = [
  { name: "ADA",value:92},
  { name: "Software Testing" , value:86},
  { name: "CyberSecurity",value:70},
  { name: "Web Dev using PHP" , value:90},
  { name: "Digital Image Processing" , value:85},
];

const studentData = [
  { id: "S001", name: "Rashi Daga", roll: "225/UCS/052" , attendance:98},
  { id: "S002", name: "Vaibhav Singh" , roll : "225/UCS/067" , attendance :76},
  { id: "S003", name: "Mitakshi Sharma" , roll : "235/LCS/005" , attendance :90},
  { id: "S004", name: "Dev Kinha", roll : "225/UCS/018" , attendance :75},
  { id: "S005", name: "Maahi Sharma" , roll : "225/UCS/033" , attendance :95},
  { id: "S006", name: "Raj Puri", roll: "225/UCS/051" , attendance : 72},
  { id: "S007", name: "Rohan Yadav" , roll : "225/UCS/53" , attendance : 80},
  { id: "S008", name: "Astha Tyagi" , roll : "225/UCS/002", attendance :95},
  { id: "S009", name: "Adarsh Tiwari" , roll :"225/UCS/004" , attendance :82},
  { id: "S010", name: "Arnav Bhatt" , roll : "225/UCS/011",attendance:78},
];

const courseData = [
  { id: "C001", name: "DIgital Image Processing", code: "CS101", attendance: 88 },
  { id: "C002", name: "SOftware Testing" , code : "CS201", attendance :92},
  { id: "C003", name: "ADA", code: "CS301", attendance: 85 },
  { id: "C004", name: "Web Development", code: "CS401", attendance: 90 },
];

const ReportsPage = () => {
  const { user } = useAuth();
  const [dateRange, setDateRange] = useState<"week" | "month" | "semester" | "year">("month");
  const [searchQuery, setSearchQuery] = useState("");
  
  if (!user) return null;

  // Only teachers, admin, HOD and Dean have access
  if (["student", "parent"].includes(user.role)) {
    return (
      <DashboardLayout userName={user.name} userRole={user.role}>
        <div className="flex flex-col items-center justify-center h-[80vh]">
          <div className="text-4xl text-gray-300 mb-4">
            <FileText size={64} />
          </div>
          <h1 className="text-2xl font-bold text-gray-700 mb-2">Access Restricted</h1>
          <p className="text-gray-500">You do not have permission to access this page.</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userName={user.name} userRole={user.role}>
      <div className="mb-8">
        <h1 className="page-title">Attendance Reports</h1>
        <p className="text-gray-600">Generate and analyze attendance data</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Report Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time Period</label>
              <Select 
                defaultValue={dateRange} 
                onValueChange={(value: "week" | "month" | "semester" | "year") => setDateRange(value)}
              >
                <SelectTrigger className="form-input">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="semester">This Semester</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <Select defaultValue="cs">
                <SelectTrigger className="form-input">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="cs">Computer Science</SelectItem>
                  <SelectItem value="physics">ECE</SelectItem>
                  <SelectItem value="chemistry">IT</SelectItem>
                  <SelectItem value="math">Civil</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
              <Select>
                <SelectTrigger className="form-input">
                  <SelectValue placeholder="All Courses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  {courseData.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.code}: {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end">
              <Button className="w-full h-11 blue-button">
                <Filter size={16} className="mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="mb-6">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Trend ({dateRange === "year" ? "Yearly" : dateRange === "semester" ? "Semesterly" : dateRange === "week" ? "Weekly" : "Monthly"})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={monthlyData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[50, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="attendance"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Department-wise Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={departmentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {departmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Attendance Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="dash-card">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Average Attendance</p>
                      <p className="text-2xl font-bold mt-1">89%</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <Users size={24} className="text-blue-500" />
                    </div>
                  </div>
                </div>
                
                <div className="dash-card">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Highest Attendance</p>
                      <p className="text-2xl font-bold mt-1">98%</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                      <Users size={24} className="text-green-500" />
                    </div>
                  </div>
                </div>
                
                <div className="dash-card">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Lowest Attendance</p>
                      <p className="text-2xl font-bold mt-1">72%</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                      <Users size={24} className="text-red-500" />
                    </div>
                  </div>
                </div>
                
                <div className="dash-card">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Below 75%</p>
                      <p className="text-2xl font-bold mt-1">12%</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                      <Users size={24} className="text-amber-500" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <Button variant="outline" className="flex items-center">
                  <Download size={16} className="mr-2" />
                  Download Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="students">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between">
                <span>Student Attendance Report</span>
                <Input
                  type="text"
                  placeholder="Search by name or roll..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-xs"
                />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-700">
                    <tr>
                      <th className="py-3 px-6">Roll No</th>
                      <th className="py-3 px-6">Name</th>
                      <th className="py-3 px-6">Attendance %</th>
                      <th className="py-3 px-6">Status</th>
                      <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentData.filter(student => 
                      student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                      student.roll.toLowerCase().includes(searchQuery.toLowerCase())
                    ).map((student) => (
                      <tr key={student.id} className="bg-white border-b hover:bg-gray-50">
                        <td className="py-3 px-6">{student.roll}</td>
                        <td className="py-3 px-6">{student.name}</td>
                        <td className="py-3 px-6">
                          <div className="flex items-center">
                            <div className="mr-2">{student.attendance}%</div>
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  student.attendance >= 75 ? "bg-green-500" : "bg-red-500"
                                }`}
                                style={{ width: `${student.attendance}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-6">
                          <span
                            className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                              student.attendance >= 75
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {student.attendance >= 75 ? "Good Standing" : "Below Required"}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <Button variant="outline" size="sm">
                            <FileText size={14} className="mr-1" />
                            Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="flex justify-end mt-6">
                <Button variant="outline" className="flex items-center">
                  <Download size={16} className="mr-2" />
                  Download List
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="courses">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Course-wise Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={courseData}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis 
                        dataKey="code" 
                        type="category" 
                        tick={{ fontSize: 14 }} 
                      />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="attendance" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Course Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courseData.map((course) => (
                    <div key={course.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-medium">{course.code}: {course.name}</h3>
                        <span 
                          className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                            course.attendance >= 75
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {course.attendance}% Attendance
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                        <div
                          className={`h-2 rounded-full ${
                            course.attendance >= 75 ? "bg-green-500" : "bg-red-500"
                          }`}
                          style={{ width: `${course.attendance}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-end">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="departments">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Department-wise Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={departmentData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" name="Attendance %" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Department Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departmentData.map((department, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-medium">{department.name}</h3>
                        <span 
                          className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                            department.value >= 75
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {department.value}% Avg. Attendance
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div
                          className={`h-2 rounded-full ${
                            department.value >= 75 ? "bg-green-500" : "bg-red-500"
                          }`}
                          style={{ width: `${department.value}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Courses: 8</span>
                        <span>Students: {120 + index * 15}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default ReportsPage;
