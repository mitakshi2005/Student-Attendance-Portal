
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Calendar, Clock, Users, Search } from "lucide-react";

const classes = [
  {
    id: "c1",
    code: "CS302",
    name: "Web Dev using PHP",
    instructor:"Rakesh Kumar",
    schedule: "Mon, Wed, Fri 10:00 AM - 11:30 AM",
    room: "IL-202",
    students: 35,
    attendance: 92
  },
  {
    id: "c2",
    code: "CS304",
    name: "Software Testing",
    instructor: "Bhavana Yadav",
    schedule: "Tue, Thu 1:00 PM - 3:00 PM",
    room: "IL-202",
    students: 28,
    attendance: 88
  },
  {
    id: "c3",
    code: "CS301",
    name: "Managment Information System",
    instructor: "Shashi Prabha",
    schedule: "Mon, Wed 2:00 PM - 3:30 PM",
    room: "IL-202",
    students: 32,
    attendance: 85
  },
  {
    id: "c4",
    code: "CS401",
    name: "Cybersecurity",
    instructor: "Sonu Kumar",
    schedule: "Tue, Thu 10:00 AM - 12:00 PM",
    room: "IL-202",
    students: 30,
    attendance: 90
  },
  {
    id: "c5",
    code: "CS-302",
    name: "Analysis and Design of Algorithms",
    instructor: "Archana Singh",
    schedule: "Mon, Wed, Fri 9:00 AM - 10:00 AM",
    room: "IL-202",
    students: 40,
    attendance: 82
  },
  {
    id: "c6",
    code: "CS310",
    name: "Digital Image Processing",
    instructor: "Prof K K Biswas",
    schedule: "Tue, Thu 3:00 PM - 4:30 PM",
    room: "IL-202",
    students: 38,
    attendance: 86
  }
];

const ClassesPage = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  
  if (!user) return null;

  const filteredClasses = classes.filter(cls =>
    cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cls.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cls.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout userName={user.name} userRole={user.role}>
      <div className="mb-8">
        <h1 className="page-title">Classes</h1>
        <p className="text-gray-600">View and manage your class schedule</p>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Search classes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {["teacher", "admin", "hod", "dean"].includes(user.role) && (
          <Button className="blue-button">
            <BookOpen size={18} className="mr-2" />
            Add New Class
          </Button>
        )}
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Classes</TabsTrigger>
          <TabsTrigger value="today">Today's Schedule</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredClasses.map((cls) => (
              <Card key={cls.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-2 bg-blue-500 w-full"></div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded mb-2">
                        {cls.code}
                      </span>
                      <CardTitle>{cls.name}</CardTitle>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-500">Attendance</span>
                      <div className="text-lg font-bold text-blue-600">{cls.attendance}%</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start">
                      <Users size={16} className="mr-2 text-gray-500 mt-0.5" />
                      <div>
                        <div className="font-medium">Instructor</div>
                        <div className="text-gray-600">{cls.instructor}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Clock size={16} className="mr-2 text-gray-500 mt-0.5" />
                      <div>
                        <div className="font-medium">Schedule</div>
                        <div className="text-gray-600">{cls.schedule}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <BookOpen size={16} className="mr-2 text-gray-500 mt-0.5" />
                      <div>
                        <div className="font-medium">Room</div>
                        <div className="text-gray-600">{cls.room}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-between">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    
                    {["teacher", "admin", "hod", "dean"].includes(user.role) && (
                      <Button size="sm" className="blue-button">
                        Take Attendance
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="today" className="mt-6">
          <div className="space-y-4">
            {filteredClasses.slice(0, 3).map((cls) => (
              <div key={cls.id} className="flex flex-col md:flex-row border rounded-lg overflow-hidden">
                <div className="bg-blue-gradient text-white p-4 md:p-6 md:w-64 flex flex-col justify-center">
                  <div className="text-lg font-semibold mb-1">{cls.code}</div>
                  <div className="text-xl font-bold">{cls.name}</div>
                </div>
                
                <div className="p-4 flex-1">
                  <div className="flex flex-wrap gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Instructor</div>
                      <div className="font-medium">{cls.instructor}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500">Room</div>
                      <div className="font-medium">{cls.room}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500">Time</div>
                      <div className="font-medium">{cls.schedule.split(" ").slice(3).join(" ")}</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <Button variant="outline" size="sm" className="mr-2">
                      View Details
                    </Button>
                    
                    {["teacher", "admin", "hod", "dean"].includes(user.role) && (
                      <Button size="sm" className="blue-button">
                        Take Attendance
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="upcoming" className="mt-6">
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i}>
                <h3 className="font-medium text-gray-600 mb-3 flex items-center">
                  <Calendar size={16} className="mr-2" />
                  {i === 0 ? "Tomorrow" : i === 1 ? "In 2 Days" : "Next Week"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredClasses.slice(i * 2, i * 2 + 2).map((cls) => (
                    <div key={cls.id} className="border p-4 rounded-lg">
                      <div className="flex justify-between">
                        <div>
                          <div className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded mb-1">
                            {cls.code}
                          </div>
                          <div className="font-medium">{cls.name}</div>
                        </div>
                        <div className="text-right text-sm">
                          <div className="text-gray-500">Time</div>
                          <div>{cls.schedule.split(" ").slice(3).join(" ")}</div>
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-gray-600">{cls.room} • {cls.instructor}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default ClassesPage;
