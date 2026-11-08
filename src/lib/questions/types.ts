// Compact format for extra questions: [question, right answer, wrong 1, wrong 2, wrong 3, difficulty].
// The right answer is written first here; answers are shuffled when a question is shown.
export type Row = [string, string, string, string, string, "e" | "m" | "h"];

export interface ExtraLesson {
  subject: string;
  /** Must match an existing lesson name in ai-content.ts exactly (the unit is looked up from it). */
  lesson: string;
  rows: Row[];
  /** For a NEW lesson that has no base questions yet: its unit and an id prefix (e.g. "fr-u1-l1"). */
  newLesson?: { unit: string; prefix: string };
}
