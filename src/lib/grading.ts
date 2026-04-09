import { Student } from "@/types/student";

export function assignGrade(average: number): string {
  if (average >= 90) return "A";
  if (average >= 75) return "B";
  if (average >= 60) return "C";
  return "D";
}

export function createStudent(
  name: string,
  subjects: { name: string; marks: number }[]
): Student {
  const total = subjects.reduce((sum, s) => sum + s.marks, 0);
  const average = Math.round((total / subjects.length) * 100) / 100;
  const grade = assignGrade(average);

  return {
    id: crypto.randomUUID(),
    name,
    subjects,
    average,
    grade,
  };
}