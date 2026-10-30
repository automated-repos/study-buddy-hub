/** Study material for one lesson: comparison table, mind map and essay questions. */
export interface LessonStudy {
  subject: string;
  /** Must match a lesson name in ai-content.ts exactly. */
  lesson: string;
  /** Comparison / summary table. First row of `rows` is NOT a header; `headers` holds the header row. */
  table: { title: string; headers: string[]; rows: string[][] };
  /** Mind map branches around the lesson name. */
  map: { label: string; items: string[] }[];
  /** Essay questions: [question, model answer]. */
  essays: [string, string][];
}
