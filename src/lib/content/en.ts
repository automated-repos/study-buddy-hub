import type { LessonStudy, MapBranch, StudyTable } from "./types";

const S = "إنجليزي";

/**
 * Vocabulary lesson: a vocabulary table, a word-forms / collocations table,
 * a mind map and essay prompts.
 */
const vocab = (
  lesson: string,
  words: [string, string, string][],
  forms: [string, string, string][],
  map: MapBranch[],
  essays: [string, string][],
  extra: StudyTable[] = [],
): LessonStudy => ({
  subject: S,
  lesson,
  tables: [
    { title: "Key vocabulary", headers: ["Word", "Meaning", "Example"], rows: words },
    {
      title: "Word forms & useful phrases",
      headers: ["Word / phrase", "Form or use", "Example"],
      rows: forms,
    },
    ...extra,
  ],
  map,
  essays,
});

export const STUDY_EN: LessonStudy[] = [
  // ── Unit 1: Health ──
  vocab(
    "My Day in Hospital",
    [
      ["ward", "a hospital room with beds", "He stayed in the children's ward."],
      ["surgeon", "a doctor who performs operations", "The surgeon operated on her knee."],
      ["patient", "a person receiving medical care", "The patient was very brave."],
      ["admitted", "accepted into hospital as a patient", "He was admitted last night."],
      ["discharged", "allowed to leave hospital", "She was discharged after two days."],
      [
        "prescription",
        "a doctor's written order for medicine",
        "Take this prescription to the pharmacy.",
      ],
      [
        "anaesthetic",
        "a drug that stops you feeling pain",
        "The operation was done under anaesthetic.",
      ],
      ["recover", "get better after illness", "He recovered quickly."],
      ["X-ray", "a picture of the inside of the body", "The X-ray showed a broken bone."],
      [
        "intensive care",
        "a unit for very seriously ill patients",
        "He spent a night in intensive care.",
      ],
    ],
    [
      ["recover → recovery", "verb → noun", "She made a full recovery."],
      ["operate → operation", "verb → noun", "The operation was successful."],
      ["pain → painful / painless", "noun → adjectives", "The injection was painless."],
      ["treat → treatment", "verb → noun", "The treatment lasted a week."],
      ["take someone's temperature", "collocation", "The nurse took my temperature."],
      ["have an operation", "collocation", "He had an operation on his leg."],
      ["visiting hours", "phrase", "Visiting hours are from 4 to 6."],
    ],
    [
      {
        label: "People",
        items: [
          { label: "doctors", sub: ["surgeon", "paediatrician (children)", "specialist"] },
          "nurse",
          "patient",
          "visitor",
        ],
      },
      {
        label: "Places",
        items: ["ward", "reception", "pharmacy", "operating theatre", "intensive care"],
      },
      {
        label: "Treatment",
        items: ["injection", "X-ray", "bandage", "anaesthetic", "prescription"],
      },
      {
        label: "Stages of a stay",
        items: ["admitted", "check-up", "operation", "recover", "discharged"],
      },
      {
        label: "Grammar link",
        items: [
          {
            label: "past tenses to tell the story",
            sub: ["past simple", "past perfect: had already started"],
          },
        ],
      },
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
      [
        "ambulance",
        "a vehicle that takes sick people to hospital",
        "The ambulance arrived quickly.",
      ],
      ["paramedic", "a person trained in emergency care", "Paramedics helped the injured man."],
      ["unconscious", "not awake or aware", "The driver was unconscious."],
      ["injury", "harm to the body", "He had a serious head injury."],
      ["first aid", "simple help before a doctor arrives", "She gave him first aid."],
      ["bleeding", "losing blood", "Press on the wound to stop the bleeding."],
      [
        "choking",
        "unable to breathe because the throat is blocked",
        "The child was choking on a sweet.",
      ],
      ["faint", "lose consciousness for a short time", "She fainted in the heat."],
      ["witness", "a person who sees an event", "The witness called the police."],
    ],
    [
      [
        "Egypt emergency numbers",
        "123 ambulance / 122 police / 180 fire",
        "Call 180 if there is a fire.",
      ],
      [
        "injure → injury → injured",
        "verb → noun → adjective",
        "The injured man was taken to hospital.",
      ],
      ["conscious ↔ unconscious", "opposites", "Is he conscious?"],
      ["Stay calm.", "imperative (instruction)", "Stay calm and wait for help."],
      ["Don't move him.", "negative imperative", "Don't move the injured person."],
      [
        "What's your emergency?",
        "operator's question",
        "What's your emergency? – There's been an accident.",
      ],
    ],
    [
      {
        label: "Emergency numbers (Egypt)",
        items: ["123 ambulance", "122 police", "180 fire brigade"],
      },
      {
        label: "What to say",
        items: ["exact location", "what happened", "how many people are hurt", "your phone number"],
      },
      {
        label: "First aid",
        items: [
          "stay calm",
          "check breathing",
          { label: "bleeding", sub: ["press a clean cloth on the wound"] },
          "don't move the injured",
          "keep them warm",
        ],
      },
      { label: "Injuries", items: ["burn", "sprain", "broken bone", "bleeding", "choking"] },
      {
        label: "Language",
        items: [{ label: "imperatives", sub: ["Stay calm.", "Don't move him.", "Press here."] }],
      },
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
    tables: [
      {
        title: "Form",
        headers: ["", "Affirmative", "Negative", "Question"],
        rows: [
          ["Past perfect simple", "She had finished.", "She hadn't finished.", "Had she finished?"],
          [
            "Past perfect continuous",
            "She had been working.",
            "She hadn't been working.",
            "Had she been working?",
          ],
        ],
      },
      {
        title: "Use",
        headers: ["", "Past perfect simple", "Past perfect continuous"],
        rows: [
          [
            "Main idea",
            "an action completed before another past action",
            "an action in progress for some time before a past moment",
          ],
          ["Focus", "result / completion", "duration / activity"],
          [
            "Typical words",
            "already, just, never, before, after, by the time, when",
            "for, since, all day, how long",
          ],
          [
            "Example",
            "When we arrived, the film had already started.",
            "She was tired because she had been working all day.",
          ],
        ],
      },
      {
        title: "Special structures & common mistakes",
        headers: ["Structure / mistake", "Correct example"],
        rows: [
          ["No sooner had … than", "No sooner had I left than it started to rain."],
          ["Hardly / Scarcely had … when", "Hardly had I arrived when the phone rang."],
          [
            "After + past perfect, past simple",
            "After she had finished her homework, she watched TV.",
          ],
          ["✗ When I arrived, the film has started.", "✓ When I arrived, the film had started."],
          [
            "✗ She had been knowing him for years.",
            "✓ She had known him for years. (stative verb: no -ing)",
          ],
        ],
      },
    ],
    map: [
      {
        label: "Simple",
        items: [
          "had + past participle",
          "completed earlier action",
          { label: "signal words", sub: ["already", "just", "never", "by the time"] },
        ],
      },
      {
        label: "Continuous",
        items: [
          "had been + verb-ing",
          "duration before a past moment",
          { label: "visible results", sub: ["tired", "wet", "red eyes"] },
        ],
      },
      { label: "Time links", items: ["after", "before", "when", "by the time", "until"] },
      { label: "Inversion", items: ["No sooner had … than", "Hardly had … when"] },
      {
        label: "Watch out",
        items: [
          "stative verbs (know, believe, own) → simple only",
          "don't mix with present perfect",
        ],
      },
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
      ["dedicated", "very committed to a job or cause", "She is a dedicated doctor."],
      ["compassion", "sympathy for others' suffering", "Doctors need compassion."],
      ["diagnose", "identify an illness", "The doctor diagnosed flu."],
      ["volunteer", "work without pay", "He volunteers at a free clinic."],
      ["remote", "far away and hard to reach", "They treat patients in remote villages."],
      ["specialist", "a doctor expert in one area", "She was sent to a heart specialist."],
      ["epidemic", "a disease spreading quickly among many people", "Doctors fought the epidemic."],
      ["vaccine", "a substance that protects against disease", "The vaccine saved millions."],
      ["selfless", "caring more about others than yourself", "Nurses are often selfless."],
      ["rewarding", "satisfying and worthwhile", "Medicine is a rewarding career."],
    ],
    [
      [
        "dedicate → dedication → dedicated",
        "verb → noun → adjective",
        "Her dedication inspired us.",
      ],
      ["diagnose → diagnosis", "verb → noun", "The diagnosis was correct."],
      ["medicine → medical", "noun → adjective", "medical research"],
      ["compassion → compassionate", "noun → adjective", "a compassionate nurse"],
      ["save lives", "collocation", "Doctors save lives every day."],
      ["Doctors Without Borders", "organisation", "They work in crisis areas worldwide."],
    ],
    [
      {
        label: "Qualities",
        items: ["dedicated", "compassionate", "patient", "selfless", "knowledgeable"],
      },
      {
        label: "Specialists",
        items: [
          "cardiologist (heart)",
          "paediatrician (children)",
          "dentist (teeth)",
          "surgeon (operations)",
        ],
      },
      {
        label: "Role models",
        items: [
          { label: "Magdi Yacoub", sub: ["heart surgeon", "Aswan Heart Centre"] },
          "Doctors Without Borders",
        ],
      },
      {
        label: "Work beyond hospitals",
        items: ["medical research", "vaccines", "volunteering", "remote areas"],
      },
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
      ["extinct", "no longer existing", "Dinosaurs are extinct."],
      ["deforestation", "cutting down forests", "Deforestation destroys habitats."],
      ["habitat", "the natural home of a plant or animal", "The forest is the tiger's habitat."],
      ["biodiversity", "the variety of living things", "Rainforests have rich biodiversity."],
      [
        "ecosystem",
        "living things and their environment together",
        "Pollution harms the whole ecosystem.",
      ],
      ["recycle", "use materials again after processing", "We recycle paper and glass."],
      ["toxic", "poisonous", "Toxic waste pollutes rivers."],
    ],
    [
      ["pollute → pollution → polluted", "verb → noun → adjective", "a polluted river"],
      ["environment → environmental", "noun → adjective", "environmental problems"],
      ["the 3 Rs", "reduce, reuse, recycle", "Follow the 3 Rs at home."],
      ["single-use plastic", "collocation", "Avoid single-use plastic bags."],
      ["natural resources", "collocation", "Water is a precious natural resource."],
      ["conserve water", "collocation", "Turn off the tap to conserve water."],
    ],
    [
      {
        label: "Problems",
        items: [
          { label: "pollution", sub: ["air", "water", "plastic"] },
          "deforestation",
          "overfishing",
          "desertification",
        ],
      },
      {
        label: "Victims",
        items: ["endangered species", "coral reefs (Red Sea)", "habitats", "biodiversity"],
      },
      {
        label: "Solutions",
        items: [
          { label: "3 Rs", sub: ["reduce", "reuse", "recycle"] },
          "conserve water and energy",
          "plant trees",
        ],
      },
      { label: "Key ideas", items: ["ecosystem", "natural resources", "fragile balance"] },
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
      ["climate", "usual weather of a place over a long time", "Egypt has a hot, dry climate."],
      ["global warming", "rise in Earth's average temperature", "Global warming melts ice."],
      [
        "greenhouse gas",
        "gas that traps heat in the atmosphere",
        "Carbon dioxide is a greenhouse gas.",
      ],
      ["fossil fuels", "coal, oil and gas", "Burning fossil fuels pollutes the air."],
      ["emissions", "gases sent into the air", "Factories must reduce emissions."],
      ["renewable energy", "energy that does not run out", "Solar power is renewable."],
      ["drought", "a long period without rain", "The drought ruined crops."],
      ["flood", "water covering normally dry land", "Floods destroyed many homes."],
      ["sea level", "average height of the sea surface", "Rising sea levels threaten Alexandria."],
      [
        "carbon footprint",
        "amount of CO₂ your activities produce",
        "Cycling reduces your carbon footprint.",
      ],
    ],
    [
      [
        "Because of / As a result / Therefore",
        "cause and effect linkers",
        "As a result, sea levels are rising.",
      ],
      ["lead to / cause / result in", "verbs of effect", "Burning coal leads to air pollution."],
      ["globe → global → globally", "noun → adjective → adverb", "a global problem"],
      ["reduce emissions", "collocation", "We must reduce emissions."],
      ["extreme weather", "collocation", "Heatwaves are extreme weather."],
      [
        "the Paris Agreement / COP27",
        "international action",
        "COP27 was held in Sharm El-Sheikh in 2022.",
      ],
    ],
    [
      {
        label: "Causes",
        items: [
          { label: "fossil fuels", sub: ["coal", "oil", "gas"] },
          "deforestation",
          "factory and car emissions",
        ],
      },
      {
        label: "Effects",
        items: [
          "rising sea levels",
          "heatwaves",
          "droughts and floods",
          "melting glaciers",
          "threat to crops",
        ],
      },
      {
        label: "Solutions",
        items: [
          { label: "renewable energy", sub: ["solar panels", "wind turbines"] },
          "public transport",
          "electric cars",
          "planting trees",
        ],
      },
      {
        label: "Egypt",
        items: [
          "Nile Delta and Alexandria at risk",
          "COP27 in Sharm El-Sheikh 2022",
          "solar parks (Benban)",
        ],
      },
      {
        label: "Language",
        items: ["cause/effect linkers", "passive: Millions of trees are cut down every year."],
      },
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
    tables: [
      {
        title: "Modal verbs and their uses",
        headers: ["Use", "Modal", "Example"],
        rows: [
          ["Obligation (rule)", "must / have to", "You must wear a seatbelt."],
          ["Prohibition", "mustn't", "You mustn't smoke here."],
          ["No necessity", "don't have to / needn't", "You don't have to bring food."],
          ["Advice", "should / ought to / had better", "You should rest. You'd better leave now."],
          ["Ability", "can / could / be able to", "She could swim when she was five."],
          ["Permission / request", "can / could / may", "May I open the window?"],
          ["Possibility", "may / might / could", "It might rain later."],
          [
            "Certainty (deduction)",
            "must (sure yes) / can't (sure no)",
            "He must be at home. She can't be in Paris.",
          ],
        ],
      },
      {
        title: "Modals with the past (modal + have + past participle)",
        headers: ["Form", "Meaning", "Example"],
        rows: [
          ["must have done", "I'm sure it happened", "He must have taken the bus."],
          ["can't have done", "I'm sure it didn't happen", "She can't have seen me."],
          ["might / may have done", "perhaps it happened", "They might have forgotten."],
          ["should have done", "criticism / regret", "You should have told me."],
          [
            "needn't have done",
            "it happened but wasn't necessary",
            "You needn't have cooked; we ate out.",
          ],
        ],
      },
      {
        title: "Common mistakes",
        headers: ["✗ Wrong", "✓ Correct"],
        rows: [
          ["You must to study.", "You must study. (no 'to' after modals)"],
          ["He cans swim.", "He can swim. (no -s)"],
          ["You mustn't come. (meaning: not necessary)", "You don't have to come."],
          ["You had better to go.", "You had better go."],
          ["She ought study.", "She ought to study."],
        ],
      },
    ],
    map: [
      {
        label: "Obligation",
        items: [
          "must (rule / speaker)",
          "have to (external)",
          { label: "negatives", sub: ["mustn't = forbidden", "don't have to = not necessary"] },
        ],
      },
      { label: "Advice", items: ["should", "ought to", "had better + infinitive"] },
      {
        label: "Ability & permission",
        items: ["can / could", "be able to", "may / could (polite)"],
      },
      {
        label: "Deduction",
        items: ["must (sure)", "might / may / could (possible)", "can't (impossible)"],
      },
      {
        label: "Past modals",
        items: ["must have", "can't have", "might have", "should have", "needn't have"],
      },
      {
        label: "Form rules",
        items: ["modal + bare infinitive", "no -s", "no 'to' (except ought to, have to)"],
      },
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
      [
        "environmentalist",
        "a person who works to protect the environment",
        "Environmentalists protested against the factory.",
      ],
      [
        "campaign",
        "organised actions to achieve a goal",
        "They started a campaign against plastic.",
      ],
      ["raise awareness", "make people know more about an issue", "The video raised awareness."],
      [
        "sustainable",
        "meeting today's needs without harming the future",
        "We need sustainable farming.",
      ],
      [
        "reforestation",
        "planting trees where forests were cut",
        "Reforestation brings back wildlife.",
      ],
      ["grassroots", "starting from ordinary local people", "a grassroots movement"],
      ["pioneer", "one of the first to do something", "She was a pioneer of tree planting."],
      ["inspire", "make someone want to do something good", "Her story inspired millions."],
      ["eco-friendly", "not harmful to the environment", "Use eco-friendly bags."],
    ],
    [
      ["protect → protection → protective", "verb → noun → adjective", "environmental protection"],
      ["inspire → inspiration → inspiring", "verb → noun → adjective", "an inspiring story"],
      ["hero → heroic → heroism", "noun → adjective → noun", "a heroic act"],
      ["make a difference", "phrase", "Small actions make a difference."],
      ["dedicate your life to", "phrase", "She dedicated her life to the planet."],
    ],
    [
      {
        label: "Heroes",
        items: [
          { label: "Wangari Maathai", sub: ["Green Belt Movement", "Nobel Peace Prize 2004"] },
          { label: "Greta Thunberg", sub: ["school strikes for climate"] },
        ],
      },
      {
        label: "Actions",
        items: ["campaigns", "clean-ups", "reforestation", "donating", "volunteering"],
      },
      { label: "Qualities", items: ["dedicated", "inspiring", "determined", "brave"] },
      { label: "Ideas", items: ["sustainability", "grassroots movements", "eco-friendly living"] },
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
      [
        "download / upload",
        "copy from / send to the internet",
        "Upload your homework to the platform.",
      ],
      ["browser", "program for viewing websites", "Open the link in your browser."],
      ["social media", "apps and sites for sharing", "Teenagers spend hours on social media."],
      ["cyberbullying", "bullying someone online", "Report cyberbullying to an adult."],
      ["privacy", "keeping personal information safe", "Check your privacy settings."],
      ["hacker", "person who gets into systems illegally", "A hacker stole the passwords."],
      ["fake news", "false information presented as news", "Check sources to avoid fake news."],
      ["addicted to", "unable to stop doing something", "He is addicted to games."],
      ["go viral", "spread very quickly online", "The video went viral."],
    ],
    [
      ["digital → digitally → digitise", "adjective → adverb → verb", "Books are being digitised."],
      ["addict → addiction → addictive", "noun → noun → adjective", "Games can be addictive."],
      ["screen time", "collocation", "Limit your screen time."],
      ["digital footprint", "collocation", "Your posts create a digital footprint."],
      ["log in / log out", "phrasal verbs", "Log out after using a public computer."],
    ],
    [
      { label: "Tools", items: ["smartphone", "browser", "Wi-Fi", "cloud storage", "apps"] },
      {
        label: "Benefits",
        items: ["instant communication", "online learning", "e-commerce", "information"],
      },
      {
        label: "Dangers",
        items: ["cyberbullying", "hackers and viruses", "addiction", "fake news", "privacy loss"],
      },
      {
        label: "Staying safe",
        items: ["strong passwords", "privacy settings", "check sources", "limit screen time"],
      },
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
      [
        "artificial intelligence (AI)",
        "machines that can think and learn",
        "AI can translate languages.",
      ],
      ["robot", "a machine that does tasks automatically", "Robots build cars."],
      ["automation", "using machines instead of people", "Automation is changing factories."],
      ["algorithm", "a set of steps a computer follows", "The algorithm suggests videos."],
      [
        "machine learning",
        "computers improving by learning from data",
        "Machine learning powers voice assistants.",
      ],
      ["chatbot", "a program that chats with people", "The bank uses a chatbot."],
      ["ethical", "about right and wrong", "AI raises ethical questions."],
      ["efficient", "working well without waste", "Robots are very efficient."],
      ["replace", "take the place of", "AI may replace some jobs."],
      ["predict", "say what will happen", "AI can predict the weather."],
    ],
    [
      [
        "Despite / In spite of + noun/-ing",
        "contrast",
        "Despite its benefits, AI raises concerns.",
      ],
      [
        "However / On the other hand",
        "contrast linkers",
        "AI is fast. However, it can make mistakes.",
      ],
      ["analyse → analysis → analytical", "verb → noun → adjective", "AI can analyse huge data."],
      ["efficient → efficiency → efficiently", "adj → noun → adverb", "Robots work efficiently."],
      ["self-driving car", "compound", "Self-driving cars use AI."],
    ],
    [
      {
        label: "Uses",
        items: [
          "medicine (diagnosis)",
          "self-driving cars",
          "chatbots",
          "translation",
          "smart homes",
        ],
      },
      {
        label: "Advantages",
        items: ["speed", "accuracy", "works 24 hours", "does dangerous tasks"],
      },
      { label: "Concerns", items: ["jobs", "privacy", "ethics", "mistakes and bias"] },
      {
        label: "Future skills",
        items: ["creativity", "critical thinking", "communication", "lifelong learning"],
      },
      {
        label: "Balanced essay",
        items: [
          "advantages",
          "disadvantages",
          { label: "linkers", sub: ["However", "On the other hand", "Despite"] },
          "your opinion",
        ],
      },
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
    tables: [
      {
        title: "Types of conditionals",
        headers: ["Type", "If-clause", "Main clause", "Use", "Example"],
        rows: [
          [
            "Zero",
            "present simple",
            "present simple",
            "facts / general truths",
            "If you heat ice, it melts.",
          ],
          [
            "First",
            "present simple",
            "will + infinitive",
            "real future possibility",
            "If it rains, we'll stay home.",
          ],
          [
            "Second",
            "past simple (were)",
            "would + infinitive",
            "unreal / unlikely present or future",
            "If I were rich, I would travel.",
          ],
          [
            "Third",
            "past perfect",
            "would have + p.p.",
            "imaginary past / regret",
            "If she had studied, she would have passed.",
          ],
        ],
      },
      {
        title: "Alternatives to 'if'",
        headers: ["Word / structure", "Meaning", "Example"],
        rows: [
          ["unless", "if … not", "Unless you hurry, you'll miss the bus."],
          [
            "provided (that) / as long as",
            "only if",
            "I'll lend you my book provided you return it.",
          ],
          ["Had + subject + p.p.", "inverted 3rd conditional", "Had I known, I would have helped."],
          ["Were + subject + to", "inverted 2nd conditional", "Were I rich, I would buy a house."],
          ["Should + subject + verb", "inverted 1st conditional", "Should you need help, call me."],
          ["If I were you", "advice", "If I were you, I'd see a doctor."],
        ],
      },
      {
        title: "Common mistakes",
        headers: ["✗ Wrong", "✓ Correct"],
        rows: [
          ["If it will rain, we will stay home.", "If it rains, we will stay home."],
          ["If I would be rich, I would travel.", "If I were rich, I would travel."],
          ["If I had known, I would help you.", "If I had known, I would have helped you."],
          ["Unless you don't study, you'll fail.", "Unless you study, you'll fail."],
        ],
      },
    ],
    map: [
      { label: "Zero", items: ["facts", "If + present, present"] },
      { label: "First", items: ["real future", "If + present, will"] },
      {
        label: "Second",
        items: ["unreal present/future", "If + past, would", "If I were you (advice)"],
      },
      {
        label: "Third",
        items: ["imaginary past", "If + past perfect, would have + p.p.", "regrets"],
      },
      {
        label: "Alternatives",
        items: [
          "unless = if not",
          "provided that / as long as",
          { label: "inversion", sub: ["Had I known…", "Were I…", "Should you…"] },
        ],
      },
      { label: "Rule", items: ["never 'will' or 'would' in the if-clause"] },
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
      ["orbit", "curved path around a planet or star", "The Moon orbits the Earth."],
      ["satellite", "object moving around a planet", "Nilesat is an Egyptian satellite."],
      ["launch", "send into the air or space", "The rocket was launched in 1969."],
      ["gravity", "force that pulls objects together", "There is less gravity on the Moon."],
      ["telescope", "instrument for seeing distant objects", "Astronomers use telescopes."],
      ["galaxy", "a huge group of stars", "Our galaxy is the Milky Way."],
      [
        "solar system",
        "the Sun and objects that orbit it",
        "There are eight planets in our solar system.",
      ],
      ["weightless", "floating with no weight", "Astronauts feel weightless."],
      ["mission", "a planned journey with a purpose", "The Mars mission lasted months."],
    ],
    [
      ["explore → exploration → explorer", "verb → noun → person", "space exploration"],
      ["astronomy → astronomer", "science → scientist", "The astronomer discovered a comet."],
      [
        "Sputnik 1957 / Gagarin 1961 / Apollo 11 1969",
        "space firsts",
        "Armstrong walked on the Moon in 1969.",
      ],
      ["Nilesat 101 (1998)", "Egypt in space", "Egypt launched Nilesat 101 in 1998."],
      ["space station", "compound", "The International Space Station orbits Earth."],
    ],
    [
      {
        label: "Space firsts",
        items: [
          "Sputnik 1957 (first satellite)",
          "Yuri Gagarin 1961 (first human)",
          { label: "Apollo 11 1969", sub: ["Neil Armstrong", "first Moon walk"] },
        ],
      },
      {
        label: "Solar system",
        items: [
          "Mercury: closest to the Sun",
          "Jupiter: largest",
          "Mars: the Red Planet",
          "Saturn: rings",
        ],
      },
      { label: "Technology", items: ["rockets", "space stations", "telescopes", "satellites"] },
      {
        label: "Benefits",
        items: ["communications", "GPS", "weather forecasting", "scientific discoveries"],
      },
      { label: "Debate", items: ["worth the money?", "or spend on Earth's problems?"] },
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
      ["kinaesthetic learner", "learns best by doing", "Kinaesthetic learners like experiments."],
      ["memorise", "learn to remember exactly", "Memorise the key dates."],
      ["revise", "study again before an exam", "Revise every two weeks."],
      ["concentrate", "give full attention", "I can't concentrate with noise."],
      ["summarise", "give the main points briefly", "Summarise each lesson in five lines."],
      [
        "distraction",
        "something that takes your attention away",
        "Your phone is a big distraction.",
      ],
      ["feedback", "comments on your work", "The teacher gave useful feedback."],
      ["critical thinking", "analysing before judging", "Critical thinking helps solve problems."],
    ],
    [
      ["concentrate → concentration", "verb → noun", "Good concentration helps learning."],
      ["motivate → motivation → motivated", "verb → noun → adj", "She is highly motivated."],
      ["effective / effectively", "adjective / adverb", "Study effectively, not just for long."],
      ["take notes", "collocation", "Take notes during the lesson."],
      ["rote learning", "learning by repetition without understanding", "Avoid rote learning."],
    ],
    [
      {
        label: "Learning styles",
        items: [
          { label: "visual", sub: ["mind maps", "charts", "colours"] },
          { label: "auditory", sub: ["listening", "discussion"] },
          { label: "kinaesthetic", sub: ["experiments", "moving"] },
        ],
      },
      {
        label: "Techniques",
        items: ["mind maps", "flashcards", "summaries", "group work", "Pomodoro"],
      },
      {
        label: "Good habits",
        items: ["timetable", "take notes", "avoid distractions", "sleep well"],
      },
      {
        label: "Thinking",
        items: ["understanding > memorising", "critical thinking", "brainstorming"],
      },
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
      ["virtual classroom", "an online space for lessons", "We met in a virtual classroom."],
      ["exchange student", "studies abroad for a time", "An exchange student joined our class."],
      ["scholarship", "money given to pay for study", "She won a scholarship."],
      ["tuition fees", "money paid for education", "Tuition fees are high abroad."],
      ["bilingual", "able to speak two languages", "He is bilingual."],
      ["fluent", "speaks a language easily and well", "She is fluent in English."],
      ["literacy", "ability to read and write", "Literacy rates are rising."],
      ["collaborate", "work together", "Students collaborate on projects."],
      ["enrol", "officially join a course", "I enrolled in an online course."],
    ],
    [
      ["educate → education → educational", "verb → noun → adjective", "educational apps"],
      ["literate ↔ illiterate", "opposites", "Fight illiteracy."],
      ["access to education", "collocation", "Every child needs access to education."],
      ["study abroad", "collocation", "Many students dream of studying abroad."],
      ["equal opportunities", "collocation", "Education gives equal opportunities."],
    ],
    [
      {
        label: "Online learning",
        items: ["e-learning", "webinars", "virtual classrooms", "educational apps"],
      },
      {
        label: "Studying abroad",
        items: ["exchange students", "scholarships", "tuition fees", "new cultures"],
      },
      { label: "Benefits", items: ["flexibility", "languages", "collaboration", "global friends"] },
      {
        label: "Challenges",
        items: ["internet access", "isolation", "equal opportunities", "cost"],
      },
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
    tables: [
      {
        title: "Tense changes (backshift)",
        headers: ["Direct speech", "Reported speech", "Example"],
        rows: [
          ["present simple", "past simple", "'I am tired.' → She said (that) she was tired."],
          [
            "present continuous",
            "past continuous",
            "'I'm watching TV.' → He said he was watching TV.",
          ],
          ["past simple", "past perfect", "'I saw the film.' → Ali said he had seen the film."],
          ["present perfect", "past perfect", "'I have finished.' → She said she had finished."],
          ["will / can / may", "would / could / might", "'I will come.' → He said he would come."],
          ["must", "had to", "'I must go.' → She said she had to go."],
        ],
      },
      {
        title: "Time and place changes",
        headers: ["Direct", "Reported"],
        rows: [
          ["now", "then"],
          ["today / tonight", "that day / that night"],
          ["tomorrow", "the next day / the following day"],
          ["yesterday", "the day before / the previous day"],
          ["next week", "the following week"],
          ["here / this / these", "there / that / those"],
        ],
      },
      {
        title: "Questions, commands and suggestions",
        headers: ["Type", "Rule", "Example"],
        rows: [
          [
            "Yes/No question",
            "asked + if/whether + statement order",
            "'Are you ready?' → He asked if I was ready.",
          ],
          [
            "Wh- question",
            "asked + wh-word + statement order",
            "'Where do you live?' → She asked where I lived.",
          ],
          [
            "Command",
            "told + object + to + infinitive",
            "'Close the door.' → He told us to close the door.",
          ],
          [
            "Negative command",
            "told + object + not to",
            "'Don't be late.' → Mum told me not to be late.",
          ],
          [
            "Request",
            "asked + object + to",
            "'Please sit down.' → The doctor asked me to sit down.",
          ],
          ["Suggestion", "suggested + -ing / that", "'Let's go.' → He suggested going."],
        ],
      },
    ],
    map: [
      {
        label: "Statements",
        items: [
          "said (that)",
          "told + person",
          { label: "backshift", sub: ["am → was", "saw → had seen", "will → would"] },
        ],
      },
      {
        label: "Questions",
        items: ["asked", "if / whether", "wh-word", "no question order, no question mark"],
      },
      { label: "Commands", items: ["told + to", "told + not to", "asked + to (requests)"] },
      { label: "Suggestions", items: ["suggested + -ing", "suggested that…"] },
      {
        label: "Time & place",
        items: ["now → then", "tomorrow → the next day", "here → there", "this → that"],
      },
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
      ["talent", "natural ability", "She has a talent for music."],
      [
        "achievement",
        "something done successfully",
        "Winning the Nobel Prize is a great achievement.",
      ],
      ["discovery", "finding something new", "Zewail made an important discovery."],
      ["invention", "creating something new", "The telephone was a great invention."],
      ["determination", "continuing despite difficulty", "Success needs determination."],
      ["curious", "wanting to learn and know", "Curious students ask questions."],
      ["creative", "having original ideas", "Creative people solve problems."],
      ["breakthrough", "an important new discovery", "a medical breakthrough"],
      ["award", "a prize for achievement", "She received an award."],
    ],
    [
      ["achieve → achievement", "verb → noun", "a great achievement"],
      ["discover → discovery", "verb → noun", "an amazing discovery"],
      ["create → creative → creativity", "verb → adj → noun", "Creativity is important."],
      ["intelligence → intelligent", "noun → adjective", "an intelligent student"],
      ["win the Nobel Prize in …", "collocation", "Zewail won the Nobel Prize in Chemistry."],
    ],
    [
      {
        label: "Egyptian minds",
        items: [
          { label: "Ahmed Zewail", sub: ["Nobel Chemistry 1999", "femtochemistry", "Zewail City"] },
          { label: "Naguib Mahfouz", sub: ["Nobel Literature 1988"] },
          { label: "Farouk El-Baz", sub: ["NASA Apollo missions"] },
          "Magdi Yacoub",
        ],
      },
      { label: "World minds", items: ["Einstein: relativity", "Marie Curie: radioactivity"] },
      {
        label: "Qualities",
        items: ["curious", "creative", "determined", "hard-working", "patient"],
      },
      { label: "Results", items: ["discoveries", "inventions", "awards", "inspiring others"] },
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
      ["vacancy", "an available job", "There's a vacancy for an engineer."],
      ["CV", "document of your education and experience", "Send your CV by email."],
      ["candidate", "a person applying for a job", "There were fifty candidates."],
      ["interview", "a meeting to assess a candidate", "I have a job interview tomorrow."],
      ["qualifications", "certificates of study or training", "She has excellent qualifications."],
      ["skills", "abilities", "Communication skills are important."],
      ["salary / wages", "money paid for work (monthly / weekly)", "The salary is good."],
      ["promotion", "moving to a higher position", "He got a promotion."],
      ["resign", "leave your job by choice", "She resigned to start a business."],
    ],
    [
      [
        "employ → employer / employee / employment",
        "word family",
        "The employer hired ten employees.",
      ],
      ["apply → application → applicant", "verb → noun → person", "Fill in the application form."],
      ["apply for a job", "collocation", "I applied for a job at the bank."],
      ["full-time / part-time / freelance", "types of work", "She works freelance."],
      ["soft skills", "teamwork, communication…", "Employers value soft skills."],
      [
        "Dear Sir or Madam … Yours faithfully",
        "formal letter",
        "Use it when you don't know the name.",
      ],
    ],
    [
      {
        label: "Applying",
        items: [
          "vacancy",
          "CV",
          "cover letter",
          { label: "interview", sub: ["prepare", "dress smartly", "arrive on time"] },
        ],
      },
      {
        label: "Skills",
        items: [
          { label: "hard skills", sub: ["computer", "languages"] },
          { label: "soft skills", sub: ["teamwork", "communication", "problem-solving"] },
        ],
      },
      { label: "Types of work", items: ["full-time", "part-time", "freelance"] },
      { label: "Career", items: ["salary", "promotion", "job satisfaction", "resign / retire"] },
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
      ["start-up", "a newly established business", "The start-up sells eco-friendly bags."],
      ["capital", "money used to start a business", "He needed capital to open a shop."],
      ["loan", "borrowed money to pay back", "She got a bank loan."],
      ["invest", "put money in hoping for profit", "They invested in a new app."],
      ["profit / loss", "money gained / lost", "The shop made a profit."],
      ["market research", "studying what customers want", "Do market research first."],
      ["brand", "name/symbol of a company's products", "Build a strong brand."],
      ["competition", "rivals trying to win the same customers", "There's a lot of competition."],
      ["innovative", "new and original", "an innovative idea"],
    ],
    [
      ["profit → profitable", "noun → adjective", "a profitable business"],
      ["succeed → success → successful", "verb → noun → adjective", "a successful company"],
      [
        "innovate → innovation → innovative",
        "verb → noun → adjective",
        "Innovation drives growth.",
      ],
      ["take a risk", "collocation", "Entrepreneurs take risks."],
      ["supply and demand", "economics", "Prices depend on supply and demand."],
    ],
    [
      {
        label: "Starting",
        items: [
          "an idea",
          "market research",
          "business plan",
          { label: "money", sub: ["capital", "loan", "investors"] },
        ],
      },
      {
        label: "Running",
        items: ["customers", "advertising", "brand", "competition", "products and services"],
      },
      { label: "Results", items: ["profit", "loss", "growth"] },
      {
        label: "Qualities",
        items: ["innovative", "risk-taking", "determined", "good communicator"],
      },
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
    tables: [
      {
        title: "Relative pronouns",
        headers: ["Pronoun", "Used for", "Example"],
        rows: [
          ["who", "people (subject)", "The man who lives next door is a doctor."],
          ["whom", "people (object, formal)", "The person to whom I spoke was helpful."],
          ["which", "things / animals", "The book which I read was exciting."],
          ["that", "people or things (defining only)", "The phone that I bought is broken."],
          ["whose", "possession", "The girl whose bag was stolen called the police."],
          ["where", "places", "That's the school where I studied."],
          ["when", "times", "I remember the day when we met."],
          ["why", "reasons", "The reason why he left is unknown."],
        ],
      },
      {
        title: "Defining vs non-defining",
        headers: ["", "Defining", "Non-defining"],
        rows: [
          ["Information", "essential – tells us which one", "extra – can be removed"],
          ["Commas", "no commas", "between commas"],
          ["'that'", "allowed", "not allowed"],
          ["Omitting the pronoun", "possible if it's the object", "never"],
          [
            "Example",
            "The students who passed were happy.",
            "My brother, who lives in Cairo, is a doctor.",
          ],
        ],
      },
      {
        title: "Common mistakes",
        headers: ["✗ Wrong", "✓ Correct"],
        rows: [
          ["Cairo, that is the capital, is crowded.", "Cairo, which is the capital, is crowded."],
          ["The man which helped me…", "The man who helped me…"],
          ["The girl who her bag was stolen…", "The girl whose bag was stolen…"],
          [
            "The hotel which we stayed was nice.",
            "The hotel where we stayed was nice. / The hotel (which) we stayed at…",
          ],
        ],
      },
    ],
    map: [
      { label: "People", items: ["who", "whom (object)", "that (defining)"] },
      { label: "Things", items: ["which", "that (defining)"] },
      {
        label: "Others",
        items: ["whose: possession", "where: place", "when: time", "why: reason"],
      },
      {
        label: "Defining",
        items: ["essential", "no commas", "'that' OK", "object pronoun can be dropped"],
      },
      {
        label: "Non-defining",
        items: ["extra information", "commas", "no 'that'", "pronoun can't be dropped"],
      },
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
      ["ambition", "a strong wish to achieve", "He has big ambitions."],
      ["overcome", "deal successfully with a problem", "She overcame many obstacles."],
      ["obstacle", "something that blocks progress", "Poverty was his biggest obstacle."],
      ["setback", "a problem that delays progress", "A setback is not the end."],
      ["role model", "someone others admire and copy", "Salah is a role model."],
      ["mentor", "an experienced adviser", "Her mentor guided her."],
      ["humble beginnings", "starting life poor or simple", "He rose from humble beginnings."],
      ["self-made", "successful through own efforts", "a self-made millionaire"],
      ["turning point", "a moment of important change", "That match was a turning point."],
    ],
    [
      ["persevere → perseverance", "verb → noun", "Perseverance pays off."],
      ["ambition → ambitious", "noun → adjective", "an ambitious student"],
      ["success → successful → successfully", "noun → adj → adverb", "She finished successfully."],
      ["never give up", "phrase", "Never give up on your dreams."],
      ["hard work pays off", "saying", "Hard work always pays off."],
    ],
    [
      { label: "Ingredients", items: ["ambition", "hard work", "perseverance", "self-confidence"] },
      { label: "Obstacles", items: ["poverty", "failure", "setbacks", "criticism"] },
      {
        label: "Examples",
        items: [
          { label: "Mohamed Salah", sub: ["from Nagrig village", "Liverpool star"] },
          "self-made entrepreneurs",
        ],
      },
      {
        label: "Lessons",
        items: ["never give up", "learn from failure", "dream big", "find a mentor"],
      },
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
      ["monument", "an important old building or statue", "The pyramids are famous monuments."],
      ["pharaoh", "a king of ancient Egypt", "Ramses II was a powerful pharaoh."],
      ["hieroglyphics", "ancient Egyptian picture writing", "Champollion read hieroglyphics."],
      ["papyrus", "plant used to make paper", "They wrote on papyrus."],
      ["mummy", "a preserved dead body", "The museum has royal mummies."],
      ["archaeologist", "studies remains of the past", "Archaeologists found a new tomb."],
      ["artefact", "an object made long ago", "The artefacts are 3,000 years old."],
      ["preserve / restore", "protect / repair to original state", "The temple was restored."],
      ["obelisk", "a tall pointed stone pillar", "An obelisk stands in Karnak."],
    ],
    [
      [
        "history → historic / historical",
        "important in history / about history",
        "a historic site",
      ],
      ["archaeology → archaeological", "noun → adjective", "an archaeological discovery"],
      ["Giza: Pyramids & Sphinx", "site", "The Sphinx has a lion's body."],
      [
        "Luxor: Karnak, Valley of the Kings, Deir el-Bahari",
        "sites",
        "Hatshepsut's temple is at Deir el-Bahari.",
      ],
      ["Aswan: Abu Simbel (Ramses II)", "site", "Abu Simbel was moved to save it from the lake."],
      ["Tutankhamun's tomb (Howard Carter, 1922)", "discovery", "Carter found the tomb in 1922."],
    ],
    [
      {
        label: "Sites",
        items: [
          { label: "Giza", sub: ["Pyramids", "Sphinx", "Grand Egyptian Museum"] },
          { label: "Luxor", sub: ["Karnak", "Valley of the Kings", "Deir el-Bahari"] },
          { label: "Aswan", sub: ["Abu Simbel"] },
          "Cairo: the Citadel",
        ],
      },
      {
        label: "Discoveries",
        items: ["Rosetta Stone (Champollion 1822)", "Tutankhamun's tomb (Carter)"],
      },
      {
        label: "Ancient life",
        items: ["pharaohs", "hieroglyphics", "papyrus", "mummies", "life after death"],
      },
      { label: "Protection", items: ["restore", "preserve", "responsible tourism", "museums"] },
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
      ["tradition", "a custom passed down generations", "It's a family tradition."],
      ["cuisine", "a style of cooking", "Italian cuisine is popular."],
      ["festival", "a special celebration", "Sham El-Nessim is a spring festival."],
      ["tolerance", "accepting differences", "Tolerance brings peace."],
      ["stereotype", "a fixed, oversimplified idea", "Avoid stereotypes about people."],
      ["diverse", "including many types", "a diverse society"],
      ["etiquette", "rules of polite behaviour", "Table etiquette varies."],
      ["hospitality", "being welcoming to guests", "Egyptians are famous for hospitality."],
    ],
    [
      ["culture → cultural → culturally", "noun → adj → adverb", "cultural differences"],
      ["tolerate → tolerance → tolerant", "verb → noun → adjective", "a tolerant person"],
      ["diverse → diversity", "adjective → noun", "cultural diversity"],
      ["respect other cultures", "collocation", "Always respect other cultures."],
      ["global village", "phrase", "Technology made the world a global village."],
    ],
    [
      {
        label: "Elements",
        items: ["language", "food (cuisine)", "festivals", "traditional dress", "music"],
      },
      {
        label: "Positive attitudes",
        items: ["respect", "tolerance", "open-mindedness", "hospitality"],
      },
      { label: "Problems", items: ["stereotypes", "misunderstanding", "prejudice"] },
      { label: "Today", items: ["globalisation", "global village", "multicultural societies"] },
      { label: "Egyptian culture", items: ["Sham El-Nessim", "hospitality", "Ramadan traditions"] },
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
    tables: [
      {
        title: "Passive forms: be + past participle",
        headers: ["Tense", "Active", "Passive"],
        rows: [
          ["Present simple", "They speak English.", "English is spoken."],
          ["Present continuous", "They are cleaning the room.", "The room is being cleaned."],
          ["Past simple", "They built the pyramids.", "The pyramids were built."],
          ["Past continuous", "They were building the bridge.", "The bridge was being built."],
          ["Present perfect", "They have opened the museum.", "The museum has been opened."],
          ["Past perfect", "They had finished the work.", "The work had been finished."],
          ["Future", "They will send the letter.", "The letter will be sent."],
          ["Modals", "You must finish the work.", "The work must be finished."],
        ],
      },
      {
        title: "Special passive structures",
        headers: ["Structure", "Example"],
        rows: [
          ["It is said / believed / thought that…", "It is said that Alexander founded the city."],
          ["Subject + is said / believed + to + inf.", "He is believed to live abroad."],
          ["… to have + p.p. (past)", "The temple is thought to have been built 3,000 years ago."],
          ["Causative: have / get something done", "I had my hair cut yesterday."],
          ["by + agent (only if important)", "The novel was written by Naguib Mahfouz."],
        ],
      },
      {
        title: "Common mistakes",
        headers: ["✗ Wrong", "✓ Correct"],
        rows: [
          ["The letter was send yesterday.", "The letter was sent yesterday."],
          ["The room is cleaning now.", "The room is being cleaned now."],
          ["The work must finished.", "The work must be finished."],
          [
            "The accident was happened.",
            "The accident happened. (intransitive verbs have no passive)",
          ],
        ],
      },
    ],
    map: [
      {
        label: "Form",
        items: ["be + past participle", "'be' shows the tense", "by + agent (optional)"],
      },
      {
        label: "Use",
        items: [
          "action more important than doer",
          "doer unknown or obvious",
          "formal / scientific writing",
        ],
      },
      {
        label: "Tenses",
        items: [
          "is done",
          "is being done",
          "was done",
          "has been done",
          "will be done",
          "must be done",
        ],
      },
      {
        label: "Special",
        items: [
          "It is said that…",
          "He is believed to…",
          { label: "causative", sub: ["have something done", "get something done"] },
        ],
      },
      {
        label: "Watch out",
        items: [
          "intransitive verbs (happen, arrive) → no passive",
          "use the correct past participle",
        ],
      },
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
      ["civilisation", "an advanced organised society", "Egypt is a cradle of civilisation."],
      ["crossroads", "a meeting point", "Egypt is a crossroads of three continents."],
      ["empire", "lands ruled by one state or ruler", "the Roman Empire"],
      ["conquer", "take control by force", "Alexander conquered Egypt in 332 BC."],
      ["trade route", "path used by merchants", "The Silk Road was a trade route."],
      ["merchant", "a person who buys and sells", "Merchants carried spices."],
      ["port", "a town where ships load and unload", "Alexandria is a great port."],
      ["influence", "power to affect others", "Greek culture influenced Alexandria."],
      ["legacy", "what is left for the future", "Ancient Egypt left a great legacy."],
      ["coexist", "live together peacefully", "Different cultures coexisted in Alexandria."],
    ],
    [
      ["civilise → civilisation → civilised", "verb → noun → adjective", "an ancient civilisation"],
      ["strategy → strategic", "noun → adjective", "a strategic location"],
      [
        "Library of Alexandria / Bibliotheca Alexandrina (2002)",
        "places",
        "The new library opened in 2002.",
      ],
      ["the Pharos lighthouse", "Seven Wonders", "one of the Seven Wonders of the ancient world"],
      ["exchange ideas", "collocation", "Scholars exchanged ideas in Alexandria."],
    ],
    [
      {
        label: "Location",
        items: ["Africa, Asia and Europe meet", "Mediterranean and Red Sea", "Suez Canal"],
      },
      {
        label: "Civilisations in Egypt",
        items: [
          "Pharaonic",
          { label: "Greek / Ptolemaic", sub: ["Alexander 332 BC", "Cleopatra last ruler"] },
          "Roman",
          "Coptic",
          "Islamic",
        ],
      },
      {
        label: "Alexandria",
        items: ["ancient Library", "Pharos lighthouse", "Bibliotheca Alexandrina 2002"],
      },
      {
        label: "Exchange",
        items: ["trade (Silk Road, spices)", "ideas and science", "languages and cultures"],
      },
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
