import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Student } from "@/types/student";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Trash2, Users, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import emptyImg from "@/assets/empty-state.png";

interface Props {
  students: Student[];
  onRemove: (id: string) => void;
}

const gradeConfig: Record<string, { bg: string; glow: string; ring: string }> = {
  A: { bg: "bg-grade-a", glow: "shadow-[0_0_16px_hsl(160_75%_45%/0.5)]", ring: "ring-1 ring-grade-a/30" },
  B: { bg: "bg-grade-b", glow: "shadow-[0_0_16px_hsl(210_85%_58%/0.5)]", ring: "ring-1 ring-grade-b/30" },
  C: { bg: "bg-grade-c", glow: "shadow-[0_0_16px_hsl(38_95%_55%/0.4)]", ring: "ring-1 ring-grade-c/30" },
  D: { bg: "bg-grade-d", glow: "shadow-[0_0_16px_hsl(0_75%_55%/0.4)]", ring: "ring-1 ring-grade-d/30" },
};

const progressColor: Record<string, string> = {
  A: "[&>div]:bg-grade-a",
  B: "[&>div]:bg-grade-b",
  C: "[&>div]:bg-grade-c",
  D: "[&>div]:bg-grade-d",
};

export default function StudentTable({ students, onRemove }: Props) {
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);

  const confirmRemove = () => {
    if (studentToDelete) {
      onRemove(studentToDelete.id);
      toast.info(`${studentToDelete.name} removed.`);
      setStudentToDelete(null);
    }
  };

  return (
    <>
      <Card className="glass neon-border-cyan shadow-card hover:shadow-card-hover transition-all duration-500 overflow-hidden relative border-0">
        <div className="absolute top-0 left-0 right-0 h-[2px] gradient-neon" />
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2.5 text-lg font-heading">
            <motion.div
              className="w-9 h-9 rounded-xl gradient-accent shadow-neon-cyan flex items-center justify-center"
              whileHover={{ rotate: -15, scale: 1.15 }}
              whileTap={{ scale: 0.85 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Users className="w-4.5 h-4.5 text-primary-foreground" />
            </motion.div>
            <span className="text-glow-cyan">Student Records</span>
            <AnimatePresence mode="wait">
              <motion.div
                key={students.length}
                initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.5, opacity: 0, rotate: 10 }}
                className="ml-auto"
              >
                <Badge className="text-xs font-medium bg-primary/15 text-primary border border-primary/25 hover:bg-primary/25">
                  {students.length} students
                </Badge>
              </motion.div>
            </AnimatePresence>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {students.length === 0 ? (
            <motion.div
              className="text-center py-10 space-y-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.img
                src={emptyImg}
                alt="No students"
                width={150}
                height={150}
                className="mx-auto drop-shadow-lg opacity-80"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <div>
                <p className="text-muted-foreground font-medium">No students added yet</p>
                <p className="text-sm text-muted-foreground/50">Add your first student to get started</p>
              </div>
            </motion.div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-border/30 bg-secondary/20">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary/40 hover:bg-secondary/40 border-b border-border/30">
                    <TableHead className="font-heading font-semibold text-muted-foreground">Name</TableHead>
                    <TableHead className="font-heading font-semibold text-muted-foreground">Subjects</TableHead>
                    <TableHead className="font-heading font-semibold text-muted-foreground text-center">Progress</TableHead>
                    <TableHead className="font-heading font-semibold text-muted-foreground text-center">Average</TableHead>
                    <TableHead className="font-heading font-semibold text-muted-foreground text-center">Grade</TableHead>
                    <TableHead className="font-heading font-semibold text-muted-foreground text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {students.map((s, idx) => {
                      const grade = gradeConfig[s.grade] || gradeConfig.D;
                      return (
                        <motion.tr
                          key={s.id}
                          initial={{ opacity: 0, x: -25 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 30, height: 0 }}
                          transition={{ duration: 0.35, delay: idx * 0.06 }}
                          className="group border-b border-border/20 transition-all duration-300 hover:bg-primary/5"
                        >
                          <TableCell className="font-medium">{s.name}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1.5">
                              {s.subjects.map((sub, i) => (
                                <motion.span
                                  key={i}
                                  className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-secondary/60 text-muted-foreground border border-border/30"
                                  initial={{ opacity: 0, scale: 0.7 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: i * 0.05 }}
                                  whileHover={{ scale: 1.08, backgroundColor: "hsl(260 85% 65% / 0.1)" }}
                                >
                                  {sub.name}: <span className="font-bold text-foreground">{sub.marks}</span>
                                </motion.span>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="w-28 mx-auto">
                              <Progress value={s.average} className={`h-2.5 bg-secondary/50 rounded-full ${progressColor[s.grade] || ""}`} />
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <span className="font-bold text-lg font-heading">{s.average}</span>
                          </TableCell>
                          <TableCell className="text-center">
                            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.85 }}>
                              <Badge className={`${grade.bg} ${grade.glow} ${grade.ring} text-primary-foreground font-bold text-sm px-3.5 py-1 border-0`}>
                                {s.grade}
                              </Badge>
                            </motion.div>
                          </TableCell>
                          <TableCell className="text-right">
                            <motion.div whileTap={{ scale: 0.7, rotate: -20 }} whileHover={{ scale: 1.1 }}>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setStudentToDelete(s)}
                                className="opacity-40 group-hover:opacity-100 transition-all hover:bg-destructive/15 hover:text-destructive hover:shadow-[0_0_12px_-3px_hsl(0_75%_55%/0.3)]"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </motion.div>
                          </TableCell>
                        </motion.tr>
                      );
                    })}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={!!studentToDelete} onOpenChange={(open) => !open && setStudentToDelete(null)}>
        <AlertDialogContent className="glass-strong neon-border shadow-glow border-0">
          <AlertDialogHeader>
            <div className="flex items-center gap-3">
              <motion.div
                className="w-10 h-10 rounded-xl bg-destructive/15 flex items-center justify-center"
                initial={{ scale: 0.5, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </motion.div>
              <AlertDialogTitle className="font-heading text-lg">Delete Student</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="pl-[52px]">
              Are you sure you want to remove <strong className="text-foreground">{studentToDelete?.name}</strong>? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-secondary/50 border-border/40 hover:bg-secondary/80">Cancel</AlertDialogCancel>
            <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }}>
              <AlertDialogAction
                onClick={confirmRemove}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:shadow-[0_0_20px_-3px_hsl(0_75%_55%/0.4)] border-0 transition-all duration-300"
              >
                Delete
              </AlertDialogAction>
            </motion.div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
