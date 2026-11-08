import type { LessonStudy } from "./types";

const S = "فرنسي";

export const STUDY_FR: LessonStudy[] = [
  {
    subject: S,
    lesson: "Les sports et les activités",
    tables: [
      {
        title: "Jouer à ou faire de ?",
        headers: ["Structure", "Emploi", "Exemples"],
        rows: [
          ["jouer au / à la / aux", "sports de balle et jeux", "jouer au football, au tennis, au basket"],
          ["faire du / de la / de l'", "autres activités sportives", "faire du vélo, de la natation, de l'escalade"],
          ["faire de l'équitation", "monter à cheval", "Ma sœur fait de l'équitation."],
        ],
      },
      {
        title: "Exprimer ses goûts et la fréquence",
        headers: ["Expression", "Sens", "Exemple"],
        rows: [
          ["J'adore / C'est ma passion", "goût très fort", "Le football, c'est ma passion."],
          ["J'aime / Je préfère", "goût", "Je préfère la natation."],
          ["Je déteste / Je n'aime pas", "refus", "Je déteste la course."],
          ["souvent / toujours / jamais", "fréquence", "Je ne fais jamais de ski."],
          ["une fois / trois fois par semaine", "fréquence précise", "Je joue au tennis deux fois par semaine."],
        ],
      },
    ],
    map: [
      { label: "Sports de balle", items: ["le football", "le tennis", "le basket", "le handball"] },
      { label: "Autres sports", items: ["la natation", "le cyclisme", "l'équitation", "l'escalade", "la planche à voile"] },
      { label: "Matériel", items: ["un ballon", "une raquette", "un vélo", "un maillot de bain", "un cheval"] },
      { label: "Lieux", items: ["le stade", "la piscine", "le club", "le court de tennis"] },
      { label: "Grammaire", items: ["jouer à / faire de", { label: "savoir + infinitif", sub: ["je sais, tu sais, il sait", "nous savons, vous savez, ils savent"] }] },
    ],
    essays: [
      ["Parlez de votre sport préféré (5 phrases).", "Mon sport préféré, c'est le football. Je joue au football avec mes amis deux fois par semaine au club. J'aime ce sport parce qu'il est collectif et amusant. Pour jouer, on a besoin d'un ballon et de chaussures de sport. Le sport est important pour être en bonne santé."],
      ["Écrivez un message à votre ami pour l'inviter à faire du sport avec vous.", "Salut Karim, ça va ? Samedi prochain, je vais faire du vélo au parc avec mon frère. Tu veux venir avec nous ? On part à 9 heures du matin. Apporte ton vélo et de l'eau. Réponds-moi vite ! À bientôt, Ahmed."],
      ["Pourquoi le sport est-il important pour les jeunes ?", "Le sport est important parce qu'il aide à rester en forme et en bonne santé. Il donne de l'énergie et réduit le stress. Il permet aussi de se faire des amis et d'apprendre à travailler en équipe."],
    ],
  },
  {
    subject: S,
    lesson: "Le temps libre et les sorties",
    tables: [
      {
        title: "Proposer, accepter, refuser",
        headers: ["Fonction", "Expressions"],
        rows: [
          ["Proposer", "Si on allait au cinéma ? / Ça te dit de… ? / Tu veux venir… ?"],
          ["Accepter", "Avec plaisir ! / D'accord ! / Bonne idée !"],
          ["Refuser poliment", "Désolé, je ne peux pas. / Je suis occupé. / Une autre fois."],
          ["Fixer un rendez-vous", "On se retrouve devant le cinéma à 18 heures."],
        ],
      },
      {
        title: "Aller à + article",
        headers: ["Forme", "Emploi", "Exemple"],
        rows: [
          ["au", "masculin singulier", "Je vais au musée."],
          ["à la", "féminin singulier", "Je vais à la piscine."],
          ["à l'", "devant une voyelle", "Je vais à l'école."],
          ["aux", "pluriel", "Je joue aux jeux vidéo."],
        ],
      },
    ],
    map: [
      { label: "Loisirs", items: ["lire", "faire du shopping", "jouer aux jeux vidéo", "écouter de la musique"] },
      { label: "Sorties", items: ["le cinéma", "le théâtre", "le musée", "le parc", "le concert"] },
      { label: "Inviter", items: ["proposer", "accepter", "refuser", "donner rendez-vous"] },
      { label: "Grammaire", items: ["aller au / à la / aux", { label: "passé composé avec être", sub: ["nous sommes allés", "elle est sortie"] }, "quel / quelle / quels / quelles"] },
    ],
    essays: [
      ["Que faites-vous pendant votre temps libre ?", "Pendant mon temps libre, j'aime lire des romans et écouter de la musique. Le vendredi, je vais au club avec mes amis. Parfois, nous allons au cinéma ou nous faisons du shopping. J'aime aussi jouer aux jeux vidéo, mais pas trop longtemps."],
      ["Votre ami vous invite au cinéma samedi, mais vous ne pouvez pas. Répondez-lui.", "Merci beaucoup pour ton invitation, Omar. Je suis désolé, mais je ne peux pas venir samedi parce que j'ai un examen dimanche. On peut aller au cinéma le week-end prochain si tu veux. Bon film !"],
      ["Racontez votre dernière sortie (au passé composé).", "Vendredi dernier, je suis allé au parc avec ma famille. Nous avons fait un pique-nique et nous avons joué au ballon. Ensuite, nous sommes allés au café. Nous sommes rentrés à la maison le soir. C'était une journée formidable."],
    ],
  },
  {
    subject: S,
    lesson: "Les repas et les aliments",
    tables: [
      {
        title: "Les repas de la journée",
        headers: ["Repas", "Moment", "Exemple"],
        rows: [
          ["le petit-déjeuner", "le matin", "du pain, du fromage, du lait"],
          ["le déjeuner", "à midi", "du riz, du poulet, de la salade"],
          ["le goûter", "l'après-midi", "un gâteau, un fruit"],
          ["le dîner", "le soir", "une soupe, un yaourt"],
        ],
      },
      {
        title: "Les familles d'aliments",
        headers: ["Famille", "Exemples"],
        rows: [
          ["Les produits laitiers", "le lait, le fromage, le yaourt, le beurre"],
          ["Les légumes", "la carotte, la tomate, la pomme de terre, l'oignon"],
          ["Les fruits", "la pomme, l'orange, la banane, la fraise"],
          ["Les viandes et le poisson", "le poulet, la viande, le poisson"],
          ["Les féculents", "le pain, le riz, les pâtes"],
          ["Les boissons", "l'eau, le jus, le thé, le café, les boissons gazeuses"],
        ],
      },
    ],
    map: [
      { label: "Repas", items: ["petit-déjeuner", "déjeuner", "goûter", "dîner"] },
      { label: "Aliments", items: ["produits laitiers", "légumes", "fruits", "viandes", "matières grasses"] },
      { label: "Bonne alimentation", items: ["manger des fruits et des légumes", "boire beaucoup d'eau", "éviter les boissons gazeuses", "manger à des heures régulières"] },
      { label: "Grammaire", items: [{ label: "partitifs", sub: ["du pain", "de la viande", "de l'eau", "des fruits"] }, "négation : pas de", "avoir faim / avoir soif"] },
    ],
    essays: [
      ["Décrivez votre alimentation quotidienne.", "Le matin, je prends du pain, du fromage et un verre de lait. À midi, je mange du riz, du poulet et de la salade. Je mange des fruits l'après-midi. Le soir, je dîne léger. Je bois beaucoup d'eau et je ne bois jamais de boissons gazeuses."],
      ["Donnez des conseils pour bien manger.", "Il faut manger des fruits et des légumes chaque jour. Il faut boire beaucoup d'eau. Il ne faut pas manger trop de sucre ni de matières grasses. Il faut prendre un bon petit-déjeuner et manger à des heures régulières."],
      ["Quel est votre plat préféré ? Pourquoi ?", "Mon plat préféré, c'est le koshari. Il est délicieux et pas cher. Il y a du riz, des pâtes, des lentilles, de la sauce tomate et des oignons frits. Je le mange souvent avec ma famille le vendredi."],
    ],
  },
  {
    subject: S,
    lesson: "Au marché et la cuisine",
    tables: [
      {
        title: "Les commerces",
        headers: ["Commerce", "On y achète"],
        rows: [
          ["la boulangerie", "le pain, les croissants"],
          ["la boucherie", "la viande"],
          ["la pâtisserie", "les gâteaux"],
          ["l'épicerie / le supermarché", "le sucre, l'huile, le riz…"],
          ["la pharmacie", "les médicaments"],
          ["le marché", "les fruits et les légumes"],
        ],
      },
      {
        title: "Exprimer la quantité",
        headers: ["Expression", "Exemple"],
        rows: [
          ["un kilo de", "un kilo de tomates"],
          ["un litre de", "un litre de lait"],
          ["une douzaine de", "une douzaine d'œufs"],
          ["une bouteille de", "une bouteille d'eau"],
          ["beaucoup de / un peu de / assez de", "beaucoup de sucre"],
          ["Combien de… ?", "Combien de pommes voulez-vous ?"],
        ],
      },
    ],
    map: [
      { label: "Commerces", items: ["boulangerie", "boucherie", "pharmacie", "marché", "supermarché"] },
      { label: "Au magasin", items: ["Combien ça coûte ?", "Je voudrais…", "Et avec ceci ? – C'est tout.", "Ça fait 50 livres."] },
      { label: "Quantités", items: ["un kilo de", "un litre de", "une douzaine de", "beaucoup de"] },
      { label: "Cuisine", items: ["les ingrédients", "éplucher", "couper", "faire cuire", "C'est délicieux !"] },
    ],
    essays: [
      ["Écrivez un dialogue entre vous et un vendeur au marché.", "– Bonjour monsieur, je voudrais un kilo de tomates, s'il vous plaît. – Voilà. Et avec ceci ? – Deux kilos d'oranges aussi. Combien ça coûte ? – Ça fait 45 livres. – Voilà 50 livres. – Merci, voici votre monnaie. Bonne journée !"],
      ["Donnez la recette d'un plat simple.", "Pour faire une salade, il faut des tomates, un concombre, un oignon, du sel, de l'huile et du citron. D'abord, on lave les légumes. Ensuite, on les coupe en petits morceaux. Enfin, on ajoute le sel, l'huile et le citron et on mélange."],
      ["Faites la liste des courses pour un pique-nique.", "Pour le pique-nique, j'achète du pain à la boulangerie, du fromage, un kilo de fruits au marché, des bouteilles d'eau et un gâteau à la pâtisserie."],
    ],
  },
  {
    subject: S,
    lesson: "La santé et chez le médecin",
    tables: [
      {
        title: "Avoir mal à + partie du corps",
        headers: ["Forme", "Exemple"],
        rows: [
          ["au + masculin", "J'ai mal au ventre / au dos / au bras."],
          ["à la + féminin", "J'ai mal à la tête / à la gorge / à la jambe."],
          ["à l' + voyelle", "J'ai mal à l'oreille / à l'estomac."],
          ["aux + pluriel", "J'ai mal aux dents / aux yeux / aux pieds."],
        ],
      },
      {
        title: "Les professionnels de la santé",
        headers: ["Personne", "Rôle"],
        rows: [
          ["le médecin", "examine et soigne les malades"],
          ["le dentiste", "soigne les dents"],
          ["le pédiatre", "soigne les enfants"],
          ["le pharmacien", "vend les médicaments"],
          ["l'infirmier / l'infirmière", "aide le médecin et s'occupe des malades"],
        ],
      },
    ],
    map: [
      { label: "Symptômes", items: ["la fièvre", "la toux", "le rhume", "la grippe", "avoir mal à…"] },
      { label: "Chez le médecin", items: ["Où avez-vous mal ?", "l'ordonnance", "les médicaments", "rester au lit"] },
      { label: "Conseils", items: ["Il faut + infinitif", "Il ne faut pas fumer", "se laver les mains", "bien dormir"] },
      { label: "Personnes", items: ["médecin", "dentiste", "pédiatre", "pharmacien", "infirmier"] },
    ],
    essays: [
      ["Vous êtes malade. Écrivez à votre professeur pour vous excuser de votre absence.", "Madame, je suis désolé, je ne peux pas venir au lycée aujourd'hui parce que je suis malade. J'ai de la fièvre et j'ai mal à la tête. Le médecin m'a dit de rester au lit deux jours. Je vais rattraper les cours. Merci de votre compréhension."],
      ["Donnez des conseils à un ami pour rester en bonne santé.", "Pour rester en bonne santé, il faut faire du sport régulièrement, manger des fruits et des légumes et boire beaucoup d'eau. Il faut bien dormir. Il ne faut pas fumer ni manger trop de sucre."],
      ["Racontez votre visite chez le médecin.", "Hier, j'avais mal à la gorge, alors je suis allé chez le médecin. Il m'a examiné et il m'a demandé où j'avais mal. Il m'a donné une ordonnance. Je suis allé à la pharmacie acheter les médicaments."],
    ],
  },
  {
    subject: S,
    lesson: "À la campagne et en vacances",
    tables: [
      {
        title: "Prépositions avec les lieux",
        headers: ["Lieu", "Préposition", "Exemple"],
        rows: [
          ["ville", "à", "Je vais à Alexandrie."],
          ["pays féminin", "en", "Je vais en France / en Égypte."],
          ["pays masculin", "au", "Je vais au Maroc / au Canada."],
          ["pays pluriel", "aux", "Je vais aux États-Unis."],
          ["chez + personne", "chez", "Je vais chez mes grands-parents."],
        ],
      },
      {
        title: "Les saisons",
        headers: ["Saison", "Préposition", "Mois"],
        rows: [
          ["le printemps", "au printemps", "mars, avril, mai"],
          ["l'été", "en été", "juin, juillet, août"],
          ["l'automne", "en automne", "septembre, octobre, novembre"],
          ["l'hiver", "en hiver", "décembre, janvier, février"],
        ],
      },
    ],
    map: [
      { label: "À la campagne", items: ["la ferme", "les animaux", "monter à cheval", "se baigner dans la rivière", "ramasser des fruits"] },
      { label: "En vacances", items: ["la plage", "l'hôtel", "le camping", "visiter des monuments"] },
      { label: "Saisons", items: ["au printemps", "en été", "en automne", "en hiver"] },
      { label: "Grammaire", items: ["à / en / au / aux", { label: "le pronom y", sub: ["Tu vas à la ferme ? – Oui, j'y vais."] }] },
    ],
    essays: [
      ["Écrivez un e-mail à votre ami pour l'inviter à passer quelques jours à la campagne.", "Salut Fabien, comment vas-tu ? Je te propose de venir passer quelques jours chez moi à la campagne. On peut monter à cheval, se baigner dans la rivière et visiter la ferme de mon grand-père. Tu peux venir du 12 au 18 janvier. Réponds-moi vite ! Amicalement, Jean."],
      ["Préférez-vous la ville ou la campagne ? Pourquoi ?", "Je préfère la campagne parce qu'elle est calme et l'air est pur. Il y a des champs verts et des animaux. En ville, il y a beaucoup de bruit et d'embouteillages, mais il y a plus de magasins et de loisirs."],
      ["Racontez vos dernières vacances.", "L'été dernier, je suis allé à Marsa Matrouh avec ma famille. Nous avons nagé dans la mer et nous avons joué au ballon sur la plage. Le soir, nous nous sommes promenés au bord de la mer. C'étaient des vacances magnifiques."],
    ],
  },
  {
    subject: S,
    lesson: "Les moyens de transport",
    tables: [
      {
        title: "En ou à ?",
        headers: ["Préposition", "Moyen de transport"],
        rows: [
          ["en", "voiture, bus, train, avion, métro, tramway, bateau, taxi"],
          ["à", "pied, vélo, cheval, moto"],
        ],
      },
      {
        title: "Où prend-on le transport ?",
        headers: ["Transport", "Lieu", "Personne"],
        rows: [
          ["le train", "la gare", "le conducteur"],
          ["l'avion", "l'aéroport", "le pilote"],
          ["le bus", "l'arrêt de bus", "le chauffeur"],
          ["le métro", "la station de métro", "le conducteur"],
          ["le bateau", "le port", "le capitaine"],
        ],
      },
    ],
    map: [
      { label: "Transports", items: ["voiture", "bus", "métro", "train", "avion", "vélo"] },
      { label: "Lieux", items: ["gare", "aéroport", "arrêt de bus", "guichet", "port"] },
      { label: "Avantages / inconvénients", items: ["le métro, c'est pratique et rapide", "la voiture : embouteillages, pollution", "le vélo : bon pour la santé et l'environnement"] },
      { label: "Grammaire", items: ["en / à + transport", { label: "prendre", sub: ["je prends", "nous prenons", "ils prennent", "participe : pris"] }, "se déplacer"] },
    ],
    essays: [
      ["Quel est votre moyen de transport préféré ? Pourquoi ?", "Mon moyen de transport préféré, c'est le métro. Il est rapide, pratique et pas cher. Il n'y a pas d'embouteillages sous la terre. Je prends le métro pour aller au centre-ville avec mes amis."],
      ["Comment allez-vous au lycée ?", "Je vais au lycée à pied parce qu'il est près de chez moi. Ça prend dix minutes. Quand il pleut, je prends le bus. Mon frère, lui, va à l'université en métro."],
      ["Quels sont les problèmes de la circulation dans les grandes villes ?", "Dans les grandes villes, il y a beaucoup d'embouteillages et de pollution. Les gens perdent beaucoup de temps. Pour résoudre ce problème, il faut prendre les transports en commun et utiliser le vélo."],
    ],
  },
  {
    subject: S,
    lesson: "Les adjectifs possessifs",
    tables: [
      {
        title: "Les adjectifs possessifs",
        headers: ["Possesseur", "Masculin", "Féminin", "Pluriel"],
        rows: [
          ["je", "mon", "ma (mon + voyelle)", "mes"],
          ["tu", "ton", "ta (ton + voyelle)", "tes"],
          ["il / elle", "son", "sa (son + voyelle)", "ses"],
          ["nous", "notre", "notre", "nos"],
          ["vous", "votre", "votre", "vos"],
          ["ils / elles", "leur", "leur", "leurs"],
        ],
      },
      {
        title: "Exemples et pièges",
        headers: ["Phrase", "Explication"],
        rows: [
          ["mon amie, son école", "mon / ton / son devant un nom féminin qui commence par une voyelle"],
          ["Ali et Omar aiment leur sœur.", "plusieurs possesseurs, un seul objet → leur"],
          ["Les enfants prennent leurs serviettes.", "plusieurs possesseurs, plusieurs objets → leurs"],
          ["Mona aime son frère.", "l'accord se fait avec l'objet (frère, masculin), pas avec Mona"],
        ],
      },
    ],
    map: [
      { label: "Singulier", items: ["mon / ma / mes", "ton / ta / tes", "son / sa / ses"] },
      { label: "Pluriel", items: ["notre / nos", "votre / vos", "leur / leurs"] },
      { label: "Règle", items: ["accord avec l'objet possédé", "mon + voyelle (mon amie)"] },
      { label: "Pièges", items: ["leur ≠ leurs", "son frère (à elle) = son"] },
    ],
    essays: [
      ["Présentez votre famille en employant des adjectifs possessifs.", "Mon père s'appelle Ahmed, il est ingénieur. Ma mère est professeur. Mes deux frères sont au lycée. Notre maison est grande et notre jardin est joli. Mes grands-parents habitent avec nous ; leur chambre est au rez-de-chaussée."],
      ["Expliquez la différence entre « leur » et « leurs » avec des exemples.", "« Leur » s'emploie quand plusieurs personnes possèdent un seul objet : Ils aiment leur professeur. « Leurs » s'emploie quand ils possèdent plusieurs objets : Ils rangent leurs livres."],
      ["Pourquoi dit-on « mon amie » et non « ma amie » ?", "Parce que « amie » commence par une voyelle. Pour faciliter la prononciation, on remplace ma, ta, sa par mon, ton, son devant un nom féminin qui commence par une voyelle ou un h muet."],
    ],
  },
  {
    subject: S,
    lesson: "Les pronoms y et en",
    tables: [
      {
        title: "Y et en",
        headers: ["Pronom", "Remplace", "Exemple"],
        rows: [
          ["y", "un lieu (à, au, en, chez, dans)", "Tu vas au club ? – Oui, j'y vais."],
          ["y", "à + chose", "Tu penses à ton examen ? – Oui, j'y pense."],
          ["en", "du, de la, de l', des + nom", "Tu manges du pain ? – Oui, j'en mange."],
          ["en", "une quantité", "Tu as des frères ? – J'en ai deux."],
          ["en", "de + lieu (venir de)", "Tu viens de l'école ? – Oui, j'en viens."],
        ],
      },
      {
        title: "La place du pronom",
        headers: ["Cas", "Exemple"],
        rows: [
          ["phrase affirmative", "J'y vais. / J'en mange."],
          ["phrase négative", "Je n'y vais pas. / Je n'en mange pas."],
          ["impératif affirmatif", "Vas-y ! Prends-en !"],
          ["avec un infinitif", "Je vais y aller. / Je veux en acheter."],
        ],
      },
    ],
    map: [
      { label: "Y", items: ["lieu", "à + chose", { label: "exemples", sub: ["J'y vais", "J'y pense"] }] },
      { label: "En", items: ["partitif", "quantité", "de + lieu", { label: "exemples", sub: ["J'en mange", "J'en ai deux"] }] },
      { label: "Place", items: ["avant le verbe", "ne … pas autour", "après le verbe à l'impératif"] },
      { label: "Impératif", items: ["Va → Vas-y !", "Prends-en !", "N'y va pas !"] },
    ],
    essays: [
      ["Répondez en employant y ou en : Tu vas souvent à la plage ? Tu bois du café ?", "Oui, j'y vais souvent en été. Non, je n'en bois pas, je préfère le thé."],
      ["Expliquez quand on emploie « y » et quand on emploie « en ».", "On emploie « y » pour remplacer un lieu introduit par à, au, en, chez ou un complément introduit par à. On emploie « en » pour remplacer un nom précédé de du, de la, des, une quantité ou un lieu introduit par de."],
      ["Transformez à l'impératif avec un pronom : Va au marché ! Prends des fruits !", "Vas-y ! Prends-en !"],
    ],
  },
  {
    subject: S,
    lesson: "Les verbes pronominaux et le passé composé",
    tables: [
      {
        title: "Se lever au présent",
        headers: ["Sujet", "Conjugaison"],
        rows: [
          ["je", "me lève"],
          ["tu", "te lèves"],
          ["il / elle", "se lève"],
          ["nous", "nous levons"],
          ["vous", "vous levez"],
          ["ils / elles", "se lèvent"],
        ],
      },
      {
        title: "Le passé composé : avoir ou être ?",
        headers: ["Auxiliaire", "Verbes", "Exemple"],
        rows: [
          ["avoir", "la plupart des verbes", "J'ai mangé. Nous avons fait du sport."],
          ["être", "verbes de mouvement : aller, venir, partir, arriver, sortir, entrer…", "Elle est allée au marché."],
          ["être", "tous les verbes pronominaux", "Ma sœur s'est promenée."],
          ["accord avec être", "le participe s'accorde avec le sujet", "Elles se sont lavé les mains / Elles sont parties."],
        ],
      },
      {
        title: "Participes passés irréguliers",
        headers: ["Infinitif", "Participe"],
        rows: [
          ["faire", "fait"],
          ["prendre", "pris"],
          ["voir", "vu"],
          ["venir", "venu"],
          ["boire", "bu"],
          ["avoir / être", "eu / été"],
        ],
      },
    ],
    map: [
      { label: "Verbes pronominaux", items: ["se lever", "se coucher", "se promener", "se laver", "se réveiller"] },
      { label: "Passé composé", items: ["auxiliaire + participe passé", { label: "avoir", sub: ["j'ai mangé"] }, { label: "être", sub: ["mouvement", "pronominaux"] }] },
      { label: "Accord", items: ["avec être : accord avec le sujet", "elle est allée", "ils sont partis"] },
      { label: "Participes", items: ["fait", "pris", "vu", "venu", "bu"] },
    ],
    essays: [
      ["Racontez votre journée d'hier (au passé composé).", "Hier, je me suis réveillé à 7 heures. Je me suis lavé et j'ai pris mon petit-déjeuner. Ensuite, je suis allé au lycée. L'après-midi, j'ai fait mes devoirs et je me suis promené avec mes amis. Je me suis couché à 10 heures."],
      ["Quand emploie-t-on l'auxiliaire être au passé composé ?", "On emploie être avec les verbes de mouvement comme aller, venir, partir, arriver, sortir, et avec tous les verbes pronominaux. Le participe passé s'accorde alors avec le sujet."],
      ["Décrivez votre routine du matin (verbes pronominaux).", "Je me réveille à 6 heures et demie. Je me lève tout de suite et je me lave. Ensuite, je m'habille et je prends mon petit-déjeuner. Mon frère se lève plus tard que moi."],
    ],
  },
  {
    subject: S,
    lesson: "Les articles partitifs et les quantités",
    tables: [
      {
        title: "Les articles partitifs",
        headers: ["Article", "Emploi", "Exemple"],
        rows: [
          ["du", "masculin singulier", "Je mange du pain."],
          ["de la", "féminin singulier", "Je mange de la salade."],
          ["de l'", "devant une voyelle", "Je bois de l'eau."],
          ["des", "pluriel", "Je mange des fruits."],
        ],
      },
      {
        title: "Quand l'article devient « de »",
        headers: ["Cas", "Exemple"],
        rows: [
          ["après une négation", "Je ne bois pas de café. / Il n'y a plus de pain."],
          ["après une quantité", "beaucoup de sucre, un kilo de pommes, assez d'argent"],
          ["Combien de…", "Combien de cahiers as-tu ?"],
          ["⚠ après aimer, adorer, détester → article défini", "J'aime le chocolat. / Je mange du chocolat."],
        ],
      },
    ],
    map: [
      { label: "Partitifs", items: ["du", "de la", "de l'", "des"] },
      { label: "→ de", items: ["négation : pas de", "beaucoup de", "un kilo de", "combien de"] },
      { label: "Article défini", items: ["après aimer / adorer / détester", "J'aime le lait"] },
      { label: "Exemples", items: ["Je bois du lait", "Je ne bois pas de lait", "Je bois beaucoup de lait"] },
    ],
    essays: [
      ["Complétez et expliquez : Je bois … lait mais je ne bois pas … café.", "Je bois du lait mais je ne bois pas de café. On emploie « du » pour une quantité non précise d'un nom masculin, et « de » après une négation."],
      ["Quelle est la différence entre « J'aime le chocolat » et « Je mange du chocolat » ?", "Après les verbes de goût (aimer, adorer, détester), on emploie l'article défini « le » car on parle du chocolat en général. Avec « manger », on emploie le partitif « du » car on parle d'une partie, d'une quantité non précise."],
      ["Écrivez ce que vous mettez dans votre sac pour une sortie, avec des quantités.", "Dans mon sac, je mets une bouteille d'eau, un peu de chocolat, deux sandwichs et beaucoup de fruits. Je ne prends pas de boissons gazeuses."],
    ],
  },
  {
    subject: S,
    lesson: "Les pronoms toniques et l'interrogation",
    tables: [
      {
        title: "Les pronoms toniques",
        headers: ["Sujet", "Pronom tonique", "Exemple"],
        rows: [
          ["je", "moi", "Viens chez moi."],
          ["tu", "toi", "Ce cadeau est pour toi."],
          ["il / elle", "lui / elle", "Je travaille avec lui."],
          ["nous", "nous", "Il vient avec nous."],
          ["vous", "vous", "C'est pour vous."],
          ["ils / elles", "eux / elles", "Je sors avec eux."],
        ],
      },
      {
        title: "Les mots interrogatifs",
        headers: ["Mot", "Question sur", "Exemple"],
        rows: [
          ["Où", "le lieu", "Où habites-tu ?"],
          ["Quand", "le temps", "Quand pars-tu ?"],
          ["Pourquoi", "la cause", "Pourquoi es-tu absent ?"],
          ["Comment", "la manière", "Comment vas-tu au lycée ?"],
          ["Qui / Que", "la personne / la chose", "Qui est-ce ? Que fais-tu ?"],
          ["Combien (de)", "la quantité / le prix", "Combien de frères as-tu ?"],
          ["Quel / Quelle / Quels / Quelles", "un choix (avec un nom)", "Quelle heure est-il ?"],
        ],
      },
      {
        title: "Oui, si ou non ?",
        headers: ["Question", "Réponse"],
        rows: [
          ["question affirmative : Tu aimes le foot ?", "Oui, j'aime le foot. / Non, je n'aime pas le foot."],
          ["question négative : Tu n'aimes pas le foot ?", "Si, j'aime le foot. / Non, je n'aime pas le foot."],
        ],
      },
    ],
    map: [
      { label: "Pronoms toniques", items: ["moi, toi, lui, elle", "nous, vous, eux, elles", { label: "emplois", sub: ["après préposition : chez moi", "pour insister : Moi, je…"] }] },
      { label: "Interrogatifs", items: ["où", "quand", "pourquoi", "comment", "qui / que", "combien"] },
      { label: "Quel", items: ["quel (m. s.)", "quelle (f. s.)", "quels (m. pl.)", "quelles (f. pl.)"] },
      { label: "Réponses", items: ["oui", "si (après une question négative)", "non"] },
    ],
    essays: [
      ["Posez cinq questions à un nouveau camarade de classe.", "Comment tu t'appelles ? Où est-ce que tu habites ? Quel âge as-tu ? Pourquoi est-ce que tu aimes le français ? Combien de frères et sœurs as-tu ?"],
      ["Quand emploie-t-on « si » au lieu de « oui » ?", "On emploie « si » pour répondre affirmativement à une question négative. Exemple : Tu ne fais pas de sport ? – Si, je fais du tennis."],
      ["Complétez avec un pronom tonique : Je vais au cinéma avec Ali et Omar. Ce livre est à Sara.", "Je vais au cinéma avec eux. Ce livre est à elle."],
    ],
  },
];
