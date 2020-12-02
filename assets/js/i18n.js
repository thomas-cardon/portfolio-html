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
    en: 'https://api.jsonbin.io/b/5fc80228045eb86f1f8a477f/1'
  },
  render: function (string, data) {
    let re = /{{([^}}]+)?}}/g, match;
    while(match = re.exec(string)) {
      let entry = match[1].split('|');

      if (data[entry[0]]) string = string.replace(match[0], data[entry[0]])
      else {
        if (entry[1]) string = string.replace(match[0], entry[1]);
        else console.warn('Rendu ->', entry[0], ':', 'aucun remplacement trouvé');
      }
    }

    return string;
  }
};

i18n.load = async () => {
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

i18n.updateDOM = () => {
  console.log('>> Updating DOM');
  document.body.innerHTML = i18n.render(document.body.innerHTML, i18n.lines);
  console.log('>> Updated DOM');
}

window.i18n = i18n;