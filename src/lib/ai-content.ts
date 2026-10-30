import type { ExtraLesson } from "./questions/types";
import { EXTRA_EN } from "./questions/en";
import { EXTRA_ST } from "./questions/st";
import { EXTRA_AR } from "./questions/ar";
import { EXTRA_HI } from "./questions/hi";
import { EXTRA_GEO } from "./questions/geo";
import { EXTRA_EN_2 } from "./questions/en2";
import { EXTRA_ST_2 } from "./questions/st2";
import { EXTRA_AR_2 } from "./questions/ar2";
import { EXTRA_HI_2 } from "./questions/hi2";
import { EXTRA_GEO_2 } from "./questions/geo2";

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
  // ═══════════════════════════════════════════════════════
  // ENGLISH — 6 units × 4 lessons
  // ═══════════════════════════════════════════════════════

  // ── Unit 1: Health ── L1: My Day in Hospital
  { id: "en-u1-l1-01", subject: "إنجليزي", unit: "Unit 1: Health", lesson: "My Day in Hospital", q: "What does 'ward' mean in a hospital?", options: ["A large room with many patients", "A doctor's office", "An operating room", "A pharmacy"], correct: 0, difficulty: "easy" },
  { id: "en-u1-l1-02", subject: "إنجليزي", unit: "Unit 1: Health", lesson: "My Day in Hospital", q: "Choose the correct word: The doctor ___ the patient carefully.", options: ["examined", "examine", "examining", "has examine"], correct: 0, difficulty: "easy" },
  { id: "en-u1-l1-03", subject: "إنجليزي", unit: "Unit 1: Health", lesson: "My Day in Hospital", q: "A 'surgeon' is best described as:", options: ["A doctor who performs operations", "A nurse", "A pharmacist", "A radiologist"], correct: 0, difficulty: "medium" },
  { id: "en-u1-l1-04", subject: "إنجليزي", unit: "Unit 1: Health", lesson: "My Day in Hospital", q: "The opposite of 'admit to hospital' is:", options: ["discharge", "diagnose", "treat", "operate"], correct: 0, difficulty: "medium" },
  { id: "en-u1-l1-05", subject: "إنجليزي", unit: "Unit 1: Health", lesson: "My Day in Hospital", q: "Which sentence uses past narrative correctly?", options: ["She had been waiting two hours when the doctor arrived.", "She was waiting two hours when the doctor has arrived.", "She waited two hours when the doctor had arrived.", "She has waited when doctor arrived."], correct: 0, difficulty: "hard" },

  // ── Unit 1: Health ── L2: Emergency Call
  { id: "en-u1-l2-01", subject: "إنجليزي", unit: "Unit 1: Health", lesson: "Emergency Call", q: "In an emergency call, what should you state FIRST?", options: ["Your location", "Your name", "The symptoms", "Your phone number"], correct: 0, difficulty: "easy" },
  { id: "en-u1-l2-02", subject: "إنجليزي", unit: "Unit 1: Health", lesson: "Emergency Call", q: "'Ambulance' in Arabic means:", options: ["سيارة إسعاف", "سيارة الشرطة", "سيارة الإطفاء", "سيارة النقل"], correct: 0, difficulty: "easy" },
  { id: "en-u1-l2-03", subject: "إنجليزي", unit: "Unit 1: Health", lesson: "Emergency Call", q: "Choose the correct imperative: ___ him move his head!", options: ["Don't let", "Doesn't let", "Not let", "No let"], correct: 0, difficulty: "medium" },
  { id: "en-u1-l2-04", subject: "إنجليزي", unit: "Unit 1: Health", lesson: "Emergency Call", q: "'Unconscious' means:", options: ["فاقد الوعي", "مريض", "مصاب بجروح", "متألم"], correct: 0, difficulty: "medium" },
  { id: "en-u1-l2-05", subject: "إنجليزي", unit: "Unit 1: Health", lesson: "Emergency Call", q: "Which first-aid instruction is most appropriate over the phone?", options: ["Keep him still and apply pressure to the wound.", "Don't worry, it's fine.", "Wait and do nothing.", "Move him to a comfortable position immediately."], correct: 0, difficulty: "hard" },

  // ── Unit 1: Health ── L3: Grammar — Past Perfect Simple & Continuous
  { id: "en-u1-l3-01", subject: "إنجليزي", unit: "Unit 1: Health", lesson: "Grammar: Past Perfect Simple & Continuous", q: "Past Perfect Simple is formed with:", options: ["had + past participle", "was/were + -ing", "have + past participle", "did + verb"], correct: 0, difficulty: "easy" },
  { id: "en-u1-l3-02", subject: "إنجليزي", unit: "Unit 1: Health", lesson: "Grammar: Past Perfect Simple & Continuous", q: "She ___ for 3 hours before she finally saw the doctor.", options: ["had been waiting", "has been waiting", "was waiting", "had waited"], correct: 0, difficulty: "easy" },
  { id: "en-u1-l3-03", subject: "إنجليزي", unit: "Unit 1: Health", lesson: "Grammar: Past Perfect Simple & Continuous", q: "Past Perfect Continuous emphasises:", options: ["Duration of an action before another past action", "A completed action only", "A habitual past action", "A future plan"], correct: 0, difficulty: "medium" },
  { id: "en-u1-l3-04", subject: "إنجليزي", unit: "Unit 1: Health", lesson: "Grammar: Past Perfect Simple & Continuous", q: "By the time the ambulance arrived, the doctor ___ the patient. (treat)", options: ["had treated", "treated", "has treated", "was treating"], correct: 0, difficulty: "medium" },
  { id: "en-u1-l3-05", subject: "إنجليزي", unit: "Unit 1: Health", lesson: "Grammar: Past Perfect Simple & Continuous", q: "Which sentence uses Past Perfect SIMPLE (not continuous)?", options: ["He had finished the report before the meeting started.", "He had been finishing the report.", "He was finishing the report.", "He finishes before meeting."], correct: 0, difficulty: "hard" },

  // ── Unit 1: Health ── L4: Beyond the White Coat
  { id: "en-u1-l4-01", subject: "إنجليزي", unit: "Unit 1: Health", lesson: "Beyond the White Coat", q: "'Compassion' in medical context means:", options: ["Caring about patients' suffering", "Technical medical skill", "Knowledge of medicine", "Following hospital rules"], correct: 0, difficulty: "easy" },
  { id: "en-u1-l4-02", subject: "إنجليزي", unit: "Unit 1: Health", lesson: "Beyond the White Coat", q: "A 'paramedic' is:", options: ["An emergency medical worker", "A hospital manager", "A heart specialist", "A lab technician"], correct: 0, difficulty: "easy" },
  { id: "en-u1-l4-03", subject: "إنجليزي", unit: "Unit 1: Health", lesson: "Beyond the White Coat", q: "'Dedicated' in 'a dedicated doctor' means:", options: ["متفانٍ", "متعب", "محدود", "متحيز"], correct: 0, difficulty: "medium" },
  { id: "en-u1-l4-04", subject: "إنجليزي", unit: "Unit 1: Health", lesson: "Beyond the White Coat", q: "The main idea of 'Beyond the White Coat' is:", options: ["Doctors need both medical skills and human qualities.", "Medical training is very long.", "Hospitals need more doctors.", "Patients should trust doctors blindly."], correct: 0, difficulty: "medium" },
  { id: "en-u1-l4-05", subject: "إنجليزي", unit: "Unit 1: Health", lesson: "Beyond the White Coat", q: "Which word best describes a doctor who works 18-hour shifts to save lives?", options: ["committed", "casual", "cautious", "capable"], correct: 0, difficulty: "hard" },

  // ── Unit 2: Environment ── L1: Our Fragile Planet
  { id: "en-u2-l1-01", subject: "إنجليزي", unit: "Unit 2: The Environment", lesson: "Our Fragile Planet", q: "'Biodiversity' means:", options: ["The variety of life on Earth", "Air pollution levels", "Ocean temperature", "Climate patterns"], correct: 0, difficulty: "easy" },
  { id: "en-u2-l1-02", subject: "إنجليزي", unit: "Unit 2: The Environment", lesson: "Our Fragile Planet", q: "'Deforestation' means:", options: ["قطع الأشجار", "زراعة الأشجار", "حرق النفايات", "صيد الأسماك"], correct: 0, difficulty: "easy" },
  { id: "en-u2-l1-03", subject: "إنجليزي", unit: "Unit 2: The Environment", lesson: "Our Fragile Planet", q: "Which is NOT a cause of environmental damage?", options: ["Recycling", "Deforestation", "Oil spills", "Plastic waste"], correct: 0, difficulty: "medium" },
  { id: "en-u2-l1-04", subject: "إنجليزي", unit: "Unit 2: The Environment", lesson: "Our Fragile Planet", q: "'Endangered species' are animals that:", options: ["Are at risk of extinction", "Are very dangerous", "Live in rainforests", "Have been recently discovered"], correct: 0, difficulty: "medium" },
  { id: "en-u2-l1-05", subject: "إنجليزي", unit: "Unit 2: The Environment", lesson: "Our Fragile Planet", q: "The word 'fragile' in 'our fragile planet' suggests:", options: ["The Earth is easily damaged and needs care", "The Earth is very large", "The Earth is very strong", "The Earth is difficult to understand"], correct: 0, difficulty: "hard" },

  // ── Unit 2: Environment ── L2: Climate Change
  { id: "en-u2-l2-01", subject: "إنجليزي", unit: "Unit 2: The Environment", lesson: "Climate Change", q: "The greenhouse effect is caused by:", options: ["Gases trapping heat in the atmosphere", "The sun getting hotter", "Volcanic eruptions only", "Ocean currents"], correct: 0, difficulty: "easy" },
  { id: "en-u2-l2-02", subject: "إنجليزي", unit: "Unit 2: The Environment", lesson: "Climate Change", q: "CO₂ stands for:", options: ["Carbon dioxide", "Carbon monoxide", "Calcium oxide", "Copper oxide"], correct: 0, difficulty: "easy" },
  { id: "en-u2-l2-03", subject: "إنجليزي", unit: "Unit 2: The Environment", lesson: "Climate Change", q: "Choose the correct passive: Millions of trees ___ every year.", options: ["are cut down", "cut down", "are cutting down", "have cut down"], correct: 0, difficulty: "medium" },
  { id: "en-u2-l2-04", subject: "إنجليزي", unit: "Unit 2: The Environment", lesson: "Climate Change", q: "'Renewable energy' comes from:", options: ["Sun, wind, and water", "Coal and oil", "Nuclear power only", "Gas and petroleum"], correct: 0, difficulty: "medium" },
  { id: "en-u2-l2-05", subject: "إنجليزي", unit: "Unit 2: The Environment", lesson: "Climate Change", q: "Which correctly uses cause/effect language?", options: ["As a result of rising temperatures, ice caps are melting.", "Because of ice caps melting, temperatures rise as a result.", "Ice caps melt due to they rise.", "The rising causes of temperatures."], correct: 0, difficulty: "hard" },

  // ── Unit 2: Environment ── L3: Grammar — Modal Verbs
  { id: "en-u2-l3-01", subject: "إنجليزي", unit: "Unit 2: The Environment", lesson: "Grammar: Modal Verbs", q: "Which modal expresses strong obligation?", options: ["must", "might", "could", "would"], correct: 0, difficulty: "easy" },
  { id: "en-u2-l3-02", subject: "إنجليزي", unit: "Unit 2: The Environment", lesson: "Grammar: Modal Verbs", q: "'You ___ recycle your waste.' (advice)", options: ["should", "must", "can", "will"], correct: 0, difficulty: "easy" },
  { id: "en-u2-l3-03", subject: "إنجليزي", unit: "Unit 2: The Environment", lesson: "Grammar: Modal Verbs", q: "'Factories ___ pollute rivers.' (prohibition)", options: ["must not", "should not", "might not", "could not"], correct: 0, difficulty: "medium" },
  { id: "en-u2-l3-04", subject: "إنجليزي", unit: "Unit 2: The Environment", lesson: "Grammar: Modal Verbs", q: "'You ___ be tired after that journey.' (logical deduction)", options: ["must", "should", "might", "can"], correct: 0, difficulty: "medium" },
  { id: "en-u2-l3-05", subject: "إنجليزي", unit: "Unit 2: The Environment", lesson: "Grammar: Modal Verbs", q: "The key difference between 'must' and 'have to' is:", options: ["must = internal obligation; have to = external obligation", "They are exactly the same", "must is past tense; have to is present", "must is informal; have to is formal"], correct: 0, difficulty: "hard" },

  // ── Unit 2: Environment ── L4: Green Heroes
  { id: "en-u2-l4-01", subject: "إنجليزي", unit: "Unit 2: The Environment", lesson: "Green Heroes", q: "An 'activist' is someone who:", options: ["Campaigns actively for a cause", "Studies the environment scientifically", "Writes books about nature", "Teaches about pollution"], correct: 0, difficulty: "easy" },
  { id: "en-u2-l4-02", subject: "إنجليزي", unit: "Unit 2: The Environment", lesson: "Green Heroes", q: "'Sustainable' development means:", options: ["Meeting current needs without harming future generations", "Very fast economic development", "Expensive industrial development", "Development without regulation"], correct: 0, difficulty: "medium" },
  { id: "en-u2-l4-03", subject: "إنجليزي", unit: "Unit 2: The Environment", lesson: "Green Heroes", q: "Greta Thunberg is known for:", options: ["Environmental activism for climate change", "Inventing solar panels", "Discovering endangered species", "Writing environmental laws"], correct: 0, difficulty: "easy" },
  { id: "en-u2-l4-04", subject: "إنجليزي", unit: "Unit 2: The Environment", lesson: "Green Heroes", q: "'Grassroots movement' refers to:", options: ["A movement started by ordinary people", "A government environmental program", "An international organization", "A movement to plant grass"], correct: 0, difficulty: "hard" },
  { id: "en-u2-l4-05", subject: "إنجليزي", unit: "Unit 2: The Environment", lesson: "Green Heroes", q: "Which action best describes a 'green hero'?", options: ["Organises community clean-ups and promotes recycling", "Buys expensive eco-products only", "Talks about the environment but does nothing", "Works in a forest reserve"], correct: 0, difficulty: "medium" },

  // ── Unit 3: Science & Technology ── L1: The Digital Age
  { id: "en-u3-l1-01", subject: "إنجليزي", unit: "Unit 3: Science & Technology", lesson: "The Digital Age", q: "'Artificial Intelligence' means:", options: ["Machines simulating human intelligence", "Fast internet connection", "Advanced computer programming", "Digital data storage"], correct: 0, difficulty: "easy" },
  { id: "en-u3-l1-02", subject: "إنجليزي", unit: "Unit 3: Science & Technology", lesson: "The Digital Age", q: "Which is an example of social media?", options: ["Facebook", "Microsoft Word", "Google Maps", "Wikipedia"], correct: 0, difficulty: "easy" },
  { id: "en-u3-l1-03", subject: "إنجليزي", unit: "Unit 3: Science & Technology", lesson: "The Digital Age", q: "'Cybersecurity' protects against:", options: ["Online threats and hacking", "Physical theft", "Power outages", "Hardware failure only"], correct: 0, difficulty: "medium" },
  { id: "en-u3-l1-04", subject: "إنجليزي", unit: "Unit 3: Science & Technology", lesson: "The Digital Age", q: "The prefix 'cyber-' relates to:", options: ["Computers and the internet", "Futuristic robots", "Mechanical systems", "Biological science"], correct: 0, difficulty: "medium" },
  { id: "en-u3-l1-05", subject: "إنجليزي", unit: "Unit 3: Science & Technology", lesson: "The Digital Age", q: "Technology has _____ the way we communicate.", options: ["transformed", "transform", "transforming", "to transform"], correct: 0, difficulty: "hard" },

  // ── Unit 3 ── L2: AI and the Future
  { id: "en-u3-l2-01", subject: "إنجليزي", unit: "Unit 3: Science & Technology", lesson: "AI and the Future", q: "One advantage of AI is:", options: ["It processes data faster than humans", "It never makes mistakes", "It can fully replace human emotion", "It is always free to use"], correct: 0, difficulty: "medium" },
  { id: "en-u3-l2-02", subject: "إنجليزي", unit: "Unit 3: Science & Technology", lesson: "AI and the Future", q: "'Automation' means:", options: ["Using machines to do tasks automatically", "Creating new technology manually", "Designing software interfaces", "Programming computers from scratch"], correct: 0, difficulty: "easy" },
  { id: "en-u3-l2-03", subject: "إنجليزي", unit: "Unit 3: Science & Technology", lesson: "AI and the Future", q: "Which linking word introduces a disadvantage or contrast?", options: ["However", "Furthermore", "Moreover", "In addition"], correct: 0, difficulty: "easy" },
  { id: "en-u3-l2-04", subject: "إنجليزي", unit: "Unit 3: Science & Technology", lesson: "AI and the Future", q: "A balanced essay on AI should:", options: ["Present both advantages and disadvantages", "Only praise AI developments", "Only criticise AI risks", "Avoid giving any opinion"], correct: 0, difficulty: "medium" },
  { id: "en-u3-l2-05", subject: "إنجليزي", unit: "Unit 3: Science & Technology", lesson: "AI and the Future", q: "'Despite its benefits, AI raises ethical concerns' — the structure used is:", options: ["Concession + contrast", "Cause + effect", "Problem + solution", "Definition + example"], correct: 0, difficulty: "hard" },

  // ── Unit 3 ── L3: Grammar — Conditionals
  { id: "en-u3-l3-01", subject: "إنجليزي", unit: "Unit 3: Science & Technology", lesson: "Grammar: Conditionals", q: "The 2nd conditional expresses:", options: ["Hypothetical/unreal present or future situations", "Real future possibilities", "Past regrets", "General scientific truths"], correct: 0, difficulty: "easy" },
  { id: "en-u3-l3-02", subject: "إنجليزي", unit: "Unit 3: Science & Technology", lesson: "Grammar: Conditionals", q: "'If I were a scientist, I ___ discover a cure for cancer.'", options: ["would", "will", "can", "should"], correct: 0, difficulty: "easy" },
  { id: "en-u3-l3-03", subject: "إنجليزي", unit: "Unit 3: Science & Technology", lesson: "Grammar: Conditionals", q: "'If she had studied harder, she would have passed.' This is:", options: ["3rd conditional", "2nd conditional", "1st conditional", "Zero conditional"], correct: 0, difficulty: "medium" },
  { id: "en-u3-l3-04", subject: "إنجليزي", unit: "Unit 3: Science & Technology", lesson: "Grammar: Conditionals", q: "The 3rd conditional refers to:", options: ["Past unreal situations (regrets)", "Present habits", "Real future possibilities", "General facts"], correct: 0, difficulty: "medium" },
  { id: "en-u3-l3-05", subject: "إنجليزي", unit: "Unit 3: Science & Technology", lesson: "Grammar: Conditionals", q: "Which sentence is a correct 2nd conditional?", options: ["If they invested in AI, they would lead the market.", "If they will invest in AI, they would lead.", "If they had invested in AI, they would lead.", "If they invest in AI, they had led."], correct: 0, difficulty: "hard" },

  // ── Unit 3 ── L4: Space Exploration
  { id: "en-u3-l4-01", subject: "إنجليزي", unit: "Unit 3: Science & Technology", lesson: "Space Exploration", q: "NASA stands for:", options: ["National Aeronautics and Space Administration", "National Air and Space Agency", "North American Space Authority", "Natural Astronomy and Space Agency"], correct: 0, difficulty: "easy" },
  { id: "en-u3-l4-02", subject: "إنجليزي", unit: "Unit 3: Science & Technology", lesson: "Space Exploration", q: "The first human to walk on the moon was:", options: ["Neil Armstrong", "Yuri Gagarin", "Buzz Aldrin", "John Glenn"], correct: 0, difficulty: "easy" },
  { id: "en-u3-l4-03", subject: "إنجليزي", unit: "Unit 3: Science & Technology", lesson: "Space Exploration", q: "'Orbit' means:", options: ["The path of an object around a planet or star", "A type of space shuttle", "A moon-landing vehicle", "A satellite dish"], correct: 0, difficulty: "medium" },
  { id: "en-u3-l4-04", subject: "إنجليزي", unit: "Unit 3: Science & Technology", lesson: "Space Exploration", q: "'Launch' in 'rocket launch' is closest in meaning to:", options: ["blast off", "land", "hover", "dock"], correct: 0, difficulty: "medium" },
  { id: "en-u3-l4-05", subject: "إنجليزي", unit: "Unit 3: Science & Technology", lesson: "Space Exploration", q: "Space exploration has _____ our understanding of the universe.", options: ["expanded", "contracted", "confused", "limited"], correct: 0, difficulty: "hard" },

  // ── Unit 4: Education ── L1: Learning Styles
  { id: "en-u4-l1-01", subject: "إنجليزي", unit: "Unit 4: Education", lesson: "Learning Styles", q: "A 'visual learner' learns best through:", options: ["Diagrams and charts", "Listening to lectures", "Reading textbooks", "Hands-on activities"], correct: 0, difficulty: "easy" },
  { id: "en-u4-l1-02", subject: "إنجليزي", unit: "Unit 4: Education", lesson: "Learning Styles", q: "'Kinaesthetic' learners prefer:", options: ["Doing physical activities", "Watching videos", "Listening to music", "Reading silently"], correct: 0, difficulty: "medium" },
  { id: "en-u4-l1-03", subject: "إنجليزي", unit: "Unit 4: Education", lesson: "Learning Styles", q: "Which is NOT a recognised learning style?", options: ["aggressive", "auditory", "visual", "kinaesthetic"], correct: 0, difficulty: "easy" },
  { id: "en-u4-l1-04", subject: "إنجليزي", unit: "Unit 4: Education", lesson: "Learning Styles", q: "'Tailor' in 'tailor your teaching' means:", options: ["customise", "measure clothing", "sew", "force"], correct: 0, difficulty: "medium" },
  { id: "en-u4-l1-05", subject: "إنجليزي", unit: "Unit 4: Education", lesson: "Learning Styles", q: "Understanding your learning style can help you:", options: ["Study more effectively", "Get good grades without studying", "Avoid difficult subjects", "Memorise faster without effort"], correct: 0, difficulty: "hard" },

  // ── Unit 4 ── L2: The Global Classroom
  { id: "en-u4-l2-01", subject: "إنجليزي", unit: "Unit 4: Education", lesson: "The Global Classroom", q: "'E-learning' refers to:", options: ["Education using electronic technology", "Learning English language only", "Evening classes", "Experimental learning"], correct: 0, difficulty: "easy" },
  { id: "en-u4-l2-02", subject: "إنجليزي", unit: "Unit 4: Education", lesson: "The Global Classroom", q: "Which country has one of the longest school years in the world?", options: ["Japan", "Egypt", "USA", "UK"], correct: 0, difficulty: "medium" },
  { id: "en-u4-l2-03", subject: "إنجليزي", unit: "Unit 4: Education", lesson: "The Global Classroom", q: "'Curriculum' means:", options: ["The subjects and content taught in school", "School uniform regulations", "Extracurricular activities", "School timetable only"], correct: 0, difficulty: "easy" },
  { id: "en-u4-l2-04", subject: "إنجليزي", unit: "Unit 4: Education", lesson: "The Global Classroom", q: "A 'scholarship' is:", options: ["Financial support for study", "A school certificate", "A type of exam", "An honorary title"], correct: 0, difficulty: "medium" },
  { id: "en-u4-l2-05", subject: "إنجليزي", unit: "Unit 4: Education", lesson: "The Global Classroom", q: "'Access to quality education remains unequal globally' highlights:", options: ["Educational inequality", "Poor teaching methods", "Lack of technology", "Language barriers only"], correct: 0, difficulty: "hard" },

  // ── Unit 4 ── L3: Grammar — Reported Speech
  { id: "en-u4-l3-01", subject: "إنجليزي", unit: "Unit 4: Education", lesson: "Grammar: Reported Speech", q: "In reported speech, present simple changes to:", options: ["past simple", "past continuous", "past perfect", "present perfect"], correct: 0, difficulty: "easy" },
  { id: "en-u4-l3-02", subject: "إنجليزي", unit: "Unit 4: Education", lesson: "Grammar: Reported Speech", q: "She said, 'I am studying.' → She said that she ___ studying.", options: ["was", "is", "had been", "has been"], correct: 0, difficulty: "easy" },
  { id: "en-u4-l3-03", subject: "إنجليزي", unit: "Unit 4: Education", lesson: "Grammar: Reported Speech", q: "He asked, 'Where do you live?' → He asked ___ I lived.", options: ["where", "that where", "if where", "what"], correct: 0, difficulty: "medium" },
  { id: "en-u4-l3-04", subject: "إنجليزي", unit: "Unit 4: Education", lesson: "Grammar: Reported Speech", q: "'Don't make noise!' → He told them ___ noise.", options: ["not to make", "to not make", "don't make", "not making"], correct: 0, difficulty: "medium" },
  { id: "en-u4-l3-05", subject: "إنجليزي", unit: "Unit 4: Education", lesson: "Grammar: Reported Speech", q: "'I will help you tomorrow.' → She said she ___ help me the following day.", options: ["would", "will", "should", "could"], correct: 0, difficulty: "hard" },

  // ── Unit 4 ── L4: Bright Minds
  { id: "en-u4-l4-01", subject: "إنجليزي", unit: "Unit 4: Education", lesson: "Bright Minds", q: "Ibn Sina (Avicenna) was famous for:", options: ["Medicine and philosophy", "Astronomy and star maps", "Mathematics and algebra", "Architecture and design"], correct: 0, difficulty: "easy" },
  { id: "en-u4-l4-02", subject: "إنجليزي", unit: "Unit 4: Education", lesson: "Bright Minds", q: "'Pioneer' means:", options: ["Someone among the first to do something", "A type of scientist", "A famous teacher", "A historical military leader"], correct: 0, difficulty: "easy" },
  { id: "en-u4-l4-03", subject: "إنجليزي", unit: "Unit 4: Education", lesson: "Bright Minds", q: "'Legacy' in 'a scholar's legacy' means:", options: ["The lasting impact left after someone's life", "Their published books only", "Their university degree", "Their nationality"], correct: 0, difficulty: "medium" },
  { id: "en-u4-l4-04", subject: "إنجليزي", unit: "Unit 4: Education", lesson: "Bright Minds", q: "Which word is closest in meaning to 'brilliant'?", options: ["exceptional", "ordinary", "successful", "academic"], correct: 0, difficulty: "medium" },
  { id: "en-u4-l4-05", subject: "إنجليزي", unit: "Unit 4: Education", lesson: "Bright Minds", q: "What quality is shared by all great scholars?", options: ["Curiosity and dedication to knowledge", "Perfect memory", "Wealthy family background", "Government support"], correct: 0, difficulty: "hard" },

  // ── Unit 5: Work & Business ── L1: The Job Market
  { id: "en-u5-l1-01", subject: "إنجليزي", unit: "Unit 5: Work & Business", lesson: "The Job Market", q: "A 'CV' is primarily used to:", options: ["Apply for a job", "Apply for a university place", "Open a bank account", "Get a driving licence"], correct: 0, difficulty: "easy" },
  { id: "en-u5-l1-02", subject: "إنجليزي", unit: "Unit 5: Work & Business", lesson: "The Job Market", q: "'Freelance' work means:", options: ["Self-employed, working for different clients", "Working for free", "Working at night shifts", "Working in a government office"], correct: 0, difficulty: "medium" },
  { id: "en-u5-l1-03", subject: "إنجليزي", unit: "Unit 5: Work & Business", lesson: "The Job Market", q: "In a job interview you should:", options: ["Be punctual and professional", "Criticise your previous employer", "Talk mainly about salary", "Discuss personal problems"], correct: 0, difficulty: "easy" },
  { id: "en-u5-l1-04", subject: "إنجليزي", unit: "Unit 5: Work & Business", lesson: "The Job Market", q: "'Unemployment' means:", options: ["Not having a job", "Working part-time", "Being self-employed", "Working from home"], correct: 0, difficulty: "easy" },
  { id: "en-u5-l1-05", subject: "إنجليزي", unit: "Unit 5: Work & Business", lesson: "The Job Market", q: "Which opening is appropriate in a formal job application?", options: ["I am writing to apply for the position of…", "Hey, I want that job.", "I think I'm good enough.", "Please give me this job."], correct: 0, difficulty: "hard" },

  // ── Unit 5 ── L2: Entrepreneurship
  { id: "en-u5-l2-01", subject: "إنجليزي", unit: "Unit 5: Work & Business", lesson: "Entrepreneurship", q: "An 'entrepreneur' is someone who:", options: ["Starts and runs their own business", "Manages a large corporation", "Invests in the stock market", "Works for the government"], correct: 0, difficulty: "easy" },
  { id: "en-u5-l2-02", subject: "إنجليزي", unit: "Unit 5: Work & Business", lesson: "Entrepreneurship", q: "A 'startup' is:", options: ["A new business venture", "A computer program", "A type of investment fund", "A government project"], correct: 0, difficulty: "easy" },
  { id: "en-u5-l2-03", subject: "إنجليزي", unit: "Unit 5: Work & Business", lesson: "Entrepreneurship", q: "'Innovation' means:", options: ["Creating new ideas or products", "Copying existing products", "Improving marketing only", "Reducing production costs"], correct: 0, difficulty: "medium" },
  { id: "en-u5-l2-04", subject: "إنجليزي", unit: "Unit 5: Work & Business", lesson: "Entrepreneurship", q: "In business, 'risk' means:", options: ["The possibility of loss or failure", "Guaranteed profit", "Market competition", "Employee management"], correct: 0, difficulty: "medium" },
  { id: "en-u5-l2-05", subject: "إنجليزي", unit: "Unit 5: Work & Business", lesson: "Entrepreneurship", q: "The MOST important quality for a successful entrepreneur is:", options: ["Resilience and adaptability", "A university degree", "Family wealth", "Government connections"], correct: 0, difficulty: "hard" },

  // ── Unit 5 ── L3: Grammar — Relative Clauses
  { id: "en-u5-l3-01", subject: "إنجليزي", unit: "Unit 5: Work & Business", lesson: "Grammar: Relative Clauses", q: "A defining relative clause:", options: ["Identifies which person or thing we mean", "Adds non-essential extra information", "Can be removed without changing meaning", "Always uses commas"], correct: 0, difficulty: "medium" },
  { id: "en-u5-l3-02", subject: "إنجليزي", unit: "Unit 5: Work & Business", lesson: "Grammar: Relative Clauses", q: "'The company ___ he works for is very successful.'", options: ["which", "who", "whom", "when"], correct: 0, difficulty: "easy" },
  { id: "en-u5-l3-03", subject: "إنجليزي", unit: "Unit 5: Work & Business", lesson: "Grammar: Relative Clauses", q: "'She met the CEO, ___ had started the company from nothing.' (non-defining)", options: ["who", "that", "which", "whose"], correct: 0, difficulty: "medium" },
  { id: "en-u5-l3-04", subject: "إنجليزي", unit: "Unit 5: Work & Business", lesson: "Grammar: Relative Clauses", q: "In non-defining relative clauses, we CANNOT use:", options: ["that", "who", "whose", "which"], correct: 0, difficulty: "hard" },
  { id: "en-u5-l3-05", subject: "إنجليزي", unit: "Unit 5: Work & Business", lesson: "Grammar: Relative Clauses", q: "'___ idea was it to expand to Africa?'", options: ["Whose", "Who", "Which", "That"], correct: 0, difficulty: "medium" },

  // ── Unit 5 ── L4: Success Stories
  { id: "en-u5-l4-01", subject: "إنجليزي", unit: "Unit 5: Work & Business", lesson: "Success Stories", q: "'Perseverance' means:", options: ["Continuing despite difficulties", "Natural talent", "Good luck", "Financial support"], correct: 0, difficulty: "easy" },
  { id: "en-u5-l4-02", subject: "إنجليزي", unit: "Unit 5: Work & Business", lesson: "Success Stories", q: "'Breakthrough' in business means:", options: ["A sudden important achievement", "A business failure", "A new product launch", "A major contract"], correct: 0, difficulty: "medium" },
  { id: "en-u5-l4-03", subject: "إنجليزي", unit: "Unit 5: Work & Business", lesson: "Success Stories", q: "Which uses 'overcome' correctly?", options: ["He overcame many challenges to succeed.", "He overcame to many challenges.", "He was overcome many challenges.", "Many challenges were overcomed."], correct: 0, difficulty: "medium" },
  { id: "en-u5-l4-04", subject: "إنجليزي", unit: "Unit 5: Work & Business", lesson: "Success Stories", q: "The main lesson from most success stories is:", options: ["Failure is a stepping stone to success", "Success comes easily to talented people", "Only wealthy people can succeed", "Education is not important for success"], correct: 0, difficulty: "hard" },
  { id: "en-u5-l4-05", subject: "إنجليزي", unit: "Unit 5: Work & Business", lesson: "Success Stories", q: "'Humble beginnings' means:", options: ["Starting from a difficult financial situation", "Starting at a very young age", "Starting with help from others", "Starting a business abroad"], correct: 0, difficulty: "easy" },

  // ── Unit 6: Culture & Civilisation ── L1: Egyptian Heritage
  { id: "en-u6-l1-01", subject: "إنجليزي", unit: "Unit 6: Culture & Civilisation", lesson: "Egyptian Heritage", q: "The ancient Egyptian writing system is called:", options: ["Hieroglyphics", "Cuneiform", "Sanskrit", "Calligraphy"], correct: 0, difficulty: "easy" },
  { id: "en-u6-l1-02", subject: "إنجليزي", unit: "Unit 6: Culture & Civilisation", lesson: "Egyptian Heritage", q: "The Pyramids of Giza were built as:", options: ["Royal tombs", "Temples for worship", "Palaces", "Military forts"], correct: 0, difficulty: "easy" },
  { id: "en-u6-l1-03", subject: "إنجليزي", unit: "Unit 6: Culture & Civilisation", lesson: "Egyptian Heritage", q: "'Artifact' means:", options: ["An object made by humans of historical interest", "A type of ancient building", "A historical document", "A natural landmark"], correct: 0, difficulty: "medium" },
  { id: "en-u6-l1-04", subject: "إنجليزي", unit: "Unit 6: Culture & Civilisation", lesson: "Egyptian Heritage", q: "'Heritage' in 'cultural heritage' refers to:", options: ["Traditions and achievements passed through generations", "Ancient buildings only", "Language and food only", "Modern cultural trends"], correct: 0, difficulty: "medium" },
  { id: "en-u6-l1-05", subject: "إنجليزي", unit: "Unit 6: Culture & Civilisation", lesson: "Egyptian Heritage", q: "The Rosetta Stone was important because:", options: ["It helped scholars decode hieroglyphics", "It listed ancient Egyptian kings", "It described pyramid construction", "It was the first Egyptian coin"], correct: 0, difficulty: "hard" },

  // ── Unit 6 ── L2: World Cultures
  { id: "en-u6-l2-01", subject: "إنجليزي", unit: "Unit 6: Culture & Civilisation", lesson: "World Cultures", q: "'Cultural diversity' means:", options: ["The existence of many different cultures", "Learning foreign languages", "Travelling abroad for study", "Traditional clothing styles"], correct: 0, difficulty: "easy" },
  { id: "en-u6-l2-02", subject: "إنجليزي", unit: "Unit 6: Culture & Civilisation", lesson: "World Cultures", q: "'Customs' are:", options: ["Traditional practices of a community", "Laws of a country", "Modern social trends", "Religious rules only"], correct: 0, difficulty: "easy" },
  { id: "en-u6-l2-03", subject: "إنجليزي", unit: "Unit 6: Culture & Civilisation", lesson: "World Cultures", q: "Which phrase shows respect for other cultures?", options: ["All cultures have value and deserve respect.", "My culture is clearly superior.", "Old traditions are useless.", "Everyone should follow the same customs."], correct: 0, difficulty: "medium" },
  { id: "en-u6-l2-04", subject: "إنجليزي", unit: "Unit 6: Culture & Civilisation", lesson: "World Cultures", q: "'Stereotype' means:", options: ["A fixed, oversimplified idea about a group", "A cultural tradition", "A form of folk art", "A cultural festival"], correct: 0, difficulty: "medium" },
  { id: "en-u6-l2-05", subject: "إنجليزي", unit: "Unit 6: Culture & Civilisation", lesson: "World Cultures", q: "'Globalisation' has led to:", options: ["Increased cultural exchange but also loss of some local traditions", "Only positive cultural changes", "Complete cultural uniformity", "Disappearance of all local cultures"], correct: 0, difficulty: "hard" },

  // ── Unit 6 ── L3: Grammar — Passive Voice
  { id: "en-u6-l3-01", subject: "إنجليزي", unit: "Unit 6: Culture & Civilisation", lesson: "Grammar: Passive Voice", q: "Passive of 'They built the pyramids' is:", options: ["The pyramids were built.", "The pyramids are built.", "The pyramids have been built.", "The pyramids had been built."], correct: 0, difficulty: "easy" },
  { id: "en-u6-l3-02", subject: "إنجليزي", unit: "Unit 6: Culture & Civilisation", lesson: "Grammar: Passive Voice", q: "We use the passive voice mainly when:", options: ["The action is more important than the doer", "We know exactly who did the action", "In informal conversation only", "To describe future events only"], correct: 0, difficulty: "medium" },
  { id: "en-u6-l3-03", subject: "إنجليزي", unit: "Unit 6: Culture & Civilisation", lesson: "Grammar: Passive Voice", q: "'The report ___ every year.' (passive, present simple)", options: ["is written", "is being written", "was written", "has been written"], correct: 0, difficulty: "easy" },
  { id: "en-u6-l3-04", subject: "إنجليزي", unit: "Unit 6: Culture & Civilisation", lesson: "Grammar: Passive Voice", q: "'The ancient city ___ in 1899.' (passive, past simple)", options: ["was discovered", "is discovered", "had been discovered", "were discovered"], correct: 0, difficulty: "medium" },
  { id: "en-u6-l3-05", subject: "إنجليزي", unit: "Unit 6: Culture & Civilisation", lesson: "Grammar: Passive Voice", q: "'The new museum ___ by the President next week.' (passive, future)", options: ["will be opened", "is being opened", "has been opened", "was opened"], correct: 0, difficulty: "hard" },

  // ── Unit 6 ── L4: Crossroads of Civilisations
  { id: "en-u6-l4-01", subject: "إنجليزي", unit: "Unit 6: Culture & Civilisation", lesson: "Crossroads of Civilisations", q: "Egypt is described as a 'crossroads' because:", options: ["It connects Africa, Asia, and Europe", "It has many ancient roads", "It is at the centre of Africa", "It borders many countries"], correct: 0, difficulty: "medium" },
  { id: "en-u6-l4-02", subject: "إنجليزي", unit: "Unit 6: Culture & Civilisation", lesson: "Crossroads of Civilisations", q: "The Suez Canal connects:", options: ["The Mediterranean Sea and the Red Sea", "The Atlantic and Pacific Oceans", "The Nile and the Red Sea", "The Mediterranean and Arabian Sea"], correct: 0, difficulty: "easy" },
  { id: "en-u6-l4-03", subject: "إنجليزي", unit: "Unit 6: Culture & Civilisation", lesson: "Crossroads of Civilisations", q: "'Civilisation' refers to:", options: ["An advanced stage of human social development", "A type of culture only", "A historical period", "An ancient monument"], correct: 0, difficulty: "easy" },
  { id: "en-u6-l4-04", subject: "إنجليزي", unit: "Unit 6: Culture & Civilisation", lesson: "Crossroads of Civilisations", q: "'Influence' in 'Egypt's influence on the ancient world' means:", options: ["The effect one thing has on another", "A type of culture", "A historical achievement", "A trade route"], correct: 0, difficulty: "medium" },
  { id: "en-u6-l4-05", subject: "إنجليزي", unit: "Unit 6: Culture & Civilisation", lesson: "Crossroads of Civilisations", q: "Which best describes Egypt's role in ancient civilisations?", options: ["A centre of knowledge, trade, and cultural exchange", "An isolated civilisation", "Influential only in Africa", "Limited influence mainly in architecture"], correct: 0, difficulty: "hard" },

  // ═══════════════════════════════════════════════════════
  // إحصاء (Statistics)
  // ═══════════════════════════════════════════════════════

  // ── Unit 1: الارتباط ── L1
  { id: "st-u1-l1-01", subject: "إحصاء", unit: "الوحدة الأولى: الارتباط", lesson: "مفهوم الارتباط", q: "إذا كان معامل الارتباط r = +0.9 فإن الارتباط بين المتغيرين:", options: ["قوي موجب", "ضعيف موجب", "قوي سالب", "معدوم"], correct: 0, difficulty: "easy" },
  { id: "st-u1-l1-02", subject: "إحصاء", unit: "الوحدة الأولى: الارتباط", lesson: "مفهوم الارتباط", q: "مخطط الانتشار يُستخدم لـ:", options: ["تمثيل العلاقة بين متغيرين", "حساب المتوسط الحسابي", "عرض البيانات الفئوية", "قياس التشتت فقط"], correct: 0, difficulty: "easy" },
  { id: "st-u1-l1-03", subject: "إحصاء", unit: "الوحدة الأولى: الارتباط", lesson: "مفهوم الارتباط", q: "الارتباط السالب التام تكون قيمته:", options: ["r = −1", "r = 0", "r = +1", "r = −0.5"], correct: 0, difficulty: "medium" },
  { id: "st-u1-l1-04", subject: "إحصاء", unit: "الوحدة الأولى: الارتباط", lesson: "مفهوم الارتباط", q: "إذا كانت نقاط مخطط الانتشار تميل للأعلى من اليسار إلى اليمين، فالارتباط:", options: ["موجب", "سالب", "معدوم", "تام"], correct: 0, difficulty: "medium" },
  { id: "st-u1-l1-05", subject: "إحصاء", unit: "الوحدة الأولى: الارتباط", lesson: "مفهوم الارتباط", q: "الارتباط المعدوم (r = 0) يعني:", options: ["لا توجد علاقة خطية بين المتغيرين", "الارتباط قوي جداً", "الارتباط ضعيف فقط", "المتغيران متساويان"], correct: 0, difficulty: "hard" },

  // ── Unit 1 ── L2: معامل بيرسون
  { id: "st-u1-l2-01", subject: "إحصاء", unit: "الوحدة الأولى: الارتباط", lesson: "معامل ارتباط بيرسون", q: "تتراوح قيمة معامل الارتباط r بين:", options: ["−1 و +1", "0 و 1", "−∞ و +∞", "0 و ∞"], correct: 0, difficulty: "easy" },
  { id: "st-u1-l2-02", subject: "إحصاء", unit: "الوحدة الأولى: الارتباط", lesson: "معامل ارتباط بيرسون", q: "صيغة معامل ارتباط بيرسون تعتمد على:", options: ["الانحرافات عن المتوسط", "الرتب فقط", "الوسيط", "المنوال"], correct: 0, difficulty: "easy" },
  { id: "st-u1-l2-03", subject: "إحصاء", unit: "الوحدة الأولى: الارتباط", lesson: "معامل ارتباط بيرسون", q: "إذا كان Σ(x−x̄)(y−ȳ) = 0 فإن معامل الارتباط:", options: ["= 0", "= 1", "= −1", "غير محدد"], correct: 0, difficulty: "medium" },
  { id: "st-u1-l2-04", subject: "إحصاء", unit: "الوحدة الأولى: الارتباط", lesson: "معامل ارتباط بيرسون", q: "معامل ارتباط بيرسون يقيس:", options: ["شدة واتجاه العلاقة الخطية", "العلاقة غير الخطية فقط", "الفرق بين متوسطين", "التشتت في البيانات"], correct: 0, difficulty: "medium" },
  { id: "st-u1-l2-05", subject: "إحصاء", unit: "الوحدة الأولى: الارتباط", lesson: "معامل ارتباط بيرسون", q: "إذا كان r = 0.3 فإن العلاقة بين المتغيرين:", options: ["موجبة ضعيفة", "موجبة قوية", "سالبة ضعيفة", "معدومة تماماً"], correct: 0, difficulty: "hard" },

  // ── Unit 1 ── L3: سبيرمان
  { id: "st-u1-l3-01", subject: "إحصاء", unit: "الوحدة الأولى: الارتباط", lesson: "معامل ارتباط سبيرمان", q: "معامل سبيرمان يُستخدم مع البيانات:", options: ["الرتبية أو غير المتوزعة طبيعياً", "الكمية المتوزعة طبيعياً فقط", "الكبيرة جداً", "ذات القيم السالبة"], correct: 0, difficulty: "easy" },
  { id: "st-u1-l3-02", subject: "إحصاء", unit: "الوحدة الأولى: الارتباط", lesson: "معامل ارتباط سبيرمان", q: "في معامل سبيرمان، d يمثل:", options: ["الفرق بين رتبتي كل قيمة", "مجموع الرتب", "متوسط الرتب", "الفرق بين القيمتين الأصليتين"], correct: 0, difficulty: "easy" },
  { id: "st-u1-l3-03", subject: "إحصاء", unit: "الوحدة الأولى: الارتباط", lesson: "معامل ارتباط سبيرمان", q: "صيغة معامل سبيرمان:", options: ["1 − (6Σd²) / (n(n²−1))", "1 − Σd² / n", "Σd² / (n²−1)", "6Σd / (n−1)"], correct: 0, difficulty: "medium" },
  { id: "st-u1-l3-04", subject: "إحصاء", unit: "الوحدة الأولى: الارتباط", lesson: "معامل ارتباط سبيرمان", q: "إذا كانت الرتب متطابقة تماماً، فإن معامل سبيرمان =", options: ["+1", "0", "−1", "0.5"], correct: 0, difficulty: "medium" },
  { id: "st-u1-l3-05", subject: "إحصاء", unit: "الوحدة الأولى: الارتباط", lesson: "معامل ارتباط سبيرمان", q: "ميزة سبيرمان على بيرسون:", options: ["يطبَّق على البيانات الرتبية وغير المعلمية", "دقته أعلى دائماً", "أصعب في الحساب", "لا فرق بينهما"], correct: 0, difficulty: "hard" },

  // ── Unit 2: الانحدار ── L1
  { id: "st-u2-l1-01", subject: "إحصاء", unit: "الوحدة الثانية: الانحدار", lesson: "خط الانحدار البسيط", q: "معادلة خط الانحدار:", options: ["ŷ = a + bx", "ŷ = a × bx", "ŷ = x + a", "ŷ = b / a"], correct: 0, difficulty: "easy" },
  { id: "st-u2-l1-02", subject: "إحصاء", unit: "الوحدة الثانية: الانحدار", lesson: "خط الانحدار البسيط", q: "في ŷ = a + bx، يمثل b:", options: ["ميل الخط (معامل الانحدار)", "نقطة التقاطع مع المحور الصادي", "قيمة y عند x=0", "معامل الارتباط"], correct: 0, difficulty: "medium" },
  { id: "st-u2-l1-03", subject: "إحصاء", unit: "الوحدة الثانية: الانحدار", lesson: "خط الانحدار البسيط", q: "خط الانحدار يمر دائماً بالنقطة:", options: ["(x̄ , ȳ)", "(0 , 0)", "(1 , 1)", "(a , b)"], correct: 0, difficulty: "hard" },
  { id: "st-u2-l1-04", subject: "إحصاء", unit: "الوحدة الثانية: الانحدار", lesson: "خط الانحدار البسيط", q: "طريقة المربعات الصغرى تهدف إلى:", options: ["تصغير مجموع مربعات الفروق بين الفعلي والمتنبأ", "تصغير مجموع القيم", "تكبير معامل الارتباط", "تصغير الميل فقط"], correct: 0, difficulty: "hard" },
  { id: "st-u2-l1-05", subject: "إحصاء", unit: "الوحدة الثانية: الانحدار", lesson: "خط الانحدار البسيط", q: "قيمة a في معادلة الانحدار:", options: ["قيمة y عند x = 0", "ميل الخط", "قيمة x عند y = 0", "متوسط y"], correct: 0, difficulty: "medium" },

  // ── Unit 2 ── L2: التنبؤ
  { id: "st-u2-l2-01", subject: "إحصاء", unit: "الوحدة الثانية: الانحدار", lesson: "التنبؤ بالانحدار", q: "إذا كان ŷ = 2 + 3x، فقيمة y عند x = 4:", options: ["14", "12", "10", "8"], correct: 0, difficulty: "easy" },
  { id: "st-u2-l2-02", subject: "إحصاء", unit: "الوحدة الثانية: الانحدار", lesson: "التنبؤ بالانحدار", q: "التنبؤ داخل نطاق البيانات يُسمى:", options: ["استيفاء (Interpolation)", "استكمال (Extrapolation)", "ارتباط", "انحدار"], correct: 0, difficulty: "medium" },
  { id: "st-u2-l2-03", subject: "إحصاء", unit: "الوحدة الثانية: الانحدار", lesson: "التنبؤ بالانحدار", q: "التنبؤ خارج نطاق البيانات يُسمى:", options: ["استكمال (Extrapolation)", "استيفاء (Interpolation)", "تمثيل بياني", "حساب أولي"], correct: 0, difficulty: "medium" },
  { id: "st-u2-l2-04", subject: "إحصاء", unit: "الوحدة الثانية: الانحدار", lesson: "التنبؤ بالانحدار", q: "كلما كان r أقرب إلى ±1، كان التنبؤ:", options: ["أكثر دقة", "أقل دقة", "غير ممكن", "عشوائياً"], correct: 0, difficulty: "easy" },
  { id: "st-u2-l2-05", subject: "إحصاء", unit: "الوحدة الثانية: الانحدار", lesson: "التنبؤ بالانحدار", q: "الفرق بين خط انحدار ص على س وس على ص:", options: ["المتغير التابع المستخدم في التنبؤ", "قيمة معامل الارتباط", "الميل فقط", "نقطة التقاطع فقط"], correct: 0, difficulty: "hard" },

  // ── Unit 3: السلاسل الزمنية ── L1
  { id: "st-u3-l1-01", subject: "إحصاء", unit: "الوحدة الثالثة: السلاسل الزمنية", lesson: "مكونات السلسلة الزمنية", q: "السلسلة الزمنية هي:", options: ["بيانات مرتبة زمنياً", "بيانات مرتبة حسب الحجم", "بيانات عشوائية", "بيانات مصنفة فئوياً"], correct: 0, difficulty: "easy" },
  { id: "st-u3-l1-02", subject: "إحصاء", unit: "الوحدة الثالثة: السلاسل الزمنية", lesson: "مكونات السلسلة الزمنية", q: "الاتجاه العام (Trend) يمثل:", options: ["الاتجاه طويل الأجل", "التغيرات الموسمية", "التغيرات الدورية", "التغيرات العشوائية"], correct: 0, difficulty: "easy" },
  { id: "st-u3-l1-03", subject: "إحصاء", unit: "الوحدة الثالثة: السلاسل الزمنية", lesson: "مكونات السلسلة الزمنية", q: "التغيرات الموسمية تتكرر:", options: ["خلال فترة أقل من سنة", "كل عدة سنوات", "بصورة عشوائية", "مرة واحدة فقط"], correct: 0, difficulty: "medium" },
  { id: "st-u3-l1-04", subject: "إحصاء", unit: "الوحدة الثالثة: السلاسل الزمنية", lesson: "مكونات السلسلة الزمنية", q: "التغيرات الدورية تختلف عن الموسمية بأنها:", options: ["تمتد لسنوات وغير منتظمة المدة", "تتكرر كل سنة بانتظام", "منتظمة ومتوقعة", "قصيرة الأجل دائماً"], correct: 0, difficulty: "medium" },
  { id: "st-u3-l1-05", subject: "إحصاء", unit: "الوحدة الثالثة: السلاسل الزمنية", lesson: "مكونات السلسلة الزمنية", q: "التغيرات غير المنتظمة تنتج عن:", options: ["أحداث غير متوقعة كالكوارث", "الاتجاه العام للسوق", "العوامل الموسمية", "التخطيط الاقتصادي"], correct: 0, difficulty: "hard" },

  // ── Unit 3 ── L2: المتوسطات المتحركة
  { id: "st-u3-l2-01", subject: "إحصاء", unit: "الوحدة الثالثة: السلاسل الزمنية", lesson: "المتوسطات المتحركة", q: "المتوسط المتحرك يُستخدم لـ:", options: ["تنعيم البيانات وإظهار الاتجاه العام", "حساب معامل الارتباط", "التنبؤ المباشر بالأسعار", "حساب معادلة الانحدار"], correct: 0, difficulty: "easy" },
  { id: "st-u3-l2-02", subject: "إحصاء", unit: "الوحدة الثالثة: السلاسل الزمنية", lesson: "المتوسطات المتحركة", q: "للقيم (4، 6، 8)، المتوسط المتحرك لـ 3 قيم =", options: ["6", "7", "8", "5"], correct: 0, difficulty: "easy" },
  { id: "st-u3-l2-03", subject: "إحصاء", unit: "الوحدة الثالثة: السلاسل الزمنية", lesson: "المتوسطات المتحركة", q: "عدد قيم المتوسط المتحرك (رتبة n) أقل من الأصلية بـ:", options: ["(n − 1)", "1 دائماً", "النصف", "الضعف"], correct: 0, difficulty: "medium" },
  { id: "st-u3-l2-04", subject: "إحصاء", unit: "الوحدة الثالثة: السلاسل الزمنية", lesson: "المتوسطات المتحركة", q: "لبيانات ربع سنوية يُستخدم متوسط متحرك:", options: ["رتبة 4 ثم متوسط متوسطين متتاليين", "رتبة 4 مباشرة", "رتبة 3", "رتبة 5"], correct: 0, difficulty: "hard" },
  { id: "st-u3-l2-05", subject: "إحصاء", unit: "الوحدة الثالثة: السلاسل الزمنية", lesson: "المتوسطات المتحركة", q: "ميزة المتوسطات المتحركة:", options: ["تُزيل التذبذبات القصيرة وتُظهر الاتجاه", "تعطي تنبؤات دقيقة دائماً", "تُظهر التغيرات الفصلية", "سهلة التفسير في كل الحالات"], correct: 0, difficulty: "medium" },

  // ── Unit 3 ── L3: طريقة المربعات الصغرى للاتجاه
  { id: "st-u3-l3-01", subject: "إحصاء", unit: "الوحدة الثالثة: السلاسل الزمنية", lesson: "طريقة المربعات الصغرى للاتجاه", q: "في طريقة المربعات الصغرى للاتجاه، يُرمز للزمن بـ:", options: ["t أو x", "y", "a", "b"], correct: 0, difficulty: "easy" },
  { id: "st-u3-l3-02", subject: "إحصاء", unit: "الوحدة الثالثة: السلاسل الزمنية", lesson: "طريقة المربعات الصغرى للاتجاه", q: "نقطة الأصل في هذه الطريقة تكون:", options: ["منتصف سلسلة البيانات", "بداية السلسلة", "نهاية السلسلة", "القيمة الأكبر"], correct: 0, difficulty: "medium" },
  { id: "st-u3-l3-03", subject: "إحصاء", unit: "الوحدة الثالثة: السلاسل الزمنية", lesson: "طريقة المربعات الصغرى للاتجاه", q: "معادلة Ŷ = 50 + 3t تعني أن الاتجاه:", options: ["تصاعدي بمعدل 3 وحدات في الفترة", "تنازلي", "ثابت", "عشوائي"], correct: 0, difficulty: "easy" },
  { id: "st-u3-l3-04", subject: "إحصاء", unit: "الوحدة الثالثة: السلاسل الزمنية", lesson: "طريقة المربعات الصغرى للاتجاه", q: "b في معادلة الاتجاه العام =", options: ["Σ(t·y) / Σt²", "Σy / n", "Σt / n", "Σ(t + y) / n"], correct: 0, difficulty: "hard" },
  { id: "st-u3-l3-05", subject: "إحصاء", unit: "الوحدة الثالثة: السلاسل الزمنية", lesson: "طريقة المربعات الصغرى للاتجاه", q: "a في معادلة الاتجاه عند Σt = 0 يساوي:", options: ["ȳ", "Σy / Σt", "b × ȳ", "Σt² / n"], correct: 0, difficulty: "hard" },

  // ── Unit 4: الاحتمال ── L1
  { id: "st-u4-l1-01", subject: "إحصاء", unit: "الوحدة الرابعة: الاحتمال", lesson: "مفاهيم أساسية في الاحتمال", q: "الفضاء العيني هو:", options: ["مجموعة جميع النتائج الممكنة", "النتيجة الأكثر احتمالاً", "أي نتيجة واحدة", "مجموعة النتائج المرغوبة فقط"], correct: 0, difficulty: "easy" },
  { id: "st-u4-l1-02", subject: "إحصاء", unit: "الوحدة الرابعة: الاحتمال", lesson: "مفاهيم أساسية في الاحتمال", q: "احتمال الحادثة المستحيلة:", options: ["0", "1", "0.5", "∞"], correct: 0, difficulty: "easy" },
  { id: "st-u4-l1-03", subject: "إحصاء", unit: "الوحدة الرابعة: الاحتمال", lesson: "مفاهيم أساسية في الاحتمال", q: "عند رمي قطعة نقود، احتمال ظهور الصورة:", options: ["1/2", "1/4", "1", "1/3"], correct: 0, difficulty: "easy" },
  { id: "st-u4-l1-04", subject: "إحصاء", unit: "الوحدة الرابعة: الاحتمال", lesson: "مفاهيم أساسية في الاحتمال", q: "إذا كان P(A) = 0.4، فإن P(A') =", options: ["0.6", "0.4", "1.4", "0"], correct: 0, difficulty: "medium" },
  { id: "st-u4-l1-05", subject: "إحصاء", unit: "الوحدة الرابعة: الاحتمال", lesson: "مفاهيم أساسية في الاحتمال", q: "الحوادث المتنافية:", options: ["لا يمكن أن تقع معاً", "دائمة الوقوع", "متساوية الاحتمال", "مستقلة دائماً"], correct: 0, difficulty: "medium" },

  // ── Unit 4 ── L2: قواعد الاحتمال
  { id: "st-u4-l2-01", subject: "إحصاء", unit: "الوحدة الرابعة: الاحتمال", lesson: "قواعد الاحتمال", q: "P(A ∪ B) = P(A) + P(B) − P(A ∩ B) هي:", options: ["قاعدة الجمع العامة", "قاعدة الضرب", "قاعدة الاحتمال الكلي", "نظرية بايز"], correct: 0, difficulty: "easy" },
  { id: "st-u4-l2-02", subject: "إحصاء", unit: "الوحدة الرابعة: الاحتمال", lesson: "قواعد الاحتمال", q: "الحادثتان مستقلتان إذا:", options: ["P(A ∩ B) = P(A) × P(B)", "P(A ∪ B) = 1", "P(A) = P(B)", "P(A|B) = 1"], correct: 0, difficulty: "medium" },
  { id: "st-u4-l2-03", subject: "إحصاء", unit: "الوحدة الرابعة: الاحتمال", lesson: "قواعد الاحتمال", q: "P(A|B) يعني:", options: ["احتمال A بشرط وقوع B", "احتمال A و B معاً", "احتمال A أو B", "احتمال عدم وقوع A"], correct: 0, difficulty: "easy" },
  { id: "st-u4-l2-04", subject: "إحصاء", unit: "الوحدة الرابعة: الاحتمال", lesson: "قواعد الاحتمال", q: "P(A)=0.3, P(B)=0.4, P(A∩B)=0.12 — هل A و B مستقلتان؟", options: ["نعم، 0.3 × 0.4 = 0.12", "لا، متنافيتان", "لا يمكن تحديد ذلك", "نعم لأن P(A)≠P(B)"], correct: 0, difficulty: "hard" },
  { id: "st-u4-l2-05", subject: "إحصاء", unit: "الوحدة الرابعة: الاحتمال", lesson: "قواعد الاحتمال", q: "للحادثتين المتنافيتين: P(A ∪ B) =", options: ["P(A) + P(B)", "P(A) × P(B)", "P(A) − P(B)", "P(A) + P(B) − 1"], correct: 0, difficulty: "medium" },

  // ── Unit 4 ── L3: بايز
  { id: "st-u4-l3-01", subject: "إحصاء", unit: "الوحدة الرابعة: الاحتمال", lesson: "نظرية بايز", q: "نظرية بايز تُستخدم لـ:", options: ["تحديث الاحتمالات بناءً على معلومات جديدة", "حساب الاحتمالات البسيطة فقط", "إيجاد الفضاء العيني", "حساب التباديل والتوافيق"], correct: 0, difficulty: "medium" },
  { id: "st-u4-l3-02", subject: "إحصاء", unit: "الوحدة الرابعة: الاحتمال", lesson: "نظرية بايز", q: "الاحتمال القبلي (Prior) هو:", options: ["الاحتمال قبل الحصول على معلومات جديدة", "الاحتمال بعد التجربة", "الاحتمال الشرطي", "احتمال الفضاء العيني"], correct: 0, difficulty: "easy" },
  { id: "st-u4-l3-03", subject: "إحصاء", unit: "الوحدة الرابعة: الاحتمال", lesson: "نظرية بايز", q: "قانون الاحتمال الكلي يشترط أن تكون Aᵢ:", options: ["أحداثاً كاملة ومتنافية تغطي الفضاء العيني", "أحداثاً مستقلة فقط", "أحداثاً متساوية الاحتمال", "أي أحداث"], correct: 0, difficulty: "hard" },
  { id: "st-u4-l3-04", subject: "إحصاء", unit: "الوحدة الرابعة: الاحتمال", lesson: "نظرية بايز", q: "الاحتمال البعدي (Posterior) =", options: ["P(Aᵢ|B)", "P(B|Aᵢ)", "P(Aᵢ)", "P(B)"], correct: 0, difficulty: "medium" },
  { id: "st-u4-l3-05", subject: "إحصاء", unit: "الوحدة الرابعة: الاحتمال", lesson: "نظرية بايز", q: "بايز في الطب يُمكّن من:", options: ["حساب احتمال إصابة المريض بعد نتيجة فحص", "تشخيص المرض مباشرة", "تحديد العلاج المناسب", "إجراء العمليات"], correct: 0, difficulty: "hard" },

  // ── Unit 5 ── L1: المتغير العشوائي المنفصل
  { id: "st-u5-l1-01", subject: "إحصاء", unit: "الوحدة الخامسة: المتغير العشوائي والتوزيع الطبيعي", lesson: "المتغير العشوائي المنفصل", q: "المتغير العشوائي المنفصل يأخذ:", options: ["قيماً محددة قابلة للعد", "قيماً في نطاق مستمر", "قيماً غير محدودة", "قيماً سالبة فقط"], correct: 0, difficulty: "easy" },
  { id: "st-u5-l1-02", subject: "إحصاء", unit: "الوحدة الخامسة: المتغير العشوائي والتوزيع الطبيعي", lesson: "المتغير العشوائي المنفصل", q: "القيمة المتوقعة E(X) =", options: ["Σ [x · P(x)]", "Σ x", "Σ P(x)", "max(x)"], correct: 0, difficulty: "easy" },
  { id: "st-u5-l1-03", subject: "إحصاء", unit: "الوحدة الخامسة: المتغير العشوائي والتوزيع الطبيعي", lesson: "المتغير العشوائي المنفصل", q: "Var(X) =", options: ["E(X²) − [E(X)]²", "E(X) − E(X²)", "[E(X)]²", "E(X²)"], correct: 0, difficulty: "medium" },
  { id: "st-u5-l1-04", subject: "إحصاء", unit: "الوحدة الخامسة: المتغير العشوائي والتوزيع الطبيعي", lesson: "المتغير العشوائي المنفصل", q: "شرط صحة دالة التوزيع الاحتمالي:", options: ["Σ P(x) = 1 و P(x) ≥ 0 لجميع x", "Σ P(x) = 0", "P(x) يمكن أن تسالب", "Σ P(x) < 1"], correct: 0, difficulty: "medium" },
  { id: "st-u5-l1-05", subject: "إحصاء", unit: "الوحدة الخامسة: المتغير العشوائي والتوزيع الطبيعي", lesson: "المتغير العشوائي المنفصل", q: "إذا E(X) = 3 و E(X²) = 13، فإن σ =", options: ["2", "√13", "3", "4"], correct: 0, difficulty: "hard" },

  // ── Unit 5 ── L2: التوزيع الطبيعي
  { id: "st-u5-l2-01", subject: "إحصاء", unit: "الوحدة الخامسة: المتغير العشوائي والتوزيع الطبيعي", lesson: "التوزيع الطبيعي", q: "المنحنى الطبيعي:", options: ["متماثل حول المتوسط", "منحرف نحو اليمين", "منحرف نحو اليسار", "غير منتظم"], correct: 0, difficulty: "easy" },
  { id: "st-u5-l2-02", subject: "إحصاء", unit: "الوحدة الخامسة: المتغير العشوائي والتوزيع الطبيعي", lesson: "التوزيع الطبيعي", q: "في التوزيع الطبيعي:", options: ["المتوسط = الوسيط = المنوال", "المتوسط > الوسيط", "المنوال < المتوسط", "المتوسط = 0 دائماً"], correct: 0, difficulty: "easy" },
  { id: "st-u5-l2-03", subject: "إحصاء", unit: "الوحدة الخامسة: المتغير العشوائي والتوزيع الطبيعي", lesson: "التوزيع الطبيعي", q: "Z-score =", options: ["(X − μ) / σ", "(X − σ) / μ", "X × μ", "X / σ"], correct: 0, difficulty: "easy" },
  { id: "st-u5-l2-04", subject: "إحصاء", unit: "الوحدة الخامسة: المتغير العشوائي والتوزيع الطبيعي", lesson: "التوزيع الطبيعي", q: "في N(0,1): الانحراف المعياري =", options: ["1", "0", "0.5", "متغير"], correct: 0, difficulty: "medium" },
  { id: "st-u5-l2-05", subject: "إحصاء", unit: "الوحدة الخامسة: المتغير العشوائي والتوزيع الطبيعي", lesson: "التوزيع الطبيعي", q: "P(μ − σ < X < μ + σ) ≈", options: ["68%", "95%", "99.7%", "50%"], correct: 0, difficulty: "hard" },

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

  // ═══════════════════════════════════════════════════════
  // تاريخ (History)
  // ═══════════════════════════════════════════════════════

  { id: "hi-ch1-01", subject: "تاريخ", unit: "الفصل الأول: الحملة الفرنسية", lesson: "الحملة الفرنسية 1798-1801", q: "وصلت الحملة الفرنسية إلى مصر عام:", options: ["1798", "1800", "1801", "1805"], correct: 0, difficulty: "easy" },
  { id: "hi-ch1-02", subject: "تاريخ", unit: "الفصل الأول: الحملة الفرنسية", lesson: "الحملة الفرنسية 1798-1801", q: "قائد الحملة الفرنسية على مصر:", options: ["نابليون بونابرت", "نيلسون", "كليبر", "مينو"], correct: 0, difficulty: "easy" },
  { id: "hi-ch1-03", subject: "تاريخ", unit: "الفصل الأول: الحملة الفرنسية", lesson: "الحملة الفرنسية 1798-1801", q: "أهم الآثار العلمية للحملة الفرنسية:", options: ["وصف مصر وحجر رشيد والمجمع العلمي", "بناء قناة السويس", "نشر التعليم الإلزامي", "إلغاء نظام المماليك فوراً"], correct: 0, difficulty: "medium" },
  { id: "hi-ch1-04", subject: "تاريخ", unit: "الفصل الأول: الحملة الفرنسية", lesson: "الحملة الفرنسية 1798-1801", q: "معركة أبي قير البحرية انتهت بـ:", options: ["انتصار الأسطول البريطاني بقيادة نيلسون", "انتصار الفرنسيين", "تعادل الطرفين", "انسحاب الطرفين"], correct: 0, difficulty: "medium" },
  { id: "hi-ch1-05", subject: "تاريخ", unit: "الفصل الأول: الحملة الفرنسية", lesson: "الحملة الفرنسية 1798-1801", q: "خرجت آخر القوات الفرنسية من مصر عام:", options: ["1801", "1798", "1799", "1805"], correct: 0, difficulty: "hard" },

  { id: "hi-ch2-01", subject: "تاريخ", unit: "الفصل الثاني: عصر محمد علي", lesson: "محمد علي وتحديث مصر", q: "تولى محمد علي حكم مصر عام:", options: ["1805", "1798", "1811", "1820"], correct: 0, difficulty: "easy" },
  { id: "hi-ch2-02", subject: "تاريخ", unit: "الفصل الثاني: عصر محمد علي", lesson: "محمد علي وتحديث مصر", q: "أبرز إصلاحاته العسكرية:", options: ["إنشاء الجيش النظامي بمساعدة فرنسية", "الاعتماد على الجيش العثماني", "إلغاء الجيش تماماً", "الاعتماد على المرتزقة"], correct: 0, difficulty: "medium" },
  { id: "hi-ch2-03", subject: "تاريخ", unit: "الفصل الثاني: عصر محمد علي", lesson: "محمد علي وتحديث مصر", q: "مذبحة القلعة 1811 استهدفت:", options: ["القضاء على نفوذ المماليك", "القضاء على العلماء", "مقاومة الاحتلال الفرنسي", "إزالة القوات العثمانية"], correct: 0, difficulty: "medium" },
  { id: "hi-ch2-04", subject: "تاريخ", unit: "الفصل الثاني: عصر محمد علي", lesson: "محمد علي وتحديث مصر", q: "أنشأ محمد علي مدرسة الطب 1827 بإشراف:", options: ["كلوت بك", "سيلفستر دي ساسي", "دروفيتي", "فيليكس منجان"], correct: 0, difficulty: "hard" },
  { id: "hi-ch2-05", subject: "تاريخ", unit: "الفصل الثاني: عصر محمد علي", lesson: "محمد علي وتحديث مصر", q: "معاهدة لندن 1840 أجبرت مصر على:", options: ["التخلي عن الشام والاكتفاء بمصر وراثياً", "دفع غرامة حربية", "فتح قناة السويس", "إلغاء الجيش النظامي"], correct: 0, difficulty: "hard" },

  { id: "hi-ch3-01", subject: "تاريخ", unit: "الفصل الثالث: من إسماعيل إلى الثورة العرابية", lesson: "عصر الخديو إسماعيل والثورة العرابية", q: "افتُتحت قناة السويس عام:", options: ["1869", "1875", "1882", "1863"], correct: 0, difficulty: "easy" },
  { id: "hi-ch3-02", subject: "تاريخ", unit: "الفصل الثالث: من إسماعيل إلى الثورة العرابية", lesson: "عصر الخديو إسماعيل والثورة العرابية", q: "قائد الثورة العرابية:", options: ["أحمد عرابي", "مصطفى كامل", "سعد زغلول", "محمد فريد"], correct: 0, difficulty: "easy" },
  { id: "hi-ch3-03", subject: "تاريخ", unit: "الفصل الثالث: من إسماعيل إلى الثورة العرابية", lesson: "عصر الخديو إسماعيل والثورة العرابية", q: "تراكم الديون في عهد إسماعيل أدى إلى:", options: ["الرقابة الثنائية الإنجليزية الفرنسية على المالية", "الحماية الفرنسية المنفردة", "الاستقلال الكامل", "التدخل العثماني"], correct: 0, difficulty: "medium" },
  { id: "hi-ch3-04", subject: "تاريخ", unit: "الفصل الثالث: من إسماعيل إلى الثورة العرابية", lesson: "عصر الخديو إسماعيل والثورة العرابية", q: "انتهت الثورة العرابية بـ:", options: ["معركة التل الكبير 1882 والاحتلال البريطاني", "مفاوضات سلمية", "انتصار عرابي", "تدخل عثماني"], correct: 0, difficulty: "medium" },
  { id: "hi-ch3-05", subject: "تاريخ", unit: "الفصل الثالث: من إسماعيل إلى الثورة العرابية", lesson: "عصر الخديو إسماعيل والثورة العرابية", q: "شعار الثورة العرابية:", options: ["مصر للمصريين", "الاستقلال أو الموت", "الجلاء أو الفناء", "الوحدة والحرية"], correct: 0, difficulty: "easy" },

  { id: "hi-ch4-01", subject: "تاريخ", unit: "الفصل الرابع: الاحتلال البريطاني والمقاومة الوطنية", lesson: "الاحتلال البريطاني ومقاومته", q: "بدأ الاحتلال البريطاني عام:", options: ["1882", "1869", "1875", "1900"], correct: 0, difficulty: "easy" },
  { id: "hi-ch4-02", subject: "تاريخ", unit: "الفصل الرابع: الاحتلال البريطاني والمقاومة الوطنية", lesson: "الاحتلال البريطاني ومقاومته", q: "أسس مصطفى كامل:", options: ["الحزب الوطني", "حزب الأمة", "حزب الوفد", "الحزب الاشتراكي"], correct: 0, difficulty: "easy" },
  { id: "hi-ch4-03", subject: "تاريخ", unit: "الفصل الرابع: الاحتلال البريطاني والمقاومة الوطنية", lesson: "الاحتلال البريطاني ومقاومته", q: "حادثة دنشواي 1906 أثارت:", options: ["موجة غضب وطني ضد الاحتلال", "استسلام الحركة الوطنية", "مفاوضات سلمية ناجحة", "تعاطف بريطاني"], correct: 0, difficulty: "medium" },
  { id: "hi-ch4-04", subject: "تاريخ", unit: "الفصل الرابع: الاحتلال البريطاني والمقاومة الوطنية", lesson: "الاحتلال البريطاني ومقاومته", q: "أعلنت بريطانيا الحماية على مصر رسمياً عام:", options: ["1914", "1882", "1906", "1919"], correct: 0, difficulty: "medium" },
  { id: "hi-ch4-05", subject: "تاريخ", unit: "الفصل الرابع: الاحتلال البريطاني والمقاومة الوطنية", lesson: "الاحتلال البريطاني ومقاومته", q: "جريدة اللواء أسسها:", options: ["مصطفى كامل", "محمد عبده", "سعد زغلول", "أحمد لطفي السيد"], correct: 0, difficulty: "hard" },

  { id: "hi-ch5-01", subject: "تاريخ", unit: "الفصل الخامس: ثورة 1919", lesson: "ثورة 1919 وما بعدها", q: "اندلعت ثورة 1919 بسبب:", options: ["نفي سعد زغلول ورفاقه إلى مالطا", "اغتيال مصطفى كامل", "إعلان الحرب العالمية", "إلغاء الحماية"], correct: 0, difficulty: "easy" },
  { id: "hi-ch5-02", subject: "تاريخ", unit: "الفصل الخامس: ثورة 1919", lesson: "ثورة 1919 وما بعدها", q: "تصريح 28 فبراير 1922:", options: ["أعلن استقلال مصر مع أربعة تحفظات لصالح بريطانيا", "أعلن الجلاء التام", "منح مصر الحكم الذاتي الكامل", "ألغى الحماية دون قيود"], correct: 0, difficulty: "medium" },
  { id: "hi-ch5-03", subject: "تاريخ", unit: "الفصل الخامس: ثورة 1919", lesson: "ثورة 1919 وما بعدها", q: "مُيِّزت ثورة 1919 بأنها:", options: ["شارك فيها رجال ونساء ومسلمون وأقباط", "اقتصرت على الطلاب", "كانت عسكرية بحتة", "انطلقت من الريف فقط"], correct: 0, difficulty: "easy" },
  { id: "hi-ch5-04", subject: "تاريخ", unit: "الفصل الخامس: ثورة 1919", lesson: "ثورة 1919 وما بعدها", q: "تشكّل الوفد المصري في نوفمبر 1918 برئاسة:", options: ["سعد زغلول", "مصطفى النحاس", "أحمد ماهر", "إسماعيل صدقي"], correct: 0, difficulty: "easy" },
  { id: "hi-ch5-05", subject: "تاريخ", unit: "الفصل الخامس: ثورة 1919", lesson: "ثورة 1919 وما بعدها", q: "أوصى تقرير ملنر 1921 بـ:", options: ["منح مصر استقلالاً مقيداً مع مصالح بريطانية", "الجلاء التام الفوري", "إعلان الجمهورية", "إلغاء الحماية دون قيود"], correct: 0, difficulty: "medium" },

  { id: "hi-ch6-01", subject: "تاريخ", unit: "الفصل السادس: مصر بين الحربين العالميتين", lesson: "مصر بين 1919 و1952", q: "صدر الدستور المصري الأول عام:", options: ["1923", "1919", "1936", "1952"], correct: 0, difficulty: "easy" },
  { id: "hi-ch6-02", subject: "تاريخ", unit: "الفصل السادس: مصر بين الحربين العالميتين", lesson: "مصر بين 1919 و1952", q: "معاهدة 1936 نصت على:", options: ["الجلاء البريطاني بعد 20 عاماً مع البقاء في قناة السويس", "الجلاء الفوري الكامل", "تمديد الاحتلال أجلاً غير مسمى", "إلغاء الحماية"], correct: 0, difficulty: "medium" },
  { id: "hi-ch6-03", subject: "تاريخ", unit: "الفصل السادس: مصر بين الحربين العالميتين", lesson: "مصر بين 1919 و1952", q: "أُسست جمعية الإخوان المسلمين 1928 على يد:", options: ["حسن البنا", "سيد قطب", "مصطفى النحاس", "حسن الهضيبي"], correct: 0, difficulty: "easy" },
  { id: "hi-ch6-04", subject: "تاريخ", unit: "الفصل السادس: مصر بين الحربين العالميتين", lesson: "مصر بين 1919 و1952", q: "حادثة 4 فبراير 1942 أضرّت بصورة:", options: ["حزب الوفد والملك فاروق معاً", "الإخوان المسلمين فقط", "الحركة الشيوعية فقط", "الأحزاب الليبرالية فقط"], correct: 0, difficulty: "hard" },
  { id: "hi-ch6-05", subject: "تاريخ", unit: "الفصل السادس: مصر بين الحربين العالميتين", lesson: "مصر بين 1919 و1952", q: "حرب فلسطين 1948 وأثرها:", options: ["كشفت فساد النظام وأشعلت روح الثورة", "حققت انتصاراً عسكرياً", "وحّدت الأحزاب المصرية", "أبعدت الجيش عن السياسة"], correct: 0, difficulty: "medium" },

  { id: "hi-ch7-01", subject: "تاريخ", unit: "الفصل السابع: ثورة يوليو 1952", lesson: "ثورة 23 يوليو 1952", q: "قامت ثورة يوليو 1952 بـ:", options: ["تنظيم الضباط الأحرار بقيادة نجيب وناصر", "حزب الوفد وحده", "الإخوان وحدهم", "الملك فاروق"], correct: 0, difficulty: "easy" },
  { id: "hi-ch7-02", subject: "تاريخ", unit: "الفصل السابع: ثورة يوليو 1952", lesson: "ثورة 23 يوليو 1952", q: "قانون الإصلاح الزراعي 1952 حدّد الملكية الزراعية بـ:", options: ["200 فدان للفرد", "500 فدان", "100 فدان", "1000 فدان"], correct: 0, difficulty: "medium" },
  { id: "hi-ch7-03", subject: "تاريخ", unit: "الفصل السابع: ثورة يوليو 1952", lesson: "ثورة 23 يوليو 1952", q: "أمَّم عبد الناصر شركة قناة السويس عام:", options: ["1956", "1952", "1958", "1961"], correct: 0, difficulty: "easy" },
  { id: "hi-ch7-04", subject: "تاريخ", unit: "الفصل السابع: ثورة يوليو 1952", lesson: "ثورة 23 يوليو 1952", q: "نتيجة العدوان الثلاثي 1956:", options: ["انسحاب القوى المعتدية وانتصار مصر دبلوماسياً", "احتلال سيناء طويل الأمد", "هزيمة مصرية كاملة", "تنازل ناصر عن القناة"], correct: 0, difficulty: "medium" },
  { id: "hi-ch7-05", subject: "تاريخ", unit: "الفصل السابع: ثورة يوليو 1952", lesson: "ثورة 23 يوليو 1952", q: "السد العالي الافتتاح الرسمي كان في عهد:", options: ["السادات (1971) بعد أن بدأه ناصر", "محمد نجيب", "الملك فاروق", "السادات فقط دون علاقة بناصر"], correct: 0, difficulty: "hard" },

  { id: "hi-ch8-01", subject: "تاريخ", unit: "الفصل الثامن: مصر المعاصرة", lesson: "مصر من السادات حتى اليوم", q: "وقّعت مصر معاهدة السلام مع إسرائيل 1979 في عهد:", options: ["أنور السادات", "جمال عبد الناصر", "حسني مبارك", "محمد نجيب"], correct: 0, difficulty: "easy" },
  { id: "hi-ch8-02", subject: "تاريخ", unit: "الفصل الثامن: مصر المعاصرة", lesson: "مصر من السادات حتى اليوم", q: "اتفاقية كامب ديفيد 1978 نصت على:", options: ["إطار للسلام وإعادة سيناء لمصر", "توحيد الدول العربية", "حل القضية الفلسطينية نهائياً", "انسحاب إسرائيل من كل الأراضي"], correct: 0, difficulty: "medium" },
  { id: "hi-ch8-03", subject: "تاريخ", unit: "الفصل الثامن: مصر المعاصرة", lesson: "مصر من السادات حتى اليوم", q: "ثورة 25 يناير 2011 أدت إلى:", options: ["تنحي مبارك وانتقال السلطة للمجلس العسكري", "عودة النظام الملكي", "انقلاب عسكري مباشر", "انتخاب مبارك مجدداً"], correct: 0, difficulty: "easy" },
  { id: "hi-ch8-04", subject: "تاريخ", unit: "الفصل الثامن: مصر المعاصرة", lesson: "مصر من السادات حتى اليوم", q: "جاءت ثورة 30 يونيو 2013 استجابةً لـ:", options: ["مظاهرات شعبية واسعة ضد حكم الإخوان", "غزو خارجي", "انقلاب بدون دوافع شعبية", "أزمة اقتصادية فقط"], correct: 0, difficulty: "medium" },
  { id: "hi-ch8-05", subject: "تاريخ", unit: "الفصل الثامن: مصر المعاصرة", lesson: "مصر من السادات حتى اليوم", q: "سياسة الانفتاح الاقتصادي استهدفت:", options: ["جذب الاستثمار الأجنبي وتحرير الاقتصاد", "تأميم القطاع الخاص", "تطوير الزراعة فقط", "إغلاق السوق أمام المنافسة"], correct: 0, difficulty: "hard" },

  // ═══════════════════════════════════════════════════════
  // جغرافيا (Geography)
  // ═══════════════════════════════════════════════════════

  { id: "ge-u0-01", subject: "جغرافيا", unit: "مقدمة: الخريطة السياسية", lesson: "الخريطة السياسية للعالم", q: "الخريطة السياسية تعكس:", options: ["توزيع الدول والحدود السياسية", "التضاريس الطبيعية فقط", "التوزيع السكاني", "الموارد الاقتصادية"], correct: 0, difficulty: "easy" },
  { id: "ge-u0-02", subject: "جغرافيا", unit: "مقدمة: الخريطة السياسية", lesson: "الخريطة السياسية للعالم", q: "عدد الدول الأعضاء في الأمم المتحدة:", options: ["193 دولة", "150 دولة", "220 دولة", "170 دولة"], correct: 0, difficulty: "medium" },
  { id: "ge-u0-03", subject: "جغرافيا", unit: "مقدمة: الخريطة السياسية", lesson: "الخريطة السياسية للعالم", q: "أكبر دول العالم مساحةً:", options: ["روسيا الاتحادية", "كندا", "الصين", "الولايات المتحدة"], correct: 0, difficulty: "easy" },
  { id: "ge-u0-04", subject: "جغرافيا", unit: "مقدمة: الخريطة السياسية", lesson: "الخريطة السياسية للعالم", q: "الدولة الحبيسة:", options: ["دولة لا تطل على أي بحر أو محيط", "دولة جزرية", "دولة ساحلية", "دولة ذات حدود طويلة"], correct: 0, difficulty: "medium" },
  { id: "ge-u0-05", subject: "جغرافيا", unit: "مقدمة: الخريطة السياسية", lesson: "الخريطة السياسية للعالم", q: "مبدأ السيادة يعني:", options: ["حق الدولة في تنظيم شؤونها دون تدخل خارجي", "حق الاحتلال العسكري", "التبعية للقوى الكبرى", "المشاركة في التكتلات الإقليمية"], correct: 0, difficulty: "hard" },

  { id: "ge-u1-l1-01", subject: "جغرافيا", unit: "الوحدة الأولى: مفهوم الدولة والحدود", lesson: "مقومات الدولة", q: "مقومات الدولة الحديثة الأربعة:", options: ["الإقليم والشعب والحكومة والسيادة", "الجيش والاقتصاد والدستور والعلم", "المساحة والسكان والموارد والجيش", "الحكومة والدستور والعاصمة والجيش"], correct: 0, difficulty: "easy" },
  { id: "ge-u1-l1-02", subject: "جغرافيا", unit: "الوحدة الأولى: مفهوم الدولة والحدود", lesson: "مقومات الدولة", q: "السيادة الوطنية تعني:", options: ["حق الدولة الكامل في حكم إقليمها دون سلطة خارجية", "القوة العسكرية", "الثروة الاقتصادية", "حجم التمثيل الدبلوماسي"], correct: 0, difficulty: "easy" },
  { id: "ge-u1-l1-03", subject: "جغرافيا", unit: "الوحدة الأولى: مفهوم الدولة والحدود", lesson: "مقومات الدولة", q: "أي من التالي ليس من مقومات الدولة؟", options: ["الثروة الطبيعية", "الإقليم", "الشعب", "السيادة"], correct: 0, difficulty: "medium" },
  { id: "ge-u1-l1-04", subject: "جغرافيا", unit: "الوحدة الأولى: مفهوم الدولة والحدود", lesson: "مقومات الدولة", q: "الدولة الجزرية تتميز بـ:", options: ["إقليمها يقع في البحر ويصعب تحديد حدودها البرية", "أكبر اقتصاد", "أكبر قوة عسكرية", "موقع جغرافي مركزي"], correct: 0, difficulty: "medium" },
  { id: "ge-u1-l1-05", subject: "جغرافيا", unit: "الوحدة الأولى: مفهوم الدولة والحدود", lesson: "مقومات الدولة", q: "الشعب كمقوم للدولة يشير إلى:", options: ["مجموعة بشرية مستقرة ذات ولاء مشترك", "سكان الريف فقط", "الأقلية الحاكمة", "السكان الأصليون دون المهاجرين"], correct: 0, difficulty: "hard" },

  { id: "ge-u1-l2-01", subject: "جغرافيا", unit: "الوحدة الأولى: مفهوم الدولة والحدود", lesson: "الحدود السياسية", q: "الحدود الطبيعية تعتمد على:", options: ["معالم جغرافية كالأنهار والجبال", "خطوط الطول والعرض فقط", "اتفاقيات دولية تحكيمية", "التوزيع العرقي"], correct: 0, difficulty: "easy" },
  { id: "ge-u1-l2-02", subject: "جغرافيا", unit: "الوحدة الأولى: مفهوم الدولة والحدود", lesson: "الحدود السياسية", q: "الحدود الهندسية (الفلكية) تعتمد على:", options: ["خطوط الطول والعرض الجغرافية", "المعالم الطبيعية", "الحدود العرقية", "التسويات الاستعمارية"], correct: 0, difficulty: "easy" },
  { id: "ge-u1-l2-03", subject: "جغرافيا", unit: "الوحدة الأولى: مفهوم الدولة والحدود", lesson: "الحدود السياسية", q: "أهمية الحدود السياسية:", options: ["تحديد نطاق السيادة وتنظيم الهجرة والتجارة", "الحماية العسكرية فقط", "تحديد الهوية الثقافية فقط", "تنظيم الموارد الطبيعية فقط"], correct: 0, difficulty: "medium" },
  { id: "ge-u1-l2-04", subject: "جغرافيا", unit: "الوحدة الأولى: مفهوم الدولة والحدود", lesson: "الحدود السياسية", q: "الحدود الإثنية (العرقية) تعتمد على:", options: ["التوزيع الجغرافي للمجموعات البشرية المتجانسة", "خطوط الطول والعرض", "المعالم الطبيعية", "قرارات الأمم المتحدة"], correct: 0, difficulty: "medium" },
  { id: "ge-u1-l2-05", subject: "جغرافيا", unit: "الوحدة الأولى: مفهوم الدولة والحدود", lesson: "الحدود السياسية", q: "إشكالية الحدود الاستعمارية تتجلى في:", options: ["تجاهلها للتوزيع العرقي مما أفرز نزاعات في أفريقيا", "كونها أكثر استقراراً", "اعتمادها على المعالم الطبيعية", "قبولها الكامل من السكان"], correct: 0, difficulty: "hard" },

  { id: "ge-u2-l1-01", subject: "جغرافيا", unit: "الوحدة الثانية: التكتلات الاقتصادية", lesson: "مفهوم التكتل الاقتصادي", q: "التكتل الاقتصادي يهدف إلى:", options: ["تعزيز التجارة والتعاون بين الأعضاء", "الاندماج السياسي الكامل", "توحيد الثقافات", "إلغاء الحدود نهائياً"], correct: 0, difficulty: "easy" },
  { id: "ge-u2-l1-02", subject: "جغرافيا", unit: "الوحدة الثانية: التكتلات الاقتصادية", lesson: "مفهوم التكتل الاقتصادي", q: "منظمة التجارة العالمية WTO تسعى إلى:", options: ["تحرير التجارة الدولية وخفض الرسوم الجمركية", "إنشاء عملة عالمية", "توزيع الموارد الطبيعية", "الإشراف على الانتخابات"], correct: 0, difficulty: "easy" },
  { id: "ge-u2-l1-03", subject: "جغرافيا", unit: "الوحدة الثانية: التكتلات الاقتصادية", lesson: "مفهوم التكتل الاقتصادي", q: "منطقة التجارة الحرة تعني:", options: ["إلغاء الرسوم الجمركية بين الأعضاء مع الاحتفاظ بسياسات خارجية مختلفة", "توحيد السياسات الاقتصادية كلياً", "إنشاء عملة موحدة", "إلغاء الحدود السياسية"], correct: 0, difficulty: "medium" },
  { id: "ge-u2-l1-04", subject: "جغرافيا", unit: "الوحدة الثانية: التكتلات الاقتصادية", lesson: "مفهوم التكتل الاقتصادي", q: "الاتحاد الجمركي يختلف عن منطقة التجارة الحرة بأنه:", options: ["يوحّد التعريفات الجمركية تجاه الخارج", "يلغي كل الرسوم داخلياً وخارجياً", "يشترط عملة موحدة", "لا يسمح بانتقال العمالة"], correct: 0, difficulty: "hard" },
  { id: "ge-u2-l1-05", subject: "جغرافيا", unit: "الوحدة الثانية: التكتلات الاقتصادية", lesson: "مفهوم التكتل الاقتصادي", q: "أعلى درجات التكامل الاقتصادي:", options: ["الاتحاد الاقتصادي الكامل (توحيد السياسات النقدية والمالية)", "منطقة التجارة الحرة", "الاتحاد الجمركي", "السوق المشتركة"], correct: 0, difficulty: "hard" },

  { id: "ge-u2-l2-01", subject: "جغرافيا", unit: "الوحدة الثانية: التكتلات الاقتصادية", lesson: "الاتحاد الأوروبي", q: "تأسس الاتحاد الأوروبي رسمياً بموجب:", options: ["معاهدة ماستريخت 1993", "اتفاقية روما 1957", "معاهدة لشبونة 2007", "اتفاقية شنغن 1985"], correct: 0, difficulty: "medium" },
  { id: "ge-u2-l2-02", subject: "جغرافيا", unit: "الوحدة الثانية: التكتلات الاقتصادية", lesson: "الاتحاد الأوروبي", q: "العملة الموحدة للاتحاد الأوروبي:", options: ["اليورو", "الجنيه الأوروبي", "الدولار الأوروبي", "الكراون"], correct: 0, difficulty: "easy" },
  { id: "ge-u2-l2-03", subject: "جغرافيا", unit: "الوحدة الثانية: التكتلات الاقتصادية", lesson: "الاتحاد الأوروبي", q: "من أبرز مؤسسات الاتحاد الأوروبي:", options: ["البرلمان الأوروبي والمفوضية ومحكمة العدل", "مجلس الأمن والأمانة العامة", "صندوق النقد والبنك الدولي", "الناتو ومنظمة الأمن والتعاون"], correct: 0, difficulty: "medium" },
  { id: "ge-u2-l2-04", subject: "جغرافيا", unit: "الوحدة الثانية: التكتلات الاقتصادية", lesson: "الاتحاد الأوروبي", q: "Brexit جاء نتيجة:", options: ["استفتاء شعبي 2016 صوّت بالخروج", "قرار من البرلمان الأوروبي", "انهيار اقتصادي", "غزو عسكري"], correct: 0, difficulty: "easy" },
  { id: "ge-u2-l2-05", subject: "جغرافيا", unit: "الوحدة الثانية: التكتلات الاقتصادية", lesson: "الاتحاد الأوروبي", q: "اتفاقية شنغن تسمح بـ:", options: ["حرية التنقل بين الدول الموقّعة دون تأشيرة", "توحيد الضرائب", "إنشاء جيش أوروبي موحد", "منح الجنسية الأوروبية الموحدة"], correct: 0, difficulty: "medium" },

  { id: "ge-u2-l3-01", subject: "جغرافيا", unit: "الوحدة الثانية: التكتلات الاقتصادية", lesson: "التكتلات الإقليمية الأخرى", q: "آسيان (ASEAN) تضم دول:", options: ["جنوب شرق آسيا", "شرق آسيا", "جنوب آسيا", "آسيا الوسطى"], correct: 0, difficulty: "easy" },
  { id: "ge-u2-l3-02", subject: "جغرافيا", unit: "الوحدة الثانية: التكتلات الاقتصادية", lesson: "التكتلات الإقليمية الأخرى", q: "الاتحاد الأفريقي خلَف:", options: ["منظمة الوحدة الأفريقية (OAU)", "منظمة الأمم المتحدة", "الكوميسا", "الإيكواس"], correct: 0, difficulty: "medium" },
  { id: "ge-u2-l3-03", subject: "جغرافيا", unit: "الوحدة الثانية: التكتلات الاقتصادية", lesson: "التكتلات الإقليمية الأخرى", q: "جامعة الدول العربية أُسست عام:", options: ["1945", "1948", "1960", "1973"], correct: 0, difficulty: "medium" },
  { id: "ge-u2-l3-04", subject: "جغرافيا", unit: "الوحدة الثانية: التكتلات الاقتصادية", lesson: "التكتلات الإقليمية الأخرى", q: "نافتا (NAFTA) تجمع:", options: ["الولايات المتحدة وكندا والمكسيك", "الولايات المتحدة وأوروبا", "كندا والمكسيك والبرازيل", "دول أمريكا الجنوبية"], correct: 0, difficulty: "easy" },
  { id: "ge-u2-l3-05", subject: "جغرافيا", unit: "الوحدة الثانية: التكتلات الاقتصادية", lesson: "التكتلات الإقليمية الأخرى", q: "أهمية التكتلات للدول النامية:", options: ["تعزيز قدرتها التفاوضية وخلق أسواق أكبر", "الاستغناء الكامل عن الدول الكبرى", "إلغاء الديون الخارجية", "الاستقلال السياسي الكامل"], correct: 0, difficulty: "hard" },

  { id: "ge-u3-l1-01", subject: "جغرافيا", unit: "الوحدة الثالثة: العلاقات الدولية", lesson: "طبيعة العلاقات الدولية", q: "العلاقات الدولية هي:", options: ["مجموعة التفاعلات بين الدول سياسياً واقتصادياً وثقافياً", "الحروب والنزاعات فقط", "التبادل التجاري فحسب", "التحالفات العسكرية"], correct: 0, difficulty: "easy" },
  { id: "ge-u3-l1-02", subject: "جغرافيا", unit: "الوحدة الثالثة: العلاقات الدولية", lesson: "طبيعة العلاقات الدولية", q: "مبدأ عدم التدخل في الشؤون الداخلية مقنَّن في:", options: ["ميثاق الأمم المتحدة", "اتفاقية جنيف", "معاهدة ويستفاليا فقط", "إعلان حقوق الإنسان"], correct: 0, difficulty: "medium" },
  { id: "ge-u3-l1-03", subject: "جغرافيا", unit: "الوحدة الثالثة: العلاقات الدولية", lesson: "طبيعة العلاقات الدولية", q: "القوة الناعمة (Soft Power) تعتمد على:", options: ["الثقافة والدبلوماسية والقيم", "الترسانة العسكرية", "العقوبات الاقتصادية", "التدخل العسكري"], correct: 0, difficulty: "medium" },
  { id: "ge-u3-l1-04", subject: "جغرافيا", unit: "الوحدة الثالثة: العلاقات الدولية", lesson: "طبيعة العلاقات الدولية", q: "نظام القطبية الثنائية ميّز فترة:", options: ["الحرب الباردة بين أمريكا والاتحاد السوفيتي", "ما بعد 2001", "ما بعد 1990", "الحرب العالمية الأولى"], correct: 0, difficulty: "hard" },
  { id: "ge-u3-l1-05", subject: "جغرافيا", unit: "الوحدة الثالثة: العلاقات الدولية", lesson: "طبيعة العلاقات الدولية", q: "النظام الدولي بعد 1991 يُوصف بأنه:", options: ["أحادي القطبية مع صعود قوى ناشئة متعددة", "ثنائي القطبية كالحرب الباردة", "متعدد الأقطاب المتساوية", "بلا قطب واضح"], correct: 0, difficulty: "hard" },

  { id: "ge-u3-l2-01", subject: "جغرافيا", unit: "الوحدة الثالثة: العلاقات الدولية", lesson: "منظمة الأمم المتحدة", q: "تأسست الأمم المتحدة عام:", options: ["1945", "1919", "1948", "1950"], correct: 0, difficulty: "easy" },
  { id: "ge-u3-l2-02", subject: "جغرافيا", unit: "الوحدة الثالثة: العلاقات الدولية", lesson: "منظمة الأمم المتحدة", q: "الأعضاء الدائمون في مجلس الأمن:", options: ["الولايات المتحدة وروسيا والصين وبريطانيا وفرنسا", "الدول الخمس الكبرى اقتصادياً", "أعضاء منتخبون يتغيرون", "الدول النووية فقط"], correct: 0, difficulty: "easy" },
  { id: "ge-u3-l2-03", subject: "جغرافيا", unit: "الوحدة الثالثة: العلاقات الدولية", lesson: "منظمة الأمم المتحدة", q: "حق النقض (الفيتو) يمنح:", options: ["الأعضاء الدائمين الخمسة صلاحية رفض أي قرار", "أي عضو في المجلس", "الجمعية العامة", "الأمين العام"], correct: 0, difficulty: "medium" },
  { id: "ge-u3-l2-04", subject: "جغرافيا", unit: "الوحدة الثالثة: العلاقات الدولية", lesson: "منظمة الأمم المتحدة", q: "الجمعية العامة للأمم المتحدة تتضمن:", options: ["جميع الدول الأعضاء بصوت متساوٍ", "الدول الكبرى فقط", "أعضاء مجلس الأمن", "الدول النامية فقط"], correct: 0, difficulty: "medium" },
  { id: "ge-u3-l2-05", subject: "جغرافيا", unit: "الوحدة الثالثة: العلاقات الدولية", lesson: "منظمة الأمم المتحدة", q: "من الانتقادات الموجهة لمجلس الأمن:", options: ["الفيتو يُعيق اتخاذ قرارات عادلة", "يضم دولاً كثيرة جداً", "لا صلاحيات قانونية له", "يجتمع نادراً"], correct: 0, difficulty: "hard" },

  { id: "ge-u3-l3-01", subject: "جغرافيا", unit: "الوحدة الثالثة: العلاقات الدولية", lesson: "السياسة الخارجية", q: "السياسة الخارجية للدولة هي:", options: ["مبادئ وأهداف تُوجّه تعاملها مع الدول الأخرى", "القوانين الداخلية", "الخطط الاقتصادية الداخلية", "برامج التنمية المحلية"], correct: 0, difficulty: "easy" },
  { id: "ge-u3-l3-02", subject: "جغرافيا", unit: "الوحدة الثالثة: العلاقات الدولية", lesson: "السياسة الخارجية", q: "أدوات السياسة الخارجية:", options: ["الدبلوماسية والقوة الاقتصادية والعسكرية والناعمة", "القوانين الداخلية فقط", "الانتخابات الدولية", "مؤسسات التعليم فحسب"], correct: 0, difficulty: "easy" },
  { id: "ge-u3-l3-03", subject: "جغرافيا", unit: "الوحدة الثالثة: العلاقات الدولية", lesson: "السياسة الخارجية", q: "الموقع الجغرافي يؤثر على السياسة الخارجية بـ:", options: ["تحديد التهديدات والشركاء الاستراتيجيين", "تحديد الأيديولوجيا فقط", "تحديد نوع النظام السياسي", "لا يؤثر عليها"], correct: 0, difficulty: "medium" },
  { id: "ge-u3-l3-04", subject: "جغرافيا", unit: "الوحدة الثالثة: العلاقات الدولية", lesson: "السياسة الخارجية", q: "سياسة الحياد تعني:", options: ["عدم الانحياز لأي طرف في النزاعات الدولية", "العزلة الكاملة", "رفض عضوية الأمم المتحدة", "الموافقة على كل القرارات"], correct: 0, difficulty: "medium" },
  { id: "ge-u3-l3-05", subject: "جغرافيا", unit: "الوحدة الثالثة: العلاقات الدولية", lesson: "السياسة الخارجية", q: "الدبلوماسية الوقائية تهدف إلى:", options: ["منع النزاعات قبل اندلاعها عبر الحوار والوساطة", "التدخل العسكري المبكر", "فرض العقوبات الاقتصادية", "إعلان الحرب كرادع"], correct: 0, difficulty: "hard" },

  { id: "ge-u4-l1-01", subject: "جغرافيا", unit: "الوحدة الرابعة: مصر والعلاقات الدولية", lesson: "المكانة الاستراتيجية لمصر", q: "موقع مصر يجعلها ملتقى:", options: ["قارات أفريقيا وآسيا وأوروبا وطريق بحري دولي", "أفريقيا وآسيا فقط", "حوض البحر الأبيض فقط", "العالم العربي فقط"], correct: 0, difficulty: "easy" },
  { id: "ge-u4-l1-02", subject: "جغرافيا", unit: "الوحدة الرابعة: مصر والعلاقات الدولية", lesson: "المكانة الاستراتيجية لمصر", q: "قناة السويس تربط:", options: ["البحر المتوسط بالبحر الأحمر", "النيل بالبحر الأحمر", "البحر المتوسط بالمحيط الأطلسي", "خليج السويس بخليج العقبة"], correct: 0, difficulty: "easy" },
  { id: "ge-u4-l1-03", subject: "جغرافيا", unit: "الوحدة الرابعة: مصر والعلاقات الدولية", lesson: "المكانة الاستراتيجية لمصر", q: "الدور المحوري لمصر يرتبط بـ:", options: ["حجمها السكاني وثقلها الحضاري وموقعها", "ثرواتها النفطية فقط", "قوتها العسكرية فقط", "علاقاتها مع الغرب"], correct: 0, difficulty: "medium" },
  { id: "ge-u4-l1-04", subject: "جغرافيا", unit: "الوحدة الرابعة: مصر والعلاقات الدولية", lesson: "المكانة الاستراتيجية لمصر", q: "تُعدّ مصر بوابة أفريقيا لأنها:", options: ["تربط شمال أفريقيا بجنوبها وتستضيف مقر الاتحاد الأفريقي", "أكبر دول أفريقيا مساحةً", "أغنى دول أفريقيا", "أولى دول أفريقيا في التصدير"], correct: 0, difficulty: "medium" },
  { id: "ge-u4-l1-05", subject: "جغرافيا", unit: "الوحدة الرابعة: مصر والعلاقات الدولية", lesson: "المكانة الاستراتيجية لمصر", q: "أهمية مضيق باب المندب لمصر:", options: ["المدخل الجنوبي لقناة السويس من البحر الأحمر", "حدود مصر البحرية الجنوبية", "يفصل مصر عن السودان", "لا علاقة له بمصر مباشرة"], correct: 0, difficulty: "hard" },

  { id: "ge-u4-l2-01", subject: "جغرافيا", unit: "الوحدة الرابعة: مصر والعلاقات الدولية", lesson: "علاقات مصر الإقليمية", q: "مصر عضو مؤسس في:", options: ["جامعة الدول العربية والاتحاد الأفريقي والأمم المتحدة", "حلف الناتو", "مجموعة البريكس", "الاتحاد الأوروبي"], correct: 0, difficulty: "easy" },
  { id: "ge-u4-l2-02", subject: "جغرافيا", unit: "الوحدة الرابعة: مصر والعلاقات الدولية", lesson: "علاقات مصر الإقليمية", q: "علاقات مصر مع دول حوض النيل تتمحور حول:", options: ["قضية مياه النيل وحصة مصر", "التجارة الزراعية فقط", "التعاون العسكري فقط", "السياحة المشتركة"], correct: 0, difficulty: "medium" },
  { id: "ge-u4-l2-03", subject: "جغرافيا", unit: "الوحدة الرابعة: مصر والعلاقات الدولية", lesson: "علاقات مصر الإقليمية", q: "مصر محورية في جامعة الدول العربية لأن:", options: ["القاهرة تحتضن مقرها وهي أكبر دولة عربية سكاناً", "أكبر جيش عربي", "أكبر ثروة نفطية عربية", "تحتضن القدس"], correct: 0, difficulty: "medium" },
  { id: "ge-u4-l2-04", subject: "جغرافيا", unit: "الوحدة الرابعة: مصر والعلاقات الدولية", lesson: "علاقات مصر الإقليمية", q: "علاقة مصر بالسودان ذات أهمية خاصة بسبب:", options: ["تشاركهما نهر النيل والحدود والروابط التاريخية", "الاتحاد السياسي الرسمي", "التحالف العسكري", "المصالح النفطية المشتركة"], correct: 0, difficulty: "hard" },
  { id: "ge-u4-l2-05", subject: "جغرافيا", unit: "الوحدة الرابعة: مصر والعلاقات الدولية", lesson: "علاقات مصر الإقليمية", q: "دور مصر في القضية الفلسطينية:", options: ["الوساطة والدعم الدبلوماسي وإدارة معبر رفح", "التدخل العسكري المباشر", "الاعتراض في مجلس الأمن فقط", "الدور الاقتصادي فقط"], correct: 0, difficulty: "medium" },

  { id: "ge-u4-l3-01", subject: "جغرافيا", unit: "الوحدة الرابعة: مصر والعلاقات الدولية", lesson: "علاقات مصر الدولية", q: "العلاقات المصرية الأمريكية تتأثر بـ:", options: ["اتفاقية السلام مع إسرائيل والمساعدات وملفات الأمن", "النفط فقط", "التجارة الزراعية فقط", "التعاون الثقافي فقط"], correct: 0, difficulty: "medium" },
  { id: "ge-u4-l3-02", subject: "جغرافيا", unit: "الوحدة الرابعة: مصر والعلاقات الدولية", lesson: "علاقات مصر الدولية", q: "العلاقات المصرية الصينية تطورت بسبب:", options: ["مبادرة الحزام والطريق والاستثمارات الصينية في مصر", "التحالف العسكري", "اتفاقية التجارة الحرة", "الدعم الأيديولوجي"], correct: 0, difficulty: "medium" },
  { id: "ge-u4-l3-03", subject: "جغرافيا", unit: "الوحدة الرابعة: مصر والعلاقات الدولية", lesson: "علاقات مصر الدولية", q: "العلاقات المصرية الروسية تشمل:", options: ["الطاقة النووية والسياحة والتجارة والأمن", "التحالف العسكري الرسمي فقط", "الاتحاد الاقتصادي الكامل", "التبعية السياسية"], correct: 0, difficulty: "medium" },
  { id: "ge-u4-l3-04", subject: "جغرافيا", unit: "الوحدة الرابعة: مصر والعلاقات الدولية", lesson: "علاقات مصر الدولية", q: "علاقة مصر بالاتحاد الأوروبي قائمة على:", options: ["الشراكة الأورومتوسطية والتجارة والاستثمار وقضايا الهجرة", "العضوية الكاملة في الاتحاد", "الاتحاد الجمركي فقط", "لا توجد علاقات رسمية"], correct: 0, difficulty: "hard" },
  { id: "ge-u4-l3-05", subject: "جغرافيا", unit: "الوحدة الرابعة: مصر والعلاقات الدولية", lesson: "علاقات مصر الدولية", q: "انتهاج مصر سياسة عدم الانحياز يعني:", options: ["الموازنة في علاقاتها بين القوى الكبرى وتنويع الشركاء", "الحياد التام عن أي تحالف", "الانضمام للكتلة الغربية فقط", "الانضمام للكتلة الشرقية فقط"], correct: 0, difficulty: "hard" },
];

// Extra questions live in ./questions/*.ts (10 more per lesson). Each is attached to an
// existing lesson by name; a typo in a lesson name fails loudly instead of silently vanishing.
const DIFFICULTY = { e: "easy", m: "medium", h: "hard" } as const;

function expandExtra(lessons: ExtraLesson[]): AIQuestion[] {
  const counter = new Map<string, number>(); // lesson → extra questions numbered so far
  return lessons.flatMap(({ subject, lesson, rows }) => {
    const base = BASE_QUESTIONS.find((q) => q.subject === subject && q.lesson === lesson);
    if (!base) throw new Error(`Unknown lesson in extra questions: ${subject} / ${lesson}`);
    const prefix = base.id.replace(/-\d+$/, "");
    const start = counter.get(prefix) ?? 0;
    counter.set(prefix, start + rows.length);
    return rows.map(([q, right, w1, w2, w3, d], i) => ({
      id: `${prefix}-x${String(start + i + 1).padStart(2, "0")}`,
      subject,
      unit: base.unit,
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
    ...EXTRA_EN, ...EXTRA_ST, ...EXTRA_AR, ...EXTRA_HI, ...EXTRA_GEO,
    ...EXTRA_EN_2, ...EXTRA_ST_2, ...EXTRA_AR_2, ...EXTRA_HI_2, ...EXTRA_GEO_2,
  ]),
];

// ─────────────────────────────────────────────────────────────────────────────
// SUMMARIES
// ─────────────────────────────────────────────────────────────────────────────

export const ALL_SUMMARIES: AISummary[] = [
  // English
  { subject: "إنجليزي", unit: "Unit 1: Health", lesson: "My Day in Hospital", title: "My Day in Hospital", summary: "Vocabulary and narrative writing about hospital settings, medical staff roles, and patient experiences using past tenses.", keyPoints: ["Key vocab: ward, surgeon, discharge, diagnose", "Past Simple for narrating hospital experiences", "Hospital departments and staff roles", "Formal vs informal language in medical contexts"] },
  { subject: "إنجليزي", unit: "Unit 1: Health", lesson: "Emergency Call", title: "Emergency Call", summary: "Language for emergency telephone calls: giving information clearly, using imperatives, and vocabulary for injuries and first aid.", keyPoints: ["State location first in an emergency call", "Key vocab: ambulance, unconscious, fracture, bleeding", "Imperative forms for giving urgent instructions", "Sequence language: first, then, immediately"] },
  { subject: "إنجليزي", unit: "Unit 1: Health", lesson: "Grammar: Past Perfect Simple & Continuous", title: "Past Perfect Simple & Continuous", summary: "Form and use of Past Perfect Simple (had + p.p.) and Past Perfect Continuous (had been + -ing) to describe events before other past events.", keyPoints: ["PPS: completed action before past event (had finished)", "PPC: emphasises duration before past event (had been waiting)", "Time markers: by the time, before, after, already, just", "PPC suggests an incomplete or ongoing action"] },
  { subject: "إنجليزي", unit: "Unit 1: Health", lesson: "Beyond the White Coat", title: "Beyond the White Coat", summary: "Reading about the human side of medicine — compassion, dedication, and the qualities that make great healthcare workers.", keyPoints: ["Key qualities: compassion, dedication, resilience", "Medical professions: paramedic, surgeon, specialist", "Vocabulary: devoted, committed, tireless", "Main idea: good doctors need both skill and humanity"] },
  { subject: "إنجليزي", unit: "Unit 2: The Environment", lesson: "Our Fragile Planet", title: "Our Fragile Planet", summary: "Causes and effects of environmental damage, including deforestation, pollution, and biodiversity loss.", keyPoints: ["Biodiversity loss, deforestation, plastic pollution", "Endangered species and extinction", "'Fragile' implies the Earth needs careful protection", "Cause-effect relationships in environmental writing"] },
  { subject: "إنجليزي", unit: "Unit 2: The Environment", lesson: "Climate Change", title: "Climate Change", summary: "The greenhouse effect, global warming, and language to describe causes and effects of climate change.", keyPoints: ["Greenhouse gases: CO₂, methane trap solar heat", "Renewable energy: solar, wind, hydroelectric", "Passive voice common in scientific writing", "Cause/effect connectors: as a result, due to, consequently"] },
  { subject: "إنجليزي", unit: "Unit 2: The Environment", lesson: "Grammar: Modal Verbs", title: "Modal Verbs for Advice, Obligation & Deduction", summary: "Modal verbs express degrees of obligation, advice, permission, and logical deduction.", keyPoints: ["must = strong internal obligation or logical deduction", "should/ought to = advice", "must not = prohibition", "might/could = possibility; can = ability/permission"] },
  { subject: "إنجليزي", unit: "Unit 2: The Environment", lesson: "Green Heroes", title: "Green Heroes", summary: "Reading about environmental activists and organisations working to protect the planet.", keyPoints: ["Activist: campaigns for change", "Sustainable development: meets present needs without harming the future", "Grassroots movements start with ordinary people", "Key figures: Greta Thunberg, WWF, Greenpeace"] },
  { subject: "إنجليزي", unit: "Unit 3: Science & Technology", lesson: "The Digital Age", title: "The Digital Age", summary: "Vocabulary and language about technology, the internet, artificial intelligence, and cybersecurity.", keyPoints: ["AI = machines simulating human intelligence", "Social media platforms and their impact", "Cybersecurity protects against online threats", "Cyber- prefix relates to computer/internet world"] },
  { subject: "إنجليزي", unit: "Unit 3: Science & Technology", lesson: "AI and the Future", title: "AI and the Future", summary: "Advantages and disadvantages of AI; language for writing a balanced argumentative essay.", keyPoints: ["AI advantage: speed and data processing", "AI concern: job displacement and ethical issues", "Essay structure: concession + contrast (despite, however)", "Automation = machines doing tasks automatically"] },
  { subject: "إنجليزي", unit: "Unit 3: Science & Technology", lesson: "Grammar: Conditionals", title: "2nd and 3rd Conditionals", summary: "2nd conditional (unreal present/future) and 3rd conditional (unreal past) for hypothetical situations.", keyPoints: ["2nd: If + past simple, would + infinitive", "3rd: If + past perfect, would have + p.p.", "2nd = imaginary present/future", "3rd = past regret or impossible past alternative"] },
  { subject: "إنجليزي", unit: "Unit 3: Science & Technology", lesson: "Space Exploration", title: "Space Exploration", summary: "Achievements in space exploration, key missions, vocabulary for space science.", keyPoints: ["NASA, ESA: major space agencies", "Neil Armstrong: first on the moon (1969)", "Orbit = path around a planet/star", "Space exploration expands human knowledge"] },
  { subject: "إنجليزي", unit: "Unit 4: Education", lesson: "Learning Styles", title: "Learning Styles", summary: "Understanding visual, auditory, and kinaesthetic learning styles and how they affect studying.", keyPoints: ["Visual: charts, diagrams, colour-coding", "Auditory: lectures, discussions, recordings", "Kinaesthetic: hands-on activities, movement", "Tailor = customise learning to your style"] },
  { subject: "إنجليزي", unit: "Unit 4: Education", lesson: "The Global Classroom", title: "The Global Classroom", summary: "Comparing education systems worldwide, the impact of e-learning, and global educational inequality.", keyPoints: ["E-learning uses digital technology for education", "Japan has one of the longest school years", "Scholarship = financial support for study", "Educational inequality remains a global challenge"] },
  { subject: "إنجليزي", unit: "Unit 4: Education", lesson: "Grammar: Reported Speech", title: "Reported Speech", summary: "Converting direct speech into reported speech with correct tense backshift, pronoun changes, and time expressions.", keyPoints: ["Present simple → past simple", "Present continuous → past continuous", "Questions use ask + where/if/whether", "Commands: tell + object + (not) to + infinitive"] },
  { subject: "إنجليزي", unit: "Unit 4: Education", lesson: "Bright Minds", title: "Bright Minds", summary: "Reading about great scholars throughout history and the qualities that led to their achievements.", keyPoints: ["Ibn Sina: medicine and philosophy", "Pioneer = first to do something significant", "Legacy = lasting impact after someone's life", "Curiosity and dedication are universal scholarly traits"] },
  { subject: "إنجليزي", unit: "Unit 5: Work & Business", lesson: "The Job Market", title: "The Job Market", summary: "Vocabulary for job hunting, CV writing, and interview skills in the modern job market.", keyPoints: ["CV = document summarising qualifications", "Freelance = self-employed, multiple clients", "Interview: be punctual, professional, positive", "Formal opening: I am writing to apply for…"] },
  { subject: "إنجليزي", unit: "Unit 5: Work & Business", lesson: "Entrepreneurship", title: "Entrepreneurship", summary: "Concepts of entrepreneurship, startups, and the qualities of successful business founders.", keyPoints: ["Entrepreneur starts and runs their own business", "Startup = new, often technology-based business", "Innovation = creating new ideas/products", "Resilience is the most vital entrepreneurial quality"] },
  { subject: "إنجليزي", unit: "Unit 5: Work & Business", lesson: "Grammar: Relative Clauses", title: "Relative Clauses", summary: "Defining relative clauses identify which person/thing; non-defining add extra information and use commas.", keyPoints: ["Defining: no commas, can use that/which/who", "Non-defining: uses commas, cannot use 'that'", "Whose = possession in relative clauses", "Non-defining clauses can be removed without changing core meaning"] },
  { subject: "إنجليزي", unit: "Unit 5: Work & Business", lesson: "Success Stories", title: "Success Stories", summary: "Reading about successful entrepreneurs and business leaders, focusing on perseverance and overcoming failure.", keyPoints: ["Perseverance = continuing despite difficulties", "Breakthrough = sudden major achievement", "Humble beginnings = starting with little", "Failure is often part of the path to success"] },
  { subject: "إنجليزي", unit: "Unit 6: Culture & Civilisation", lesson: "Egyptian Heritage", title: "Egyptian Heritage", summary: "Ancient Egyptian civilisation: hieroglyphics, the pyramids, pharaohs, and Egypt's cultural legacy.", keyPoints: ["Hieroglyphics: ancient Egyptian writing system", "Pyramids: royal tombs of the pharaohs", "Rosetta Stone helped decode hieroglyphics", "Heritage = traditions passed through generations"] },
  { subject: "إنجليزي", unit: "Unit 6: Culture & Civilisation", lesson: "World Cultures", title: "World Cultures", summary: "Cultural diversity, customs, stereotypes, and the effects of globalisation on local cultures.", keyPoints: ["Cultural diversity: many cultures coexist", "Stereotype = fixed oversimplified idea about a group", "Globalisation increases cultural exchange", "Respect and understanding are key to coexistence"] },
  { subject: "إنجليزي", unit: "Unit 6: Culture & Civilisation", lesson: "Grammar: Passive Voice", title: "Passive Voice", summary: "Formation and use of passive voice across all tenses; used when the action is more important than the doer.", keyPoints: ["Form: be + past participle", "Use when doer is unknown, obvious, or unimportant", "Common in scientific/historical/formal writing", "By + agent = optional in passive sentences"] },
  { subject: "إنجليزي", unit: "Unit 6: Culture & Civilisation", lesson: "Crossroads of Civilisations", title: "Crossroads of Civilisations", summary: "Egypt's unique geographical position connecting three continents and its role as a centre of ancient civilisation.", keyPoints: ["Egypt links Africa, Asia, and Europe", "Suez Canal: Mediterranean ↔ Red Sea", "Egypt was a centre of trade and knowledge exchange", "Civilisation = advanced stage of human social development"] },

  // Statistics
  { subject: "إحصاء", unit: "الوحدة الأولى: الارتباط", lesson: "مفهوم الارتباط", title: "مفهوم الارتباط", summary: "دراسة العلاقة بين متغيرين وتمثيلها بمخطط الانتشار.", keyPoints: ["r تتراوح بين −1 و +1", "r موجب = طردي، r سالب = عكسي", "r = 0 يعني غياب العلاقة الخطية", "مخطط الانتشار يُصوِّر العلاقة بيانياً"] },
  { subject: "إحصاء", unit: "الوحدة الأولى: الارتباط", lesson: "معامل ارتباط بيرسون", title: "معامل ارتباط بيرسون", summary: "قياس شدة واتجاه العلاقة الخطية بالانحرافات عن المتوسط.", keyPoints: ["يُطبَّق على البيانات الكمية الطبيعية التوزيع", "القيم القريبة من ±1 تعني ارتباطاً قوياً", "القيم القريبة من 0 تعني ارتباطاً ضعيفاً", "r = Σ(x−x̄)(y−ȳ) / √[Σ(x−x̄)²·Σ(y−ȳ)²]"] },
  { subject: "إحصاء", unit: "الوحدة الأولى: الارتباط", lesson: "معامل ارتباط سبيرمان", title: "معامل ارتباط سبيرمان", summary: "قياس الارتباط للبيانات الرتبية باستخدام فروق الرتب.", keyPoints: ["rs = 1 − 6Σd² / n(n²−1)", "d = فرق الرتبتين لكل زوج", "يُستخدم مع البيانات الرتبية", "لا يشترط التوزيع الطبيعي"] },
  { subject: "إحصاء", unit: "الوحدة الثانية: الانحدار", lesson: "خط الانحدار البسيط", title: "خط الانحدار البسيط", summary: "المعادلة الخطية بطريقة المربعات الصغرى.", keyPoints: ["ŷ = a + bx", "b = Σ(x−x̄)(y−ȳ) / Σ(x−x̄)²", "a = ȳ − b·x̄", "الخط يمر دائماً بـ (x̄, ȳ)"] },
  { subject: "إحصاء", unit: "الوحدة الثانية: الانحدار", lesson: "التنبؤ بالانحدار", title: "التنبؤ بالانحدار", summary: "استخدام معادلة الانحدار في التنبؤ وأنواعه.", keyPoints: ["استيفاء: داخل النطاق (أكثر موثوقية)", "استكمال: خارج النطاق (أقل دقة)", "الدقة ترتبط بقوة معامل الارتباط", "هناك خطان: ص على س، وس على ص"] },
  { subject: "إحصاء", unit: "الوحدة الثالثة: السلاسل الزمنية", lesson: "مكونات السلسلة الزمنية", title: "مكونات السلسلة الزمنية", summary: "تحليل البيانات الزمنية عبر مكوناتها الأربعة.", keyPoints: ["الاتجاه العام: طويل الأجل", "الموسمية: خلال السنة", "الدورية: على سنوات", "غير المنتظمة: أحداث مفاجئة"] },
  { subject: "إحصاء", unit: "الوحدة الثالثة: السلاسل الزمنية", lesson: "المتوسطات المتحركة", title: "المتوسطات المتحركة", summary: "تنعيم السلاسل الزمنية وإظهار الاتجاه العام.", keyPoints: ["تُقلّل تأثير التذبذبات القصيرة", "الرتبة = عدد القيم في كل متوسط", "البيانات ربع السنوية: رتبة 4 ثم مركزة", "يُفقد (n−1) قيمة من إجمالي البيانات"] },
  { subject: "إحصاء", unit: "الوحدة الثالثة: السلاسل الزمنية", lesson: "طريقة المربعات الصغرى للاتجاه", title: "المربعات الصغرى للاتجاه", summary: "معادلة الاتجاه العام بمنهج المربعات الصغرى.", keyPoints: ["Ŷ = a + bt", "نقطة الأصل = منتصف البيانات (Σt = 0)", "b = Σ(t·y) / Σt²", "a = ȳ"] },
  { subject: "إحصاء", unit: "الوحدة الرابعة: الاحتمال", lesson: "مفاهيم أساسية في الاحتمال", title: "مفاهيم أساسية في الاحتمال", summary: "الفضاء العيني والحوادث وقياس الاحتمال.", keyPoints: ["P(مستحيل)=0، P(مؤكد)=1", "P(A') = 1 − P(A)", "الحوادث المتنافية لا تجتمع", "الفضاء العيني: جميع النتائج الممكنة"] },
  { subject: "إحصاء", unit: "الوحدة الرابعة: الاحتمال", lesson: "قواعد الاحتمال", title: "قواعد الاحتمال", summary: "قاعدة الجمع والضرب والاحتمال الشرطي.", keyPoints: ["P(A∪B) = P(A)+P(B)−P(A∩B)", "استقلالية: P(A∩B) = P(A)·P(B)", "P(A|B) = P(A∩B)/P(B)", "متنافيتان: P(A∪B) = P(A)+P(B)"] },
  { subject: "إحصاء", unit: "الوحدة الرابعة: الاحتمال", lesson: "نظرية بايز", title: "نظرية بايز", summary: "تحديث الاحتمالات بالمعلومات الجديدة.", keyPoints: ["الاحتمال القبلي: قبل المعلومة", "الاحتمال البعدي: P(Aᵢ|B)", "تطبيقات: الطب، الجودة، الذكاء الاصطناعي", "قانون الاحتمال الكلي أساس بايز"] },
  { subject: "إحصاء", unit: "الوحدة الخامسة: المتغير العشوائي والتوزيع الطبيعي", lesson: "المتغير العشوائي المنفصل", title: "المتغير العشوائي المنفصل", summary: "تعريفه وحساب توقعه وتباينه.", keyPoints: ["E(X) = Σ x·P(x)", "Var(X) = E(X²) − [E(X)]²", "σ = √Var(X)", "Σ P(x) = 1 شرط أساسي"] },
  { subject: "إحصاء", unit: "الوحدة الخامسة: المتغير العشوائي والتوزيع الطبيعي", lesson: "التوزيع الطبيعي", title: "التوزيع الطبيعي والمعياري", summary: "خصائص المنحنى الطبيعي وتحويله لمعياري.", keyPoints: ["منحنى جرسي متماثل: وسط = وسيط = منوال", "Z = (X − μ) / σ", "N(0,1): المتوسط=0، الانحراف=1", "قاعدة 68-95-99.7"] },

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

  // History
  { subject: "تاريخ", unit: "الفصل الأول: الحملة الفرنسية", lesson: "الحملة الفرنسية 1798-1801", title: "الحملة الفرنسية على مصر", summary: "قادها نابليون 1798 ولها آثار علمية وسياسية عميقة.", keyPoints: ["1798: هزيمة المماليك في موقعة الأهرام", "المجمع العلمي ووصف مصر وحجر رشيد", "معركة أبي قير البحرية: انتصار نيلسون", "1801: الجلاء بموجب اتفاقية الإسكندرية"] },
  { subject: "تاريخ", unit: "الفصل الثاني: عصر محمد علي", lesson: "محمد علي وتحديث مصر", title: "عصر محمد علي", summary: "أرسى دولة مصرية حديثة بالإصلاحات الشاملة.", keyPoints: ["1805: توليه الحكم", "1811: مذبحة القلعة للقضاء على المماليك", "إنشاء الجيش والمدارس والمصانع", "معاهدة لندن 1840: تقليص النفوذ"] },
  { subject: "تاريخ", unit: "الفصل الثالث: من إسماعيل إلى الثورة العرابية", lesson: "عصر الخديو إسماعيل والثورة العرابية", title: "الخديو إسماعيل والثورة العرابية", summary: "الانفتاح والمديونية والرقابة الأجنبية ثم الثورة.", keyPoints: ["1869: افتتاح قناة السويس", "الديون: رقابة أجنبية على المالية", "الثورة العرابية: مصر للمصريين", "1882: التل الكبير والاحتلال البريطاني"] },
  { subject: "تاريخ", unit: "الفصل الرابع: الاحتلال البريطاني والمقاومة الوطنية", lesson: "الاحتلال البريطاني ومقاومته", title: "الاحتلال البريطاني والمقاومة", summary: "نشأة الحركة الوطنية لمقاومة الاحتلال.", keyPoints: ["مصطفى كامل: الحزب الوطني وجريدة اللواء", "حادثة دنشواي 1906: تصعيد الشعور الوطني", "1914: إعلان الحماية رسمياً", "محمد فريد خلف مصطفى كامل"] },
  { subject: "تاريخ", unit: "الفصل الخامس: ثورة 1919", lesson: "ثورة 1919 وما بعدها", title: "ثورة 1919", summary: "أعظم ثورة شعبية في تاريخ مصر الحديث.", keyPoints: ["سبب: نفي سعد زغلول إلى مالطا", "مشاركة: رجال ونساء ومسلمون وأقباط", "تصريح 28 فبراير 1922: استقلال مقيّد", "1923: الدستور المصري الأول"] },
  { subject: "تاريخ", unit: "الفصل السادس: مصر بين الحربين العالميتين", lesson: "مصر بين 1919 و1952", title: "مصر بين الحربين", summary: "صراعات سياسية ومعاهدة 1936 وتصاعد الحركات الوطنية.", keyPoints: ["1923: الدستور", "معاهدة 1936: جلاء بعد 20 عاماً", "تأسيس الإخوان المسلمين 1928", "حرب فلسطين 1948: كشف فساد النظام"] },
  { subject: "تاريخ", unit: "الفصل السابع: ثورة يوليو 1952", lesson: "ثورة 23 يوليو 1952", title: "ثورة يوليو 1952", summary: "الضباط الأحرار أنهوا الملكية وأسسوا الجمهورية.", keyPoints: ["23 يوليو 1952: الضباط الأحرار", "الإصلاح الزراعي: 200 فدان حد أقصى", "1956: تأميم قناة السويس والعدوان الثلاثي", "السد العالي وسياسة التصنيع"] },
  { subject: "تاريخ", unit: "الفصل الثامن: مصر المعاصرة", lesson: "مصر من السادات حتى اليوم", title: "مصر المعاصرة", summary: "من الانفتاح ومعاهدة السلام إلى ثورتَي يناير ويونيو.", keyPoints: ["1978: كامب ديفيد", "1979: معاهدة السلام واسترداد سيناء", "2011: ثورة 25 يناير وتنحي مبارك", "2013: ثورة 30 يونيو"] },

  // Geography
  { subject: "جغرافيا", unit: "مقدمة: الخريطة السياسية", lesson: "الخريطة السياسية للعالم", title: "الخريطة السياسية للعالم", summary: "توزيع الدول وأنواعها وخصائصها.", keyPoints: ["193 دولة عضو في الأمم المتحدة", "أنواع الدول: ساحلية، حبيسة، جزرية", "روسيا: أكبر دول العالم", "السيادة: حق الدولة في حكم إقليمها"] },
  { subject: "جغرافيا", unit: "الوحدة الأولى: مفهوم الدولة والحدود", lesson: "مقومات الدولة", title: "مقومات الدولة الحديثة", summary: "العناصر الأربعة للدولة.", keyPoints: ["الإقليم: الأرض والمياه والفضاء الجوي", "الشعب: ذو ولاء مشترك", "الحكومة: الجهاز الإداري", "السيادة: استقلال عن أي سلطة خارجية"] },
  { subject: "جغرافيا", unit: "الوحدة الأولى: مفهوم الدولة والحدود", lesson: "الحدود السياسية", title: "الحدود السياسية", summary: "أنواع الحدود وأهميتها وإشكالياتها.", keyPoints: ["الطبيعية: أنهار وجبال وبحار", "الهندسية: خطوط طول وعرض", "الإثنية: التوزيع القبلي والعرقي", "الحدود الاستعمارية سببت نزاعات"] },
  { subject: "جغرافيا", unit: "الوحدة الثانية: التكتلات الاقتصادية", lesson: "مفهوم التكتل الاقتصادي", title: "مفهوم التكتل الاقتصادي", summary: "مستويات التكامل الاقتصادي بين الدول.", keyPoints: ["منطقة تجارة حرة → اتحاد جمركي → سوق مشتركة → اتحاد اقتصادي", "WTO: تحرير التجارة الدولية", "التكتلات تعزز التفاوض وتخلق أسواقاً أكبر", "الاتحاد الاقتصادي: أعلى درجات التكامل"] },
  { subject: "جغرافيا", unit: "الوحدة الثانية: التكتلات الاقتصادية", lesson: "الاتحاد الأوروبي", title: "الاتحاد الأوروبي", summary: "أكبر تكتل اقتصادي وأكثره تكاملاً.", keyPoints: ["معاهدة ماستريخت 1993", "اليورو: العملة المشتركة", "شنغن: تنقل حر بين الدول", "Brexit 2020: خروج بريطانيا"] },
  { subject: "جغرافيا", unit: "الوحدة الثانية: التكتلات الاقتصادية", lesson: "التكتلات الإقليمية الأخرى", title: "التكتلات الإقليمية الأخرى", summary: "أبرز التكتلات في آسيا وأفريقيا وأمريكا.", keyPoints: ["آسيان: جنوب شرق آسيا", "الاتحاد الأفريقي: خلف منظمة الوحدة", "جامعة الدول العربية 1945", "نافتا/USMCA: أمريكا الشمالية"] },
  { subject: "جغرافيا", unit: "الوحدة الثالثة: العلاقات الدولية", lesson: "طبيعة العلاقات الدولية", title: "طبيعة العلاقات الدولية", summary: "النظام الدولي ومبادئه وأنماط القوة.", keyPoints: ["علاقات سياسية واقتصادية وثقافية", "السيادة وعدم التدخل: ميثاق الأمم المتحدة", "القوة الناعمة: ثقافة ودبلوماسية", "ما بعد 1991: أحادي القطبية مع قوى ناشئة"] },
  { subject: "جغرافيا", unit: "الوحدة الثالثة: العلاقات الدولية", lesson: "منظمة الأمم المتحدة", title: "منظمة الأمم المتحدة", summary: "أكبر منظمة دولية لحفظ السلم وتعزيز التعاون.", keyPoints: ["193 دولة عضو، مقرها نيويورك", "مجلس الأمن: 5 دائمون بحق الفيتو", "الجمعية العامة: جميع الأعضاء بصوت متساوٍ", "الفيتو يُعيق قرارات عادلة"] },
  { subject: "جغرافيا", unit: "الوحدة الثالثة: العلاقات الدولية", lesson: "السياسة الخارجية", title: "السياسة الخارجية", summary: "مبادئ وأدوات السياسة الخارجية.", keyPoints: ["أدواتها: دبلوماسية واقتصادية وعسكرية وثقافية", "المحددات: الموقع والموارد والتاريخ", "الحياد: عدم الانحياز في النزاعات", "الدبلوماسية الوقائية: منع النزاعات مسبقاً"] },
  { subject: "جغرافيا", unit: "الوحدة الرابعة: مصر والعلاقات الدولية", lesson: "المكانة الاستراتيجية لمصر", title: "المكانة الاستراتيجية لمصر", summary: "الموقع الفريد لمصر كمركز إقليمي وعالمي.", keyPoints: ["ملتقى ثلاث قارات", "قناة السويس: شريان تجاري دولي", "أكبر دولة عربية سكاناً", "بوابة أفريقيا ومستضيفة الاتحاد الأفريقي"] },
  { subject: "جغرافيا", unit: "الوحدة الرابعة: مصر والعلاقات الدولية", lesson: "علاقات مصر الإقليمية", title: "علاقات مصر الإقليمية", summary: "علاقات مصر مع جوارها العربي والأفريقي.", keyPoints: ["عضو مؤسس في الجامعة العربية 1945", "نزاع سد النهضة ومياه النيل", "وساطة في القضية الفلسطينية", "العلاقة مع السودان: مياه وحدود وتاريخ"] },
  { subject: "جغرافيا", unit: "الوحدة الرابعة: مصر والعلاقات الدولية", lesson: "علاقات مصر الدولية", title: "علاقات مصر الدولية", summary: "علاقات مصر مع القوى الكبرى وسياستها المتوازنة.", keyPoints: ["أمريكا: السلام والمساعدات والأمن", "الصين: الحزام والطريق والاستثمار", "روسيا: الطاقة النووية والتجارة", "الاتحاد الأوروبي: الشراكة الأورومتوسطية"] },
];

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
export function getQuestionsByScope(subject: string, unit?: string, lesson?: string, count = 5): AIQuestion[] {
  return pick(getQuestionPool(subject, unit, lesson), count);
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

export const SUBJECTS = [...new Set(ALL_QUESTIONS.map(q => q.subject))];

export function getUnitsForSubject(subject: string): string[] {
  return [...new Set(ALL_QUESTIONS.filter(q => q.subject === subject).map(q => q.unit))];
}

export function getLessonsForUnit(subject: string, unit: string): string[] {
  return [...new Set(ALL_QUESTIONS.filter(q => q.subject === subject && q.unit === unit).map(q => q.lesson))];
}
