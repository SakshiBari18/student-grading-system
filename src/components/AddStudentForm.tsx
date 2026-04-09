import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, UserPlus, BookOpen } from "lucide-react";
import { createStudent } from "@/lib/grading";
import { Student } from "@/types/student";
import { toast } from "sonner";

interface Props {
  onAdd: (student: Student) => void;
}

export default function AddStudentForm({ onAdd }: Props) {
  const [name, setName] = useState("");
  const [subjects, setSubjects] = useState([{ name: "", marks: "" }]);

  const addSubjectRow = () => setSubjects([...subjects, { name: "", marks: "" }]);

  const removeSubjectRow = (i: number) => {
    if (subjects.length === 1) return;
    setSubjects(subjects.filter((_, idx) => idx !== i));
  };

  const updateSubject = (i: number, field: "name" | "marks", value: string) => {
    const updated = [...subjects];
    updated[i] = { ...updated[i], [field]: value };
    setSubjects(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter the student's name.");
      return;
    }
    const parsed = subjects.map((s) => {
      const marks = Number(s.marks);
      if (!s.name.trim()) return null;
      if (isNaN(marks) || marks < 0 || marks > 100) return null;
      return { name: s.name.trim(), marks };
    });
    if (parsed.some((s) => s === null) || parsed.length === 0) {
      toast.error("Please enter valid subject names and marks (0–100).");
      return;
    }
    const student = createStudent(name.trim(), parsed as { name: string; marks: number }[]);
    onAdd(student);
    setName("");
    setSubjects([{ name: "", marks: "" }]);
    toast.success(`${student.name} added with grade ${student.grade}`);
  };

  return (
    <Card className="glass neon-border shadow-card hover:shadow-card-hover transition-all duration-500 overflow-hidden relative border-0">
      <div className="absolute top-0 left-0 right-0 h-[2px] gradient-primary" />
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2.5 text-lg font-heading">
          <motion.div
            className="w-9 h-9 rounded-xl gradient-primary shadow-glow flex items-center justify-center"
            whileHover={{ rotate: 15, scale: 1.15 }}
            whileTap={{ scale: 0.85, rotate: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <UserPlus className="w-4.5 h-4.5 text-primary-foreground" />
          </motion.div>
          <span className="text-glow">Add Student</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-neon-cyan" /> Student Name
            </Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="h-11 bg-secondary/40 border-border/40 focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all placeholder:text-muted-foreground/30"
            />
          </div>
          <div className="space-y-3">
            <Label className="text-sm font-medium">Subjects & Marks</Label>
            {subjects.map((s, i) => (
              <motion.div
                key={i}
                className="flex gap-2 items-center group"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
              >
                <Input
                  className="flex-1 h-11 bg-secondary/40 border-border/40 focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/20 transition-all placeholder:text-muted-foreground/30"
                  placeholder="Subject"
                  value={s.name}
                  onChange={(e) => updateSubject(i, "name", e.target.value)}
                />
                <Input
                  className="w-24 h-11 bg-secondary/40 border-border/40 focus:border-neon-orange focus:ring-2 focus:ring-neon-orange/20 transition-all placeholder:text-muted-foreground/30"
                  placeholder="Marks"
                  type="number"
                  min={0}
                  max={100}
                  value={s.marks}
                  onChange={(e) => updateSubject(i, "marks", e.target.value)}
                />
                <motion.div whileTap={{ scale: 0.7, rotate: -20 }}>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeSubjectRow(i)}
                    disabled={subjects.length === 1}
                    className="opacity-40 group-hover:opacity-100 transition-all hover:bg-destructive/15 hover:text-destructive hover:shadow-[0_0_10px_-3px_hsl(0_75%_55%/0.3)]"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </motion.div>
              </motion.div>
            ))}
            <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.02 }}>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-1.5 border-dashed border-neon-cyan/30 text-neon-cyan hover:border-neon-cyan/60 hover:bg-neon-cyan/10 transition-all"
                onClick={addSubjectRow}
              >
                <Plus className="w-3.5 h-3.5" /> Add Subject
              </Button>
            </motion.div>
          </div>
          <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.02 }}>
            <Button
              type="submit"
              className="w-full h-12 gap-2 gradient-primary text-primary-foreground shadow-glow hover:shadow-[0_0_40px_-5px_hsl(260_85%_65%/0.7)] transition-all duration-300 border-0 font-semibold text-base"
            >
              <UserPlus className="w-5 h-5" /> Add Student
            </Button>
          </motion.div>
        </form>
      </CardContent>
    </Card>
  );
}
