
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, Info, AlertTriangle, CheckCircle, Clock,
  Calendar, BookOpen, Settings, User
} from "lucide-react";
import { NotificationItem } from "@/types";
import { useToast } from "@/components/ui/use-toast";

// Mock notifications data
const mockNotifications: NotificationItem[] = [
  {
    id: "n1",
    title: "Low Attendance Alert",
    message: "Your attendance in Software testing (CS2021) below 75% please make sure to maintain it to remove academic penalities",
    date: "2025-04-28T10:30:00",
    read: false,
    type: "alert"
  },
  {
    id: "n2",
    title: "Class Rescheduled",
    message: "Your Web Dev class on April 30th has been rescheduled to 2nd May due to faculty meeting",
    date: "2025-04-27T14:15:00",
    read: false,
    type: "info"
  },
  {
    id: "n3",
    title: "Assignment Deadline",
    message: "Reminder: The deadline for submitting your ADA Assignment is tomorrow at 11:59 PM",
    date: "2025-04-26T09:45:00",
    read: true,
    type: "warning"
  },
  {
    id: "n4",
    title: "Attendance Recorded",
    message: "Your attendance has been successfully recorded for Web Development (CS401) on April 25th.",
    date: "2025-04-25T11:20:00",
    read: true,
    type: "success"
  },
  {
    id: "n5",
    title: "Holiday Notice",
    message: "The university will be closed on May 1st for Labor Day. All classes are suspended.",
    date: "2025-04-24T15:30:00",
    read: true,
    type: "info"
  }
];

// Mock teacher notifications
const teacherNotifications: NotificationItem[] = [
  {
    id: "t1",
    title: "Attendance Reminder",
    message: "Don't forget to mark attendance for your ADA class (Cs301) today",
    date: "2025-04-28T08:30:00",
    read: false,
    type: "info"
  },
  {
    id: "t2",
    title: "Low Student Attendance",
    message: "Multiple students in your ADAs class are below the 75% attendance requirement.",
    date: "2025-04-27T16:45:00",
    read: false,
    type: "alert"
  },
  {
    id: "t3",
    title: "Faculty Meeting",
    message: "Reminder: Faculty meeting scheduled for April 30th at 2:00 PM in Conference Room B.",
    date: "2025-04-26T10:15:00",
    read: true,
    type: "info"
  },
  {
    id: "t4",
    title: "Grades Due",
    message: "Please submit all mid-term grades by Friday, May 3rd.",
    date: "2025-04-25T14:00:00",
    read: true,
    type: "warning"
  }
];

// Mock admin notifications
const adminNotifications: NotificationItem[] = [
  {
    id: "a1",
    title: "System Update",
    message: "The attendance system will undergo maintenance tonight from 2:00 AM to 4:00 AM.",
    date: "2025-04-28T09:00:00",
    read: false,
    type: "info"
  },
  {
    id: "a2",
    title: "Attendance Issue",
    message: "Biometric attendance system in Building B is reporting errors. IT team has been notified.",
    date: "2025-04-27T11:30:00",
    read: false,
    type: "alert"
  },
  {
    id: "a3",
    title: "Bulk Upload Complete",
    message: "The bulk upload of 250 student records has been completed successfully.",
    date: "2025-04-26T15:45:00",
    read: true,
    type: "success"
  }
];

// Mock parent notifications
const parentNotifications: NotificationItem[] = [
  {
    id: "p1",
    title: "Low Attendance Alert",
    message: "Your child's attendance in Software Testing is below 75% . Please address this issue",
    date: "2025-04-28T10:00:00",
    read: false,
    type: "alert"
  },
  {
    id: "p2",
    title: "Parent-Teacher Meeting",
    message: "Parent-Teacher meeting scheduled for May 5th. Please confirm your attendance.",
    date: "2025-04-27T14:30:00",
    read: false,
    type: "info"
  },
  {
    id: "p3",
    title: "Attendance Improvement",
    message: "Your child's attendance has improved in ADA class. Keep up the good work!",
    date: "2025-04-25T09:15:00",
    read: true,
    type: "success"
  }
];

// Function to get notifications by user role
const getNotificationsByRole = (role: string): NotificationItem[] => {
  switch (role) {
    case "student":
      return mockNotifications;
    case "teacher":
      return teacherNotifications;
    case "admin":
    case "hod":
    case "dean":
      return adminNotifications;
    case "parent":
      return parentNotifications;
    default:
      return mockNotifications;
  }
};

// Function to format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `Today at ${hours}:${minutes < 10 ? '0' + minutes : minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays < 7) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  } else {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }
};

// Function to get icon by notification type
const getNotificationIcon = (type: string) => {
  switch (type) {
    case "alert":
      return <AlertTriangle className="text-red-500" size={20} />;
    case "warning":
      return <Info className="text-amber-500" size={20} />;
    case "success":
      return <CheckCircle className="text-green-500" size={20} />;
    case "info":
    default:
      return <Bell className="text-blue-500" size={20} />;
  }
};

const NotificationsPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"all" | "unread" | "alerts" | "info">("all");
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  React.useEffect(() => {
    if (user) {
      setNotifications(getNotificationsByRole(user.role));
    }
  }, [user]);

  const handleMarkAsRead = (id: string) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    
    toast({
      title: "Notification marked as read",
      description: "This notification has been marked as read.",
    });
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
    
    toast({
      title: "All notifications marked as read",
      description: "All notifications have been marked as read.",
    });
  };

  const filteredNotifications = React.useMemo(() => {
    switch (activeTab) {
      case "unread":
        return notifications.filter(notification => !notification.read);
      case "alerts":
        return notifications.filter(notification => notification.type === "alert" || notification.type === "warning");
      case "info":
        return notifications.filter(notification => notification.type === "info" || notification.type === "success");
      case "all":
      default:
        return notifications;
    }
  }, [activeTab, notifications]);

  const unreadCount = notifications.filter(notification => !notification.read).length;

  if (!user) return null;

  return (
    <DashboardLayout userName={user.name} userRole={user.role}>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="page-title">Notifications</h1>
          <p className="text-gray-600">Stay updated with important alerts and messages</p>
        </div>
        
        <div>
          <Button variant="outline" onClick={handleMarkAllAsRead} disabled={unreadCount === 0}>
            Mark All as Read
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <div className="flex items-center">
              <Bell className="mr-2 text-blue-500" size={20} />
              <span>Your Notifications</span>
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {unreadCount} unread
                </Badge>
              )}
            </div>
            
            <Button variant="ghost" size="sm" asChild>
              <a href="#settings" className="flex items-center">
                <Settings size={16} className="mr-1" />
                Settings
              </a>
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
            <TabsList className="mb-6">
              <TabsTrigger value="all">
                All
                <Badge variant="secondary" className="ml-2">
                  {notifications.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="unread">
                Unread
                <Badge variant="secondary" className="ml-2">
                  {notifications.filter(n => !n.read).length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="alerts">
                Alerts
                <Badge variant="secondary" className="ml-2">
                  {notifications.filter(n => n.type === "alert" || n.type === "warning").length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="info">
                Info
                <Badge variant="secondary" className="ml-2">
                  {notifications.filter(n => n.type === "info" || n.type === "success").length}
                </Badge>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab}>
              <div className="space-y-4">
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map(notification => (
                    <div
                      key={notification.id}
                      className={`p-4 border rounded-lg ${!notification.read ? "bg-blue-50 border-blue-200" : "bg-white"}`}
                    >
                      <div className="flex items-start">
                        <div className="mr-4 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className={`font-medium ${!notification.read ? "text-blue-800" : ""}`}>
                              {notification.title}
                            </h3>
                            <span className="text-xs text-gray-500">
                              {formatDate(notification.date)}
                            </span>
                          </div>
                          
                          <p className="text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          
                          <div className="mt-3 flex justify-end">
                            {!notification.read && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleMarkAsRead(notification.id)}
                              >
                                Mark as Read
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                      <Bell className="text-gray-400" size={32} />
                    </div>
                    <h3 className="text-lg font-medium text-gray-700 mb-2">No notifications found</h3>
                    <p className="text-gray-500">You don't have any notifications in this category</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 pt-6 border-t" id="settings">
            <h3 className="text-lg font-medium mb-4">Notification Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center mb-3">
                  <Clock className="mr-2 text-blue-500" size={18} />
                  <h4 className="font-medium">Attendance Alerts</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Get notified when your attendance falls below the required threshold.
                </p>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex items-center mb-3">
                  <Calendar className="mr-2 text-purple-500" size={18} />
                  <h4 className="font-medium">Class Schedule Changes</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Receive alerts when there are changes to your class schedule.
                </p>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex items-center mb-3">
                  <BookOpen className="mr-2 text-green-500" size={18} />
                  <h4 className="font-medium">Assignment Reminders</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Get reminded about upcoming assignment deadlines.
                </p>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex items-center mb-3">
                  <User className="mr-2 text-amber-500" size={18} />
                  <h4 className="font-medium">Account Notifications</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Receive notifications about your account and security updates.
                </p>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default NotificationsPage;
