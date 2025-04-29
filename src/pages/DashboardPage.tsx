
import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Calendar, Clock, PieChart as PieChartIcon, Users } from "lucide-react";

// Mock data
const attendanceData = [
  { name: "Monday", attendance: 95 },
  { name: "Tuesday", attendance: 88 },
  { name: "Wednesday", attendance: 92 },
  { name: "Thursday", attendance: 85 },
  { name: "Friday", attendance: 78 },
];

const courseAttendanceData = [
  { name: "Physics", value: 92 },
  { name: "Chemistry", value: 85 },
  { name: "Mathematics", value: 96 },
  { name: "Computer Science", value: 90 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const studentDashboardStats = [
  { 
    title: "Today's Classes", 
    value: "3", 
    icon: Clock,
    color: "border-blue-500 bg-blue-50"
  },
  { 
    title: "Courses", 
    value: "6", 
    icon: Calendar,
    color: "border-green-500 bg-green-50"
  },
  { 
    title: "Attendance", 
    value: "92%", 
    icon: PieChartIcon,
    color: "border-purple-500 bg-purple-50" 
  },
  { 
    title: "Assignments", 
    value: "4", 
    icon: Users,
    color: "border-amber-500 bg-amber-50" 
  }
];

const teacherDashboardStats = [
  { 
    title: "Today's Classes", 
    value: "4", 
    icon: Clock,
    color: "border-blue-500 bg-blue-50"
  },
  { 
    title: "Total Students", 
    value: "124", 
    icon: Users,
    color: "border-green-500 bg-green-50" 
  },
  { 
    title: "Avg. Attendance", 
    value: "87%", 
    icon: PieChartIcon,
    color: "border-purple-500 bg-purple-50" 
  },
  { 
    title: "Pending Grades", 
    value: "12", 
    icon: Calendar,
    color: "border-amber-500 bg-amber-50" 
  }
];

const parentDashboardStats = [
  { 
    title: "Child's Classes", 
    value: "6", 
    icon: Calendar,
    color: "border-blue-500 bg-blue-50" 
  },
  { 
    title: "Attendance", 
    value: "92%", 
    icon: PieChartIcon,
    color: "border-green-500 bg-green-50" 
  },
  { 
    title: "Assignments", 
    value: "4 Due", 
    icon: Clock,
    color: "border-purple-500 bg-purple-50" 
  },
  { 
    title: "Parent Meetings", 
    value: "1", 
    icon: Users,
    color: "border-amber-500 bg-amber-50" 
  }
];

const adminDashboardStats = [
  { 
    title: "Total Students", 
    value: "1,245", 
    icon: Users,
    color: "border-blue-500 bg-blue-50" 
  },
  { 
    title: "Total Teachers", 
    value: "78", 
    icon: Users,
    color: "border-green-500 bg-green-50" 
  },
  { 
    title: "Avg. Attendance", 
    value: "88%", 
    icon: PieChartIcon,
    color: "border-purple-500 bg-purple-50" 
  },
  { 
    title: "Classes Today", 
    value: "42", 
    icon: Calendar,
    color: "border-amber-500 bg-amber-50"
  }
];

const hodDashboardStats = [
  { 
    title: "Department Students", 
    value: "423", 
    icon: Users,
    color: "border-blue-500 bg-blue-50" 
  },
  { 
    title: "Department Staff", 
    value: "25", 
    icon: Users,
    color: "border-green-500 bg-green-50" 
  },
  { 
    title: "Avg. Attendance", 
    value: "91%", 
    icon: PieChartIcon,
    color: "border-purple-500 bg-purple-50" 
  },
  { 
    title: "Courses", 
    value: "18", 
    icon: Calendar,
    color: "border-amber-500 bg-amber-50" 
  }
];

const deanDashboardStats = [
  { 
    title: "Total Students", 
    value: "3,245", 
    icon: Users,
    color: "border-blue-500 bg-blue-50"
  },
  { 
    title: "Departments", 
    value: "5", 
    icon: Users,
    color: "border-green-500 bg-green-50" 
  },
  { 
    title: "Avg. Attendance", 
    value: "90%", 
    icon: PieChartIcon,
    color: "border-purple-500 bg-purple-50" 
  },
  { 
    title: "Faculty Members", 
    value: "125", 
    icon: Calendar,
    color: "border-amber-500 bg-amber-50" 
  }
];

const DashboardPage = () => {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  });

  if (!user) return null;

  // Determine which stats to display based on user role
  let dashboardStats;
  switch(user.role) {
    case "student":
      dashboardStats = studentDashboardStats;
      break;
    case "teacher":
      dashboardStats = teacherDashboardStats;
      break;
    case "parent":
      dashboardStats = parentDashboardStats;
      break;
    case "admin":
      dashboardStats = adminDashboardStats;
      break;
    case "hod":
      dashboardStats = hodDashboardStats;
      break;
    case "dean":
      dashboardStats = deanDashboardStats;
      break;
    default:
      dashboardStats = studentDashboardStats;
  }

  // Render role-specific content
  const renderRoleSpecificContent = () => {
    switch (user.role) {
      case "student":
        return (
          <>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>This Week's Classes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["Mathematics", "Physics", "Chemistry", "Computer Science"].map((subject) => (
                    <div key={subject} className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
                      <div>
                        <h4 className="font-medium">{subject}</h4>
                        <p className="text-sm text-gray-500">Room 201 • 10:00 AM</p>
                      </div>
                      <Link to="/classes" className="text-sm text-blue-600 hover:underline">View Details</Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        );
      case "teacher":
        return (
          <>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Today's Classes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["CS101: Introduction to Programming", "CS203: Data Structures", "CS301: Database Systems"].map((subject) => (
                    <div key={subject} className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
                      <div>
                        <h4 className="font-medium">{subject}</h4>
                        <p className="text-sm text-gray-500">Room 105 • 2:00 PM</p>
                      </div>
                      <div className="flex gap-2">
                        <Link to="/attendance" className="text-sm text-blue-600 hover:underline">Take Attendance</Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        );
      case "admin":
      case "hod":
      case "dean":
        return (
          <>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Department Attendance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="dash-card">
                    <h3 className="text-lg font-semibold mb-1">Computer Science</h3>
                    <div className="text-3xl font-bold text-blue-600">93%</div>
                    <div className="text-sm text-gray-500">32 Students Present</div>
                  </div>
                  <div className="dash-card">
                    <h3 className="text-lg font-semibold mb-1">Physics</h3>
                    <div className="text-3xl font-bold text-blue-600">87%</div>
                    <div className="text-sm text-gray-500">26 Students Present</div>
                  </div>
                  <div className="dash-card">
                    <h3 className="text-lg font-semibold mb-1">Mathematics</h3>
                    <div className="text-3xl font-bold text-blue-600">91%</div>
                    <div className="text-sm text-gray-500">29 Students Present</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        );
      case "parent":
        return (
          <>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Your Child's Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["Mathematics", "Physics", "English Literature"].map((subject) => (
                    <div key={subject} className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
                      <div>
                        <h4 className="font-medium">{subject}</h4>
                        <p className="text-sm text-gray-500">Room 201 • 10:00 AM</p>
                      </div>
                      <Link to="/classes" className="text-sm text-blue-600 hover:underline">View Details</Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout userName={user.name} userRole={user.role}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-800">
          {greeting}, {user.name}!
        </h1>
        <p className="text-gray-600">Welcome to your {user.role} dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {dashboardStats.map((stat, index) => (
          <div 
            key={index} 
            className={`dash-card border-l-4 ${stat.color}`}
          >
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                <stat.icon size={24} className="text-blue-500" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Role-specific content */}
      {renderRoleSpecificContent()}

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Attendance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={attendanceData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="attendance" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Course-wise Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={courseAttendanceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {courseAttendanceData.map((entry, index) => (
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
    </DashboardLayout>
  );
};

export default DashboardPage;
