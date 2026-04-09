import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { GraduationCap, LogIn, Sparkles, Lock, User } from "lucide-react";
import heroImg from "@/assets/hero-education.png";

interface LoginFormProps {
  onLogin: () => void;
}

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!username.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      onLogin();
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden gradient-hero">
      {/* Animated neon orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-[15%] left-[10%] w-80 h-80 rounded-full blur-[100px] bg-primary/30"
          animate={{ scale: [1, 1.3, 1], x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[10%] right-[15%] w-96 h-96 rounded-full blur-[120px] bg-neon-cyan/20"
          animate={{ scale: [1.1, 1, 1.1], x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute top-[50%] right-[30%] w-64 h-64 rounded-full blur-[80px] bg-neon-pink/15"
          animate={{ scale: [1, 1.4, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute bottom-[40%] left-[30%] w-40 h-40 rounded-full blur-[60px] bg-neon-green/10"
          animate={{ y: [0, -40, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
      </div>

      {/* Grid lines overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(hsl(260 85% 65% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(260 85% 65% / 0.3) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-md">
        <motion.img
          src={heroImg}
          alt="Education illustration"
          width={160}
          height={160}
          initial={{ opacity: 0, y: -40, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="drop-shadow-2xl animate-float"
        />

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full"
        >
          <Card className="w-full glass-strong neon-border shadow-glow border-0">
            <CardHeader className="text-center space-y-3 pb-2">
              <motion.div
                className="mx-auto w-16 h-16 rounded-2xl gradient-primary shadow-glow flex items-center justify-center"
                whileHover={{ scale: 1.15, rotate: 10 }}
                whileTap={{ scale: 0.9, rotate: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <GraduationCap className="w-8 h-8 text-primary-foreground" />
              </motion.div>
              <CardTitle className="text-2xl font-heading tracking-tight text-glow">
                Student Grading System
              </CardTitle>
              <CardDescription className="flex items-center justify-center gap-1.5 text-muted-foreground">
                <Sparkles className="w-3.5 h-3.5 text-neon-cyan" /> Sign in to manage students
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-primary" /> Username
                  </Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin"
                    className="h-12 bg-secondary/50 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all placeholder:text-muted-foreground/40"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-primary" /> Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="h-12 bg-secondary/50 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all placeholder:text-muted-foreground/40"
                  />
                </div>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, x: -10, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    className="flex items-center gap-2 p-3 rounded-lg bg-destructive/15 border border-destructive/30"
                  >
                    <p className="text-sm text-destructive font-medium">{error}</p>
                  </motion.div>
                )}
                <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.02 }}>
                  <Button type="submit" className="w-full h-12 gap-2 gradient-primary text-primary-foreground shadow-glow hover:shadow-[0_0_40px_-5px_hsl(260_85%_65%/0.7)] transition-all duration-300 border-0 font-semibold text-base">
                    <LogIn className="w-5 h-5" /> Sign In
                  </Button>
                </motion.div>
                <p className="text-xs text-muted-foreground text-center pt-1 opacity-60">Default: admin / admin123</p>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
