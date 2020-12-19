/* Copyright (c) 2020 Thomas Cardon */

const Theme = {
  /* Cette fonction change le DOM pour que le navigateur charge le nouveau thème. */
  changeCSS: function(cssFile) {
    return new Promise((resolve, reject) => {
      let newlink = document.createElement('link');

      newlink.setAttribute('rel', 'stylesheet');
      newlink.setAttribute('type', 'text/css');
      newlink.setAttribute('href', cssFile);

      newlink.setAttribute('id', 'theme');

      newlink.onload = () => resolve();
      newlink.onerror = error => reject(error);

      document.getElementsByTagName('head').item(0).appendChild(newlink);
    });
  },
  /* Permet de changer de thème (parmi ceux présents dans le dossier css) */
  changeTheme: function(theme, save) {
    console.log('[Thèmes] >> Chargement du fichier :', './assets/css/theme-' + theme + '.css');

    if (save) {
      localStorage.setItem('theme', theme);
      document.location.reload();
    }
    else return Theme.changeCSS('./assets/css/theme-' + theme + '.css');
  },
  /* Cette fonction s'assure du chargement du bon thème au chargement de la page */
  load: function() {
    const theme = localStorage.getItem('theme') || 'minimalist';
    console.log('[Thèmes] >> Chargement :', theme);

    const el = document.querySelector('a[data-theme="' + theme + '"]');
    if (!el) console.warn("[Thèmes] >> Ce thème n'est pas reconnu.");
    else el.textContent += ' ✅';

    return Theme.changeTheme(theme);
  }
}

/* On remonte la page tout en haut avant que la page recharge (avant, parce que sinon Safari ne le prend pas en compte)*/
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

/* On met le chargement du thème dans la liste des fonctions à charger */
LoadingQ.push(Theme.load);

let collapsed = false;
let nav, navWidth, myName;

/* On rabat la barre de navigation en une colonne dès qu'on descend afin de la garder visible */
window.addEventListener('scroll', function() {
  if (!navWidth) {
    nav = document.querySelector('header.sm > nav');
    navWidth = nav.getBoundingClientRect().width;
    myName = document.getElementById('myName');
  }

  /* On anime pas la barre de navigation si sa position est relative (elle est relative que si l'écran est tactile -> règle CSS)*/
  if (window.getComputedStyle(nav).position == 'relative') return;

  if (!collapsed && window.scrollY > 50) {
    nav.style.fontSize = '0';
    nav.style.transition = '1s';
    nav.style.transform = "translate(" + navWidth + "px, 0)";

    myName.style.transform = "translate(0, -10vh)";

    setTimeout(() => window.requestAnimationFrame(() => {
      nav.style.flexDirection = 'column';
      nav.style.transform = 'unset';

      collapsed = true;
    }), 500);
  }
  else if (window.scrollY < 50 && collapsed) {
    nav.style.fontSize = 'unset';
    nav.style.transition = '0.5s';
    nav.style.transform = "translate(" + navWidth + "px, 0)";

    myName.style.transform = "unset";

    setTimeout(() => window.requestAnimationFrame(() => {
      nav.style.flexDirection = 'row';
      nav.style.transform = 'unset';

      collapsed = false;
    }), 500);
  }
});

/*
* Vérifie si le navigateur dispose d'un écran tactile
* Si ce n'est pas le cas, alors le bouton de retour vers le haut pourra s'afficher si nécessaire
*/
window.addEventListener('scroll', function() {
  const goToTop = document.getElementById('goToTop');
  if (!goToTop || window.matchMedia("(pointer:coarse)").matches) return;

  if (window.scrollY > 400) goToTop.style.opacity = 1;
  else goToTop.style.opacity = 0;
});
