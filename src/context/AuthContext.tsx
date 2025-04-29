
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserRole } from "@/types";
import { useToast } from "@/components/ui/use-toast";

// Mock user data (in a real app this would come from a backend)
const MOCK_USERS = [
  { 
    id: "s1", 
    name: "John Smith", 
    email: "john@student.edu", 
    password: "student123", 
    role: "student" as UserRole,
    profileImage: "/placeholder.svg" 
  },
  { 
    id: "t1", 
    name: "Dr. Emily Johnson", 
    email: "emily@teacher.edu", 
    password: "teacher123", 
    role: "teacher" as UserRole 
  },
  { 
    id: "a1", 
    name: "Admin User", 
    email: "admin@university.edu", 
    password: "admin123", 
    role: "admin" as UserRole 
  },
  { 
    id: "p1", 
    name: "Robert Smith", 
    email: "parent@example.com", 
    password: "parent123", 
    role: "parent" as UserRole 
  },
  { 
    id: "h1", 
    name: "Dr. Maria Rodriguez", 
    email: "hod@university.edu", 
    password: "hod123", 
    role: "hod" as UserRole 
  },
  { 
    id: "d1", 
    name: "Dr. Thomas Wilson", 
    email: "dean@university.edu", 
    password: "dean123", 
    role: "dean" as UserRole 
  }
];

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const foundUser = MOCK_USERS.find(
        (u) => u.email === email && u.password === password
      );

      if (foundUser) {
        // Remove password before storing user
        const { password, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem("user", JSON.stringify(userWithoutPassword));
        
        toast({
          title: "Login successful",
          description: `Welcome back, ${foundUser.name}!`,
          variant: "default",
        });
        
        return true;
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
