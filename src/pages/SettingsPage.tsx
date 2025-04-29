
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  User, Bell, Shield, Settings, Mail,
  Smartphone, Lock, LogOut, CheckCircle
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const SettingsPage = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [profileImage, setProfileImage] = useState(user?.profileImage || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [attendanceThreshold, setAttendanceThreshold] = useState("75");
  
  if (!user) return null;

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      });
      return;
    }
    
    if (password.length < 8) {
      toast({
        title: "Error",
        description: "Password should be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Password Updated",
      description: "Your password has been changed successfully.",
    });
    
    setPassword("");
    setConfirmPassword("");
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notification Settings Saved",
      description: "Your notification preferences have been updated.",
    });
  };

  const handleSaveThresholds = () => {
    toast({
      title: "Attendance Threshold Updated",
      description: `Attendance threshold has been set to ${attendanceThreshold}%.`,
    });
  };

  // Render different settings based on user role
  const renderRoleSpecificSettings = () => {
    switch (user.role) {
      case "admin":
      case "hod":
      case "dean":
        return (
          <TabsContent value="system">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Attendance Thresholds</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="attendance-threshold">Required Attendance Percentage</Label>
                          <Select
                            defaultValue={attendanceThreshold}
                            onValueChange={setAttendanceThreshold}
                          >
                            <SelectTrigger className="form-input">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {["65", "70", "75", "80", "85", "90"].map((value) => (
                                <SelectItem key={value} value={value}>
                                  {value}%
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <p className="text-sm text-gray-500 mt-1">
                            Students below this threshold will receive attendance warnings
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch id="warning-threshold" defaultChecked />
                          <Label htmlFor="warning-threshold">Enable Low Attendance Warning at 80%</Label>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="consecutive-absences">Consecutive Absence Threshold</Label>
                          <Select defaultValue="3">
                            <SelectTrigger className="form-input">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {["2", "3", "4", "5"].map((value) => (
                                <SelectItem key={value} value={value}>
                                  {value} days
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <p className="text-sm text-gray-500 mt-1">
                            Alert will be sent after this many consecutive absences
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch id="auto-notifications" defaultChecked />
                          <Label htmlFor="auto-notifications">Send Automatic Notifications</Label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button className="blue-button" onClick={handleSaveThresholds}>
                        Save Threshold Settings
                      </Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Attendance Methods</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">QR Code Attendance</div>
                          <div className="text-sm text-gray-500">Allow students to mark attendance via QR code</div>
                        </div>
                        <Switch id="qr-attendance" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Biometric Attendance</div>
                          <div className="text-sm text-gray-500">Allow fingerprint/face recognition for attendance</div>
                        </div>
                        <Switch id="biometric-attendance" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Manual Roll Call</div>
                          <div className="text-sm text-gray-500">Allow teachers to manually mark attendance</div>
                        </div>
                        <Switch id="manual-attendance" defaultChecked />
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button className="blue-button">
                        Save Method Settings
                      </Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">API Integration</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Student Information System</div>
                          <div className="text-sm text-gray-500">Sync with SIS for student data</div>
                        </div>
                        <Switch id="sis-integration" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">LMS Integration</div>
                          <div className="text-sm text-gray-500">Connect with Learning Management System</div>
                        </div>
                        <Switch id="lms-integration" defaultChecked />
                      </div>
                      
                      <div className="p-4 border rounded-lg bg-blue-50">
                        <div className="font-medium mb-2">API Keys</div>
                        <div className="text-sm">
                          <p className="mb-2">API keys are available in the admin console. Do not share these keys.</p>
                          <Button variant="outline" size="sm">
                            Open Admin Console
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout userName={user.name} userRole={user.role}>
      <div className="mb-8">
        <h1 className="page-title">Settings</h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="profile">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-64">
            <TabsList className="flex flex-col w-full h-auto bg-transparent space-y-1">
              <TabsTrigger value="profile" className="justify-start px-3 h-9 text-left">
                <User size={16} className="mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="notifications" className="justify-start px-3 h-9 text-left">
                <Bell size={16} className="mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="security" className="justify-start px-3 h-9 text-left">
                <Shield size={16} className="mr-2" />
                Security
              </TabsTrigger>
              {["admin", "hod", "dean"].includes(user.role) && (
                <TabsTrigger value="system" className="justify-start px-3 h-9 text-left">
                  <Settings size={16} className="mr-2" />
                  System Settings
                </TabsTrigger>
              )}
            </TabsList>
          </div>
          
          <div className="flex-1">
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate}>
                    <div className="space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <Avatar className="w-24 h-24">
                          <AvatarImage src={profileImage || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        
                        <div>
                          <Button variant="outline" size="sm">
                            Change Avatar
                          </Button>
                          <p className="text-sm text-gray-500 mt-1">
                            JPG, GIF or PNG. Max size 2MB.
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" className="form-input" defaultValue={user.name} />
                        </div>
                        
                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <Input id="email" type="email" className="form-input" defaultValue={user.email} readOnly />
                          <p className="text-sm text-gray-500 mt-1">
                            Contact admin to change your email
                          </p>
                        </div>
                        
                        <div>
                          <Label htmlFor="role">Role</Label>
                          <Input id="role" className="form-input" defaultValue={user.role} readOnly />
                        </div>
                        
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" className="form-input" placeholder="Enter phone number" />
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button type="submit" className="blue-button">
                          Update Profile
                        </Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Notification Channels</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <div className="font-medium">Email Notifications</div>
                            <div className="text-sm text-gray-500">Receive notifications via email</div>
                          </div>
                          <Switch 
                            id="email-notifications" 
                            checked={emailNotifications} 
                            onCheckedChange={setEmailNotifications} 
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <div className="font-medium">SMS Notifications</div>
                            <div className="text-sm text-gray-500">Receive notifications via SMS</div>
                          </div>
                          <Switch 
                            id="sms-notifications" 
                            checked={smsNotifications} 
                            onCheckedChange={setSmsNotifications} 
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Notification Types</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <div className="font-medium">Attendance Alerts</div>
                            <div className="text-sm text-gray-500">Notifications about low attendance</div>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <div className="font-medium">Class Schedule Changes</div>
                            <div className="text-sm text-gray-500">Alerts when classes are rescheduled</div>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <div className="font-medium">Holidays & Events</div>
                            <div className="text-sm text-gray-500">Updates about upcoming holidays and events</div>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <div className="font-medium">System Updates</div>
                            <div className="text-sm text-gray-500">Information about portal maintenance and updates</div>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button className="blue-button" onClick={handleSaveNotifications}>
                        Save Notification Settings
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Change Password</h3>
                      <form onSubmit={handlePasswordChange}>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="current-password">Current Password</Label>
                            <Input id="current-password" type="password" className="form-input" />
                          </div>
                          
                          <div>
                            <Label htmlFor="new-password">New Password</Label>
                            <Input 
                              id="new-password" 
                              type="password" 
                              className="form-input" 
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="confirm-password">Confirm New Password</Label>
                            <Input 
                              id="confirm-password" 
                              type="password" 
                              className="form-input" 
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                          </div>
                          
                          <Button type="submit" className="blue-button">
                            <Lock size={16} className="mr-2" />
                            Change Password
                          </Button>
                        </div>
                      </form>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
                      <div className="p-4 border rounded-lg bg-blue-50 mb-6">
                        <div className="flex">
                          <div className="mr-3">
                            <CheckCircle className="text-green-500" size={20} />
                          </div>
                          <div>
                            <div className="font-medium">Two-Factor Authentication is enabled</div>
                            <p className="text-sm text-gray-600 mt-1">
                              Your account is protected with an extra layer of security.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <Label>Authentication Methods</Label>
                          <div className="space-y-2 mt-2">
                            <div className="flex items-center p-2 border rounded-md">
                              <Smartphone size={18} className="mr-2 text-gray-500" />
                              <span>Authenticator App</span>
                              <Badge variant="outline" className="ml-auto">Primary</Badge>
                            </div>
                            <div className="flex items-center p-2 border rounded-md">
                              <Mail size={18} className="mr-2 text-gray-500" />
                              <span>Email to {user.email.substring(0, 3)}*****{user.email.substring(user.email.indexOf('@'))}</span>
                              <Badge variant="outline" className="ml-auto">Secondary</Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between">
                          <Button variant="outline">
                            Manage 2FA Methods
                          </Button>
                          <Button variant="destructive" size="sm">
                            Disable 2FA
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Active Sessions</h3>
                      <div className="space-y-4">
                        <div className="p-3 border rounded-md">
                          <div className="flex justify-between">
                            <div>
                              <div className="font-medium">Current Session</div>
                              <div className="text-sm text-gray-500">Windows • Chrome • 192.168.1.1</div>
                            </div>
                            <Badge variant="secondary">Active Now</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button variant="destructive" onClick={logout}>
                          <LogOut size={16} className="mr-2" />
                          Log Out of All Devices
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {renderRoleSpecificSettings()}
          </div>
        </div>
      </Tabs>
    </DashboardLayout>
  );
};

export default SettingsPage;
