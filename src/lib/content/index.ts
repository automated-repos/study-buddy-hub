import { ALL_SUMMARIES } from "../ai-content";
import type { CustomSummaryRow } from "../store";
import type { LessonStudy } from "./types";
import { STUDY_EN } from "./en";
import { STUDY_ST } from "./st";
import { STUDY_AR } from "./ar";
import { STUDY_HI } from "./hi";
import { STUDY_GEO } from "./geo";

export type { LessonStudy } from "./types";

const BUILT_IN: LessonStudy[] = [...STUDY_EN, ...STUDY_ST, ...STUDY_AR, ...STUDY_HI, ...STUDY_GEO];

/** Everything shown for a lesson in the summaries tab and essay practice. */
export interface LessonMaterial extends LessonStudy {
  title: string;
  summary: string;
  keyPoints: string[];
  /** true when the supervisor has edited this lesson */
  edited: boolean;
}

/** Fields the supervisor can override (stored as JSON in custom_summaries.data). */
export type MaterialEdit = Partial<
  Pick<LessonMaterial, "summary" | "keyPoints" | "table" | "map" | "essays">
>;

export function builtInMaterial(subject: string, lesson: string): LessonMaterial {
  const study = BUILT_IN.find((s) => s.subject === subject && s.lesson === lesson);
  const sum = ALL_SUMMARIES.find((s) => s.subject === subject && s.lesson === lesson);
  return {
    subject,
    lesson,
    title: sum?.title ?? lesson,
    summary: sum?.summary ?? "",
    keyPoints: sum?.keyPoints ?? [],
    table: study?.table ?? { title: "", headers: [], rows: [] },
    map: study?.map ?? [],
    essays: study?.essays ?? [],
    edited: false,
  };
}

export function materialFor(
  subject: string,
  lesson: string,
  overrides: CustomSummaryRow[],
): LessonMaterial {
  const base = builtInMaterial(subject, lesson);
  const row = overrides.find((o) => o.subject === subject && o.lesson === lesson);
  if (!row || typeof row.data !== "object" || row.data === null) return base;
  return { ...base, ...(row.data as MaterialEdit), edited: true };
}

/** Lessons that have built-in study material (used by tests to validate coverage). */
export function lessonsWithStudy() {
  return BUILT_IN.map((s) => `${s.subject}|${s.lesson}`);
}
