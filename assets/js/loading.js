/* Copyright (c) 2020 Thomas Cardon
*
* Cette fonction me permet de charger les fonctions que je veux dans le bon ordre
* et d'ensuite appeler les fonctions i18n
* pour: -> traduire une fois que les scripts qui changent le DOM au lancement ont été exécutés
*       -> enlever l'overlay de chargement avec le spinner une fois que la page à finit de charger
*/

const LoadingQ = {
  _array: [],
  push: (f, self = undefined, ...args) => LoadingQ._array.push([f, self, args]),
  showPage: () => {
    Array.from(document.querySelectorAll('.hide')).forEach(el => el.classList.remove('hide'));
    document.getElementById('loading').style.display = 'none';
  },
  hidePage: () => document.getElementById('loading').style.display = 'block'
}

document.addEventListener('DOMContentLoaded', async () => {
  /* Je suppose qu'il n'y ait pas d'erreur mais j'aurais pu rediriger sur une page d'erreur si i18n ou quelque chose d'autre plantait. */
  await i18n.load();

  for (a of LoadingQ._array) {
    console.log('[LoadingQ] >> Chargement:', a[0].name),
    await a[0].call(a[1] /* thisArg */, ...a[2] /* args */);
  }

  delete LoadingQ._array;

  await i18n.updateDOM();

  console.log('[LoadingQ] >> Affichage de la page');
  LoadingQ.showPage();
});
