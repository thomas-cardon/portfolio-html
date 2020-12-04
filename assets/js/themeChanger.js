const Theme = {
  changeCSS: function(cssFile, cssLinkIndex) {
      var oldlink = document.getElementsByTagName('link').item(cssLinkIndex);
      var newlink = document.createElement('link');

      newlink.setAttribute('rel', 'stylesheet');
      newlink.setAttribute('type', 'text/css');
      newlink.setAttribute('href', cssFile);

      document.getElementsByTagName('head').item(0).replaceChild(newlink, oldlink);
  },
  load: function() {
    const theme = localStorage.getItem('theme');

    if(!theme) {
      localStorage.setItem('theme', 'light');
    }
    else {
      console.log('Loading theme:', theme);
    }


  }
}

/*
* Vérifie si le navigateur dispose d'un écran tactile
* Si ce n'est pas le cas, alors le bouton vers le haut se met à fonctionner
*/
window.addEventListener('scroll', function() {
  if (!document.getElementById('goToTop')) return console.warn("Vers le haut -> le bouton n'existe pas!");
  if (window.matchMedia("(pointer:coarse)").matches) return;

  if (window.scrollY > 400) document.getElementById('goToTop').style.display = 'block';
  else document.getElementById('goToTop').style.display = 'none';
});

window.onbeforeunload = window.scroll(0, 0);
