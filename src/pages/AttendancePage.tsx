
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, X, Clock, Search, QrCode, Fingerprint, Users, Calendar, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

// Mock student data
const students = [
  { id: "S001", name: "Rashi Daga", roll: "225/UCS/052", present: true },
  { id: "S002", name: "Bob Smith", roll: "CS-2021-02", present: false },
  { id: "S003", name: "Charlie Davis", roll: "CS-2021-03", present: true },
  { id: "S004", name: "David Wilson", roll: "CS-2021-04", present: true },
  { id: "S005", name: "Eva Martinez", roll: "CS-2021-05", present: true },
  { id: "S006", name: "Frank Thomas", roll: "CS-2021-06", present: false },
  { id: "S007", name: "Grace Lee", roll: "CS-2021-07", present: true },
  { id: "S008", name: "Henry Brown", roll: "CS-2021-08", present: true },
  { id: "S009", name: "Ivy Anderson", roll: "CS-2021-09", present: true },
  { id: "S010", name: "Jack Miller", roll: "CS-2021-10", present: false },
];

// Mock course data
const courses = [
  { id: "C001", name: "Introduction to Programming", code: "CS101" },
  { id: "C002", name: "Data Structures", code: "CS201" },
  { id: "C003", name: "Database Systems", code: "CS301" },
  { id: "C004", name: "Web Development", code: "CS401" },
];

const AttendancePage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [attendanceList, setAttendanceList] = useState(students);
  const [qrScanned, setQrScanned] = useState(false);
  const [fingerprintScanned, setFingerprintScanned] = useState(false);
  
  if (!user) return null;
  
  const handleToggleAttendance = (studentId: string) => {
    setAttendanceList(
      attendanceList.map((student) =>
        student.id === studentId ? { ...student, present: !student.present } : student
      )
    );
  };
  
  const handleSaveAttendance = () => {
    toast({
      title: "Attendance Saved",
      description: `Attendance for ${selectedCourse ? courses.find(c => c.id === selectedCourse)?.name : "selected course"} on ${selectedDate} has been saved successfully.`,
    });
  };
  
  const filteredStudents = attendanceList.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.roll.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const simulateQrScan = () => {
    setQrScanned(false);
    toast({
      title: "Scanning QR Code",
      description: "Please hold your QR code in front of the camera",
    });
    
    // Simulate scanning process
    setTimeout(() => {
      setQrScanned(true);
      toast({
        title: "QR Code Scanned",
        description: "Your attendance has been marked successfully",
      });
    }, 2000);
  };
  
  const simulateFingerprintScan = () => {
    setFingerprintScanned(false);
    toast({
      title: "Scanning Fingerprint",
      description: "Please place your finger on the scanner",
    });
    
    // Simulate scanning process
    setTimeout(() => {
      setFingerprintScanned(true);
      toast({
        title: "Fingerprint Verified",
        description: "Your attendance has been marked successfully",
      });
    }, 2000);
  };
  
  // Render different content based on user role
  const renderRoleSpecificContent = () => {
    switch (user.role) {
      case "student":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Today's Attendance Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="attendance-card attendance-present">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Mathematics</h3>
                        <p className="text-sm text-gray-500">09:00 AM - 10:30 AM</p>
                      </div>
                      <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                        <Check size={12} className="mr-1" />
                        Present
                      </div>
                    </div>
                  </div>
                  
                  <div className="attendance-card attendance-absent">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Physics</h3>
                        <p className="text-sm text-gray-500">11:00 AM - 12:30 PM</p>
                      </div>
                      <div className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                        <X size={12} className="mr-1" />
                        Absent
                      </div>
                    </div>
                  </div>
                  
                  <div className="attendance-card attendance-late">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Computer Science</h3>
                        <p className="text-sm text-gray-500">02:00 PM - 03:30 PM</p>
                      </div>
                      <div className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                        <Clock size={12} className="mr-1" />
                        Late
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium mb-4">Mark Your Attendance</h3>
                  <Tabs defaultValue="qr">
                    <TabsList className="grid grid-cols-2">
                      <TabsTrigger value="qr">QR Code</TabsTrigger>
                      <TabsTrigger value="biometric">Biometric</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="qr" className="mt-4">
                      <div className="flex flex-col items-center">
                        <div className="w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-4">
                          {qrScanned ? (
                            <div className="text-green-500 flex flex-col items-center">
                              <Check size={48} />
                              <span className="text-sm mt-2">Successfully Scanned</span>
                            </div>
                          ) : (
                            <QrCode size={64} className="text-gray-400" />
                          )}
                        </div>
                        <Button 
                          className="blue-button" 
                          onClick={simulateQrScan}
                          disabled={qrScanned}
                        >
                          {qrScanned ? "Attendance Marked" : "Scan QR Code"}
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="biometric" className="mt-4">
                      <div className="flex flex-col items-center">
                        <div className="w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-4">
                          {fingerprintScanned ? (
                            <div className="text-green-500 flex flex-col items-center">
                              <Check size={48} />
                              <span className="text-sm mt-2">Successfully Verified</span>
                            </div>
                          ) : (
                            <Fingerprint size={64} className="text-gray-400" />
                          )}
                        </div>
                        <Button 
                          className="blue-button" 
                          onClick={simulateFingerprintScan}
                          disabled={fingerprintScanned}
                        >
                          {fingerprintScanned ? "Attendance Marked" : "Scan Fingerprint"}
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      case "teacher":
      case "admin":
      case "hod":
      case "dean":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Take Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="w-full sm:w-1/3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <Input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="form-input"
                    />
                  </div>
                  
                  <div className="w-full sm:w-1/3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                    <Select onValueChange={(value) => setSelectedCourse(value)}>
                      <SelectTrigger className="form-input">
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map((course) => (
                          <SelectItem key={course.id} value={course.id}>
                            {course.code}: {course.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="w-full sm:w-1/3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input
                        type="text"
                        placeholder="Search by name or roll..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="form-input pl-10"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="overflow-x-auto border rounded-lg">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-700">
                      <tr>
                        <th className="py-3 px-6">Roll No</th>
                        <th className="py-3 px-6">Name</th>
                        <th className="py-3 px-6 text-center">Status</th>
                        <th className="py-3 px-6 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.map((student) => (
                        <tr key={student.id} className="bg-white border-b hover:bg-gray-50">
                          <td className="py-3 px-6">{student.roll}</td>
                          <td className="py-3 px-6">{student.name}</td>
                          <td className="py-3 px-6 text-center">
                            {student.present ? (
                              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center justify-center w-20 mx-auto">
                                <Check size={12} className="mr-1" />
                                Present
                              </span>
                            ) : (
                              <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center justify-center w-20 mx-auto">
                                <X size={12} className="mr-1" />
                                Absent
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-6 text-center">
                            <Button
                              variant={student.present ? "destructive" : "default"}
                              size="sm"
                              onClick={() => handleToggleAttendance(student.id)}
                            >
                              {student.present ? "Mark Absent" : "Mark Present"}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button className="blue-button w-40" onClick={handleSaveAttendance}>
                    Save Attendance
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Attendance Methods</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 border rounded-lg text-center">
                    <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 mb-4">
                      <Users className="text-blue-600" size={24} />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Roll Call</h3>
                    <p className="text-gray-500 text-sm mb-4">Manually mark attendance for each student</p>
                    <Button variant="outline" className="w-full">Use Method</Button>
                  </div>
                  
                  <div className="p-6 border rounded-lg text-center">
                    <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 mb-4">
                      <QrCode className="text-blue-600" size={24} />
                    </div>
                    <h3 className="text-lg font-medium mb-2">QR Code</h3>
                    <p className="text-gray-500 text-sm mb-4">Generate QR code for students to scan</p>
                    <Button variant="outline" className="w-full">Generate QR</Button>
                  </div>
                  
                  <div className="p-6 border rounded-lg text-center">
                    <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 mb-4">
                      <Fingerprint className="text-blue-600" size={24} />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Biometric</h3>
                    <p className="text-gray-500 text-sm mb-4">Use fingerprint scanner for verification</p>
                    <Button variant="outline" className="w-full">Start Scanner</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      case "parent":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Child's Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="w-full sm:w-1/3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
                    <Select defaultValue="current">
                      <SelectTrigger className="form-input">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="current">Current Month</SelectItem>
                        <SelectItem value="previous">Previous Month</SelectItem>
                        <SelectItem value="custom">Custom Range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="w-full sm:w-1/3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                    <Select>
                      <SelectTrigger className="form-input">
                        <SelectValue placeholder="All Courses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Courses</SelectItem>
                        {courses.map((course) => (
                          <SelectItem key={course.id} value={course.id}>
                            {course.code}: {course.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="w-full sm:w-1/3 flex items-end">
                    <Button className="w-full h-11" variant="outline">
                      <Filter size={16} className="mr-2" />
                      Apply Filters
                    </Button>
                  </div>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Current Month Summary</h3>
                      <p className="text-sm text-gray-600">April 2025</p>
                    </div>
                    <div className="text-2xl font-bold text-green-600">92%</div>
                  </div>
                  <div className="mt-3 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-2 bg-green-500 rounded-full" style={{ width: "92%" }}></div>
                  </div>
                  <div className="mt-2 flex justify-between text-xs text-gray-500">
                    <span>0%</span>
                    <span>75% (Required)</span>
                    <span>100%</span>
                  </div>
                </div>
                
                <h3 className="font-medium mb-4">Detailed Attendance Record</h3>
                <div className="overflow-x-auto border rounded-lg">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-700">
                      <tr>
                        <th className="py-3 px-6">Date</th>
                        <th className="py-3 px-6">Course</th>
                        <th className="py-3 px-6 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { date: "2025-04-28", course: "Mathematics", status: "present" },
                        { date: "2025-04-28", course: "Physics", status: "absent" },
                        { date: "2025-04-27", course: "Chemistry", status: "present" },
                        { date: "2025-04-27", course: "Computer Science", status: "present" },
                        { date: "2025-04-26", course: "Mathematics", status: "present" },
                      ].map((record, index) => (
                        <tr key={index} className="bg-white border-b hover:bg-gray-50">
                          <td className="py-3 px-6">{record.date}</td>
                          <td className="py-3 px-6">{record.course}</td>
                          <td className="py-3 px-6 text-center">
                            {record.status === "present" ? (
                              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center justify-center w-20 mx-auto">
                                <Check size={12} className="mr-1" />
                                Present
                              </span>
                            ) : (
                              <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center justify-center w-20 mx-auto">
                                <X size={12} className="mr-1" />
                                Absent
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <DashboardLayout userName={user.name} userRole={user.role}>
      <div className="mb-8">
        <h1 className="page-title">Attendance Management</h1>
      </div>
      
      {renderRoleSpecificContent()}
    </DashboardLayout>
  );
};

export default AttendancePage;
