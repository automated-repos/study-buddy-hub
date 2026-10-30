# AI Content Plan — `src/lib/ai-content.ts` Complete Rewrite

## Goal
Rewrite `src/lib/ai-content.ts` with:
1. `lesson` field on both interfaces
2. ~5 questions per lesson for all 5 subjects (Egyptian 3rd-year secondary 2025-2026)
3. Summaries per lesson/unit
4. Multi-context query functions

---

## Interfaces (final)

```typescript
export interface AIQuestion {
  id: string;           // e.g. "en-u1-l1-01"
  subject: string;      // "إنجليزي" | "إحصاء" | "عربي" | "تاريخ" | "جغرافيا"
  unit: string;         // unit/chapter name in Arabic
  lesson: string;       // specific lesson within unit
  q: string;
  options: string[];
  correct: number;      // 0-3
  difficulty: "easy" | "medium" | "hard";
}

export interface AISummary {
  subject: string;
  unit: string;
  lesson: string;
  title: string;
  summary: string;
  keyPoints: string[];
}
```

---

## Query Functions (final)

```typescript
export function getQuestionsForLesson(subject: string, unit: string, lesson: string, count = 5): AIQuestion[]
export function getQuestionsForUnit(subject: string, unit: string, count = 10): AIQuestion[]
export function getQuestionsForSubject(subject: string, count = 20): AIQuestion[]
export function getRandomQuestions(count = 10, subjects?: string[]): AIQuestion[]
export function getQuestionsFor(subjectName: string, unit?: string, count = 5): AIQuestion[]  // backward compat
export function getSummariesFor(subject: string): AISummary[]
export function getSummariesForUnit(subject: string, unit: string): AISummary[]
```

---

## Book Structure & Content Plan

### 1. إنجليزي (English) — 6 Units × 4 Lessons = 24 lessons

**Unit 1: Health** (`الوحدة الأولى: الصحة`)
- L1: My Day in Hospital — vocabulary, hospital settings, past narrative
- L2: Emergency Call — phone conversations, emergency vocab, imperative
- L3: Tired Hands / Grammar — Past Perfect Simple & Continuous (had done / had been doing)
- L4: Beyond the White Coat — reading comprehension, medical professions, career text

**Unit 2: The Environment** (`الوحدة الثانية: البيئة`)
- L1: Our Fragile Planet — environmental issues vocab
- L2: Climate Change — cause/effect language, passive voice
- L3: Grammar — Modal verbs for advice/obligation (should/must/ought to)
- L4: Green Heroes — reading: environmental activists

**Unit 3: Science & Technology** (`الوحدة الثالثة: العلوم والتكنولوجيا`)
- L1: The Digital Age — technology vocabulary
- L2: AI and the Future — advantages/disadvantages essay language
- L3: Grammar — Conditionals (2nd & 3rd conditional)
- L4: Space Exploration — reading: scientific achievements

**Unit 4: Education** (`الوحدة الرابعة: التعليم`)
- L1: Learning Styles — different approaches to learning
- L2: The Global Classroom — education systems worldwide
- L3: Grammar — Reported Speech (statements, questions, commands)
- L4: Bright Minds — reading: famous scholars

**Unit 5: Work & Business** (`الوحدة الخامسة: العمل والأعمال`)
- L1: The Job Market — job vocabulary, CV writing
- L2: Entrepreneurship — business concepts, startup culture
- L3: Grammar — Relative Clauses (defining & non-defining)
- L4: Success Stories — reading: entrepreneurs and business leaders

**Unit 6: Culture & Civilization** (`الوحدة السادسة: الثقافة والحضارة`)
- L1: Egyptian Heritage — ancient civilization vocabulary
- L2: World Cultures — cultural diversity, customs and traditions
- L3: Grammar — Passive Voice (various tenses)
- L4: Crossroads of Civilizations — reading: Egypt's cultural role

**English Questions to write: ~120 questions (5 per lesson)**
Pattern for ID: `en-u{unit}-l{lesson}-{nn}` e.g. `en-u1-l1-01`

---

### 2. إحصاء (Statistics) — 5 Units

**Unit 1: الارتباط (Correlation)** — 3 lessons
- L1: مفهوم الارتباط — definition, types, scatter diagrams
- L2: معامل ارتباط بيرسون — Pearson formula, calculation
- L3: معامل ارتباط سبيرمان — Spearman rank correlation

**Unit 2: الانحدار (Regression)** — 2 lessons
- L1: خط الانحدار البسيط — regression line equation y = a + bx
- L2: التنبؤ بالانحدار — using regression for prediction

**Unit 3: السلاسل الزمنية (Time Series)** — 3 lessons
- L1: مكونات السلسلة الزمنية — trend, seasonal, cyclical, irregular
- L2: المتوسطات المتحركة — moving averages method
- L3: طريقة المربعات الصغرى — least squares method for trend

**Unit 4: الاحتمال (Probability)** — 3 lessons
- L1: مفاهيم أساسية في الاحتمال — sample space, events, axioms
- L2: قواعد الاحتمال — addition rule, multiplication rule, conditional probability
- L3: نظرية بايز — Bayes' theorem

**Unit 5: المتغير العشوائي والتوزيع الطبيعي** — 2 lessons
- L1: المتغير العشوائي المنفصل — discrete random variable, expected value, variance
- L2: التوزيع الطبيعي — normal distribution, Z-score, standard normal table

**Statistics Questions: ~65 questions (5 per lesson)**
Pattern for ID: `st-u{unit}-l{lesson}-{nn}` e.g. `st-u1-l1-01`

---

### 3. عربي (Arabic) — 3 sections

**القراءة (Reading) — 5 texts**
- T1: نص 1 (علمي/اجتماعي)
- T2: نص 2
- T3: نص 3
- T4: نص 4
- T5: نص 5

**الأدب (Literature) — 8 sections**
- S1: مدرسة الإحياء والبعث — Neo-Classical poetry school (Shawqi, Hafez)
- S2: مدرسة الديوان — Diwan school (Abbas, Mazni, Shukri)
- S3: مدرسة أبوللو — Apollo school (Abu Shadi)
- S4: الشعر الحر (التفعيلة) — Free verse poetry
- S5: الشعر السياسي — Political poetry
- S6: القصة القصيرة — Short story
- S7: الرواية — Novel
- S8: المقالة والمسرحية — Essay & Drama

**النحو والصرف (Grammar) — 7 units**
- G1: المبتدأ والخبر — Subject and predicate
- G2: الفعل وأنواعه — Verb types and conjugation
- G3: المفعول به والمفعول المطلق — Direct object and cognate accusative
- G4: الحال والتمييز — Circumstantial and discriminative nouns
- G5: الأساليب — Rhetorical structures (استثناء، نداء، اشتغال)
- G6: الإعلال والإبدال — Morphological changes
- G7: البلاغة — Rhetoric (تشبيه، استعارة، كناية)

**Arabic Questions: ~100 questions**
Pattern for ID: `ar-rd{n}-{nn}` (reading), `ar-lit{n}-{nn}` (lit), `ar-gr{n}-{nn}` (grammar)

---

### 4. تاريخ (History) — 8 Chapters

- Ch1: الحملة الفرنسية (1798-1801) — French Expedition
- Ch2: عصر محمد علي (1805-1848) — Muhammad Ali era, modernization
- Ch3: من الخديو إسماعيل إلى الثورة العرابية (1863-1882) — Khedive Ismail, Urabi Revolution
- Ch4: الاحتلال البريطاني والمقاومة (1882-1919) — British occupation, national resistance
- Ch5: ثورة 1919 وما بعدها — 1919 Revolution, Wafd party, partial independence
- Ch6: مصر بين الحربين (1919-1952) — Egypt between the two wars
- Ch7: ثورة يوليو 1952 — July 1952 Revolution, Republic, Nasser era
- Ch8: مصر المعاصرة — Sadat era, infitah, Jan 25, June 30 revolutions

**History Questions: ~40 questions (5 per chapter)**
Pattern for ID: `hi-ch{n}-{nn}` e.g. `hi-ch1-01`

---

### 5. جغرافيا (Geography) — Intro + 4 Units

**مقدمة: الخريطة السياسية** (Intro)
- The political map of the world, states and their characteristics

**Unit 1: مفهوم الدولة والحدود** — 2 lessons
- L1: مقومات الدولة — elements of a state (territory, people, government, sovereignty)
- L2: الحدود السياسية — types and significance of political borders

**Unit 2: التكتلات الاقتصادية** — 3 lessons
- L1: مفهوم التكتل الاقتصادي — economic blocs, WTO, regional blocs
- L2: الاتحاد الأوروبي — European Union
- L3: التكتلات الإقليمية الأخرى — ASEAN, AU, Arab League, NAFTA

**Unit 3: العلاقات الدولية** — 3 lessons
- L1: طبيعة العلاقات الدولية — international relations principles
- L2: منظمة الأمم المتحدة — United Nations, Security Council, General Assembly
- L3: السياسة الخارجية — foreign policy determinants and tools

**Unit 4: مصر والعلاقات الدولية** — 3 lessons
- L1: مكانة مصر الاستراتيجية — Egypt's strategic position
- L2: علاقات مصر الإقليمية — Egypt's regional relations (Arab, African)
- L3: علاقات مصر الدولية — Egypt's global relations (EU, US, China)

**Geography Questions: ~65 questions (5 per lesson)**
Pattern for ID: `ge-u{unit}-l{lesson}-{nn}` e.g. `ge-u1-l1-01`

---

## Writing Instructions for Future Session

1. **Start with interfaces** (AIQuestion + AISummary with lesson field)
2. **Write ALL_QUESTIONS array** — English first (120q), then Stats (65q), Arabic (100q), History (40q), Geography (65q)
3. **Write ALL_SUMMARIES array** — one entry per lesson/section
4. **Write query functions** at the bottom
5. **Export everything**

### ID Convention
- English: `en-u1-l1-01` through `en-u6-l4-05`
- Statistics: `st-u1-l1-01` through `st-u5-l2-05`
- Arabic Reading: `ar-r1-01` through `ar-r5-05`
- Arabic Literature: `ar-lit1-01` through `ar-lit8-05`
- Arabic Grammar: `ar-gr1-01` through `ar-gr7-05`
- History: `hi-ch1-01` through `hi-ch8-05`
- Geography: `ge-u0-01` (intro), `ge-u1-l1-01` through `ge-u4-l3-05`

### Difficulty Distribution per lesson
- 2 easy, 2 medium, 1 hard

### File Location
`/var/www/laravel/study-buddy-hub/src/lib/ai-content.ts`

### student.tsx already updated
- Imports `getQuestionsFor`, `getSummariesFor`, `AIQuestion` from `ai-content.ts`
- Has SummariesView and QuizView already wired
- Only needs the data file to have real content

### After writing ai-content.ts, also update student.tsx QuizView
Add mode selector: lesson quiz / unit test / subject exam
Use `getQuestionsForLesson`, `getQuestionsForUnit`, `getQuestionsForSubject`

---

## Sample Questions (to establish pattern)

```typescript
// English
{ id: "en-u1-l1-01", subject: "إنجليزي", unit: "الوحدة الأولى: الصحة", lesson: "My Day in Hospital", q: "What does 'ward' mean in a hospital context?", options: ["A large room with many beds", "A doctor's office", "An operating room", "A pharmacy"], correct: 0, difficulty: "easy" },

// Statistics  
{ id: "st-u1-l1-01", subject: "إحصاء", unit: "الارتباط", lesson: "مفهوم الارتباط", q: "إذا كان معامل الارتباط r = +0.9 فإن الارتباط بين المتغيرين:", options: ["قوي موجب", "ضعيف موجب", "قوي سالب", "معدوم"], correct: 0, difficulty: "easy" },

// Arabic
{ id: "ar-gr1-01", subject: "عربي", unit: "النحو والصرف", lesson: "المبتدأ والخبر", q: "في جملة (المعلمُ مجتهدٌ)، كلمة (مجتهدٌ):", options: ["خبر مرفوع", "مبتدأ مرفوع", "فاعل مرفوع", "نعت"], correct: 0, difficulty: "easy" },

// History
{ id: "hi-ch1-01", subject: "تاريخ", unit: "الحملة الفرنسية", lesson: "الحملة الفرنسية 1798-1801", q: "في أي سنة وصلت الحملة الفرنسية إلى مصر؟", options: ["1798", "1800", "1801", "1805"], correct: 0, difficulty: "easy" },

// Geography
{ id: "ge-u1-l1-01", subject: "جغرافيا", unit: "مفهوم الدولة والحدود", lesson: "مقومات الدولة", q: "أي من التالي ليس من مقومات الدولة الحديثة؟", options: ["الثروة الطبيعية", "الإقليم", "الشعب", "السيادة"], correct: 0, difficulty: "easy" },
```

---

## Status
- [ ] `src/lib/ai-content.ts` — NEEDS COMPLETE REWRITE (this plan)
- [x] `src/routes/student.tsx` — already updated with new imports and SummariesView
- [x] `src/lib/quiz-bank.ts` — no longer imported (deprecated)
