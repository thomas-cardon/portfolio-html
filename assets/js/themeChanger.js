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
    const theme = localStorage.getItem('theme') || 'cybermood_2077';
    console.log('[Thèmes] >> Chargement :', theme);

    const el = document.querySelector('a[data-theme="' + theme + '"]');
    if (!el) console.warn("[Thèmes] >> Ce thème n'est pas reconnu.");
    else el.textContent += ' ✅';

    return Theme.changeTheme(theme);
  }
}

/*
* Vérifie si le navigateur dispose d'un écran tactile
* Si ce n'est pas le cas, alors le bouton de retour vers le haut pourra s'afficher si nécessaire
*/
window.addEventListener('scroll', function() {
  if (!document.getElementById('goToTop')) return;
  if (window.matchMedia("(pointer:coarse)").matches) return;

  if (window.scrollY > 400) document.getElementById('goToTop').style.opacity = 1;
  else document.getElementById('goToTop').style.opacity = 0;
});

/* On remonte la page tout en haut avant que la page recharge (avant, parce que sinon Safari ne le prend pas en compte)*/
window.onbeforeunload = () => window.scroll(0, 0);

/* On met le chargement du thème dans la liste des fonctions à charger */
LoadingQ.push(Theme.load);
