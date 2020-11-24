function changeCSS(cssFile, cssLinkIndex) {
    var oldlink = document.getElementsByTagName('link').item(cssLinkIndex);
    var newlink = document.createElement('link');

    newlink.setAttribute('rel', 'stylesheet');
    newlink.setAttribute('type', 'text/css');
    newlink.setAttribute('href', cssFile);

    document.getElementsByTagName('head').item(0).replaceChild(newlink, oldlink);
}

const theme = localStorage.getItem('theme');

if(!theme) {
  localStorage.setItem('theme', 'light');
}
else {
  console.log('Loading theme:', theme);
}

// Permet de gérer du CSS en fonction du scroll de la page
window.addEventListener('scroll', function() {
  if (window.scrollY > 150) document.documentElement.setAttribute('data-scroll', window.scrollY);
  else document.documentElement.setAttribute('data-scroll', 0);
});

window.onbeforeunload = function () {
  console.log('Scrolling back to top');
  window.scroll(0, 0);
}
