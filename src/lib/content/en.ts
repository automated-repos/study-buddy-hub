import type { LessonStudy } from "./types";

const S = "إنجليزي";

/** Vocabulary lesson helper: table of words, a mind map and essay prompts. */
const vocab = (
  lesson: string,
  words: [string, string, string][],
  map: { label: string; items: string[] }[],
  essays: [string, string][],
): LessonStudy => ({
  subject: S,
  lesson,
  table: { title: "Key vocabulary", headers: ["Word", "Meaning", "Example"], rows: words },
  map,
  essays,
});

export const STUDY_EN: LessonStudy[] = [
  // ── Unit 1: Health ──
  vocab(
    "My Day in Hospital",
    [
      ["ward", "a hospital room with beds", "He stayed in the children's ward."],
      ["surgeon", "a doctor who operates", "The surgeon operated on her knee."],
      ["discharge", "allow a patient to go home", "She was discharged after two days."],
      ["prescription", "a doctor's order for medicine", "Take this prescription to the pharmacy."],
      ["recover", "get better", "He recovered quickly."],
    ],
    [
      { label: "People", items: ["surgeon", "nurse", "patient", "paediatrician"] },
      { label: "Places", items: ["ward", "reception", "pharmacy", "intensive care"] },
      { label: "Treatment", items: ["injection", "X-ray", "bandage", "anaesthetic"] },
      { label: "Stages", items: ["admitted", "check-up", "operation", "discharged"] },
    ],
    [
      [
        "Write a paragraph (80 words) describing a day you or someone you know spent in hospital.",
        "Last year my brother broke his arm playing football, so he spent a day in hospital. First, a nurse took his temperature and a doctor sent him for an X-ray. The X-ray showed a clean break, so the doctor put his arm in plaster. He was nervous, but the staff were kind and patient. In the evening he was discharged and given a prescription for painkillers. He recovered completely after six weeks.",
      ],
      [
        "Why are nurses important in hospitals? Give two reasons.",
        "Nurses are important because they look after patients all day and night, checking their temperature, giving medicine and noticing any changes. They also comfort patients and their families, explaining treatment and helping them feel less afraid.",
      ],
      [
        "Give three pieces of advice to a patient leaving hospital.",
        "Take your medicine exactly as the prescription says. Rest and avoid heavy activity until the doctor says you have recovered. Go back for your check-up and call the doctor if the pain gets worse.",
      ],
    ],
  ),
  vocab(
    "Emergency Call",
    [
      ["emergency", "a sudden dangerous situation", "Call 123 in a medical emergency."],
      ["unconscious", "not awake or aware", "The driver was unconscious."],
      ["paramedic", "a person trained in emergency care", "Paramedics arrived in minutes."],
      ["first aid", "simple help before a doctor arrives", "She gave him first aid."],
      ["injury", "harm to the body", "He had a serious head injury."],
    ],
    [
      { label: "Numbers in Egypt", items: ["123 ambulance", "122 police", "180 fire"] },
      {
        label: "What to say",
        items: ["your exact location", "what happened", "number of injured"],
      },
      {
        label: "First aid",
        items: ["stay calm", "check breathing", "stop bleeding", "don't move the injured"],
      },
      { label: "Injuries", items: ["burn", "sprain", "bleeding", "choking"] },
    ],
    [
      [
        "Write the dialogue of an emergency call reporting a car accident.",
        "Operator: Ambulance service, what's your emergency? Caller: There's been a car accident on Salah Salem Street near the bridge. Operator: Is anyone hurt? Caller: Yes, one man is bleeding from his head, but he's conscious. Operator: Don't move him. Press a clean cloth on the wound. An ambulance is on its way. Caller: Thank you.",
      ],
      [
        "What should you do first if you see someone faint?",
        "First I would make sure the place is safe, then check whether the person is breathing. I would lay them on their back, raise their legs a little, loosen tight clothes and call 123 if they did not wake up quickly.",
      ],
      [
        "Why is it important to stay calm in an emergency?",
        "Staying calm helps you think clearly, give the correct information to the emergency services and follow their instructions. Panic can waste time and make the injured person more afraid.",
      ],
    ],
  ),
  {
    subject: S,
    lesson: "Grammar: Past Perfect Simple & Continuous",
    table: {
      title: "Past perfect simple vs continuous",
      headers: ["", "Past perfect simple", "Past perfect continuous"],
      rows: [
        ["Form", "had + past participle", "had been + verb-ing"],
        [
          "Use",
          "an action completed before another past action",
          "an action in progress for some time before a past moment",
        ],
        [
          "Example",
          "The film had started when we arrived.",
          "She was tired because she had been working all day.",
        ],
        ["Key words", "already, just, never, before, by the time", "for, since, all day, how long"],
      ],
    },
    map: [
      { label: "Simple", items: ["had + p.p.", "completed action", "already / by the time"] },
      {
        label: "Continuous",
        items: ["had been + -ing", "duration", "visible result (tired, wet)"],
      },
      { label: "Time links", items: ["after", "before", "when", "by the time"] },
      { label: "Inversion", items: ["No sooner had … than", "Hardly had … when"] },
    ],
    essays: [
      [
        "Explain the difference between 'She had cried' and 'She had been crying' with examples.",
        "'She had cried' shows a finished action before another past event: She had cried before her friend arrived. 'She had been crying' focuses on the duration and often explains a visible result: Her eyes were red because she had been crying for an hour.",
      ],
      [
        "Write three sentences about what had happened before you started secondary school.",
        "Before I started secondary school, I had finished the preparatory stage with high marks. I had already met some of my new classmates at a summer course. I had been studying English for six years, so I felt confident.",
      ],
      [
        "Rewrite using 'No sooner': I had left the house. Then it started to rain.",
        "No sooner had I left the house than it started to rain.",
      ],
    ],
  },
  vocab(
    "Beyond the White Coat",
    [
      ["dedicated", "very committed", "She is a dedicated doctor."],
      ["compassion", "sympathy for others' suffering", "Doctors need compassion."],
      ["diagnose", "identify an illness", "The doctor diagnosed flu."],
      ["volunteer", "work without pay", "He volunteers at a clinic."],
      ["remote", "far away and hard to reach", "They treat patients in remote villages."],
    ],
    [
      { label: "Qualities", items: ["dedicated", "compassionate", "patient", "selfless"] },
      { label: "Specialists", items: ["cardiologist", "paediatrician", "dentist", "surgeon"] },
      { label: "Role models", items: ["Magdi Yacoub", "Doctors Without Borders"] },
      { label: "Work", items: ["research", "vaccines", "volunteering", "remote areas"] },
    ],
    [
      [
        "Write a paragraph about a doctor you admire and why.",
        "I admire Sir Magdi Yacoub, the famous Egyptian heart surgeon. He has performed thousands of operations and trained many young doctors. Although he became famous in Britain, he returned to Egypt and built a heart centre in Aswan that treats children for free. He shows that real doctors work beyond the white coat, with dedication and compassion.",
      ],
      [
        "What qualities should a good doctor have? Mention three.",
        "A good doctor should be knowledgeable, so he can diagnose illnesses correctly. He should be compassionate and patient, listening carefully to patients. He should also be dedicated, ready to work long hours and keep learning.",
      ],
      [
        "Why do some doctors volunteer in remote areas?",
        "They volunteer because people in remote areas often have no hospitals or specialists. These doctors want to save lives and help those who cannot afford treatment, and they find the work very rewarding.",
      ],
    ],
  ),
  // ── Unit 2: The Environment ──
  vocab(
    "Our Fragile Planet",
    [
      ["fragile", "easily damaged", "Coral reefs are fragile."],
      ["pollution", "damage by harmful substances", "Air pollution causes disease."],
      ["endangered", "at risk of disappearing", "Pandas are endangered."],
      ["deforestation", "cutting down forests", "Deforestation destroys habitats."],
      ["recycle", "use materials again", "We recycle paper and glass."],
    ],
    [
      {
        label: "Problems",
        items: ["pollution", "deforestation", "overfishing", "desertification"],
      },
      { label: "Victims", items: ["endangered species", "coral reefs", "habitats"] },
      { label: "Solutions", items: ["recycle", "reuse", "reduce plastic", "conserve water"] },
      { label: "Ideas", items: ["biodiversity", "ecosystem", "natural resources"] },
    ],
    [
      [
        "Write a paragraph about the dangers of plastic on our planet.",
        "Plastic is one of the biggest threats to our fragile planet. Millions of tonnes end up in the sea every year, where turtles and fish swallow it and die. Plastic takes hundreds of years to break down, so it pollutes beaches and soil for generations. We can help by refusing single-use bags, reusing bottles and recycling whatever we can.",
      ],
      [
        "Suggest three ways students can protect the environment.",
        "Students can turn off lights and taps to save energy and water. They can recycle paper and plastic at school. They can also join clean-up campaigns and plant trees in their neighbourhoods.",
      ],
      [
        "Why is biodiversity important?",
        "Biodiversity keeps ecosystems balanced. Different plants and animals provide food, medicine and clean air, and if one species disappears others that depend on it may also suffer.",
      ],
    ],
  ),
  vocab(
    "Climate Change",
    [
      ["global warming", "rise in Earth's temperature", "Global warming melts ice."],
      ["greenhouse gas", "gas that traps heat", "Carbon dioxide is a greenhouse gas."],
      ["fossil fuels", "coal, oil and gas", "Burning fossil fuels pollutes the air."],
      ["renewable energy", "energy that doesn't run out", "Solar power is renewable."],
      ["drought", "long period without rain", "The drought ruined crops."],
    ],
    [
      { label: "Causes", items: ["fossil fuels", "deforestation", "emissions"] },
      { label: "Effects", items: ["rising sea levels", "heatwaves", "droughts and floods"] },
      { label: "Solutions", items: ["solar and wind power", "public transport", "planting trees"] },
      { label: "Egypt", items: ["Nile Delta at risk", "COP27 in Sharm El-Sheikh"] },
    ],
    [
      [
        "Write a paragraph about the effects of climate change on Egypt.",
        "Climate change is a serious threat to Egypt. Rising sea levels could flood parts of the Nile Delta and coastal cities such as Alexandria. Hotter summers and heatwaves affect people's health and reduce crops, while less rain at the Nile's sources could reduce our water. That is why Egypt hosted COP27 and is investing in solar and wind energy.",
      ],
      [
        "What can governments do to reduce greenhouse gases?",
        "Governments can build more solar and wind farms, improve public transport, plant trees and set laws that limit pollution from factories and cars.",
      ],
      [
        "Complete with cause and effect: Because we burn fossil fuels, ...",
        "Because we burn fossil fuels, more carbon dioxide goes into the atmosphere. As a result, the Earth gets warmer, ice melts and sea levels rise.",
      ],
    ],
  ),
  {
    subject: S,
    lesson: "Grammar: Modal Verbs",
    table: {
      title: "Modal verbs and their uses",
      headers: ["Use", "Modal", "Example"],
      rows: [
        ["Obligation", "must / have to", "You must wear a seatbelt."],
        ["Prohibition", "mustn't", "You mustn't smoke here."],
        ["No necessity", "don't have to / needn't", "You don't have to come."],
        ["Advice", "should / ought to / had better", "You should rest."],
        ["Certainty (deduction)", "must / can't", "He must be at home. She can't be in Paris."],
        ["Possibility", "may / might / could", "It might rain."],
        ["Past criticism", "should have + p.p.", "You should have told me."],
      ],
    },
    map: [
      { label: "Obligation", items: ["must", "have to", "mustn't (forbidden)"] },
      { label: "Advice", items: ["should", "ought to", "had better"] },
      { label: "Deduction", items: ["must (sure)", "might (possible)", "can't (impossible)"] },
      { label: "Past", items: ["must have", "can't have", "should have"] },
    ],
    essays: [
      [
        "Explain the difference between 'mustn't' and 'don't have to' with examples.",
        "'Mustn't' means something is forbidden: You mustn't use your phone in the exam. 'Don't have to' means it is not necessary, but you can if you want: You don't have to bring food because we have plenty.",
      ],
      [
        "Give a friend advice about preparing for exams using three modals.",
        "You should make a study timetable and follow it. You ought to sleep at least seven hours. You had better start revising now, because you mustn't leave everything to the last week.",
      ],
      [
        "Use deduction modals: The lights are off and nobody answers the door.",
        "They must be out. They can't be at home because the car isn't here. They might have gone to visit their grandparents.",
      ],
    ],
  },
  vocab(
    "Green Heroes",
    [
      ["conservationist", "a person who protects nature", "She is a famous conservationist."],
      ["campaign", "organised actions for a goal", "They started a campaign against plastic."],
      ["raise awareness", "make people know about an issue", "The video raised awareness."],
      ["sustainable", "not harming the future", "We need sustainable farming."],
      ["volunteer", "offer to help for free", "Students volunteered to plant trees."],
    ],
    [
      { label: "Heroes", items: ["Wangari Maathai (trees)", "Greta Thunberg (climate)"] },
      { label: "Actions", items: ["campaigns", "clean-ups", "reforestation"] },
      { label: "Qualities", items: ["dedicated", "inspiring", "determined"] },
      { label: "Ideas", items: ["sustainability", "grassroots movements", "eco-friendly"] },
    ],
    [
      [
        "Write a paragraph about an environmental hero.",
        "Wangari Maathai was a Kenyan environmentalist who started the Green Belt Movement. She encouraged women in villages to plant trees to stop soil erosion and provide firewood. Her campaign planted millions of trees across Africa, and in 2004 she became the first African woman to win the Nobel Peace Prize. She showed that ordinary people can make a big difference.",
      ],
      [
        "How can young people become green heroes in their community?",
        "They can organise clean-up days, plant trees in schools, teach others to recycle and use social media to raise awareness about saving water and energy.",
      ],
      [
        "What does 'sustainable development' mean? Give an example.",
        "It means meeting our needs today without harming future generations, for example using solar energy instead of burning coal.",
      ],
    ],
  ),
  // ── Unit 3: Science & Technology ──
  vocab(
    "The Digital Age",
    [
      ["digital", "using computer technology", "We live in a digital age."],
      ["download", "copy data from the internet", "Download the app."],
      ["cyberbullying", "bullying online", "Cyberbullying can hurt deeply."],
      ["privacy", "keeping personal information safe", "Protect your online privacy."],
      ["fake news", "false information presented as news", "Check facts to avoid fake news."],
    ],
    [
      { label: "Tools", items: ["smartphone", "browser", "Wi-Fi", "cloud storage"] },
      { label: "Benefits", items: ["communication", "online learning", "e-commerce"] },
      { label: "Dangers", items: ["cyberbullying", "hackers", "addiction", "fake news"] },
      { label: "Safety", items: ["strong passwords", "privacy settings", "check sources"] },
    ],
    [
      [
        "Write about the advantages and disadvantages of social media.",
        "Social media helps us stay in touch with friends and family, share ideas and learn news quickly. However, it can be addictive and waste hours of our time. It also spreads fake news and exposes some users to cyberbullying. We should use it wisely, limit screen time and protect our privacy.",
      ],
      [
        "Give three tips for staying safe online.",
        "Use strong passwords and never share them. Don't post personal information like your address. Think before clicking links, and check news from reliable sources.",
      ],
      [
        "How has digital technology changed education?",
        "Students can now attend online classes, watch lessons again, use educational apps and find information instantly, which makes learning more flexible.",
      ],
    ],
  ),
  vocab(
    "AI and the Future",
    [
      ["artificial intelligence", "machines that think and learn", "AI can translate languages."],
      ["automation", "machines doing human work", "Automation is changing factories."],
      ["algorithm", "steps a computer follows", "The algorithm suggests videos."],
      ["ethical", "about right and wrong", "AI raises ethical questions."],
      ["efficient", "working well without waste", "Robots are very efficient."],
    ],
    [
      { label: "Uses", items: ["medicine", "self-driving cars", "chatbots", "translation"] },
      { label: "Advantages", items: ["speed", "accuracy", "24-hour work"] },
      { label: "Concerns", items: ["jobs", "privacy", "ethics"] },
      { label: "Future skills", items: ["creativity", "critical thinking", "communication"] },
    ],
    [
      [
        "Write a balanced paragraph: Will AI help or harm us?",
        "Artificial intelligence brings many benefits. It helps doctors diagnose diseases, translates languages instantly and does boring tasks quickly. On the other hand, it may replace some jobs and raises concerns about privacy. In my opinion, AI will help us if we use it responsibly and learn new skills that machines cannot replace.",
      ],
      [
        "Which jobs might AI replace, and which will stay human?",
        "AI may replace repetitive jobs like data entry and some factory work. Jobs that need creativity, emotions and human contact, such as teaching, nursing and art, are more likely to stay human.",
      ],
      [
        "Use 'Despite' to link these ideas: AI is useful. It raises ethical concerns.",
        "Despite being useful, AI raises ethical concerns. / Despite its benefits, AI raises ethical concerns.",
      ],
    ],
  ),
  {
    subject: S,
    lesson: "Grammar: Conditionals",
    table: {
      title: "Types of conditionals",
      headers: ["Type", "Form", "Use", "Example"],
      rows: [
        ["Zero", "If + present, present", "facts", "If you heat ice, it melts."],
        ["First", "If + present, will + inf.", "likely future", "If it rains, we'll stay home."],
        [
          "Second",
          "If + past, would + inf.",
          "unreal present/future",
          "If I were rich, I would travel.",
        ],
        [
          "Third",
          "If + past perfect, would have + p.p.",
          "imaginary past",
          "If she had studied, she would have passed.",
        ],
      ],
    },
    map: [
      { label: "Zero & first", items: ["facts", "real future"] },
      { label: "Second", items: ["If I were you…", "advice and dreams"] },
      { label: "Third", items: ["regrets about the past"] },
      {
        label: "Alternatives",
        items: ["unless = if not", "provided that", "Had I known…", "Should you need…"],
      },
    ],
    essays: [
      [
        "Write three sentences about what you would do if you were the Minister of Education.",
        "If I were the Minister of Education, I would reduce the number of students in each class. I would give every school a modern science lab. I would also make sure that students learn practical skills, not just memorise facts.",
      ],
      [
        "Explain the difference between the first and second conditional with examples.",
        "The first conditional talks about a real possibility in the future: If I study hard, I will pass. The second talks about an unreal or unlikely situation: If I won a million pounds, I would buy a house.",
      ],
      [
        "Rewrite without 'if': If I had known, I would have helped you.",
        "Had I known, I would have helped you.",
      ],
    ],
  },
  vocab(
    "Space Exploration",
    [
      ["astronaut", "a person who travels into space", "Astronauts live on the space station."],
      ["orbit", "path around a planet or star", "The Moon orbits the Earth."],
      ["satellite", "object moving around a planet", "Nilesat is an Egyptian satellite."],
      ["launch", "send into space", "The rocket was launched in 1969."],
      ["gravity", "force that pulls objects", "There is less gravity on the Moon."],
    ],
    [
      { label: "Firsts", items: ["Sputnik 1957", "Gagarin 1961", "Apollo 11 1969 (Armstrong)"] },
      {
        label: "Solar system",
        items: ["Mercury closest", "Jupiter largest", "Mars red planet", "Saturn rings"],
      },
      { label: "Technology", items: ["rockets", "space stations", "telescopes", "satellites"] },
      { label: "Benefits", items: ["communications", "weather forecasting", "science"] },
    ],
    [
      [
        "Is space exploration worth the money? Give your opinion.",
        "Some people think space exploration wastes money that could feed the poor. However, I believe it is worth it. Satellites give us weather forecasts, GPS and international communication, and space research has led to inventions used in medicine and daily life. It also inspires young people to study science.",
      ],
      [
        "Describe what life is like for astronauts on a space station.",
        "Astronauts float because there is almost no gravity, so they sleep in bags fixed to the wall and eat food from special packets. They exercise two hours a day to keep their muscles strong and do scientific experiments.",
      ],
      [
        "Write about an important moment in space history.",
        "In 1969 Apollo 11 landed on the Moon. Neil Armstrong became the first person to walk on its surface, saying it was 'one small step for man, one giant leap for mankind'.",
      ],
    ],
  ),
  // ── Unit 4: Education ──
  vocab(
    "Learning Styles",
    [
      ["visual learner", "learns best by seeing", "Visual learners like mind maps."],
      ["auditory learner", "learns best by listening", "Auditory learners enjoy discussions."],
      ["kinaesthetic learner", "learns by doing", "Kinaesthetic learners like experiments."],
      ["revise", "study again", "Revise before the exam."],
      ["concentrate", "give full attention", "I can't concentrate with noise."],
    ],
    [
      { label: "Styles", items: ["visual", "auditory", "kinaesthetic"] },
      { label: "Techniques", items: ["mind maps", "flashcards", "summaries", "group work"] },
      { label: "Good habits", items: ["timetable", "take notes", "avoid distractions"] },
      { label: "Thinking", items: ["critical thinking", "brainstorming", "not rote learning"] },
    ],
    [
      [
        "Describe your own learning style and how you study.",
        "I think I am mainly a visual learner. I understand lessons better when I draw mind maps and use different colours to highlight key points. I also make tables to compare information. Before exams I look at my maps again and test myself with flashcards.",
      ],
      [
        "Give advice to a student who can't concentrate while studying.",
        "He should study in a quiet place, put his phone away, and use the Pomodoro technique: 25 minutes of focus followed by a 5-minute break. He should also set a clear goal for each session.",
      ],
      [
        "Why is understanding better than memorising?",
        "When you understand a lesson you can use the information in new situations and remember it longer, while memorised facts are easily forgotten.",
      ],
    ],
  ),
  vocab(
    "The Global Classroom",
    [
      ["e-learning", "learning using the internet", "E-learning grew during the pandemic."],
      ["exchange student", "studies abroad for a time", "An exchange student joined our class."],
      ["scholarship", "money to pay for study", "She won a scholarship to Cairo University."],
      ["bilingual", "speaks two languages", "He is bilingual in Arabic and English."],
      ["literacy", "ability to read and write", "Literacy rates are rising."],
    ],
    [
      { label: "Online", items: ["e-learning", "webinars", "virtual classrooms"] },
      { label: "Abroad", items: ["exchange students", "scholarships", "study abroad"] },
      { label: "Benefits", items: ["new cultures", "languages", "collaboration"] },
      { label: "Challenges", items: ["access", "internet", "equal opportunities"] },
    ],
    [
      [
        "What are the advantages and disadvantages of online learning?",
        "Online learning is flexible: students can study at their own pace and watch lessons again. It also saves travel time. However, some students lack good internet or a computer, and they may feel isolated without face-to-face contact. Mixing online and classroom learning gives the best results.",
      ],
      [
        "Would you like to study abroad? Why or why not?",
        "Yes, I would like to study abroad because I could improve my English, experience a new culture and get a degree from a famous university. I would miss my family, but video calls would help.",
      ],
      [
        "Why is equal access to education important?",
        "Because education gives every child the chance to get a good job and improve their life, and it helps the whole country develop.",
      ],
    ],
  ),
  {
    subject: S,
    lesson: "Grammar: Reported Speech",
    table: {
      title: "Changes in reported speech",
      headers: ["Direct", "Reported"],
      rows: [
        ["present simple (am)", "past simple (was)"],
        ["present continuous", "past continuous"],
        ["past simple / present perfect", "past perfect"],
        ["will / can / may / must", "would / could / might / had to"],
        ["now / today / tomorrow", "then / that day / the next day"],
        ["here / this / yesterday", "there / that / the day before"],
      ],
    },
    map: [
      { label: "Statements", items: ["said (that)", "tense goes back"] },
      { label: "Questions", items: ["asked if/whether", "asked + wh-word", "no question order"] },
      { label: "Commands", items: ["told + to + inf.", "told + not to"] },
      { label: "Suggestions", items: ["suggested + -ing", "suggested that"] },
    ],
    essays: [
      [
        "Report this conversation: Teacher: 'Where is your homework?' Ali: 'I left it at home.'",
        "The teacher asked Ali where his homework was. Ali said that he had left it at home.",
      ],
      [
        "Explain how questions change in reported speech.",
        "We use 'asked', change the tense back, and use normal statement order without a question mark. Yes/no questions use 'if' or 'whether': 'Are you ready?' → He asked if I was ready. Wh-questions keep the question word: 'Where do you live?' → She asked where I lived.",
      ],
      [
        "Report: 'Let's go to the park,' he said. 'Don't be late,' Mum told me.",
        "He suggested going to the park. Mum told me not to be late.",
      ],
    ],
  },
  vocab(
    "Bright Minds",
    [
      ["genius", "an extremely clever person", "Einstein was a genius."],
      [
        "achievement",
        "something done successfully",
        "Winning the Nobel Prize is a great achievement.",
      ],
      ["determination", "continuing despite difficulty", "Success needs determination."],
      ["discovery", "finding something new", "Zewail made an important discovery."],
      ["curious", "wanting to learn", "Curious students ask questions."],
    ],
    [
      {
        label: "Egyptian minds",
        items: [
          "Ahmed Zewail (Chemistry)",
          "Naguib Mahfouz (Literature)",
          "Farouk El-Baz (NASA)",
          "Magdi Yacoub",
        ],
      },
      { label: "World minds", items: ["Einstein", "Marie Curie"] },
      { label: "Qualities", items: ["curious", "creative", "determined", "hard-working"] },
      { label: "Results", items: ["discoveries", "inventions", "awards"] },
    ],
    [
      [
        "Write a paragraph about an Egyptian scientist you admire.",
        "Dr Ahmed Zewail is one of Egypt's greatest scientists. He studied in Alexandria and then in the USA. He invented a way to photograph chemical reactions happening in femtoseconds, and in 1999 he won the Nobel Prize in Chemistry. He always encouraged young Egyptians to love science and helped found Zewail City.",
      ],
      [
        "What makes a person successful: talent or hard work?",
        "Talent helps, but hard work is more important. Many talented people fail because they are lazy, while hard-working people keep improving and reach their goals.",
      ],
      [
        "Which qualities do great scientists usually share?",
        "They are curious, patient and determined. They ask questions, keep experimenting even when they fail, and work hard for many years.",
      ],
    ],
  ),
  // ── Unit 5: Work & Business ──
  vocab(
    "The Job Market",
    [
      ["unemployment", "not having a job", "Unemployment is a problem for graduates."],
      ["CV", "document of education and experience", "Send your CV by email."],
      ["qualifications", "certificates of study/training", "She has excellent qualifications."],
      ["vacancy", "an available job", "There's a vacancy for an engineer."],
      ["skills", "abilities", "Communication skills are important."],
    ],
    [
      { label: "Applying", items: ["vacancy", "CV", "cover letter", "interview"] },
      { label: "Skills", items: ["hard skills", "soft skills: teamwork, communication"] },
      { label: "Jobs", items: ["full-time", "part-time", "freelance"] },
      { label: "Career", items: ["promotion", "salary", "job satisfaction"] },
    ],
    [
      [
        "Write a short formal email applying for a summer job.",
        "Dear Sir or Madam, I am writing to apply for the summer job at your bookshop advertised on your website. I am seventeen years old and a secondary school student. I am hard-working, I enjoy reading and I can use a computer well. I am available from July to September. I attach my CV. Yours faithfully, Ahmed Ali",
      ],
      [
        "Give three tips for a successful job interview.",
        "Prepare by learning about the company. Dress smartly and arrive on time. Listen carefully, answer clearly and give examples of your skills.",
      ],
      [
        "What skills will be most important in the future job market?",
        "Digital skills, problem-solving, creativity, communication and the ability to keep learning new things.",
      ],
    ],
  ),
  vocab(
    "Entrepreneurship",
    [
      ["entrepreneur", "a person who starts a business", "She is a young entrepreneur."],
      ["start-up", "a new business", "The start-up sells eco-friendly bags."],
      ["profit", "money gained after costs", "The shop made a profit."],
      ["invest", "put money into a business", "They invested in a new app."],
      ["risk", "possibility of loss", "Starting a business involves risk."],
    ],
    [
      { label: "Starting", items: ["idea", "market research", "business plan", "capital or loan"] },
      { label: "Running", items: ["customers", "advertising", "brand", "competition"] },
      { label: "Results", items: ["profit", "loss", "growth"] },
      { label: "Qualities", items: ["innovative", "risk-taking", "determined"] },
    ],
    [
      [
        "Describe a small business you would like to start.",
        "I would like to start an online shop selling handmade accessories made by local women. First I would do market research to know what young people like. Then I would create a brand and advertise on social media. My business would make a profit and also help women earn money.",
      ],
      [
        "What qualities does a successful entrepreneur need?",
        "Creativity to find new ideas, courage to take risks, determination to continue after failure, and good communication to deal with customers and investors.",
      ],
      [
        "Why is a business plan important?",
        "It shows the goals of the business, the costs, the expected profit and how to reach customers, so it helps the owner avoid mistakes and convince investors.",
      ],
    ],
  ),
  {
    subject: S,
    lesson: "Grammar: Relative Clauses",
    table: {
      title: "Relative pronouns",
      headers: ["Pronoun", "Used for", "Example"],
      rows: [
        ["who", "people", "The man who lives next door is a doctor."],
        ["which", "things", "The book which I read was exciting."],
        ["that", "people or things (defining only)", "The phone that I bought is broken."],
        ["whose", "possession", "The girl whose bag was stolen called the police."],
        ["where", "places", "That's the school where I studied."],
        ["when", "times", "I remember the day when we met."],
      ],
    },
    map: [
      { label: "Defining", items: ["essential information", "no commas", "'that' allowed"] },
      { label: "Non-defining", items: ["extra information", "commas", "no 'that'"] },
      { label: "Omission", items: ["object pronoun can be dropped: The film (that) we watched"] },
      { label: "Formal", items: ["whom", "to whom"] },
    ],
    essays: [
      [
        "Explain the difference between defining and non-defining relative clauses.",
        "A defining clause gives information we need to know which person or thing we mean, with no commas: The students who passed were happy. A non-defining clause adds extra information between commas, and we cannot use 'that': My brother, who lives in Cairo, is a doctor.",
      ],
      [
        "Join using a relative pronoun: Cairo is the capital of Egypt. It is very crowded.",
        "Cairo, which is the capital of Egypt, is very crowded.",
      ],
      [
        "Write three sentences about your school using who, where and whose.",
        "Our school is the place where I made my best friends. Mr Hassan is the teacher who helped me love English. Mona is the student whose project won the science fair.",
      ],
    ],
  },
  vocab(
    "Success Stories",
    [
      ["perseverance", "continuing despite difficulties", "Her perseverance led to success."],
      ["ambition", "strong wish to achieve", "He has big ambitions."],
      ["overcome", "deal successfully with a problem", "She overcame many obstacles."],
      ["role model", "someone others copy", "Salah is a role model for young people."],
      ["setback", "a problem that delays progress", "A setback is not the end."],
    ],
    [
      { label: "Ingredients", items: ["ambition", "hard work", "perseverance"] },
      { label: "Obstacles", items: ["poverty", "failure", "setbacks"] },
      { label: "Examples", items: ["Mohamed Salah", "self-made entrepreneurs"] },
      { label: "Lessons", items: ["never give up", "learn from failure", "dream big"] },
    ],
    [
      [
        "Write a paragraph about a success story that inspires you.",
        "Mohamed Salah grew up in a small village in Gharbia. As a teenager he travelled for hours every day to train in Cairo. He faced many setbacks, including a difficult time at Chelsea, but he never gave up. Through hard work and perseverance he became one of the best players in the world with Liverpool, and today he is a role model for millions.",
      ],
      [
        "What can we learn from failure?",
        "Failure teaches us what went wrong so we can improve. It makes us stronger and more patient, and many successful people failed several times before they succeeded.",
      ],
      [
        "Describe a goal you want to achieve and your plan to reach it.",
        "My goal is to get high marks in the Thanaweya Amma exam. I will follow a daily timetable, revise every two weeks, solve past papers and sleep well before the exams.",
      ],
    ],
  ),
  // ── Unit 6: Culture & Civilisation ──
  vocab(
    "Egyptian Heritage",
    [
      ["heritage", "traditions and buildings from the past", "We must protect our heritage."],
      ["monument", "important old building or statue", "The pyramids are famous monuments."],
      ["hieroglyphics", "ancient Egyptian writing", "Champollion read hieroglyphics."],
      ["archaeologist", "studies remains of the past", "Archaeologists found a new tomb."],
      ["preserve", "protect from damage", "Museums preserve artefacts."],
    ],
    [
      {
        label: "Sites",
        items: ["Giza pyramids", "Karnak (Luxor)", "Abu Simbel", "Valley of the Kings"],
      },
      { label: "Discoveries", items: ["Rosetta Stone", "Tutankhamun's tomb (Carter)"] },
      { label: "Museums", items: ["Grand Egyptian Museum", "Egyptian Museum"] },
      { label: "Protection", items: ["restore", "preserve", "responsible tourism"] },
    ],
    [
      [
        "Write a paragraph inviting a foreign friend to visit Egypt.",
        "Dear Tom, you must visit Egypt next summer! We will start in Giza to see the pyramids and the Sphinx, then visit the new Grand Egyptian Museum, where you can see Tutankhamun's treasures. After that we can take a train to Luxor to explore Karnak Temple and the Valley of the Kings. Egyptian heritage is amazing, and the people are very welcoming.",
      ],
      [
        "Why should we protect our heritage?",
        "Heritage shows our identity and history, teaches future generations about their ancestors and attracts tourists who support our economy.",
      ],
      [
        "How did the Rosetta Stone help us understand ancient Egypt?",
        "It has the same text in hieroglyphics, Demotic and Greek, so Champollion compared them and was able to read hieroglyphics in 1822.",
      ],
    ],
  ),
  vocab(
    "World Cultures",
    [
      ["culture", "customs, beliefs and way of life", "Every country has its own culture."],
      ["customs", "traditional ways of behaving", "Greeting customs differ."],
      ["tolerance", "accepting differences", "Tolerance brings peace."],
      ["stereotype", "fixed, oversimplified idea", "Avoid stereotypes about people."],
      ["diverse", "including many types", "Our world is culturally diverse."],
    ],
    [
      {
        label: "Elements",
        items: ["language", "food (cuisine)", "festivals", "traditional dress"],
      },
      { label: "Attitudes", items: ["respect", "tolerance", "open-minded"] },
      { label: "Problems", items: ["stereotypes", "misunderstanding"] },
      { label: "Today", items: ["globalisation", "global village", "multicultural societies"] },
    ],
    [
      [
        "Why is it important to respect other cultures?",
        "Respecting other cultures helps people live together peacefully and avoid misunderstanding. When we learn about others' customs, food and beliefs, we become more open-minded and can make friends from all over the world.",
      ],
      [
        "Describe a festival or tradition from Egyptian culture.",
        "Sham El-Nessim is an ancient Egyptian spring festival. Families go to parks and gardens early in the morning, eat salted fish, green onions and coloured eggs, and enjoy the fresh air together.",
      ],
      [
        "What is a stereotype? Give an example and explain why it is harmful.",
        "A stereotype is a fixed, oversimplified idea about a group, like believing all people from one country are lazy. It is harmful because it is unfair and stops us seeing people as individuals.",
      ],
    ],
  ),
  {
    subject: S,
    lesson: "Grammar: Passive Voice",
    table: {
      title: "Passive voice: be + past participle",
      headers: ["Tense", "Passive form", "Example"],
      rows: [
        ["Present simple", "am/is/are + p.p.", "English is spoken worldwide."],
        ["Past simple", "was/were + p.p.", "The pyramids were built long ago."],
        ["Present continuous", "is/are being + p.p.", "The room is being cleaned."],
        ["Present perfect", "has/have been + p.p.", "The museum has been opened."],
        ["Future", "will be + p.p.", "The letter will be sent tomorrow."],
        ["Modals", "modal + be + p.p.", "The work must be finished."],
      ],
    },
    map: [
      { label: "Form", items: ["be + p.p.", "by + doer (optional)"] },
      {
        label: "Use",
        items: ["action more important than doer", "doer unknown", "formal writing"],
      },
      { label: "Special", items: ["It is said that…", "He is believed to…"] },
      { label: "Causative", items: ["have something done: I had my hair cut"] },
    ],
    essays: [
      [
        "When do we use the passive voice? Give two examples.",
        "We use the passive when the action is more important than the person who did it, or when the doer is unknown: The pyramids were built thousands of years ago. My bike was stolen last night.",
      ],
      [
        "Change to passive: They will open a new hospital next year. Someone has broken the window.",
        "A new hospital will be opened next year. The window has been broken.",
      ],
      [
        "Write a short paragraph describing how papyrus was made, using the passive.",
        "Papyrus plants were cut from the banks of the Nile. The stems were cut into thin strips, which were laid side by side and then pressed together. The sheets were dried in the sun and polished until they were smooth enough to write on.",
      ],
    ],
  },
  vocab(
    "Crossroads of Civilisations",
    [
      ["civilisation", "advanced organised society", "Egypt is a cradle of civilisation."],
      ["crossroads", "meeting point", "Egypt is a crossroads of three continents."],
      ["trade route", "path used by merchants", "The Silk Road was a trade route."],
      ["influence", "power to affect others", "Greek culture influenced Alexandria."],
      ["legacy", "what is left for the future", "Ancient Egypt left a great legacy."],
    ],
    [
      {
        label: "Location",
        items: ["Africa, Asia, Europe", "Mediterranean and Red Sea", "Suez Canal"],
      },
      {
        label: "Civilisations",
        items: ["Pharaonic", "Greek (Alexander)", "Roman", "Coptic", "Islamic"],
      },
      {
        label: "Alexandria",
        items: ["Library of Alexandria", "Pharos lighthouse", "Bibliotheca Alexandrina 2002"],
      },
      { label: "Exchange", items: ["trade", "ideas", "cultures"] },
    ],
    [
      [
        "Why is Egypt called a crossroads of civilisations?",
        "Egypt lies where Africa, Asia and Europe meet, between the Mediterranean and the Red Sea. For thousands of years traders, scholars and armies passed through it, so Pharaonic, Greek, Roman, Coptic and Islamic civilisations all left their mark, making Egypt a meeting place of cultures.",
      ],
      [
        "Write about the importance of ancient Alexandria.",
        "Alexandria was founded by Alexander the Great and became a centre of learning. Its famous library collected thousands of scrolls, and its lighthouse, the Pharos, was one of the Seven Wonders of the ancient world.",
      ],
      [
        "How does trade help civilisations develop?",
        "Trade brings new goods, wealth and ideas. When merchants meet, they exchange knowledge, languages and inventions, which helps societies grow.",
      ],
    ],
  ),
];
