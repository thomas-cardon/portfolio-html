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
      localStorage.setItem('thomascardon.theme', theme);
      document.location.reload();
    }
    else return Theme.changeCSS('./assets/css/theme-' + theme + '.css');
  },
  /* Cette fonction s'assure du chargement du bon thème au chargement de la page */
  load: function() {
    const theme = localStorage.getItem('thomascardon.theme') || 'minimalist';
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

/*
* Barre de navigation rabattable
* Fonctionne si la position n'est pas relative (& si l'appareil dispose d'un curseur)
*/
let nav, navWidth, hadCollapsed, isCollapsing;

function collapseNavbar(nav, navWidth, myName) {
  isCollapsing = window.scrollY < 50;
  if (hadCollapsed == isCollapsing) return;

  /* On anime pas la barre de navigation si sa position est relative */
  if (window.getComputedStyle(nav.parentElement).position == 'relative') return;

  nav.style.transform = 'translate(100vw, 0)';
  myName.style.transform = window.scrollY > 50 ? 'translate(0, -100vh)' : 'unset';

  hadCollapsed = isCollapsing;
}

const collapse = (...x) => window.requestAnimationFrame ? window.requestAnimationFrame(() => collapseNavbar(...x)) : collapseNavbar(...x);

/* On rabat la barre de navigation en une colonne dès qu'on descend afin de la garder visible */
window.addEventListener('scroll', e => {
  if (!navWidth) {
    nav = document.querySelector('header.sm > nav');

    if (!nav) return;
    navWidth = nav.getBoundingClientRect().width;

    nav.ontransitionend = function() {
      console.log('transition end', hadCollapsed, isCollapsing);

      nav.style.fontSize = isCollapsing ? 'unset' : '0';
      nav.style.flexDirection = isCollapsing ? 'row' : 'column';
      nav.style.transform = 'unset';
    }
  }
  else collapse(nav, nav.getBoundingClientRect().width, document.getElementById('myName'));
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
