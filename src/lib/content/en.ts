import type { LessonStudy, MapBranch, MapItem, StudyTable } from "./types";
import { EN, ELS } from "../questions/en-units";

// English study material (2026-27 first term): key words, grammar tables, mind maps and writing practice.
const T = (title: string, headers: string[], rows: string[][]): StudyTable => ({ title, headers, rows });
const B = (label: string, items: MapItem[]): MapBranch => ({ label, items });
const X = (label: string, sub: string[]): MapItem => ({ label, sub });
const W = (rows: string[][]): StudyTable => T("Key Vocabulary", ["Word", "Meaning", "Example"], rows);
const LS = (lesson: string, tables: StudyTable[], map: MapBranch[], essays: [string, string][]): LessonStudy => ({
  subject: EN,
  lesson,
  tables,
  map,
  essays,
});

export const STUDY_EN: LessonStudy[] = [
  // ───── Unit 1 ─────
  LS(
    ELS.u1l1,
    [W([
      ["paramedic (n)", "مسعف", "The paramedic gave him first aid in the ambulance."],
      ["pulse (n)", "النبض", "The nurse checked his pulse."],
      ["consciousness (n)", "الوعي", "He lost consciousness after the fall."],
      ["administer (v)", "يعطي دواء", "The doctor administered the medicine."],
      ["collapse (v)", "ينهار", "The old man collapsed in the street."],
      ["rewarding (adj)", "مجزٍ", "Nursing is a rewarding job."],
      ["heartbreaking (adj)", "مؤلم", "It was heartbreaking to see the victims."],
      ["shift (n)", "دوام / وردية", "She works the night shift."],
    ])],
    [
      B("People", ["paramedic", "victim", "colleague", "emergency operator", "lifeguard"]),
      B("Body & health", ["pulse", "chest", "wrist", "consciousness", "CPR", "heart attack"]),
      B("Feelings", ["heartbreaking", "rewarding", "exhausted", "fulfilled", "anxiously"]),
      B("Actions", ["administer", "collapse", "grab", "regain", "relieve", "rush"]),
    ],
    [
      ["Describe a busy day in a hospital in about 80 words.", "Model: The hospital was full of chaos this morning. Paramedics rushed in with victims of a car accident while alarms were beeping. Nurses checked every patient's pulse and administered medicine quickly. One man had collapsed and lost consciousness, so the doctors performed CPR until he regained consciousness. Although the staff were exhausted at the end of their shift, they felt fulfilled because their teamwork had saved lives. It is a heartbreaking but rewarding job."],
      ["Write the dialogue of an emergency call (6 lines).", "Operator: Emergency, which service do you need? / Caller: Ambulance, please! A man has collapsed. / Operator: Is he breathing? / Caller: Yes, but he is unconscious. / Operator: Stay calm. An ambulance is on its way. Don't move him. / Caller: Thank you, please hurry!"],
    ],
  ),
  LS(
    ELS.u1l2,
    [
      T("Present Perfect", ["Form", "Structure", "Example"], [
        ["Simple active", "have/has + p.p.", "Doctors have treated many patients."],
        ["Simple passive", "have/has + been + p.p.", "Many patients have been treated."],
        ["Continuous", "have/has + been + v-ing", "She has been working for ten hours."],
      ]),
      T("Time words", ["Word", "Use", "Example"], [
        ["for", "a period of time", "for five years"],
        ["since", "a starting point", "since 2015"],
        ["just", "very recently", "The ambulance has just arrived."],
        ["already", "earlier than expected (affirmative)", "I've already finished."],
        ["yet", "questions and negatives (end of sentence)", "Have you finished yet?"],
        ["ever / never", "experience", "Have you ever seen an operation?"],
      ]),
    ],
    [
      B("Simple", ["result", "how many / how much", "active and passive"]),
      B("Continuous", ["duration", "how long", "not with stative verbs (know, believe)"]),
      B("Time words", ["for", "since", "just", "already", "yet", "ever"]),
    ],
    [
      ["Rewrite in the passive: 'The hospital has hired ten new nurses.'", "Ten new nurses have been hired by the hospital."],
      ["Correct the mistake: 'I have been knowing Dr Ali for years.'", "I have known Dr Ali for years. ('know' is a stative verb, so we use the present perfect simple.)"],
      ["Complete with for or since: 'She has worked here … 2018 / … six years.'", "since 2018 / for six years."],
    ],
  ),
  LS(
    ELS.u1l3,
    [W([
      ["clutch (v)", "يقبض على", "He clutched his chest in pain."],
      ["stitch (v/n)", "يغرز / غرزة", "The doctor stitched the cut."],
      ["worsen (v)", "يسوء", "His condition worsened at night."],
      ["symptoms (n)", "أعراض", "Fever is a symptom of flu."],
      ["prescription (n)", "روشتة", "The doctor wrote a prescription."],
      ["sterile (adj)", "معقم", "Surgical tools must be sterile."],
      ["panicked (adj)", "مذعور", "The panicked mother looked for her child."],
      ["viral (adj)", "منتشر", "The video went viral."],
    ])],
    [
      B("In the ER", ["stethoscope", "scope", "prescription", "symptoms", "staff"]),
      B("Body", ["forehead", "throat", "sore throat", "pale"]),
      B("Verbs", ["clutch", "groan / moan", "stitch", "worsen", "swallow", "weep"]),
      B("Blog post", ["catchy title", "introduction", "experience", "feelings", "conclusion"]),
    ],
    [
      ["Write a blog post (about 100 words) about a time you or someone you know went to the ER.", "Model title: 'The Night I Learned to Be Patient'. Last winter my little brother had a high fever and a sore throat, so we rushed to the ER. He looked pale and was clutching my hand. The staff were calm and kind; a nurse checked his symptoms and a doctor listened to his chest with a stethoscope. After an hour he was given a prescription and started to feel better. I learned that hospital workers deserve our gratitude, and that staying calm helps everyone."],
      ["What are the main parts of a blog post?", "An attention-grabbing title, an introduction that hooks the reader, the body describing the experience in order with feelings, and a conclusion with a lesson or a question for readers."],
    ],
  ),

  // ───── Unit 2 ─────
  LS(
    ELS.u2l1,
    [W([
      ["artefact (n)", "قطعة أثرية", "The museum shows ancient artefacts."],
      ["automation (n)", "التشغيل الآلي", "Automation has changed factories."],
      ["infrastructure (n)", "البنية التحتية", "Egypt is improving its infrastructure."],
      ["troubleshoot (v)", "يحدد المشكلة ويعالجها", "The technician troubleshot my laptop."],
      ["steeped in (adj)", "غارق في", "Egypt is steeped in history."],
      ["sophisticated (adj)", "متطور / دقيق", "This is a sophisticated robot."],
      ["enhance (v)", "يحسن / يعزز", "Machines enhance productivity."],
      ["version (n)", "نسخة / إصدار", "Download the latest version."],
    ])],
    [
      B("Ancient Egypt", ["artefact", "dynasty", "archaeologist", "steeped in history"]),
      B("Machines & industry", ["automation", "lever", "gin", "infrastructure", "productivity"]),
      B("Computers", ["charge", "cable", "driver", "version", "right-click", "online / offline", "troubleshoot"]),
    ],
    [
      ["Compare machines in ancient and modern Egypt (about 80 words).", "Model: Egypt is steeped in history. Ancient Egyptians used simple machines such as levers and ramps to build the pyramids, and later cotton gins helped farmers. Today automation and sophisticated computers have revolutionized industry and agriculture. Modern infrastructure, renewable energy projects and online services enhance productivity. Although the tools have changed, Egyptians have always used machines to make work easier."],
      ["Write a short technical support call about a laptop that won't charge.", "Customer: My laptop won't charge. / Technician: Is the cable connected properly? / Customer: Yes. / Technician: Please restart the laptop and check that the driver is the latest version. / Customer: It's charging now! Thanks."],
    ],
  ),
  LS(
    ELS.u2l2,
    [
      T("Reported statements: tense changes", ["Direct", "Reported"], [
        ["present simple (am/is/are, do)", "past simple (was/were, did)"],
        ["present continuous", "past continuous"],
        ["present perfect / past simple", "past perfect"],
        ["will / can / may", "would / could / might"],
        ["must", "had to"],
      ]),
      T("Time and place words", ["Direct", "Reported"], [
        ["now", "then"], ["today", "that day"], ["tomorrow", "the next day"], ["yesterday", "the day before"], ["here", "there"], ["this / these", "that / those"],
      ]),
    ],
    [
      B("Reporting verbs + object", ["told", "reminded", "persuaded", "warned"]),
      B("Reporting verbs without object", ["said", "explained", "replied", "complained", "admitted"]),
      B("Rules", ["no quotation marks", "'that' can be omitted", "facts keep present tense", "change pronouns"]),
    ],
    [
      ["Report: \"I am fixing the machine now,\" said the engineer.", "The engineer said (that) he was fixing the machine then."],
      ["Report: \"We will visit the factory tomorrow,\" they told me.", "They told me (that) they would visit the factory the next day."],
      ["Choose and explain: Rania (said / told) me that I should buy a present.", "told — because it is followed by an object (me)."],
    ],
  ),
  LS(
    ELS.u2l3,
    [W([
      ["appliance (n)", "جهاز", "A fridge is a household appliance."],
      ["chores (n)", "أعمال يومية", "Robots can do household chores."],
      ["automated (adj)", "آلي", "The factory is fully automated."],
      ["efficiency (n)", "كفاءة", "Machines improve efficiency."],
      ["standstill (n)", "توقف تام", "Traffic came to a standstill."],
      ["track (v)", "يتتبع", "My smartwatch tracks my steps."],
      ["argumentative (adj)", "جدلي", "Write an argumentative essay."],
      ["evidence (n)", "دليل", "Give evidence for your opinion."],
    ])],
    [
      B("At home", ["appliance", "chores", "vacuum cleaner", "kettle", "smartwatch"]),
      B("Machines", ["automated", "efficiency", "autopilot", "spellcheck", "scanner"]),
      B("For or against essay", ["introduction", "advantages", "disadvantages", "balanced conclusion"]),
    ],
    [
      ["Write a for-and-against essay: 'Machines make our lives easier.' (about 120 words)", "Model: Machines are everywhere today, from kitchen appliances to automated factories. On the one hand, they save time and effort; vacuum cleaners and washing machines do our chores, and smartwatches track our health. They also improve efficiency at work. On the other hand, depending too much on machines can make us lazy, and some people lose their jobs because of automation. Moreover, students may use technology for cheating. In conclusion, machines make life easier if we use them wisely and keep human control."],
    ],
  ),

  // ───── Unit 3 ─────
  LS(
    ELS.u3l1,
    [W([
      ["activist (n)", "ناشط", "Young activists protested for climate justice."],
      ["bear the brunt", "يتحمل العبء الأكبر", "Poor countries bear the brunt of climate change."],
      ["meteorologist (n)", "خبير أرصاد", "The meteorologist predicted rain."],
      ["marginalized (adj)", "مهمش", "Marginalized communities suffer most."],
      ["vulnerable (adj)", "معرض للخطر", "Coastal cities are vulnerable."],
      ["sustainable (adj)", "مستدام", "We need sustainable energy."],
      ["scorching (adj)", "شديد الحرارة", "It was a scorching day."],
      ["equity (n)", "مساواة / عدالة", "Climate justice means equity."],
    ])],
    [
      B("Climate", ["greenhouse gas emissions", "heatwave", "extreme weather", "climate resilience"]),
      B("Justice", ["equity", "marginalized communities", "bear the brunt", "human rights"]),
      B("Adjectives", ["optimistic / pessimistic", "vulnerable", "sustainable", "profound", "prolonged"]),
    ],
    [
      ["Why is climate change a matter of justice? (about 80 words)", "Model: Climate change is a matter of justice because the countries that produce the least greenhouse gas emissions often bear the brunt of its effects. Marginalized communities are vulnerable to heatwaves, floods and droughts, and they have fewer resources to recover. Climate justice calls for equity: rich, industrialized countries should reduce emissions and help poorer ones build climate resilience through sustainable investment."],
    ],
  ),
  LS(
    ELS.u3l2,
    [T("Modals", ["Meaning", "Present", "Past"], [
      ["Sure it's true", "must + inf.", "must have + p.p."],
      ["Sure it's not true", "can't + inf.", "can't have + p.p."],
      ["Not sure", "might / may / could + inf.", "might / may / could have + p.p."],
      ["Advice", "should / ought to + inf.", "—"],
      ["Regret / criticism", "—", "should have / shouldn't have + p.p."],
    ])],
    [
      B("Deduction", ["must", "can't", "might / may / could"]),
      B("Advice", ["should", "ought to"]),
      B("Regret", ["should have + p.p.", "shouldn't have + p.p."]),
    ],
    [
      ["Rewrite using a modal: 'I'm sure the waves were caused by global warming.'", "The waves must have been caused by global warming."],
      ["Rewrite using a modal: 'It was wrong of us to ignore climate change.'", "We shouldn't have ignored climate change."],
      ["Give two pieces of advice to people living in coastal cities.", "You should take precautions during storms. You ought to follow the awareness campaigns run by the authorities."],
    ],
  ),
  LS(
    ELS.u3l3,
    [W([
      ["mitigate (v)", "يخفف", "Trees mitigate the effects of heat."],
      ["displacement (n)", "نزوح", "Floods cause displacement of families."],
      ["megacity (n)", "مدينة ضخمة", "Cairo is a megacity."],
      ["inundation (n)", "غمر بالماء", "Inundation threatens coastal areas."],
      ["phenomenon (n)", "ظاهرة", "Climate migration is a new phenomenon."],
      ["projections (n)", "توقعات", "Projections show rising seas."],
      ["commitment (n)", "التزام", "We need commitment to change."],
      ["transformative (adj)", "تحويلي", "Green energy is transformative."],
    ])],
    [
      B("Problems", ["climate migration", "displacement", "inundation", "poverty"]),
      B("Solutions", ["mitigate", "adaptation", "commitment", "agreements", "reduce waste"]),
      B("Describing change", ["accelerated", "substantial", "persistent", "transformative"]),
    ],
    [
      ["Write a paragraph: 'How can we help our environment?'", "Model: Everyone can help the environment. We should reduce waste by recycling and avoid wasting water and electricity. Governments must keep their commitment to international agreements and invest in renewable energy to mitigate climate change. Cities should plan for adaptation, such as building sea walls against inundation. If we act collectively, we can reduce the displacement of families and protect our planet for future generations."],
    ],
  ),

  // ───── Unit 4 ─────
  LS(
    ELS.u4l1,
    [W([
      ["bleach (v)", "يُبهت / يفقد لونه", "Warm water bleaches coral."],
      ["thrive (v)", "يزدهر", "Fish thrive on healthy reefs."],
      ["fragile (adj)", "هش", "Coral reefs are fragile."],
      ["diverse (adj)", "متنوع", "The reef has diverse species."],
      ["entangled (adj)", "متشابك / عالق", "A turtle got entangled in a net."],
      ["pose (v)", "يشكّل (خطراً)", "Plastic poses a threat."],
      ["underestimate (v)", "يستهين بـ", "Don't underestimate the sea."],
      ["breathtaking (adj)", "يخطف الأنفاس", "The view was breathtaking."],
    ])],
    [
      B("Coral reef", ["fragile", "diverse", "vivid", "bleach", "thrive"]),
      B("Gentle giants", ["whales", "massive", "migratory", "haunting songs"]),
      B("Dangers", ["pollution", "entangled", "erosion", "hazardous", "disrupt"]),
    ],
    [
      ["Describe a coral reef and the dangers it faces (about 80 words).", "Model: A coral reef is a breathtaking underwater city full of vivid colours and diverse creatures. Thousands of fish thrive among the corals. However, reefs are fragile. Rising temperatures bleach the coral, plastic waste poses a serious threat, and turtles get entangled in fishing nets. We must not underestimate these dangers; conservation and awareness can help the reef recover."],
    ],
  ),
  LS(
    ELS.u4l2,
    [T("Compound adjectives", ["Pattern", "Examples"], [
      ["adverb + past participle", "well-known, brightly-colored, little-known"],
      ["noun + past participle", "human-made, plastic-filled"],
      ["adjective + present participle", "slow-moving, strange-looking, fast-rising"],
      ["noun + present participle", "light-producing, life-saving"],
      ["noun + adjective", "ice-cold, eco-friendly"],
      ["number + singular noun", "a two-week trip, a five-year-old boy"],
    ])],
    [
      B("Definition", ["two or more words", "hyphen before a noun"]),
      B("From the listening", ["little-known", "brightly-colored", "high-pitched", "long-distance", "fast-rising"]),
      B("Watch out", ["a ten-year-old (not years)", "well-known (not known-well)"]),
    ],
    [
      ["Make compound adjectives: 'a holiday that lasts two weeks' / 'a man who works hard'.", "a two-week holiday / a hard-working man."],
      ["Rewrite: 'The turtles move slowly.' using a compound adjective.", "They are slow-moving turtles."],
    ],
  ),
  LS(
    ELS.u4l3,
    [W([
      ["awe-inspiring (adj)", "مثير للإعجاب", "The ocean is awe-inspiring."],
      ["glowing (adj)", "متوهج", "Some fish have glowing bodies."],
      ["hatch (v)", "يفقس", "The turtle eggs hatched."],
      ["literally (adv)", "حرفياً", "I mean it literally."],
      ["figuratively (adv)", "مجازياً", "He spoke figuratively."],
      ["in deep water", "في ورطة", "He's in deep water with his boss."],
      ["turn a blind eye", "يتجاهل", "Don't turn a blind eye to pollution."],
      ["endangered (adj)", "مهدد بالانقراض", "Sea turtles are endangered."],
    ])],
    [
      B("Ocean wonders", ["awe-inspiring", "mind-blowing", "glowing", "coordinated"]),
      B("Idioms", ["in deep water", "turn a blind eye", "literally vs figuratively"]),
      B("Storytelling", ["legend", "plot", "whisper", "stare", "leap"]),
    ],
    [
      ["Write a short ocean legend (about 100 words).", "Model: Long ago, a young fisherman sailed into deep water on a stormy night. The sea was roaring, and his boat was sinking. Suddenly, a glowing whale appeared and stared at him with wise eyes. It whispered, 'Protect the sea, and it will protect you.' The whale carried him safely to the shore. From that day, the fisherman never turned a blind eye to overfishing, and the villagers still tell his awe-inspiring legend to their children."],
    ],
  ),

  // ───── Unit 5 ─────
  LS(
    ELS.u5l1,
    [W([
      ["mindset (n)", "عقلية", "A growth mindset helps you learn."],
      ["soft skills (n)", "مهارات شخصية", "Teamwork is a soft skill."],
      ["collaboration (n)", "تعاون", "Collaboration leads to success."],
      ["workforce (n)", "القوة العاملة", "The workforce needs new skills."],
      ["flexibility (n)", "مرونة", "Employers value flexibility."],
      ["spill the beans", "يكشف سراً", "Don't spill the beans about the surprise."],
      ["stay ahead of the curve", "يتقدم على الآخرين", "Learn new skills to stay ahead of the curve."],
      ["think outside the box", "يفكر بإبداع", "Great inventors think outside the box."],
    ])],
    [
      B("Future skills", ["soft skills", "critical thinking", "problem-solving", "digital literacy"]),
      B("Work", ["workforce", "career ladder", "manufacturing", "remote work"]),
      B("Idioms", ["spill the beans", "stay ahead of the curve", "think outside the box"]),
    ],
    [
      ["Which skills will you need for future jobs? (about 80 words)", "Model: The jobs of the future will need more than knowledge. I will need soft skills such as collaboration, communication and flexibility, as well as critical thinking and problem-solving. Digital literacy and data management are essential because technology is transforming every industry. With a growth mindset, I can keep learning, think outside the box and stay ahead of the curve as I climb the career ladder."],
    ],
  ),
  LS(
    ELS.u5l2,
    [T("Causative verbs", ["Verb", "Active", "Passive"], [
      ["make", "make + obj. + inf. → made me wait", "be made + to + inf. → I was made to wait"],
      ["force", "force + obj. + to + inf.", "be forced + to + inf."],
      ["let", "let + obj. + inf. → let me go", "be allowed + to + inf."],
      ["allow", "allow + obj. + to + inf.", "be allowed + to + inf."],
      ["stop", "stop + obj. + from + v-ing", "be stopped + from + v-ing"],
      ["make + adj.", "The news made us happy.", "—"],
    ])],
    [
      B("make", ["no 'to' in active", "'to' in passive", "make + adj."]),
      B("let / allow", ["let + inf.", "allow + to + inf.", "passive: be allowed to"]),
      B("stop / force", ["stop + from + v-ing", "force + to + inf."]),
    ],
    [
      ["Rewrite in the passive: 'The teacher made the students rewrite the essay.'", "The students were made to rewrite the essay (by the teacher)."],
      ["Rewrite using 'allowed': 'My parents let me use the computer.'", "My parents allowed me to use the computer. / I was allowed to use the computer."],
    ],
  ),
  LS(
    ELS.u5l3,
    [W([
      ["diagnose (v)", "يشخّص", "AI can diagnose diseases."],
      ["imitate (v)", "يقلّد", "Robots imitate human speech."],
      ["capture (v)", "يلتقط / يجسد", "The photo captured her smile."],
      ["curious (adj)", "فضولي", "Children are curious about robots."],
      ["lonely (adj)", "وحيد", "Talking to friends stops you feeling lonely."],
      ["emotion (n)", "عاطفة", "Machines can't feel emotions."],
      ["flawless (adj)", "خالٍ من العيوب", "The robot's work was flawless."],
      ["future-proof (adj)", "مضمون المستقبل", "Learning makes your career future-proof."],
    ])],
    [
      B("AI", ["advance", "diagnose", "imitate", "assistant", "app"]),
      B("Human connection", ["emotion", "warmth", "soul", "lonely", "connection"]),
      B("Stories", ["plot", "narrative", "metaphor", "storytelling"]),
    ],
    [
      ["Imagine life in the year 2050 with an AI assistant (about 100 words).", "Model: In 2050, my AI assistant wakes me up and plans my day. It can diagnose small health problems, recreate my favourite places in virtual reality and help me study. Although it is flawless at many tasks, it can only imitate emotions; it has no soul. That's why I still meet my friends every week. Machines will advance, but human connection, warmth and storytelling will always be special."],
    ],
  ),

  // ───── Unit 6 ─────
  LS(
    ELS.u6l1,
    [W([
      ["anxiety (n)", "قلق", "Exams can cause anxiety."],
      ["clumsy (adj)", "أخرق", "He's clumsy and drops things."],
      ["mortifying (adj)", "مُخجل", "Falling on stage was mortifying."],
      ["hang out", "يتنزه مع الأصدقاء", "Let's hang out at the park."],
      ["hit the town", "يخرج للتنزه في المدينة", "We hit the town on Friday."],
      ["socialize (v)", "يندمج اجتماعياً", "Teenagers need to socialize."],
      ["reassure (v)", "يطمئن", "Her mother reassured her."],
      ["well-being (n)", "رفاهية / سعادة", "Friends improve our well-being."],
    ])],
    [
      B("Feelings", ["anxiety", "depression", "affection", "awkward", "ashamed"]),
      B("Embarrassment", ["clumsy", "clumsiness", "mortify", "mortifying"]),
      B("Socializing", ["hang out", "hit the town", "socialize", "well-being", "keep my hands to myself"]),
    ],
    [
      ["Describe an embarrassing moment (about 80 words).", "Model: Last year I had a mortifying moment at school. I was carrying a tray of juice in the canteen when I tripped over a bag. I was so clumsy that the juice went all over my teacher! Everyone laughed and I felt awkward and ashamed. I apologized immediately, and my teacher reassured me with a smile. Now we laugh about it whenever we hang out."],
    ],
  ),
  LS(
    ELS.u6l2,
    [T("Reported questions", ["Direct", "Reported"], [
      ["\"Where have you spent the weekend?\" asked Omar.", "Omar asked where I had spent the weekend."],
      ["\"Are you doing your homework?\" asked Mum.", "Mum asked if/whether I was doing my homework."],
      ["\"Can you swim?\" she asked me.", "She asked me whether I could swim."],
      ["\"Why are you late?\" the teacher asked.", "The teacher asked me why I was late."],
    ])],
    [
      B("Wh- questions", ["asked + wh- word + subject + verb"]),
      B("Yes/No questions", ["asked + if/whether + subject + verb"]),
      B("Changes", ["statement word order", "no do/does/did", "no question mark", "tense back-shift"]),
    ],
    [
      ["Report: \"What did you eat?\" my friend asked me.", "My friend asked me what I had eaten."],
      ["Report: \"Will you come to the party?\" Hend asked us.", "Hend asked us if/whether we would come to the party."],
    ],
  ),
  LS(
    ELS.u6l3,
    [W([
      ["compromise (v)", "يتفاوض / يتنازل", "They compromised and agreed."],
      ["interaction (n)", "تفاعل", "Good interaction helps learning."],
      ["empathy (n)", "تعاطف", "Empathy makes friendships strong."],
      ["destructive (adj)", "مدمر", "Bullying is destructive."],
      ["overwhelming (adj)", "ساحق / غامر", "The work was overwhelming."],
      ["packed (adj)", "مزدحم", "The cinema was packed."],
      ["recommend (v)", "يوصي بـ", "I recommend this film."],
      ["stay in touch", "يبقى على تواصل", "Let's stay in touch."],
    ])],
    [
      B("Friendship", ["interaction", "empathy", "compromise", "forgive", "stay in touch"]),
      B("Describing", ["packed", "overwhelming", "disappointing", "terrific", "relaxed"]),
      B("Writing a review", ["what you saw", "good points", "bad points", "recommendation"]),
    ],
    [
      ["Write a short review of a place where you hang out with friends (about 100 words).", "Model: Last weekend my friends and I visited the new park by the Nile. It was packed with families, but there was plenty of space to relax. The gardens were terrific and the café served delicious ice cream. However, the music was a bit loud, which was disappointing for people who wanted to chat. Overall, it's a great place for entertainment and meaningful interaction with friends. I'd definitely recommend it for a relaxing afternoon."],
    ],
  ),
];
