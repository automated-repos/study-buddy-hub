/** A table in the study material (headers = first row). */
export interface StudyTable {
  title: string;
  headers: string[];
  rows: string[][];
}

/** A mind-map point: plain text, or a point with its own sub-details. */
export type MapItem = string | { label: string; sub: string[] };

export interface MapBranch {
  label: string;
  items: MapItem[];
}

/** Study material for one lesson: tables, mind map and essay questions. */
export interface LessonStudy {
  subject: string;
  /** Must match a lesson name in ai-content.ts exactly. */
  lesson: string;
  /** One or more tables (comparisons, timelines, rules, worked examples). */
  tables: StudyTable[];
  /** Mind map branches around the lesson name (up to three levels deep). */
  map: MapBranch[];
  /** Essay questions: [question, model answer]. */
  essays: [string, string][];
}
