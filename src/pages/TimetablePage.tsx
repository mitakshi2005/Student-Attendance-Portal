
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Calendar, Download, Users, BookOpen } from "lucide-react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const timeSlots = ["9:00 AM - 10:30 AM", "10:45 AM - 12:15 PM", "1:00 PM - 2:30 PM", "2:45 PM - 4:15 PM", "4:30 PM - 6:00 PM"];

// Mock timetable data
const timetableData = {
  Monday: {
    "9:00 AM - 10:30 AM": { courseCode: "CS101", courseName: "ADA", room: "IL-202", instructor: "Archana Singh"},
    "10:45 AM - 12:15 PM": { courseCode: "MATH201", courseName: "Cybersecurity" , room : "IL-202" , instructor :"Sonu Kumar"},
    "2:45 PM - 4:15 PM": { courseCode: "CS301", courseName: "Software Testing" , room : "IL-202" , instructor : "Bhavana Yadav"},
  },
  Tuesday: {
    "9:00 AM - 10:30 AM": { courseCode: "PHYS101", courseName: "DIgital Image Processing",room: "IL-202", instructor: "Prof.K.K.Biswas"},
    "1:00 PM - 2:30 PM": { courseCode: "CS401", courseName: "Web Development", room: "IL-202", instructor: "Rakesh Kumar" },
  },
  Wednesday: {
    "9:00 AM - 10:30 AM": { courseCode: "CS101", courseName: "ADA", room: "IL-202" , instructor : "Archana Singh"},
    "10:45 AM - 12:15 PM": { courseCode: "MATH201", courseName: "Cybersecurity", room :"IL-202", instructor: "Sonu Kumar" },
    "1:00 PM - 2:30 PM": { courseCode: "CS201", courseName: "Software Testing",room: "IL-202", instructor: "Bhavana Yadav" },
  },
  Thursday: {
    "9:00 AM - 10:30 AM": { courseCode: "PHYS101", courseName: "Digitial IMage Processing" , room : "IL-202" , instructor :"Prof.K.K.Biswas"},
    "1:00 PM - 2:30 PM": { courseCode: "CS401", courseName: "Web Development", room: "IL-202", instructor: "Rakesh Kumar" },
  },
  Friday: {
    "10:45 AM - 12:15 PM": { courseCode: "CS201", courseName: "Software Testing",room: "Il-202", instructor: "Bhavana Yadav" },
    "2:45 PM - 4:15 PM": { courseCode: "CS301", courseName: "ADA", room: "Lab 205", instructor: "ARchana Singh" },
  },
};

const TimetablePage = () => {
  const { user } = useAuth();
  const [selectedDepartment, setSelectedDepartment] = useState("computer-science");
  const [selectedSemester, setSelectedSemester] = useState("current");
  
  if (!user) return null;

  return (
    <DashboardLayout userName={user.name} userRole={user.role}>
      <div className="mb-8">
        <h1 className="page-title">Timetable</h1>
        <p className="text-gray-600">View and manage class schedules</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Timetable Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <Select
                value={selectedDepartment}
                onValueChange={setSelectedDepartment}
              >
                <SelectTrigger className="form-input">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="computer-science">Computer Science</SelectItem>
                  <SelectItem value="physics">IT</SelectItem>
                  <SelectItem value="mathematics">ECE</SelectItem>
                  <SelectItem value="chemistry">CIvil</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
              <Select
                value={selectedSemester}
                onValueChange={setSelectedSemester}
              >
                <SelectTrigger className="form-input">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Current Semester</SelectItem>
                  <SelectItem value="next">Next Semester</SelectItem>
                  <SelectItem value="previous">Previous Semester</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end">
              <Button variant="outline" className="w-full h-11">
                <Calendar size={16} className="mr-2" />
                View Academic Calendar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Weekly Schedule</CardTitle>
          <Button variant="outline">
            <Download size={16} className="mr-2" />
            Export Timetable
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-3 bg-gray-50">Time</th>
                  {days.map((day) => (
                    <th key={day} className="border p-3 bg-gray-50">{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((timeSlot) => (
                  <tr key={timeSlot}>
                    <td className="border p-2 font-medium bg-gray-50">
                      <div className="flex items-center">
                        <Clock size={14} className="mr-2 text-gray-500" />
                        {timeSlot}
                      </div>
                    </td>
                    
                    {days.map((day) => {
                      const classData = timetableData[day as keyof typeof timetableData]?.[timeSlot];
                      
                      return (
                        <td key={`${day}-${timeSlot}`} className="border p-0">
                          {classData ? (
                            <div className="p-2 h-full bg-blue-50 border-l-4 border-blue-500 hover:bg-blue-100 transition-colors">
                              <div className="font-medium text-blue-800">
                                {classData.courseCode}: {classData.courseName}
                              </div>
                              <div className="text-sm text-gray-600 mt-1 flex items-center">
                                <BookOpen size={12} className="mr-1" />
                                {classData.room}
                              </div>
                              <div className="text-sm text-gray-600 mt-1 flex items-center">
                                <Users size={12} className="mr-1" />
                                {classData.instructor}
                              </div>
                            </div>
                          ) : (
                            <div className="h-full min-h-[100px] flex items-center justify-center text-gray-400 text-sm">
                              No Class
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium mb-3">Legend</h3>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-50 border-l-4 border-blue-500 mr-2"></div>
                <span className="text-sm">Scheduled Class</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-white border mr-2"></div>
                <span className="text-sm">Free Time Slot</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-50 border-l-4 border-red-500 mr-2"></div>
                <span className="text-sm">Rescheduled Class</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-amber-50 border-l-4 border-amber-500 mr-2"></div>
                <span className="text-sm">Special Event</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default TimetablePage;
