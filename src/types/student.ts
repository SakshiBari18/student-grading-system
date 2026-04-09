export interface Student {
  id: string;
  name: string;
  subjects: { name: string; marks: number }[];
  average: number;
  grade: string;
}

export type Grade = "A" | "B" | "C" | "D";
