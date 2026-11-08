import type { LessonStudy } from "./types";

const S = "فرنسي";

// Study material for the French lessons added from the 2026-27 sample exam.
export const STUDY_FR_2: LessonStudy[] = [
  {
    subject: S,
    lesson: "Les adjectifs démonstratifs et l'impératif",
    tables: [
      {
        title: "Les adjectifs démonstratifs",
        headers: ["Adjectif", "Emploi", "Exemples"],
        rows: [
          ["ce", "nom masculin singulier (consonne)", "ce livre, ce stade"],
          ["cet", "nom masculin singulier (voyelle ou h muet)", "cet ami, cet hôtel, cet été"],
          ["cette", "nom féminin singulier", "cette élève, cette année"],
          ["ces", "nom pluriel (masculin ou féminin)", "ces fleurs, ces enfants"],
        ],
      },
      {
        title: "L'impératif",
        headers: ["Présent", "Impératif", "Remarque"],
        rows: [
          ["tu manges", "Mange !", "pas de s pour les verbes en -er"],
          ["tu vas", "Va !", "aller perd aussi le s"],
          ["nous allons", "Allons !", "sans sujet"],
          ["vous faites", "Faites !", "sans sujet"],
          ["tu prends", "Prends !", "les autres verbes gardent le s"],
          ["tu te lèves", "Lève-toi !", "pronominal : verbe + toi / nous / vous"],
          ["tu ne regardes pas", "Ne regarde pas !", "négation autour du verbe"],
        ],
      },
    ],
    map: [
      { label: "Démonstratifs", items: ["ce", "cet (voyelle, h muet)", "cette", "ces"] },
      {
        label: "Impératif",
        items: [
          { label: "Personnes", sub: ["tu", "nous", "vous"] },
          { label: "Forme", sub: ["sans sujet", "verbes en -er sans s : Mange !"] },
          { label: "Cas spéciaux", sub: ["Lève-toi !", "Ne mange pas !"] },
        ],
      },
    ],
    essays: [
      [
        "Quand emploie-t-on « cet » ?",
        "Devant un nom masculin singulier qui commence par une voyelle ou un h muet : cet ami, cet hôtel.",
      ],
      [
        "Mettez à l'impératif : « Tu vas au lycée » et « Vous prenez le bus ».",
        "Va au lycée ! – Prenez le bus !",
      ],
    ],
  },
  {
    subject: S,
    lesson: "Comprendre un document (forum, mail)",
    tables: [
      {
        title: "Comment lire un document",
        headers: ["Étape", "Ce qu'on cherche", "Exemple"],
        rows: [
          [
            "1. Le type",
            "forum, mail, invitation, article",
            "De : / À : / Objet : → c'est un mail",
          ],
          [
            "2. Le thème",
            "de quoi parle le texte ?",
            "Qu'est-ce que vous aimez manger ? → les aliments",
          ],
          ["3. Les personnes", "qui écrit ? à qui ?", "Jean écrit à son ami Fabien"],
          [
            "4. Les détails",
            "où ? quand ? combien de fois ?",
            "le 12 janvier – une fois par semaine",
          ],
          [
            "5. Les mots clés",
            "aimer / détester, toujours / jamais",
            "Je ne bois jamais de thé → il ne boit pas de thé",
          ],
        ],
      },
      {
        title: "Mois et saisons",
        headers: ["Saison", "Mois"],
        rows: [
          ["en hiver", "décembre, janvier, février"],
          ["au printemps", "mars, avril, mai"],
          ["en été", "juin, juillet, août"],
          ["en automne", "septembre, octobre, novembre"],
        ],
      },
    ],
    map: [
      { label: "Le mail", items: ["De : l'expéditeur", "À : le destinataire", "Objet : le sujet"] },
      {
        label: "Les questions",
        items: ["thème", "personnes", "lieu", "date et durée", "fréquence"],
      },
      { label: "Attention", items: ["la négation change le sens", "jamais = pas une seule fois"] },
    ],
    essays: [
      [
        "Dans un mail, que signifient « De », « À » et « Objet » ?",
        "De : la personne qui envoie le mail. À : la personne qui le reçoit. Objet : le sujet du message.",
      ],
      [
        "Quelqu'un arrive le 12 janvier et part le 18. Combien de temps reste-t-il et en quelle saison ?",
        "Il reste environ une semaine, en hiver.",
      ],
    ],
  },
  {
    subject: S,
    lesson: "Écrire un mail et un petit texte",
    tables: [
      {
        title: "Plan d'un mail",
        headers: ["Partie", "Exemple"],
        rows: [
          ["Salutation", "Salut Karim !"],
          [
            "Réponse à la 1re question",
            "Je vais passer mes vacances à Alexandrie avec ma famille.",
          ],
          ["Réponse à la 2e question", "Je préfère le train parce que c'est rapide et pratique."],
          ["Formule finale", "À bientôt ! / Amicalement"],
        ],
      },
      {
        title: "Mots utiles pour un petit texte (25 à 30 mots)",
        headers: ["Pour…", "Mots"],
        rows: [
          ["ordonner les idées", "d'abord, ensuite, puis, enfin"],
          ["donner une raison", "parce que, car"],
          ["raconter le passé", "hier, la semaine dernière + passé composé"],
          ["une fête", "les invitations, les ballons, le gâteau, installer, préparer, inviter"],
        ],
      },
    ],
    map: [
      { label: "Le mail", items: ["Salut !", "phrases complètes", "Amicalement"] },
      {
        label: "Le petit texte",
        items: ["25 à 30 mots", "utiliser les mots donnés", "d'abord – ensuite – enfin"],
      },
      { label: "Le temps", items: ["passé composé pour raconter", "présent pour décrire"] },
    ],
    essays: [
      [
        "Répondez à ce mail : « Je vais voyager à Paris cet été. Où tu vas passer tes vacances ? Quel moyen de transport tu préfères ? »",
        "Salut ! Cet été, je vais passer mes vacances à Marsa Matrouh avec ma famille. Je préfère voyager en train parce que c'est confortable. À bientôt !",
      ],
      [
        "Écrivez 25 à 30 mots : vous organisez une fête surprise pour l'anniversaire de votre père (installer – invitations).",
        "D'abord, j'ai envoyé les invitations à la famille. Ensuite, mon frère et moi avons installé les ballons dans le salon. Enfin, nous avons préparé un grand gâteau. Mon père était très content.",
      ],
    ],
  },
];
