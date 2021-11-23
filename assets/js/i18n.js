/* Copyright (c) 2020 Thomas Cardon
 *
 * Seul la méthode i18n#render à été inspirée par un article que j'ai vu ici:
 * https://krasimirtsonev.com/blog/article/Javascript-template-engine-in-just-20-line ("Templating Engine in just 20 lines")
 * Le reste provient de moi seul.
 */

 /* J'étais parti au départ pour quelque chose de beaucoup trop compliqué pour ce qui était demandé;
 * Comme montré à mon correcteur j'étais parti sur des fichiers stockés en ligne qui téléchargaient les locales en JSON et qui les stockaient dans sessionStorage
 * Sauf qu'étant donné qu'on télécharge déjà ce script (i18n.js), et qu'on à que deux langues,
 * je me suis dit qu'on pourrait juste laisser un objet de lignes françaises et anglaises.
 */
const i18n = {
  lang: localStorage.getItem('language') || 'fr',
  refs: {
    en: {
      "go-to-top": "Scroll to top",
      "language": "en",
      "subtitle": "20 year-old student, currently at Aix-Marseille, IT dept.",
      "here": "here",
      "available": "available",
      "follows": "Following",
      "followers": "followers",
      "people": "people",
      "menu-projects": "Projects",
      "menu-contact": "Contact",
      "menu-sources": "Sources",
      "about-me": "About me",
      "about-me.section": "I've always been curious; I've explored a lot of different stuff knowing well what I was about to become later.\nThat's how I got myself a few hobbies: biking, running, art (thanks to Art History, and thanks to the teacher that made Art and French interesting!) I'm fond of TV shows, movies and musics (but I guess that's our generation, with such platforms like Netflix or Spotify that made this kind of stuff reachable.)",
      "description": "... And IT in all of this?",
      "description.section": "I've always been interested in this line of business. My curiosity and my ability to be self-taught are two qualities that have always enabled me to progress in this field. I have always done little things in my corner for my pleasure, and combining work and passion is the goal I have set for myself. As a kid, I spent my time watching YouTube videos and guides, visiting lost druid forums to understand how everything worked! I had started playing with the Java programming language in order to modify the Minecraft game. Time flies and then I started doing some projects in my corner, static and dynamic websites, with various programming languages ​​/ platforms although I have a preference for NodeJS. I've also done other cool things like home automation projects, electronics interest me a lot too. I am currently in the first year of a DUT in IT, promotion of 2020-2021.",
      "description.see-projects": "You can take a look at the projects I've realized",
      "footer.title.address": "My address",
      "footer.title.mail": "Mail",
      "footer.title.change-language": "Language",
      "footer.title.change-theme": "Theme",
      "website": "Website",
      "github.repo": "GitHub repo",
      "github.repo.public": "public repos",
      "github.contrib.unofficial.api": "Unofficial API Contribution",
      "reddit.post": "Reddit Post",
      "projects.header.1": "My pro",
      "projects.header.2": "jects",
      "projects.used.resources": "Used resources",
      "projects.used.resources.pug": "Pug Render Engine",
      "projects.used.resources.electron": "Cross-platform desktop apps framework using HTML/JS/CSS",
      "projects.used.resources.nodejs": "Open source JavaScript environment running outside a web browser",
      "projects.used.resources.nextjs": "An open-source React front-end development web framework that enables functionality such as server-side rendering and generating static websites for React based web applications.",
      "projects.used.resources.react": "React.js is an open-source JavaScript library that is used for building user interfaces specifically for single-page applications. Created by Facebook and widely used throughout the world.",
      "projects.used.resources.php": "A server side scripting language that is embedded in HTML. It is used to manage dynamic content, databases, session tracking and other things.",
      "projects.used.resources.wordpress": "A simple blog CMS",
      "projects.used.resources.mysql": "A relational database management system.",
      "projects.used.resources.pwa": "Progressive Web Apps are web apps, that are built to be installable, reliable, and capable of working offline. Twitter saw a 65% increase in pages per session using this technology.",
      "projects.1.desc": "I'm often playing with new players who doesn't have enough time to understand every aspect of the game, so this program handles those aspects automatically. By far my most popular project.",
      "projects.2.desc": "A prototype that aggregates new mails and fetches Zoom/Google Meet links, and saves them in a database. The website, using NextJS+React shows those links and is linked to a Discord channel using webhooks.",
      "projects.3.desc": "Reverse engineering of Pronote APIs to provide an interface more similar to the standards of recent years, plus an almost-instant loading and a few other interesting functionalities. Playground for HTTP/2, Progressive Web Apps, and Push Notifications",
      "projects.4.desc": "Website that used to allow sync between user's players, so people could create a room, and watch a movie together, while being able to pause for everyone, etc. The website isn't open to public. Playground for NextJS, React, Material UI, and WebSocket.",
      "projects.5.desc": "School project: the goal was to create a new schedule for students, teachers and administration. A space to help at school during lockdown, thanks to the full integration of Zoom meetings.",
      "projects.6.desc": "Smart TVs shown in some schools of Aix-Marseille University. Allows everyone to check their own schedule from the TV or their phone, and much more.",
      "projects.7.desc": "Created a game like Pacman, with collision and two players. Created using graphics library OpenGL", 
      "cv.link.1": "You can access the file",
      "cv.link.2": "if your browser doesn't show you the PDF here.",
      "cv.updated": "Updated 09/10/2021",
      "contact.form.1": "Contact",
      "contact.form.2": "form",
      "contact.form.label.mail": "Mail address",
      "contact.form.label.message": "Message",
      "contact.form.submit": "Submit",
      "contact.form.open.client": "Open mail client",
      "sources.header.1": "Sour",
      "sources.header.2": "ces",
      "sources.link.1": "The best website to keep notes I believe",
      "sources.link.2": "Panda - a news tech/design/dev feed",
      "sources.link.3": "Flat UI Colors 2",
      "sources.link.4": "How to: CSS Loader (W3Schools)",
      "sources.link.5": "Markup Validation Service",
      "sources.link.6": "Graphic inspirations",
      "sources.link.7": "Contact form",
      "sources.link.8": "Templating Engine (inspired from this to created i18n script)",
      "sources.link.9": "The website I had created for my Parcoursup project",
      "sources.link.10": "danistefanovic/build-your-own-x → build your own (insert technology here): learn something by creating it"
    },
    fr: {
      "go-to-top": "Retourner en haut de la page",
      "language": "fr",
      "subtitle": "Etudiant de 20 ans à Aix-Marseille Université, département informatique",
      "here": "ici",
      "available": "disponible",
      "follows": "suit",
      "followers": "me suivent",
      "people": "personnes",
      "menu-projects": "Projets",
      "menu-contact": "Contact",
      "menu-sources": "Bibliographie",
      "about-me": "A propos de moi",
      "about-me.section": "Ayant toujours été curieux, j'ai exploré plein de choses différentes tout en sachant déjà ce que j'allais faire plus tard. Ainsi j'ai plein de hobbies: vélo, course, art (merci à la matière Histoire des Arts, et merci à la professeure qui m'a redonné goût à la langue de Molière et à l'art!)... Je suis friand de séries télévisées, de films et de musiques (de nos jours, grâce aux plateformes à disposition c'est devenu très accessible; il suffit juste d'être curieux!)",
      "description": "...Et l'informatique dans tout ça?",
      "description.section": "Ce secteur m'a toujours intéressé! Ma curiosité et ma capacité à être autodidacte sont deux qualités qui m'ont toujours permis d'avancer dans ce domaine. J'ai toujours fait des petits trucs dans mon coin pour mon plaisir, et allier travail et passion est l'objectif que je me suis fixé. Plus petit, je passais mon temps à regarder avec des vidéos YouTube et des guides, à visiter des forums de druides perdus pour comprendre et apprendre! J'avais commencé à jouer avec le langage de programmation Java afin de modifier le jeu Minecraft. Le temps passe et j'ai ensuite commencé à faire des projets dans mon coin, des sites web statiques et dynamiques, avec de divers langages de programmation/plateformes même si j'ai une préférence pour NodeJS. J'ai fait aussi d'autres choses sympa comme des projets de domotique, l'électronique m'intéressant beaucoup aussi. Je suis actuellement en première année de DUT informatique, promotion de 2020-2021.",
      "description.see-projects": "Vous pouvez voir les projets que j'ai réalisé",
      "footer.title.address": "Mon adresse",
      "footer.title.mail": "Adresse mail",
      "footer.title.change-language": "Langue",
      "footer.title.change-theme": "Thème",
      "website": "Site internet",
      "github.repo": "Répertoire GitHub",
      "github.repo.public": "répertoires publics",
      "github.contrib.unofficial.api": "Contribution à l'API non officielle",
      "reddit.post": "Post Reddit",
      "projects.header.1": "Mes pro",
      "projects.header.2": "jets",
      "projects.used.resources": "Resources utilisées",
      "projects.used.resources.pug": "Moteur de rendu Pug",
      "projects.used.resources.electron": "Framework pour applications de bureau multiplateformes",
      "projects.used.resources.react": "Bibliothèque JavaScript créée par Facebook facilitant la création d'apps web, très utilisé dans le monde.",
      "projects.used.resources.nodejs": "Environnement bas niveau permettant l’exécution de JavaScript côté serveur",
      "projects.used.resources.nextjs": "NextJS permet un rendu côté serveur afin de générer des versions statiques et/ou dynamiques d'applications React, mais aussi d'héberger vos sites depuis un répertoire GitHub avec déploiement automatique.",
      "projects.used.resources.php": "Un langage de script côté serveur intégré au HTML. Il est utilisé pour gérer le contenu dynamique, les bases de données, le suivi de session et d'autres choses.",
      "projects.used.resources.wordpress": "Un simple CMS de blogging",
      "projects.used.resources.mysql": "Gestion de base de données relationnelles",
      "projects.used.resources.pwa": "Progressive Web Apps sont des applications Web conçues pour être installables, fiables et capables de fonctionner hors ligne. Twitter a vu une augmentation de 65% du nombre de pages par session utilisant cette technologie.",
      "projects.1.desc": "Un assistant pour aider les nouveaux joueurs à apprendre League of Legends. De loin mon projet le plus populaire. Ce projet n'est plus maintenu par manque de temps.",
      "projects.2.desc": "Un prototype me permettant de récupérer chaque mail de mon adresse mail universitaire et de les analyser afin de récupérer les liens et identifiants de réunions, et les affiche",
      "projects.3.desc": "Rétro-ingénierie des API Pronote afin de fournir une interface plus ressemblante aux standards de ces dernières années, avec un chargement presque instantané plus quelques fonctionnalités intéressantes. C'était mon terrain de jeu pour HTTP/2, les progressive web apps et les notification push",
      "projects.4.desc": "Site web qui permettait la synchronisation des lecteurs vidéos avec tous ceux qui étaient connectés dans une même salle. Le site est encore disponible mais n'est pas ouvert au public. Terrain de jeu pour NextJS, React, Material UI, et WebSocket.",
      "projects.5.desc": "Projet de fin d'études: créer un nouvel emploi du temps pour les étudiants, professeurs et l'administration. Un espace pour aider l'école durant les périodes de distanciel, grâce à l'intégration complète des réunions Zoom.",
      "projects.6.desc": "Les Smart TV diffusées dans certaines écoles d'Aix-Marseille Université. Permet à chacun de consulter son propre emploi du temps depuis le téléviseur ou son téléphone, voir des alertes, infos et bien plus encore.",
      "projects.7.desc": "Recréer un jeu comme Pacman, avec collision, deux joueurs. Créé avec la bibliothèque graphique OpenGL", 
      "cv.link.1": "Vous pouvez accéder au fichier",
      "cv.link.2": "si votre navigateur ne peut l'afficher.",
      "cv.updated": "Mis-à-jour le 14/09",
      "contact.form.1": "Formulaire de",
      "contact.form.2": "Contact",
      "contact.form.label.mail": "Adresse mail",
      "contact.form.label.message": "Message",
      "contact.form.submit": "Envoyer",
      "contact.form.open.client": "Ouvrir le client de messagerie",
      "sources.header.1": "Biblio",
      "sources.header.2": "graphie",
      "sources.link.1": "Le meilleur site à mes yeux pour tenir ses notes",
      "sources.link.2": "Panda - un feed de news tech/design/dev",
      "sources.link.3": "Flat UI Colors 2",
      "sources.link.4": "How to: CSS Loader (W3Schools)",
      "sources.link.5": "Markup Validation Service",
      "sources.link.6": "Inspirations grapiques",
      "sources.link.7": "Formulaires de contact",
      "sources.link.8": "Templating Engine (dont je me suis inspiré pour mon script i18n)",
      "sources.link.9": "Le site que j'avais créé pour mon projet Parcoursup",
      "sources.link.10": "danistefanovic/build-your-own-x → apprenez à utiliser un système en le recréant"
    }
  },
  render: function (string, data) {
    let re = /{{([^}}]+)?}}/g, matches = string.matchAll(re);

    for (const match of matches) {
      if (data[match[1]]) string = string.replace(match[0], data[match[1]]);
      else {
        console.warn('[i18n] >>', match[1], ':', 'aucun remplacement trouvé');
      }
    }

    return string;
  }
};

i18n.load = async function load() {
  const el = document.querySelector('a[data-lang="' + i18n.lang + '"]');
  if (!el) {
    i18n.lang = 'en';
    console.warn("[i18n] >> Cette langue n'est pas reconnue! Utilisation de la langue: en");
  }
  else el.textContent += ' ✅';

  i18n.lines = await i18n.refs[i18n.lang];
  return i18n;
};

/*
* J'étais parti sur une mise-à-jour simple en prenant les élémants ayant un certain attribut,
* mais ça ne me laissait pas assez de liberté sans trop compliquer les choses à mon goût
*/
i18n.updateDOM = function updateDOM() {
  console.log('[i18n] >> Mise à jour DOM');
  document.body.innerHTML = i18n.render(document.body.innerHTML, i18n.lines);
  console.log('[i18n] >> Mise à jour DOM terminée');
}

i18n.setLanguage = function(lang) {
  console.log('[i18n] >> Langue définie:', lang);
  localStorage.setItem('language', lang);
  document.location.reload().reload();
}

window.i18n = i18n;
