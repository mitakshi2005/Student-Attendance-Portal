
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";

// Pages
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import AttendancePage from "@/pages/AttendancePage";
import ReportsPage from "@/pages/ReportsPage";
import SettingsPage from "@/pages/SettingsPage";
import ClassesPage from "@/pages/ClassesPage";
import UsersPage from "@/pages/UsersPage";
import TimetablePage from "@/pages/TimetablePage";
import NotificationsPage from "@/pages/NotificationsPage";
import ResetPasswordPage from "@/pages/ResetPasswordPage";
import NotFound from "@/pages/NotFound";

// Protected route component
import ProtectedRoute from "@/components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            
            {/* Protected routes */}
            <Route 
              path="/dashboard" 
              element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} 
            />
            <Route 
              path="/attendance" 
              element={<ProtectedRoute><AttendancePage /></ProtectedRoute>} 
            />
            <Route 
              path="/reports" 
              element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} 
            />
            <Route 
              path="/settings" 
              element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} 
            />
            <Route 
              path="/classes" 
              element={<ProtectedRoute><ClassesPage /></ProtectedRoute>} 
            />
            <Route 
              path="/users" 
              element={<ProtectedRoute><UsersPage /></ProtectedRoute>} 
            />
            <Route 
              path="/timetable" 
              element={<ProtectedRoute><TimetablePage /></ProtectedRoute>} 
            />
            <Route 
              path="/notifications" 
              element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} 
            />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
