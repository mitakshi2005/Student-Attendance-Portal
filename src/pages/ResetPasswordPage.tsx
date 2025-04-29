
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft } from "lucide-react";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"email" | "otp" | "newPassword">("email");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmitEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Verification code sent",
        description: "Please check your email for the verification code",
      });
      setIsLoading(false);
      setStep("otp");
    }, 1500);
  };

  const handleSubmitOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Code verified",
        description: "Please set your new password",
      });
      setIsLoading(false);
      setStep("newPassword");
    }, 1500);
  };

  const handleSubmitNewPassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password || password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Password reset successful",
        description: "You can now login with your new password",
      });
      setIsLoading(false);
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-gradient-light">
      <div className="max-w-md w-full p-8">
        <div className="auth-card">
          <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800 mb-6">
            <ArrowLeft size={16} className="mr-2" />
            Back to login
          </Link>
          
          <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
            {step === "email" && "Reset Password"}
            {step === "otp" && "Verification Code"}
            {step === "newPassword" && "Create New Password"}
          </h2>
          
          {step === "email" && (
            <form onSubmit={handleSubmitEmail}>
              <p className="text-gray-600 mb-4 text-sm">
                Enter your email address and we'll send you a verification code to reset your password.
              </p>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="auth-input"
                  required
                />
              </div>
              
              <Button
                type="submit"
                className="w-full h-11 font-medium blue-button"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Sending code...
                  </div>
                ) : (
                  "Send Reset Code"
                )}
              </Button>
            </form>
          )}
          
          {step === "otp" && (
            <form onSubmit={handleSubmitOtp}>
              <p className="text-gray-600 mb-4 text-sm">
                We've sent a verification code to <strong>{email}</strong>. Please enter it below.
              </p>
              
              <div className="mb-6">
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                  Verification Code
                </label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="auth-input text-center text-lg tracking-widest"
                  maxLength={6}
                  required
                />
              </div>
              
              <Button
                type="submit"
                className="w-full h-11 font-medium blue-button"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Verifying...
                  </div>
                ) : (
                  "Verify Code"
                )}
              </Button>
              
              <div className="mt-4 text-center">
                <button 
                  type="button"
                  className="text-sm text-blue-600 hover:underline"
                  onClick={() => setStep("email")}
                >
                  Didn't receive a code? Resend
                </button>
              </div>
            </form>
          )}
          
          {step === "newPassword" && (
            <form onSubmit={handleSubmitNewPassword}>
              <p className="text-gray-600 mb-4 text-sm">
                Create a new password for your account. Make sure it's strong and secure.
              </p>
              
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="auth-input"
                  required
                  minLength={8}
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="auth-input"
                  required
                />
              </div>
              
              <Button
                type="submit"
                className="w-full h-11 font-medium blue-button"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Resetting password...
                  </div>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
