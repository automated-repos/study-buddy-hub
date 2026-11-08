import type { ExtraLesson } from "./questions/types";
import { EXTRA_EN } from "./questions/en";
import { EXTRA_AR } from "./questions/ar";
import { EXTRA_HI } from "./questions/hi";
import { EXTRA_GEO } from "./questions/geo";
import { EXTRA_EN_2 } from "./questions/en2";
import { EXTRA_ST_ALL } from "./questions/st2";
import { EXTRA_AR_2 } from "./questions/ar2";
import { EXTRA_HI_2 } from "./questions/hi2";
import { EXTRA_GEO_2 } from "./questions/geo2";
import { EXTRA_FR, SUMMARIES_FR } from "./questions/fr";
import { SUMMARIES_HI } from "./questions/hi-summaries";
import { SUMMARIES_GEO } from "./questions/geo-summaries";
import { SUMMARIES_ST } from "./questions/st-summaries";
import { SUMMARIES_EN } from "./questions/en-summaries";

// Comprehensive tagged question bank — Egyptian 3rd-year secondary 2025-2026
// Each question carries subject/unit/lesson tags so it can be reused across:
// lesson quiz → unit test → subject exam → random review → competition

export interface AIQuestion {
  id: string;
  subject: string; // "إنجليزي" | "إحصاء" | "عربي" | "تاريخ" | "جغرافيا"
  unit: string;
  lesson: string;
  q: string;
  options: string[];
  correct: number; // 0-3
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

// ─────────────────────────────────────────────────────────────────────────────
// QUESTIONS
// ─────────────────────────────────────────────────────────────────────────────

const BASE_QUESTIONS: AIQuestion[] = [
  // English questions live in ./questions/en.ts and en2.ts (2026-27 curriculum).
  // Statistics questions live in ./questions/st.ts and st2.ts (2026-27 curriculum).

  // ═══════════════════════════════════════════════════════
  // عربي (Arabic)
  // ═══════════════════════════════════════════════════════

  { id: "ar-r1-01", subject: "عربي", unit: "القراءة والفهم", lesson: "مهارات القراءة", q: "الفكرة الرئيسية للنص هي:", options: ["الفكرة التي يدور حولها النص كله", "جملة من الفقرة الأولى فقط", "أفكار فرعية متعددة", "استنتاجات الكاتب الشخصية"], correct: 0, difficulty: "easy" },
  { id: "ar-r1-02", subject: "عربي", unit: "القراءة والفهم", lesson: "مهارات القراءة", q: "الأسلوب التفسيري يهدف إلى:", options: ["شرح الأفكار وتوضيحها بالأمثلة", "الإقناع بالحجج والأدلة", "وصف المشاعر والأحاسيس", "سرد الأحداث التاريخية"], correct: 0, difficulty: "easy" },
  { id: "ar-r1-03", subject: "عربي", unit: "القراءة والفهم", lesson: "مهارات القراءة", q: "المعنى السياقي للكلمة يُستنتج من:", options: ["السياق والجملة المحيطة", "القاموس فقط", "وزن الكلمة الصرفي", "جذرها اللغوي"], correct: 0, difficulty: "medium" },
  { id: "ar-r1-04", subject: "عربي", unit: "القراءة والفهم", lesson: "مهارات القراءة", q: "الأسلوب الحجاجي يعتمد على:", options: ["تقديم الأدلة والبراهين لإقناع القارئ", "سرد الأحداث بترتيب زمني", "وصف المشاهد بدقة", "عرض الآراء دون دليل"], correct: 0, difficulty: "medium" },
  { id: "ar-r1-05", subject: "عربي", unit: "القراءة والفهم", lesson: "مهارات القراءة", q: "التضاد اللفظي (الطباق) يُستخدم لـ:", options: ["إبراز المعنى بتقابل الأضداد", "تزيين النص فقط", "إطالة العبارة", "توضيح التعريفات"], correct: 0, difficulty: "hard" },

  // أدب: مدرسة الإحياء
  { id: "ar-lit1-01", subject: "عربي", unit: "الأدب", lesson: "مدرسة الإحياء والبعث", q: "أبرز رواد مدرسة الإحياء والبعث:", options: ["أحمد شوقي وحافظ إبراهيم", "العقاد والمازني وشكري", "أبو شادي ومحمود حسن إسماعيل", "السياب وصلاح عبد الصبور"], correct: 0, difficulty: "easy" },
  { id: "ar-lit1-02", subject: "عربي", unit: "الأدب", lesson: "مدرسة الإحياء والبعث", q: "مدرسة الإحياء تتميز بـ:", options: ["المحافظة على الأوزان والقوافي التقليدية", "التحرر من الوزن والقافية", "الاهتمام بالذات والوجدان فقط", "الشعر المرسل"], correct: 0, difficulty: "easy" },
  { id: "ar-lit1-03", subject: "عربي", unit: "الأدب", lesson: "مدرسة الإحياء والبعث", q: "لُقِّب أحمد شوقي بـ:", options: ["أمير الشعراء", "شاعر النيل", "عبقري العربية", "شاعر الحرية"], correct: 0, difficulty: "easy" },
  { id: "ar-lit1-04", subject: "عربي", unit: "الأدب", lesson: "مدرسة الإحياء والبعث", q: "الموضوعات الرئيسية في شعر الإحياء:", options: ["الوطنية والتاريخ الإسلامي والمناسبات الرسمية", "الحب الرومانسي والطبيعة فقط", "الحزن والاغتراب", "الشعر الاجتماعي الساخر"], correct: 0, difficulty: "medium" },
  { id: "ar-lit1-05", subject: "عربي", unit: "الأدب", lesson: "مدرسة الإحياء والبعث", q: "النقاد يأخذون على مدرسة الإحياء:", options: ["اهتمامها بالشكل على حساب التجديد", "إهمالها التراث العربي", "تأثرها الزائد بالغرب", "استخدامها العامية"], correct: 0, difficulty: "hard" },

  // أدب: الديوان
  { id: "ar-lit2-01", subject: "عربي", unit: "الأدب", lesson: "مدرسة الديوان", q: "مدرسة الديوان تضم:", options: ["العقاد والمازني وعبد الرحمن شكري", "أحمد شوقي وحافظ إبراهيم", "أبو شادي ومحمود حسن إسماعيل", "السياب وصلاح عبد الصبور"], correct: 0, difficulty: "easy" },
  { id: "ar-lit2-02", subject: "عربي", unit: "الأدب", lesson: "مدرسة الديوان", q: "تأثرت مدرسة الديوان بالآداب:", options: ["الإنجليزية الرومانتيكية", "الفرنسية", "الألمانية", "الفارسية"], correct: 0, difficulty: "medium" },
  { id: "ar-lit2-03", subject: "عربي", unit: "الأدب", lesson: "مدرسة الديوان", q: "المدرسة الديوانية تُعلي من شأن:", options: ["التعبير عن الذات والوجدان الصادق", "الشكل الكلاسيكي القصيدة العمودية", "الموضوعات الوطنية الرسمية", "الشعر القصصي الملحمي"], correct: 0, difficulty: "medium" },
  { id: "ar-lit2-04", subject: "عربي", unit: "الأدب", lesson: "مدرسة الديوان", q: "ألّف أصحاب الديوان كتابهم نقداً لـ:", options: ["مدرسة الإحياء وشوقي تحديداً", "مدرسة أبوللو", "الشعر الحر", "الشعر الجاهلي"], correct: 0, difficulty: "hard" },
  { id: "ar-lit2-05", subject: "عربي", unit: "الأدب", lesson: "مدرسة الديوان", q: "أبرز سمات شعر الديوان:", options: ["الوحدة العضوية والصدق العاطفي", "الاهتمام بالزخرفة اللفظية", "الالتزام بالقافية الموحدة", "التعبير عن المناسبات الرسمية"], correct: 0, difficulty: "medium" },

  // أدب: أبوللو
  { id: "ar-lit3-01", subject: "عربي", unit: "الأدب", lesson: "مدرسة أبوللو", q: "تأسست جماعة أبوللو على يد:", options: ["أحمد زكي أبو شادي", "العقاد", "أحمد شوقي", "إبراهيم ناجي"], correct: 0, difficulty: "easy" },
  { id: "ar-lit3-02", subject: "عربي", unit: "الأدب", lesson: "مدرسة أبوللو", q: "موضوعات أبوللو المفضلة:", options: ["الطبيعة والحب والحزن والاغتراب", "الوطنية والسياسة", "التاريخ الإسلامي", "الشعر الاجتماعي الساخر"], correct: 0, difficulty: "medium" },
  { id: "ar-lit3-03", subject: "عربي", unit: "الأدب", lesson: "مدرسة أبوللو", q: "أبرز شعراء أبوللو الرومانسيين:", options: ["إبراهيم ناجي", "العقاد", "حافظ إبراهيم", "السياب"], correct: 0, difficulty: "medium" },
  { id: "ar-lit3-04", subject: "عربي", unit: "الأدب", lesson: "مدرسة أبوللو", q: "سميت المدرسة أبوللو نسبةً لـ:", options: ["إله الشعر في الأساطير الإغريقية", "مجلة أدبية إيطالية", "شاعر إنجليزي", "موقع أثري في مصر"], correct: 0, difficulty: "hard" },
  { id: "ar-lit3-05", subject: "عربي", unit: "الأدب", lesson: "مدرسة أبوللو", q: "جماعة أبوللو تتميز بـ:", options: ["التحرر النسبي من الأوزان والميل للرومانسية", "الالتزام الكامل بالشعر العمودي", "النقد الاجتماعي الصارم", "إحياء الشعر الجاهلي"], correct: 0, difficulty: "medium" },

  // أدب: الشعر الحر
  { id: "ar-lit4-01", subject: "عربي", unit: "الأدب", lesson: "الشعر الحر (شعر التفعيلة)", q: "رائدة الشعر الحر في الأدب العربي الحديث:", options: ["نازك الملائكة", "فدوى طوقان", "مي زيادة", "غادة السمان"], correct: 0, difficulty: "easy" },
  { id: "ar-lit4-02", subject: "عربي", unit: "الأدب", lesson: "الشعر الحر (شعر التفعيلة)", q: "شعر التفعيلة يعتمد على:", options: ["تفعيلة واحدة متكررة بأطوال حرة", "الأوزان الخليلية الكاملة", "النثر المطلق دون وزن", "القافية دون وزن"], correct: 0, difficulty: "medium" },
  { id: "ar-lit4-03", subject: "عربي", unit: "الأدب", lesson: "الشعر الحر (شعر التفعيلة)", q: "من رواد التفعيلة في مصر:", options: ["صلاح عبد الصبور", "أحمد شوقي", "إبراهيم المازني", "أبو القاسم الشابي"], correct: 0, difficulty: "medium" },
  { id: "ar-lit4-04", subject: "عربي", unit: "الأدب", lesson: "الشعر الحر (شعر التفعيلة)", q: "الفرق بين شعر التفعيلة والشعر المنثور:", options: ["التفعيلة تحتفظ بالوزن أما المنثور فلا", "التفعيلة أقدم من المنثور", "المنثور يستخدم القافية", "لا فرق بينهما"], correct: 0, difficulty: "hard" },
  { id: "ar-lit4-05", subject: "عربي", unit: "الأدب", lesson: "الشعر الحر (شعر التفعيلة)", q: "أسهم بدر شاكر السياب في:", options: ["تأسيس وتطوير شعر التفعيلة عربياً", "تأسيس مدرسة الإحياء", "نقد الشعر الرومانتيكي", "كتابة القصة فقط"], correct: 0, difficulty: "medium" },

  // نحو: المبتدأ والخبر
  { id: "ar-gr1-01", subject: "عربي", unit: "النحو والصرف", lesson: "المبتدأ والخبر", q: "في (المعلمُ مجتهدٌ)، كلمة (مجتهدٌ):", options: ["خبر مرفوع", "مبتدأ مرفوع", "فاعل مرفوع", "نعت"], correct: 0, difficulty: "easy" },
  { id: "ar-gr1-02", subject: "عربي", unit: "النحو والصرف", lesson: "المبتدأ والخبر", q: "المبتدأ يكون دائماً:", options: ["مرفوعاً", "منصوباً", "مجروراً", "مجزوماً"], correct: 0, difficulty: "easy" },
  { id: "ar-gr1-03", subject: "عربي", unit: "النحو والصرف", lesson: "المبتدأ والخبر", q: "في (أن تصوم خيرٌ لك)، المبتدأ:", options: ["أن تصوم (مصدر مؤول)", "خير", "لك", "أن"], correct: 0, difficulty: "medium" },
  { id: "ar-gr1-04", subject: "عربي", unit: "النحو والصرف", lesson: "المبتدأ والخبر", q: "الخبر الجملة الفعلية في (الطالبُ يذاكرُ دروسَه):", options: ["يذاكرُ دروسَه", "الطالب", "دروسه", "يذاكر"], correct: 0, difficulty: "medium" },
  { id: "ar-gr1-05", subject: "عربي", unit: "النحو والصرف", lesson: "المبتدأ والخبر", q: "يجوز حذف المبتدأ في حالة:", options: ["وجود قرينة تدل عليه", "الضرورة الشعرية فقط", "الجملة الاسمية دائماً", "لا يجوز حذفه"], correct: 0, difficulty: "hard" },

  // نحو: الفعل
  { id: "ar-gr2-01", subject: "عربي", unit: "النحو والصرف", lesson: "الفعل وأنواعه", q: "الفعل المضارع يُرفع بـ:", options: ["الضمة أو ثبوت النون", "الفتحة", "السكون", "حذف النون"], correct: 0, difficulty: "easy" },
  { id: "ar-gr2-02", subject: "عربي", unit: "النحو والصرف", lesson: "الفعل وأنواعه", q: "الفعل اللازم:", options: ["لا يتعدى أثره إلى مفعول به", "يحتاج إلى مفعول به", "يُبنى للمجهول دائماً", "يأتي في أول الجملة دائماً"], correct: 0, difficulty: "medium" },
  { id: "ar-gr2-03", subject: "عربي", unit: "النحو والصرف", lesson: "الفعل وأنواعه", q: "الفعل الماضي المبني للمجهول يُصاغ بـ:", options: ["ضم أوله وكسر ما قبل آخره", "فتح أوله وضم ما قبل آخره", "ضم أوله وفتح ما قبل آخره", "فتح أوله وكسر ما قبل آخره"], correct: 0, difficulty: "medium" },
  { id: "ar-gr2-04", subject: "عربي", unit: "النحو والصرف", lesson: "الفعل وأنواعه", q: "فعل الأمر يُبنى على:", options: ["السكون أو حذف النون أو حذف حرف العلة", "الفتح دائماً", "الضم دائماً", "الكسر دائماً"], correct: 0, difficulty: "hard" },
  { id: "ar-gr2-05", subject: "عربي", unit: "النحو والصرف", lesson: "الفعل وأنواعه", q: "الفعل المتعدي:", options: ["ينصب مفعولاً به", "لا يحتاج إلى مفعول", "يأتي في أول الجملة", "يقترن دائماً بـ (قد)"], correct: 0, difficulty: "easy" },

  // نحو: المفعول به والمطلق
  { id: "ar-gr3-01", subject: "عربي", unit: "النحو والصرف", lesson: "المفعول به والمفعول المطلق", q: "المفعول به يكون:", options: ["منصوباً", "مرفوعاً", "مجروراً", "مجزوماً"], correct: 0, difficulty: "easy" },
  { id: "ar-gr3-02", subject: "عربي", unit: "النحو والصرف", lesson: "المفعول به والمفعول المطلق", q: "المفعول المطلق يُؤكد معنى الفعل أو يُبين:", options: ["نوعه أو عدده", "زمنه", "فاعله", "مكانه"], correct: 0, difficulty: "medium" },
  { id: "ar-gr3-03", subject: "عربي", unit: "النحو والصرف", lesson: "المفعول به والمفعول المطلق", q: "في (ضربتُ ضرباً شديداً)، كلمة (ضرباً):", options: ["مفعول مطلق منصوب", "مفعول به منصوب", "حال منصوبة", "تمييز منصوب"], correct: 0, difficulty: "medium" },
  { id: "ar-gr3-04", subject: "عربي", unit: "النحو والصرف", lesson: "المفعول به والمفعول المطلق", q: "النائب عن المفعول المطلق:", options: ["مصدر مرادف أو صفته أو عدده", "ضمير فقط", "اسم إشارة فقط", "ظرف زمان فقط"], correct: 0, difficulty: "hard" },
  { id: "ar-gr3-05", subject: "عربي", unit: "النحو والصرف", lesson: "المفعول به والمفعول المطلق", q: "في (قرأتُ الكتابَ)، الكتابَ:", options: ["مفعول به منصوب بالفتحة", "فاعل مرفوع", "مبتدأ", "خبر"], correct: 0, difficulty: "easy" },

  // نحو: الحال والتمييز
  { id: "ar-gr4-01", subject: "عربي", unit: "النحو والصرف", lesson: "الحال والتمييز", q: "الحال يُجيب عن:", options: ["كيف؟ (هيئة الفاعل أو المفعول)", "ماذا؟", "لماذا؟", "متى؟"], correct: 0, difficulty: "easy" },
  { id: "ar-gr4-02", subject: "عربي", unit: "النحو والصرف", lesson: "الحال والتمييز", q: "التمييز يُجيب عن:", options: ["ماذا؟ (يُزيل الإبهام)", "كيف؟", "أين؟", "لماذا؟"], correct: 0, difficulty: "easy" },
  { id: "ar-gr4-03", subject: "عربي", unit: "النحو والصرف", lesson: "الحال والتمييز", q: "في (جاء الطالبُ مسرعاً)، مسرعاً:", options: ["حال منصوب", "مفعول به", "تمييز", "خبر"], correct: 0, difficulty: "medium" },
  { id: "ar-gr4-04", subject: "عربي", unit: "النحو والصرف", lesson: "الحال والتمييز", q: "في (اشتريتُ عشرينَ كتاباً)، كتاباً:", options: ["تمييز منصوب", "مفعول به", "حال", "مضاف إليه"], correct: 0, difficulty: "medium" },
  { id: "ar-gr4-05", subject: "عربي", unit: "النحو والصرف", lesson: "الحال والتمييز", q: "الحال الجامدة تدل على:", options: ["تشبيه أو سعر أو نوع", "اسم فاعل", "اسم مفعول", "صيغة مبالغة"], correct: 0, difficulty: "hard" },

  // نحو: الأساليب
  { id: "ar-gr5-01", subject: "عربي", unit: "النحو والصرف", lesson: "الأساليب النحوية", q: "أدوات الاستثناء تشمل:", options: ["إلا وغير وسوى وخلا وعدا وحاشا", "ليت ولعل ولو", "كم وأيّ وما", "إنّ وأخواتها"], correct: 0, difficulty: "easy" },
  { id: "ar-gr5-02", subject: "عربي", unit: "النحو والصرف", lesson: "الأساليب النحوية", q: "المستثنى بـ (إلا) في الاستثناء التام الموجب:", options: ["منصوب دائماً", "مرفوع دائماً", "مجرور دائماً", "يتبع ما قبله"], correct: 0, difficulty: "medium" },
  { id: "ar-gr5-03", subject: "عربي", unit: "النحو والصرف", lesson: "الأساليب النحوية", q: "المنادى المبني على الضم:", options: ["العلم المفرد والنكرة المقصودة", "المضاف", "شبه المضاف", "النكرة غير المقصودة"], correct: 0, difficulty: "medium" },
  { id: "ar-gr5-04", subject: "عربي", unit: "النحو والصرف", lesson: "الأساليب النحوية", q: "في أسلوب الاشتغال، الاسم المقدم:", options: ["مبتدأ أو مفعول به بفعل محذوف", "فاعل دائماً", "خبر مقدم دائماً", "مضاف إليه"], correct: 0, difficulty: "hard" },
  { id: "ar-gr5-05", subject: "عربي", unit: "النحو والصرف", lesson: "الأساليب النحوية", q: "أسلوب الإغراء يُستخدم لـ:", options: ["حث المخاطب على فعل محمود", "تحذيره من مكروه", "ندائه", "التعجب"], correct: 0, difficulty: "easy" },

  // نحو: البلاغة
  { id: "ar-gr6-01", subject: "عربي", unit: "النحو والصرف", lesson: "البلاغة: التشبيه والاستعارة والكناية", q: "أركان التشبيه الأربعة:", options: ["المشبه والمشبه به والأداة ووجه الشبه", "المشبه والمشبه به فقط", "الأداة ووجه الشبه فقط", "المشبه والأداة فقط"], correct: 0, difficulty: "easy" },
  { id: "ar-gr6-02", subject: "عربي", unit: "النحو والصرف", lesson: "البلاغة: التشبيه والاستعارة والكناية", q: "الاستعارة التصريحية:", options: ["صُرِّح فيها بالمشبه به وحُذف المشبه", "صُرِّح بالمشبه وحُذف المشبه به", "ذُكر فيها الطرفان", "الاستعارة المكنية"], correct: 0, difficulty: "medium" },
  { id: "ar-gr6-03", subject: "عربي", unit: "النحو والصرف", lesson: "البلاغة: التشبيه والاستعارة والكناية", q: "الكناية:", options: ["تعبير يُراد به لازم معناه لا معناه الأصلي", "المجاز المرسل", "الاستعارة المكنية", "التشبيه البليغ"], correct: 0, difficulty: "medium" },
  { id: "ar-gr6-04", subject: "عربي", unit: "النحو والصرف", lesson: "البلاغة: التشبيه والاستعارة والكناية", q: "في (أسدٌ يحمي الوطن)، الصورة البيانية:", options: ["استعارة تصريحية", "تشبيه تام", "كناية", "مجاز مرسل"], correct: 0, difficulty: "hard" },
  { id: "ar-gr6-05", subject: "عربي", unit: "النحو والصرف", lesson: "البلاغة: التشبيه والاستعارة والكناية", q: "أبلغ التشبيهات:", options: ["البليغ (حذف الأداة ووجه الشبه)", "المرسل", "التمثيلي", "الضمني"], correct: 0, difficulty: "hard" },

  // نحو: الإعلال
  { id: "ar-gr7-01", subject: "عربي", unit: "النحو والصرف", lesson: "الإعلال والإبدال", q: "الإعلال بالقلب يعني:", options: ["قلب حرف علة إلى حرف علة آخر", "حذف حرف علة", "تسكين حرف علة", "نقل حركة حرف العلة"], correct: 0, difficulty: "medium" },
  { id: "ar-gr7-02", subject: "عربي", unit: "النحو والصرف", lesson: "الإعلال والإبدال", q: "الإعلال بالحذف يقع في:", options: ["المعتل الآخر عند الجزم والبناء على السكون", "المعتل الأول فقط", "المعتل الوسط فقط", "الصحيح دائماً"], correct: 0, difficulty: "medium" },
  { id: "ar-gr7-03", subject: "عربي", unit: "النحو والصرف", lesson: "الإعلال والإبدال", q: "كلمة (قال) أصلها:", options: ["قَوَلَ (إعلال بالقلب)", "قَيَلَ", "قَالَ بلا تغيير", "قَوَّلَ"], correct: 0, difficulty: "easy" },
  { id: "ar-gr7-04", subject: "عربي", unit: "النحو والصرف", lesson: "الإعلال والإبدال", q: "الإبدال في الصرف يعني:", options: ["وضع حرف مكان حرف لغرض صوتي", "حذف حرف من الكلمة", "نقل حركة من مكانها", "تشديد حرف"], correct: 0, difficulty: "hard" },
  { id: "ar-gr7-05", subject: "عربي", unit: "النحو والصرف", lesson: "الإعلال والإبدال", q: "في (ميزان)، الميم أصلها:", options: ["واو (موزان)", "ياء أصلية", "ميم أصلية", "همزة"], correct: 0, difficulty: "hard" },

  // History questions live in ./questions/hi.ts and hi2.ts (2026-27 curriculum).

  // Geography questions live in ./questions/geo.ts and geo2.ts (2026-27 curriculum).

];

// Extra questions live in ./questions/*.ts (10 more per lesson). Each is attached to an
// existing lesson by name; a typo in a lesson name fails loudly instead of silently vanishing.
const DIFFICULTY = { e: "easy", m: "medium", h: "hard" } as const;

function expandExtra(lessons: ExtraLesson[]): AIQuestion[] {
  const counter = new Map<string, number>(); // lesson → extra questions numbered so far
  return lessons.flatMap(({ subject, lesson, rows, newLesson }) => {
    const base = BASE_QUESTIONS.find((q) => q.subject === subject && q.lesson === lesson);
    if (!base && !newLesson) throw new Error(`Unknown lesson in extra questions: ${subject} / ${lesson}`);
    const prefix = base ? base.id.replace(/-\d+$/, "") : newLesson!.prefix;
    const unit = base ? base.unit : newLesson!.unit;
    const start = counter.get(prefix) ?? 0;
    counter.set(prefix, start + rows.length);
    return rows.map(([q, right, w1, w2, w3, d], i) => ({
      id: `${prefix}-x${String(start + i + 1).padStart(2, "0")}`,
      subject,
      unit,
      lesson,
      q,
      options: [right, w1, w2, w3],
      correct: 0,
      difficulty: DIFFICULTY[d],
    }));
  });
}

export const ALL_QUESTIONS: AIQuestion[] = [
  ...BASE_QUESTIONS,
  ...expandExtra([
    ...EXTRA_EN, ...EXTRA_ST_ALL, ...EXTRA_AR, ...EXTRA_HI, ...EXTRA_GEO,
    ...EXTRA_EN_2, ...EXTRA_AR_2, ...EXTRA_HI_2, ...EXTRA_GEO_2,
    ...EXTRA_FR,
  ]),
];

// ─────────────────────────────────────────────────────────────────────────────
// SUMMARIES
// ─────────────────────────────────────────────────────────────────────────────

const BASE_SUMMARIES: AISummary[] = [

  // Arabic
  { subject: "عربي", unit: "القراءة والفهم", lesson: "مهارات القراءة", title: "مهارات القراءة والفهم", summary: "استيعاب النصوص وتحليلها من حيث الفكرة والأسلوب والمفردات السياقية.", keyPoints: ["الفكرة الرئيسية: تجمع النص كله", "الأسلوب التفسيري: يشرح ويوضح", "الأسلوب الحجاجي: يُقنع بالأدلة", "المعنى السياقي من محيط الجملة"] },
  { subject: "عربي", unit: "الأدب", lesson: "مدرسة الإحياء والبعث", title: "مدرسة الإحياء والبعث", summary: "المدرسة الكلاسيكية المحافظة على التراث.", keyPoints: ["أحمد شوقي: أمير الشعراء", "حافظ إبراهيم: شاعر النيل", "المحافظة على الأوزان والقوافي", "موضوعات: الوطنية والمدح والدين"] },
  { subject: "عربي", unit: "الأدب", lesson: "مدرسة الديوان", title: "مدرسة الديوان", summary: "مدرسة تجديدية رومانتيكية إنجليزية التأثر.", keyPoints: ["رواد: العقاد، المازني، شكري", "التأثر بالأدب الإنجليزي الرومانتيكي", "الوحدة العضوية للقصيدة", "النقد الأدبي ركيزة للمدرسة"] },
  { subject: "عربي", unit: "الأدب", lesson: "مدرسة أبوللو", title: "مدرسة أبوللو", summary: "جماعة رومانتيكية تهتم بالطبيعة والحزن والاغتراب.", keyPoints: ["أسسها أحمد زكي أبو شادي", "إبراهيم ناجي: أبرز شعرائها", "الحزن والاغتراب والطبيعة موضوعاتها", "نسبةً لإله الشعر الإغريقي"] },
  { subject: "عربي", unit: "الأدب", lesson: "الشعر الحر (شعر التفعيلة)", title: "الشعر الحر — شعر التفعيلة", summary: "ثورة شعرية حديثة تحررت من الوزن الصارم.", keyPoints: ["نازك الملائكة: رائدة الشعر الحر", "بدر شاكر السياب: رائد عراقي", "صلاح عبد الصبور: رائد مصري", "تفعيلة واحدة بأطوال حرة"] },
  { subject: "عربي", unit: "النحو والصرف", lesson: "المبتدأ والخبر", title: "المبتدأ والخبر", summary: "ركنا الجملة الاسمية وأحكامهما.", keyPoints: ["المبتدأ: مرفوع دائماً", "الخبر: مرفوع (مفرد أو جملة أو شبه جملة)", "يجوز تقديم الخبر وتأخير المبتدأ", "يجوز حذف المبتدأ بقرينة"] },
  { subject: "عربي", unit: "النحو والصرف", lesson: "الفعل وأنواعه", title: "الفعل وأنواعه", summary: "أنواع الفعل وصيغ المبني للمجهول.", keyPoints: ["المضارع: يُرفع بالضمة وينصب بالفتحة ويجزم بالسكون", "اللازم: لا يتعدى إلى مفعول", "المتعدي: ينصب مفعولاً به", "المبني للمجهول: ضم أوله وكسر ما قبل آخره"] },
  { subject: "عربي", unit: "النحو والصرف", lesson: "المفعول به والمفعول المطلق", title: "المفعول به والمفعول المطلق", summary: "الفرق بين المفعول به والمطلق.", keyPoints: ["المفعول به: منصوب وقع عليه الفعل", "المفعول المطلق: مصدر منصوب من لفظ الفعل", "يبيّن نوعه أو عدده أو يؤكده", "النائب عنه: مرادفه أو صفته أو عدده"] },
  { subject: "عربي", unit: "النحو والصرف", lesson: "الحال والتمييز", title: "الحال والتمييز", summary: "منصوبان يُزيلان الإبهام.", keyPoints: ["الحال: يُجيب عن (كيف؟)", "التمييز: يُجيب عن (ماذا؟ ما نوعه؟)", "الحال مشتق غالباً", "التمييز يأتي بعد الأعداد والمقادير"] },
  { subject: "عربي", unit: "النحو والصرف", lesson: "الأساليب النحوية", title: "الأساليب النحوية", summary: "الاستثناء والنداء والاشتغال والإغراء.", keyPoints: ["الاستثناء بإلا: المستثنى منصوب في التام الموجب", "النداء: يتبع نوع المنادى", "الإغراء: حث على المحمود", "التحذير: تنفير من المكروه"] },
  { subject: "عربي", unit: "النحو والصرف", lesson: "البلاغة: التشبيه والاستعارة والكناية", title: "البلاغة: تشبيه واستعارة وكناية", summary: "أسس علم البيان الثلاثة.", keyPoints: ["التشبيه: أركانه الأربعة، أبلغه البليغ", "الاستعارة تصريحية: صُرِّح بالمشبه به", "الاستعارة مكنية: رُمز بلازمة", "الكناية: لازم المعنى لا المعنى الأصلي"] },
  { subject: "عربي", unit: "النحو والصرف", lesson: "الإعلال والإبدال", title: "الإعلال والإبدال", summary: "تغييرات صوتية في الكلمات المعتلة لتيسير النطق.", keyPoints: ["الإعلال بالقلب: واو/ياء → حرف علة آخر", "الإعلال بالحذف: في الجزم والسكون", "الإعلال بالتسكين", "الإبدال: حرف مكان حرف لغرض صوتي"] },

];

export const ALL_SUMMARIES: AISummary[] = [...BASE_SUMMARIES, ...SUMMARIES_EN, ...SUMMARIES_ST, ...SUMMARIES_HI, ...SUMMARIES_GEO, ...SUMMARIES_FR];

// ─────────────────────────────────────────────────────────────────────────────
// QUERY FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

// ── Supervisor edits (custom_questions table) ──
// A row whose id matches a built-in question replaces it (or hides it when hidden = true);
// any other row is a new question added by the supervisor.
export interface QuestionEdit extends AIQuestion {
  hidden: boolean;
}

let edits: QuestionEdit[] = [];
let active: AIQuestion[] = ALL_QUESTIONS;

/** Called by the store whenever custom_questions is (re)loaded. */
export function setQuestionEdits(rows: QuestionEdit[]) {
  edits = rows;
  const byId = new Map(rows.map((r) => [r.id, r]));
  const builtIn = ALL_QUESTIONS.flatMap((q) => {
    const e = byId.get(q.id);
    if (!e) return [q];
    return e.hidden ? [] : [{ ...q, q: e.q, options: e.options, correct: e.correct, difficulty: e.difficulty }];
  });
  const builtInIds = new Set(ALL_QUESTIONS.map((q) => q.id));
  const added = rows.filter((r) => !builtInIds.has(r.id) && !r.hidden);
  active = [...builtIn, ...added];
}

/** Questions currently in use: built-in ones with supervisor edits applied, plus added ones. */
export function activeQuestions(): AIQuestion[] {
  return active;
}

export function isBuiltInQuestion(id: string): boolean {
  return ALL_QUESTIONS.some((q) => q.id === id);
}

/** Built-in questions the supervisor deleted (so they can be restored). */
export function hiddenBuiltInQuestions(subject: string, lesson: string): AIQuestion[] {
  const hidden = new Set(edits.filter((e) => e.hidden).map((e) => e.id));
  return ALL_QUESTIONS.filter((q) => hidden.has(q.id) && q.subject === subject && q.lesson === lesson);
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Same question with its answers in random order (the bank always stores the right answer first). */
function shuffleOptions(q: AIQuestion): AIQuestion {
  const order = shuffle(q.options.map((_, i) => i));
  return { ...q, options: order.map((i) => q.options[i]), correct: order.indexOf(q.correct) };
}

/** Pick `count` random questions, preferring ones not in `avoid` (e.g. used in earlier battles). */
function pick(pool: AIQuestion[], count: number, avoid?: Set<string>): AIQuestion[] {
  const fresh = avoid ? pool.filter((q) => !avoid.has(q.id)) : pool;
  const used = avoid ? pool.filter((q) => avoid.has(q.id)) : [];
  return [...shuffle(fresh), ...shuffle(used)].slice(0, count).map(shuffleOptions);
}

export function getQuestionsForLesson(subject: string, unit: string, lesson: string, count = 5): AIQuestion[] {
  const pool = active.filter(q => q.subject === subject && q.unit === unit && q.lesson === lesson);
  return pick(pool, count);
}

export function getQuestionsForUnit(subject: string, unit: string, count = 10): AIQuestion[] {
  const pool = active.filter(q => q.subject === subject && q.unit === unit);
  return pick(pool, count);
}

export function getQuestionsForSubject(subject: string, count = 20): AIQuestion[] {
  const pool = active.filter(q => q.subject === subject);
  return pick(pool, count);
}

export function getRandomQuestions(count = 10, subjects?: string[]): AIQuestion[] {
  const pool = subjects ? active.filter(q => subjects.includes(q.subject)) : active;
  return pick(pool, count);
}

/** All questions matching a subject, optionally narrowed to one unit and one lesson. */
export function getQuestionPool(subject: string, unit?: string, lesson?: string): AIQuestion[] {
  return active.filter(
    (q) => q.subject === subject && (!unit || q.unit === unit) && (!lesson || q.lesson === lesson),
  );
}

/** Random questions from the chosen subject / unit / lesson. */
export function getQuestionsByScope(
  subject: string,
  unit?: string,
  lesson?: string,
  count = 5,
  avoid?: Set<string>,
): AIQuestion[] {
  return pick(getQuestionPool(subject, unit, lesson), count, avoid);
}

/** Random questions from a specific list of lessons. */
export function getQuestionsFromLessons(
  subject: string,
  lessons: { unit: string; lesson: string }[],
  count = 5,
  avoid?: Set<string>,
): AIQuestion[] {
  const pool = active.filter(
    (q) => q.subject === subject && lessons.some((l) => l.unit === q.unit && l.lesson === q.lesson),
  );
  return pick(pool, count, avoid);
}

// backward-compatible wrapper
export function getQuestionsFor(subjectName: string, unit?: string, count = 5): AIQuestion[] {
  if (unit) return getQuestionsForUnit(subjectName, unit, count);
  return getQuestionsForSubject(subjectName, count);
}

export function getSummariesFor(subject: string): AISummary[] {
  return ALL_SUMMARIES.filter(s => s.subject === subject);
}

export function getSummariesForUnit(subject: string, unit: string): AISummary[] {
  return ALL_SUMMARIES.filter(s => s.subject === subject && s.unit === unit);
}

const SUBJECT_ORDER = ["إنجليزي", "إحصاء", "عربي", "تاريخ", "جغرافيا", "فرنسي"];
const subjectRank = (s: string) => (SUBJECT_ORDER.indexOf(s) + 1 || 99);
export const SUBJECTS = [...new Set(ALL_QUESTIONS.map(q => q.subject))].sort(
  (a, b) => subjectRank(a) - subjectRank(b),
);

export function getUnitsForSubject(subject: string): string[] {
  return [...new Set(ALL_QUESTIONS.filter(q => q.subject === subject).map(q => q.unit))];
}

export function getLessonsForUnit(subject: string, unit: string): string[] {
  return [...new Set(ALL_QUESTIONS.filter(q => q.subject === subject && q.unit === unit).map(q => q.lesson))];
}
