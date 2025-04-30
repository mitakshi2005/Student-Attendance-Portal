
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserRole } from "@/types";
import { Eye, EyeOff, LogIn } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      if (success) {
        navigate("/dashboard");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("An error occurred during login. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const demoAccounts = [
    { role: "Student", email: "rashidaga91@gmail.com", password: "student123"},
    { role: "Teacher", email: "rakesh.k@gbu.ac.in" , password : "teacher123"},
    { role: "Admin", email: "admin@university.edu", password: "admin123" },
    { role: "Parent", email: "archit@gmail.com", password : "parent123"},
    { role: "HOD", email: "hod@university.edu" , password : "hod123"},
    { role: "Dean", email: "dean@university.edu", password: "dean123" },
  ];

  const setDemoAccount = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-gradient-light">
      <div className="max-w-7xl w-full px-4 py-8 flex flex-col md:flex-row items-center justify-center gap-12">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-800 mb-4">
            Student Attendance Portal
          </h1>
          <p className="text-lg md:text-xl text-blue-600 mb-6">
            Track attendance, monitor progress, and stay connected with the campus.
          </p>
          <div className="hidden md:block">
            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-lg shadow-md border border-blue-100">
              <h2 className="text-xl font-semibold mb-4 text-blue-800">Features:</h2>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                  <span>Real-time attendance tracking</span>
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                  <span>Detailed analytics and reports</span>
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                  <span>Multi-factor authentication</span>
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                  <span>Role-based dashboards</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 max-w-md">
          <div className="auth-card animate-fade-in">
            <h2 className="text-2xl font-bold text-center text-blue-800 mb-8">Login</h2>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="auth-input"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="auth-input pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <div className="mt-1 text-right">
                  <Link to="/reset-password" className="text-sm text-blue-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full h-11 font-medium blue-button"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Logging in...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <LogIn size={18} className="mr-2" />
                    Login
                  </div>
                )}
              </Button>
            </form>
            
            <div className="mt-8">
              <p className="text-sm text-center text-gray-600 mb-4">Demo Accounts</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {demoAccounts.map((account) => (
                  <button
                    key={account.role}
                    onClick={() => setDemoAccount(account.email, account.password)}
                    className="text-xs px-2 py-1 border border-blue-200 rounded hover:bg-blue-50 transition-colors"
                  >
                    {account.role}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
