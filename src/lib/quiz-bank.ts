// Lightweight starter quiz bank keyed by subject keyword.
// Used as a fallback so quizzes work immediately even before users add their own questions.

export interface QuizQ {
  q: string;
  options: string[];
  correct: number; // index
}

const BANK: Record<string, QuizQ[]> = {
  رياضيات: [
    { q: "حل المعادلة: 2x + 6 = 18", options: ["x = 4", "x = 6", "x = 8", "x = 12"], correct: 1 },
    { q: "مساحة الدائرة بقطر 10 سم تساوي تقريباً:", options: ["31.4", "78.5", "100", "314"], correct: 1 },
    { q: "النسبة المئوية لـ 45 من 90 =", options: ["25%", "45%", "50%", "90%"], correct: 2 },
    { q: "جا 30° =", options: ["1/2", "√3/2", "1", "0"], correct: 0 },
    { q: "مشتقة الدالة س² هي:", options: ["1", "س", "2س", "س²"], correct: 2 },
  ],
  فيزياء: [
    { q: "وحدة القوة في النظام الدولي:", options: ["جول", "نيوتن", "واط", "باسكال"], correct: 1 },
    { q: "تسارع الجاذبية الأرضية تقريباً:", options: ["8.1", "9.8", "10.5", "12"], correct: 1 },
    { q: "قانون أوم: V = ?", options: ["I × R", "I / R", "I + R", "R / I"], correct: 0 },
    { q: "سرعة الضوء في الفراغ ≈", options: ["3×10⁵ كم/ث", "3×10⁸ م/ث", "3×10⁶ م/ث", "1×10⁸ م/ث"], correct: 1 },
  ],
  كيمياء: [
    { q: "الرمز الكيميائي للذهب:", options: ["Ag", "Au", "Gd", "Go"], correct: 1 },
    { q: "العدد الذري للأكسجين:", options: ["6", "7", "8", "16"], correct: 2 },
    { q: "الرقم الهيدروجيني للماء النقي:", options: ["5", "6", "7", "8"], correct: 2 },
    { q: "أيٌ مما يلي عنصر خامل؟", options: ["نيتروجين", "أوكسجين", "نيون", "هيدروجين"], correct: 2 },
  ],
  أحياء: [
    { q: "وحدة بناء الكائن الحي:", options: ["النسيج", "الخلية", "العضو", "الجهاز"], correct: 1 },
    { q: "الميتوكوندريا مسؤولة عن:", options: ["التركيب الضوئي", "إنتاج الطاقة", "الانقسام", "الإخراج"], correct: 1 },
    { q: "الحمض النووي يحمل اسم:", options: ["RNA", "ATP", "DNA", "ADP"], correct: 2 },
  ],
  انجليزي: [
    { q: "Choose the correct: She ___ to school every day.", options: ["go", "goes", "going", "gone"], correct: 1 },
    { q: "Past tense of 'write':", options: ["writed", "wrote", "writen", "writing"], correct: 1 },
    { q: "Synonym of 'happy':", options: ["sad", "joyful", "angry", "tired"], correct: 1 },
  ],
  عربي: [
    { q: "إعراب كلمة (الطالبُ) في: الطالبُ مجتهدٌ", options: ["مبتدأ مرفوع", "خبر", "فاعل", "مفعول به"], correct: 0 },
    { q: "جمع كلمة (كتاب):", options: ["كاتبون", "كتب", "كتّاب", "مكاتب"], correct: 1 },
    { q: "نوع الجملة: (يلعبُ الولدُ)", options: ["اسمية", "فعلية", "شرطية", "تعجبية"], correct: 1 },
  ],
  تاريخ: [
    { q: "عام الفيل وُلد فيه النبي ﷺ سنة:", options: ["570م", "610م", "622م", "632م"], correct: 0 },
    { q: "ثورة 1919 في مصر قادها:", options: ["جمال عبدالناصر", "سعد زغلول", "محمد علي", "أحمد عرابي"], correct: 1 },
  ],
};

export function getQuizFor(subjectName: string, count = 5): QuizQ[] {
  const key = Object.keys(BANK).find((k) => subjectName.includes(k));
  const pool = key ? BANK[key] : Object.values(BANK).flat();
  return [...pool].sort(() => Math.random() - 0.5).slice(0, count);
}
