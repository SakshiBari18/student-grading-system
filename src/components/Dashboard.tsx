import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Student } from "@/types/student";
import AddStudentForm from "./AddStudentForm";
import StudentTable from "./StudentTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, LogOut, Users, Award, TrendingUp, Sparkles, Zap } from "lucide-react";

interface Props {
  onLogout: () => void;
}

export default function Dashboard({ onLogout }: Props) {
  const [students, setStudents] = useState<Student[]>(() => {
  const saved = localStorage.getItem("students");
  return saved ? JSON.parse(saved) : [];
 });
 useEffect(() => {
  localStorage.setItem("students", JSON.stringify(students));
}, [students]);

  const addStudent = (student: Student) => setStudents((prev) => [...prev, student]);
  const removeStudent = (id: string) => setStudents((prev) => prev.filter((s) => s.id !== id));

  const totalAvg = students.length
    ? Math.round((students.reduce((a, s) => a + s.average, 0) / students.length) * 100) / 100
    : 0;
  const topGrade = students.filter((s) => s.grade === "A").length;

  const stats = [
    { icon: Users, label: "Total Students", value: students.length, gradient: "gradient-primary", shadow: "shadow-glow", neon: "neon-border" },
    { icon: TrendingUp, label: "Class Average", value: totalAvg, gradient: "gradient-neon", shadow: "shadow-neon-cyan", neon: "neon-border-cyan" },
    { icon: Award, label: "A-Grade Students", value: topGrade, gradient: "gradient-warm", shadow: "shadow-neon-pink", neon: "neon-border" },
  ];

  return (
    <div className="min-h-screen gradient-hero relative">
      {/* Animated background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[120px]"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 -left-40 w-[400px] h-[400px] bg-neon-cyan/6 rounded-full blur-[100px]"
          animate={{ x: [0, 20, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-20 right-1/3 w-[300px] h-[300px] bg-neon-pink/5 rounded-full blur-[80px]"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Grid overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(hsl(260 85% 65% / 0.4) 1px, transparent 1px), linear-gradient(90deg, hsl(260 85% 65% / 0.4) 1px, transparent 1px)',
        backgroundSize: '80px 80px'
      }} />

      {/* Header */}
      <motion.header
        className="sticky top-0 z-50 glass-strong"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-10 h-10 rounded-xl gradient-primary shadow-glow flex items-center justify-center"
              whileHover={{ scale: 1.15, rotate: 15 }}
              whileTap={{ scale: 0.85, rotate: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </motion.div>
            <div>
              <h1 className="text-lg font-heading font-bold tracking-tight text-glow">Grading System</h1>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Zap className="w-3 h-3 text-neon-cyan" /> Manage & Track
              </p>
            </div>
          </div>
          <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }}>
            <Button variant="outline" size="sm" onClick={onLogout} className="gap-2 border-destructive/30 hover:bg-destructive/15 hover:text-destructive hover:border-destructive/50 hover:shadow-[0_0_15px_-3px_hsl(0_75%_55%/0.3)] transition-all duration-300">
              <LogOut className="w-4 h-4" /> Logout
            </Button>

          </motion.div>
        </div>
      </motion.header>

      <main className="container py-8 space-y-8 relative z-10">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {stats.map(({ icon: Icon, label, value, gradient, shadow, neon }, idx) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.15, ease: "easeOut" }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              whileTap={{ scale: 0.97 }}
            >
              <Card className={`glass ${neon} hover:shadow-card-hover transition-all duration-500 border-0 overflow-hidden relative group cursor-default`}>
                <div className={`absolute inset-0 ${gradient} opacity-[0.04] group-hover:opacity-[0.1] transition-opacity duration-500`} />
                <div className={`absolute top-0 left-0 right-0 h-[2px] ${gradient}`} />
                <CardContent className="flex items-center gap-4 p-5 relative">
                  <motion.div
                    className={`w-13 h-13 rounded-xl ${gradient} ${shadow} flex items-center justify-center shrink-0`}
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </motion.div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">{label}</p>
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={value}
                        initial={{ opacity: 0, y: -10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.8 }}
                        className="text-3xl font-heading font-bold tracking-tight text-glow"
                      >
                        {value}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="lg:col-span-1">
            <AddStudentForm onAdd={addStudent} />
          </div>
          <div className="lg:col-span-2">
            <StudentTable students={students} onRemove={removeStudent} />
          </div>
        </motion.div>
      </main>
    </div>
  );
}