/*
*   2020 - Thomas Cardon
*   Inspiré de: https://krasimirtsonev.com/blog/article/Javascript-template-engine-in-just-20-line
*   "Templating Engine in just 20 lines"
*/

/* i18n pour internationalisation (18 représentant le nombre de caractères entre le i & le n)*/
const i18n = {
  lang: localStorage.getItem('language') || 'en',
  baseUrl: window.location.href.substring(0, window.location.href.lastIndexOf('/')),
  /*
   * Les langues sont publiées sur un hosting de fichiers JSON public parce que Chrome ne veut pas me laisser lire un fichier JSON avec le protocole file://
   * A cause du Cross-origin resource sharing
  */
  refs: {
    en: 'https://api.jsonbin.io/b/5fc8d3bb9abe4f6e7caf03ad/1',
    fr: 'https://api.jsonbin.io/b/5fc8d408045eb86f1f8a8b46/1'
  },
  render: function (string, data) {
    let re = /{{([^}}]+)?}}/g, matches = string.matchAll(re);

    for (const match of matches) {
      if (data[match[1]]) string = string.replace(match[0], data[match[1]]);
      else {
        console.warn('Rendu ->', match[1], ':', 'aucun remplacement trouvé');
      }
    }

    while(false) {//match = re.exec(string)) {
      console.dir(match);

    }

    return string;
  }
};

i18n.load = async function load() {
  let lines = sessionStorage.getItem('language-lines');
  if (lines) {
    i18n.lines = JSON.parse(lines);
    return i18n;
  }

  if (window.location.href.startsWith('file://'))
  console.warn("Impossible de récupérer le fichier HTML localement (règles CORS) -> récupération depuis JSONBin.io (pastebin pour fichiers JSON)");

  let url = window.location.href.startsWith('file://') ? i18n.refs[i18n.lang] : i18n.baseUrl + '/assets/languages/' + i18n.lang + '.json';

  console.log('Fetching language:', i18n.lang);
  console.log('>>', url);

  const r = await fetch(url, {
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });

  i18n.lines = await r.json();

  /* On sauvegarde ça dans sessionStorage car ses données expirent à la fin de la session */
  /* Pas besoin de système de version: JSONBin.io génère des URL à chaque édition, il faut juste que je les change dans le site à chaque fois */
  sessionStorage.setItem('language-lines', JSON.stringify(i18n.lines));
  return i18n;
};

i18n.updateDOM = function updateDOM() {
  // J'étais parti sur une mise-à-jour simple en prenant les élémants ayant un certain attribut, mais ça ne me laissait pas assez de liberté sans trop compliquer les choses à mon goût
  console.log('>> Updating DOM');
  document.body.innerHTML = i18n.render(document.body.innerHTML, i18n.lines);
  console.log('>> Updated DOM');
}

window.i18n = i18n;

LoadingQ.push(i18n.load, i18n);
LoadingQ.push(i18n.updateDOM, i18n);
