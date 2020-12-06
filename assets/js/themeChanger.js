const Theme = {
  /*
  * Permet un changement de thème forcé
  */
  changeCSS: function(cssFile) {
    let oldlink = document.getElementById('theme');
    let newlink = document.createElement('link');

    newlink.setAttribute('rel', 'stylesheet');
    newlink.setAttribute('type', 'text/css');
    newlink.setAttribute('href', cssFile);

    newlink.setAttribute('id', 'theme');

    document.getElementsByTagName('head').item(0).replaceChild(newlink, oldlink);
  },
  changeTheme: function(theme, save) {
    console.log('Loading theme:', './assets/css/theme-' + theme + '.css');

    if (save) {
      localStorage.setItem('theme', theme);
      document.location.reload().reload();
    }
    else Theme.changeCSS('./assets/css/theme-' + theme + '.css');
  },
  load: function() {
    const theme = localStorage.getItem('theme') || 'cybermood_2077';
    console.log('Loading theme:', theme);

    const el = document.querySelector('a[data-theme="' + theme + '"]');
    if (!el) console.warn("Ce thème n'est pas reconnu.");
    else el.textContent += ' ✅';

    if (theme != 'cybermood_2077')
    Theme.changeTheme(theme);
  }
}

/*
* Vérifie si le navigateur dispose d'un écran tactile
* Si ce n'est pas le cas, alors le bouton de retour vers le haut s'affichera
*/
window.addEventListener('scroll', function() {
  if (!document.getElementById('goToTop')) return console.warn("Vers le haut -> le bouton n'existe pas!");
  if (window.matchMedia("(pointer:coarse)").matches) return;

  if (window.scrollY > 400) document.getElementById('goToTop').style.display = 'block';
  else document.getElementById('goToTop').style.display = 'none';
});

window.onbeforeunload = window.scroll(0, 0);

LoadingQ.push(Theme.load);
